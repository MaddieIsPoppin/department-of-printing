"use client";
import { Component, Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CanvasTexture, Mesh, MeshStandardMaterial, SRGBColorSpace } from "three";
import type { StudioDesign, Side } from "./design";
import { paintLayers } from "./artwork";
import { studioGarment, type GarmentModel } from "./garment-config";

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="status">3D preview unavailable. Your design remains editable in the 2D Print Lab.</p> : this.props.children; }
}

function Model({ config, front, back, colour }: { config: GarmentModel; front: CanvasTexture; back: CanvasTexture; colour: string }) {
  const gltf = useGLTF(config.url);
  const model = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const required = [...config.garmentMeshes, config.printMeshes.front, config.printMeshes.back];
    for (const name of required) if (!(clone.getObjectByName(name) instanceof Mesh)) throw new Error(`Missing calibrated mesh: ${name}`);
    clone.traverse(object => {
      if (!(object instanceof Mesh)) return;
      if (config.garmentMeshes.includes(object.name)) object.material = new MeshStandardMaterial({ color: colour, roughness: .9 });
      if (object.name === config.printMeshes.front || object.name === config.printMeshes.back) object.material = new MeshStandardMaterial({ map: object.name === config.printMeshes.front ? front : back, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, roughness: .9 });
    });
    return clone;
  }, [gltf.scene, config, front, back, colour]);
  useEffect(() => () => { model.traverse(object => {
    if (object instanceof Mesh && [...config.garmentMeshes, config.printMeshes.front, config.printMeshes.back].includes(object.name)) (object.material as MeshStandardMaterial).dispose();
  }); }, [model, config]);
  return <primitive object={model} dispose={null} />;
}

function DesignSurface({ design }: { design: StudioDesign }) {
  const { front, back } = design;
  const invalidate = useThree(state => state.invalidate);
  const [textures] = useState(() => {
    const make = () => { const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1024; const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace; texture.flipY = !studioGarment.model; return texture; };
    return { front: make(), back: make() };
  });
  useEffect(() => {
    let cancelled = false;
    for (const side of ["front", "back"] as const) {
      const buffer = document.createElement("canvas"); buffer.width = buffer.height = 1024;
      void paintLayers(buffer, side === "front" ? front : back).then(() => {
        if (cancelled) return;
        const canvas = textures[side].image as HTMLCanvasElement;
        const context = canvas.getContext("2d")!; context.clearRect(0, 0, 1024, 1024); context.drawImage(buffer, 0, 0);
        textures[side].needsUpdate = true; invalidate();
      }).catch(() => { /* The 2D editor retains the original layers on decode failure. */ });
    }
    return () => { cancelled = true; };
  }, [front, back, textures, invalidate]);
  useEffect(() => () => { textures.front.dispose(); textures.back.dispose(); }, [textures]);
  if (studioGarment.model) return <Model config={studioGarment.model} front={textures.front} back={textures.back} colour={design.colour} />;
  return <group>
    <mesh><boxGeometry args={[2, 2, .06]} /><meshStandardMaterial color={design.colour} roughness={.9} /></mesh>
    <mesh position={[0, 0, .032]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={textures.front} transparent depthWrite={false} /></mesh>
    <mesh position={[0, 0, -.032]} rotation={[0, Math.PI, 0]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={textures.back} transparent depthWrite={false} /></mesh>
  </group>;
}
function CameraPosition({ side, turn, zoom }: { side: Side; turn: number; zoom: number }) {
  const { camera, invalidate } = useThree();
  useEffect(() => { const angle = (side === "front" ? 0 : Math.PI) + turn * Math.PI / 4; camera.position.set(Math.sin(angle) * zoom, .1, Math.cos(angle) * zoom); camera.lookAt(0, 0, 0); invalidate(); }, [camera, invalidate, side, turn, zoom]);
  return <OrbitControls key={`${side}-${turn}-${zoom}`} makeDefault enablePan={false} enableDamping={false} minDistance={2.8} maxDistance={7} />;
}
export default function Scene({ design, side, turn, zoom }: { design: StudioDesign; side: Side; turn: number; zoom: number }) {
  const [lost, setLost] = useState(false);
  if (lost) return <p role="status">The 3D graphics context was lost. Your artwork remains available in the 2D editor.</p>;
  return <SceneBoundary><Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, .1, 4.5], fov: 40 }} fallback={<p>WebGL is unavailable. Continue designing in the 2D Print Lab.</p>} onCreated={({ gl }) => { gl.setClearColor("#d9dccf"); }}>
    <ambientLight intensity={1.8} /><directionalLight position={[3, 4, 5]} intensity={2} /><directionalLight position={[-3, 2, -4]} intensity={1.5} />
    <ContextMonitor onLost={setLost} /><Suspense fallback={null}><DesignSurface design={design} /></Suspense><CameraPosition side={side} turn={turn} zoom={zoom} />
  </Canvas></SceneBoundary>;
}

function ContextMonitor({ onLost }: { onLost: (lost: boolean) => void }) {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onLost(true); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onLost]);
  return null;
}
