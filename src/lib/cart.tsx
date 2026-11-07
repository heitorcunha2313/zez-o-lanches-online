import { createContext, useContext, useState, type ReactNode } from "react";
import type { Extra, Product } from "@/data/menu";
import type { CartItem } from "@/lib/order";

type Ctx = {
  items: CartItem[];
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product, qty: number, extras: Extra[]) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add: Ctx["add"] = (p, qty, ex) => {
    const key = `${p.id}|${ex.map((e) => e.id).sort().join(",")}`;
    setItems((prev) => {
      const f = prev.find((i) => i.key === key);
      if (f) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, productId: p.id, name: p.name, basePrice: p.price, extras: ex, qty }];
    });
  };
  const setQty = (key: string, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))));
  const remove = (key: string) => setItems((prev) => prev.filter((i) => i.key !== key));

  return (
    <CartContext.Provider
      value={{ items, open, setOpen, add, setQty, remove, clear: () => setItems([]), count: items.reduce((s, i) => s + i.qty, 0) }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
}
