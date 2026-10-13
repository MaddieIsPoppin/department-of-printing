"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products } from "@/data/products";
import { addBagItem, validateBag, type BagItem } from "./bag";

const key = "dop-bag-v1";
type BagContext = { items: BagItem[]; ready: boolean; notice: string; add: (item: BagItem) => void; change: (items: BagItem[]) => void };
const Context = createContext<BagContext | null>(null);
export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]), [ready, setReady] = useState(false), [notice, setNotice] = useState("");
  useEffect(() => {
    function load() {
      try { setItems(validateBag(JSON.parse(localStorage.getItem(key) || "[]"), products)); }
      catch { setItems([]); setNotice("Your saved bag could not be restored. Product information may have changed; please select your pieces again."); }
      setReady(true);
    }
    load();
    const sync = (event: StorageEvent) => { if (event.key === key) load(); };
    window.addEventListener("storage", sync); return () => window.removeEventListener("storage", sync);
  }, []);
  function change(next: BagItem[]) {
    const clean = validateBag(next, products); setItems(clean);
    try { localStorage.setItem(key, JSON.stringify(clean)); setNotice(""); } catch { setNotice("Your browser cannot save this bag. It will remain available only until you leave or refresh."); }
  }
  return <Context.Provider value={{ items, ready, notice, change, add: item => change(addBagItem(items, item, products)) }}>{children}</Context.Provider>;
}
export function useBag() { const context = useContext(Context); if (!context) throw new Error("BagProvider is required"); return context; }
