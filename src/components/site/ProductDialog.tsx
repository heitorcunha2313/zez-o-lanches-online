import { useEffect, useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { extras as allExtras, type Extra, type Product } from "@/data/menu";
import { brl, unitPrice } from "@/lib/order";
import { useCart } from "@/lib/cart";

export function ProductDialog({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [sel, setSel] = useState<Extra[]>([]);

  useEffect(() => {
    setQty(1);
    setSel([]);
  }, [product?.id]);

  if (!product) return null;
  const toggle = (e: Extra) =>
    setSel((s) => (s.some((x) => x.id === e.id) ? s.filter((x) => x.id !== e.id) : [...s, e]));
  const total = unitPrice(product.price, sel) * qty;

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-popover p-0 sm:max-w-lg">
        <img src={product.image} alt={product.name} className="h-52 w-full object-cover sm:h-60" width={816} height={816} />
        <div className="space-y-5 p-5">
          <div>
            <DialogTitle className="font-display text-3xl uppercase">{product.name}</DialogTitle>
            <DialogDescription className="mt-1 text-muted-foreground">{product.description}</DialogDescription>
            <p className="mt-2 text-lg font-bold text-gold">{brl(product.price)}</p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">Adicionais</h4>
            <div className="grid gap-2">
              {allExtras.map((e) => {
                const on = sel.some((x) => x.id === e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggle(e)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all active:scale-[0.98] ${
                      on ? "border-gold bg-gold/10" : "border-border bg-card hover:border-gold/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`grid h-5 w-5 place-items-center rounded-md border ${on ? "border-gold bg-gold text-accent-foreground" : "border-input"}`}>
                        {on && <Check className="h-3.5 w-3.5" />}
                      </span>
                      {e.name}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">+ {brl(e.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-border bg-card">
              <button aria-label="Diminuir" className="p-3 hover:text-gold" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button aria-label="Aumentar" className="p-3 hover:text-gold" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              className="flex-1 rounded-full bg-fire px-5 py-3.5 font-bold uppercase text-primary-foreground shadow-fire transition-transform hover:scale-[1.02] active:scale-95"
              onClick={() => {
                add(product, qty, sel);
                toast.success(`${qty}x ${product.name} adicionado ao carrinho`);
                onClose();
              }}
            >
              Adicionar · {brl(total)}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
