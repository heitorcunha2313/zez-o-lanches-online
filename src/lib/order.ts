import type { Extra } from "@/data/menu";

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  basePrice: number;
  extras: Extra[];
  qty: number;
};

export type Checkout = {
  name: string;
  delivery: "retirada" | "delivery";
  address: string;
  payment: "Pix" | "Dinheiro" | "Cartão";
  notes: string;
};

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/\u00a0/g, " ");

export const unitPrice = (basePrice: number, extras: Extra[]) =>
  basePrice + extras.reduce((s, e) => s + e.price, 0);

export const itemTotal = (i: CartItem) => unitPrice(i.basePrice, i.extras) * i.qty;

export const cartTotal = (items: CartItem[]) => items.reduce((s, i) => s + itemTotal(i), 0);

export function buildOrderMessage(items: CartItem[], c: Checkout) {
  const lines: string[] = ["*NOVO PEDIDO — ZEZÃO LANCHES*", "", `*Cliente:* ${c.name}`, ""];
  lines.push("*Itens:*");
  for (const i of items) {
    lines.push(`• ${i.qty}x ${i.name} — ${brl(itemTotal(i))}`);
    for (const e of i.extras) lines.push(`   + ${e.name} (${brl(e.price)})`);
  }
  lines.push("", `*Entrega:* ${c.delivery === "delivery" ? "Delivery" : "Retirada no local"}`);
  if (c.delivery === "delivery") lines.push(`*Endereço:* ${c.address}`);
  lines.push(`*Pagamento:* ${c.payment}`);
  if (c.notes.trim()) lines.push(`*Observações:* ${c.notes.trim()}`);
  lines.push("", `*TOTAL: ${brl(cartTotal(items))}*`);
  return lines.join("\n");
}

export const whatsappLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
