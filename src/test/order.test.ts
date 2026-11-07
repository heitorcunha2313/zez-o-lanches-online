import { describe, it, expect } from "vitest";
import { buildOrderMessage, cartTotal, whatsappLink } from "@/lib/order";

const items = [
  { key: "a", productId: "lanche-01", name: "Lanche 01", basePrice: 24.9, qty: 2, extras: [{ id: "bacon", name: "Bacon extra", price: 5 }] },
];

describe("pedido", () => {
  it("soma adicionais por unidade", () => {
    expect(cartTotal(items)).toBeCloseTo(59.8);
  });
  it("mensagem inclui endereço no delivery", () => {
    const m = buildOrderMessage(items, { name: "Ana", delivery: "delivery", address: "Rua X", payment: "Pix", notes: "" });
    expect(m).toContain("Rua X");
    expect(m).toContain("Bacon extra");
  });
  it("link usa o WhatsApp oficial", () => {
    expect(whatsappLink("5563992010189", "oi")).toBe("https://wa.me/5563992010189?text=oi");
  });
});
