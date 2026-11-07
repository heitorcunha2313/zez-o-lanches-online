import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { brl, buildOrderMessage, cartTotal, itemTotal, whatsappLink, type Checkout } from "@/lib/order";
import { CONTACT } from "@/data/menu";
import { WhatsAppIcon } from "./icons";

const field = "w-full rounded-xl border border-input bg-card px-4 py-3 outline-none transition focus:border-gold";

export function CartSheet() {
  const { items, open, setOpen, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [c, setC] = useState<Checkout>({ name: "", delivery: "retirada", address: "", payment: "Pix", notes: "" });
  const [err, setErr] = useState("");
  const total = cartTotal(items);

  const close = () => {
    setOpen(false);
    setTimeout(() => setStep("cart"), 300);
  };

  const submit = () => {
    if (!c.name.trim()) return setErr("Informe seu nome.");
    if (c.delivery === "delivery" && !c.address.trim()) return setErr("Informe o endereço de entrega.");
    setErr("");
    window.open(whatsappLink(CONTACT.whatsappNumber, buildOrderMessage(items, c)), "_blank", "noopener");
    clear();
    close();
  };

  const opt = (active: boolean) =>
    `rounded-xl border px-3 py-3 text-sm font-semibold transition active:scale-95 ${active ? "border-gold bg-gold/10 text-gold" : "border-border bg-card hover:border-gold/50"}`;

  return (
    <Sheet open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      <SheetContent className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md">
        <div className="border-b border-border p-5">
          <SheetTitle className="font-display text-2xl uppercase">
            {step === "cart" ? "Seu pedido" : "Finalizar pedido"}
          </SheetTitle>
          <SheetDescription>{step === "cart" ? "Revise os itens do carrinho" : "Preencha os dados para enviar pelo WhatsApp"}</SheetDescription>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="h-14 w-14 text-muted-foreground" />
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
            <button onClick={close} className="rounded-full bg-fire px-6 py-3 font-bold uppercase text-primary-foreground">
              Ver cardápio
            </button>
          </div>
        ) : step === "cart" ? (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {items.map((i) => (
                <div key={i.key} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold">{i.name}</p>
                      {i.extras.length > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">+ {i.extras.map((e) => e.name).join(", ")}</p>
                      )}
                    </div>
                    <button aria-label="Remover" onClick={() => remove(i.key)} className="shrink-0 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-border">
                      <button aria-label="Diminuir" className="p-2" onClick={() => setQty(i.key, i.qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-7 text-center text-sm font-bold">{i.qty}</span>
                      <button aria-label="Aumentar" className="p-2" onClick={() => setQty(i.key, i.qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="font-bold text-gold">{brl(itemTotal(i))}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-border p-5">
              <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{brl(total)}</span></div>
              <div className="flex justify-between text-xl font-bold"><span>Total</span><span className="text-gold">{brl(total)}</span></div>
              <button onClick={() => setStep("checkout")} className="w-full rounded-full bg-fire py-4 font-display text-xl uppercase text-primary-foreground shadow-fire transition hover:scale-[1.02] active:scale-95">
                Finalizar pedido
              </button>
              <button onClick={close} className="w-full rounded-full border border-border py-3 text-sm font-semibold hover:border-gold">
                Continuar comprando
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <button onClick={() => setStep("cart")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-gold">
                <ArrowLeft className="h-4 w-4" /> Voltar ao carrinho
              </button>
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold">Nome</span>
                <input className={field} value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} placeholder="Seu nome" />
              </label>
              <div className="space-y-1.5">
                <span className="text-sm font-semibold">Tipo de entrega</span>
                <div className="grid grid-cols-2 gap-2">
                  <button className={opt(c.delivery === "retirada")} onClick={() => setC({ ...c, delivery: "retirada" })}>Retirada</button>
                  <button className={opt(c.delivery === "delivery")} onClick={() => setC({ ...c, delivery: "delivery" })}>Delivery</button>
                </div>
              </div>
              {c.delivery === "delivery" && (
                <label className="block space-y-1.5 animate-rise">
                  <span className="text-sm font-semibold">Endereço</span>
                  <textarea className={field} rows={2} value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} placeholder="Rua, número, bairro, referência" />
                </label>
              )}
              <div className="space-y-1.5">
                <span className="text-sm font-semibold">Forma de pagamento</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Pix", "Dinheiro", "Cartão"] as const).map((p) => (
                    <button key={p} className={opt(c.payment === p)} onClick={() => setC({ ...c, payment: p })}>{p}</button>
                  ))}
                </div>
              </div>
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold">Observações</span>
                <textarea className={field} rows={3} value={c.notes} onChange={(e) => setC({ ...c, notes: e.target.value })} placeholder="Ex.: sem cebola, troco para R$ 50..." />
              </label>
              <div className="rounded-2xl border border-border bg-card p-4 text-sm">
                <p className="mb-2 font-bold uppercase tracking-wider text-muted-foreground">Resumo</p>
                {items.map((i) => (
                  <div key={i.key} className="flex justify-between py-0.5">
                    <span>{i.qty}x {i.name}{i.extras.length > 0 && ` (+${i.extras.length})`}</span>
                    <span>{brl(itemTotal(i))}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold"><span>Total</span><span className="text-gold">{brl(total)}</span></div>
              </div>
            </div>
            <div className="space-y-2 border-t border-border p-5">
              {err && <p className="text-sm font-semibold text-destructive">{err}</p>}
              <button onClick={submit} className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-4 font-display text-xl uppercase text-whatsapp-foreground transition hover:scale-[1.02] active:scale-95">
                <WhatsAppIcon className="h-6 w-6" /> Enviar pedido
              </button>
              <p className="text-center text-xs text-muted-foreground">Você será direcionado ao WhatsApp do Zezão Lanches.</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
