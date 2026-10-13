import test from 'node:test';
import assert from 'node:assert/strict';
import { constrainLayer, emptyDesign, updateLayer } from '../features/garment-studio/design.ts';

test('rotated layer corners remain within the print area at every angle', () => {
  for (let rotation=-180;rotation<=180;rotation+=5) {
    for (const x of [-2,0,.5,1,3]) {
      const l=constrainLayer({id:'a',kind:'text',name:'a',x,y:x,width:.9,height:.7,rotation});
      const a=l.rotation*Math.PI/180,c=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a));
      const rx=(l.width*c+l.height*s)/2,ry=(l.width*s+l.height*c)/2;
      assert.ok(l.x-rx>=-1e-9 && l.x+rx<=1+1e-9 && l.y-ry>=-1e-9 && l.y+ry<=1+1e-9);
    }
  }
});
test('front edits never mutate the back or the original design', () => {
  const layer={id:'a',kind:'text',name:'a',text:'Hello',x:.5,y:.5,width:.4,height:.2,rotation:0};
  const design={...emptyDesign(),front:[layer],back:[{...layer,id:'b'}]};
  const updated=updateLayer(design,'front','a',{x:.8,id:'other'});
  assert.equal(design.front[0].x,.5);
  assert.equal(updated.front[0].id,'a');
  assert.equal(updated.back,design.back);
  assert.notEqual(updated.front,design.front);
  assert.deepEqual(emptyDesign().front,[]);
});
test('invalid numeric values cannot escape to renderer transforms', () => {
  const l=constrainLayer({id:'a',kind:'image',name:'a',x:NaN,y:Infinity,width:NaN,height:0,rotation:Infinity});
  for(const key of ['x','y','width','height','rotation']) assert.ok(Number.isFinite(l[key]));
});
