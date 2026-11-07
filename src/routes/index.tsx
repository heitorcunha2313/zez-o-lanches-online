import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Plus, Flame, Star, Menu as MenuIcon, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import heroBurger from "@/assets/hero_burger.png";
import comboImg from "@/assets/combo_meal.jpg";
import logo from "@/assets/zezao_logo.jpeg.asset.json";
import { categories, products, CONTACT, type Product } from "@/data/menu";
import { brl, whatsappLink } from "@/lib/order";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductDialog } from "@/components/site/ProductDialog";
import { CartSheet } from "@/components/site/CartSheet";
import { WhatsAppIcon, InstagramIcon } from "@/components/site/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zezão Lanches — Peça seu lanche online" },
      { name: "description", content: "Hambúrgueres, combos, porções, bebidas e sobremesas. Monte seu pedido e envie pelo WhatsApp do Zezão Lanches." },
      { property: "og:title", content: "Zezão Lanches — Peça seu lanche online" },
      { property: "og:description", content: "Monte seu pedido e envie direto pelo WhatsApp do Zezão Lanches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CartProvider>
      <Page />
    </CartProvider>
  ),
});

const nav = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#destaques", label: "Destaques" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Page() {
  const [selected, setSelected] = useState<Product | null>(null);
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <Highlights onPick={setSelected} />
      <MenuSection onPick={setSelected} />
      <ComboPromo />
      <About />
      <Contact />
      <Footer />
      <FloatingButtons />
      <ProductDialog product={selected} onClose={() => setSelected(null)} />
      <CartSheet />
      <Toaster position="top-center" richColors />
    </div>
  );
}

function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-lg" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#inicio" className="flex min-w-0 items-center gap-2">
          <img src={logo.url} alt="Zezão Lanches" className="h-11 w-11 shrink-0 rounded-full" width={44} height={44} />
          <span className="truncate font-display text-xl uppercase">Zezão Lanches</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => setOpen(true)} aria-label="Abrir carrinho" className="relative grid h-11 w-11 place-items-center rounded-full bg-fire text-primary-foreground shadow-fire transition active:scale-90">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span key={count} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-xs font-bold text-accent-foreground animate-in zoom-in">
                {count}
              </span>
            )}
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-border md:hidden" aria-label="Menu" onClick={() => setMobile((m) => !m)}>
            {mobile ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="border-t border-border bg-background/95 px-4 pb-4 backdrop-blur-lg md:hidden animate-in slide-in-from-top-2">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMobile(false)} className="block border-b border-border py-3 font-semibold uppercase tracking-wider">
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const { setOpen } = useCart();
  return (
    <section id="inicio" className="relative overflow-hidden bg-hero pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full border-2 border-dashed border-gold/15 animate-spin-slow" />
      <span className="pointer-events-none absolute left-[8%] top-32 h-3 w-3 rounded-full bg-gold animate-drift" />
      <span className="pointer-events-none absolute right-[12%] bottom-24 h-4 w-4 rounded-full bg-primary animate-drift [animation-delay:1.5s]" />
      <Star className="pointer-events-none absolute left-[45%] top-28 h-6 w-6 fill-gold text-gold animate-drift [animation-delay:.8s]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 md:grid-cols-2">
        <div className="order-2 text-center md:order-1 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold animate-rise">
            <Flame className="h-4 w-4" /> Artesanal · Feito com paixão
          </span>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl animate-rise [animation-delay:.1s]">
            Seu próximo <span className="text-primary">lanche</span> <span className="text-stroke">favorito</span> está aqui!
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground md:mx-0 animate-rise [animation-delay:.2s]">
            Conheça nosso cardápio, monte seu pedido do seu jeito e envie direto pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start animate-rise [animation-delay:.3s]">
            <button onClick={() => (document.getElementById("cardapio")?.scrollIntoView(), setTimeout(() => setOpen(false)))} className="hidden" />
            <a href="#cardapio" className="rounded-full bg-fire px-8 py-4 font-display text-xl uppercase text-primary-foreground shadow-fire transition hover:scale-105 active:scale-95">
              Fazer pedido
            </a>
            <a href="#cardapio" className="rounded-full border-2 border-gold px-8 py-4 font-display text-xl uppercase text-gold transition hover:bg-gold hover:text-accent-foreground active:scale-95">
              Ver cardápio
            </a>
          </div>
        </div>
        <div className="relative order-1 mx-auto w-full max-w-md md:order-2 md:max-w-none animate-rise">
          <div className="absolute inset-[12%] rounded-full bg-primary/40 blur-3xl" />
          <img src={heroBurger} alt="Hambúrguer artesanal" width={1024} height={1024} className="relative w-full drop-shadow-2xl animate-float" />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Hambúrgueres", "Combos", "Porções", "Bebidas", "Sobremesas", "Delivery", "Retirada"];
  return (
    <div className="overflow-hidden border-y border-border bg-fire py-3">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-xl uppercase text-primary-foreground">
            {w} <Star className="h-4 w-4 fill-gold text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="reveal mb-8 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">{kicker}</p>
      <h2 className="mt-2 font-display text-4xl uppercase sm:text-5xl">{title}</h2>
    </div>
  );
}

function ProductCard({ p, onPick }: { p: Product; onPick: (p: Product) => void }) {
  return (
    <button onClick={() => onPick(p)} className="reveal group flex w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition duration-300 hover:-translate-y-1 hover:border-gold/50 sm:flex-col">
      <div className="relative w-28 shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-full">
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h3 className="font-display text-xl uppercase">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-gold">{brl(p.price)}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-fire text-primary-foreground transition group-hover:rotate-90 group-active:scale-90">
            <Plus className="h-5 w-5" />
          </span>
        </div>
      </div>
    </button>
  );
}

function Highlights({ onPick }: { onPick: (p: Product) => void }) {
  return (
    <section id="destaques" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <SectionTitle kicker="Destaques" title="Os mais pedidos" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.filter((p) => p.featured).map((p) => (
          <ProductCard key={p.id} p={p} onPick={onPick} />
        ))}
      </div>
    </section>
  );
}

function MenuSection({ onPick }: { onPick: (p: Product) => void }) {
  const [cat, setCat] = useState(categories[0].id);
  return (
    <section id="cardapio" className="scroll-mt-20 bg-card/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="Cardápio" title="Escolha o seu" />
        <div className="sticky top-[68px] z-30 -mx-4 mb-8 flex gap-2 overflow-x-auto bg-background/80 px-4 py-3 backdrop-blur-lg [scrollbar-width:none] sm:justify-center">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition active:scale-95 ${
                cat === c.id ? "bg-fire text-primary-foreground shadow-fire" : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div key={cat} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {products.filter((p) => p.category === cat).map((p) => (
            <ProductCard key={p.id} p={p} onPick={(x) => onPick(x)} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">Cardápio, imagens e preços meramente ilustrativos.</p>
      </div>
    </section>
  );
}

function ComboPromo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="reveal relative grid overflow-hidden rounded-3xl bg-fire md:grid-cols-2">
        <div className="relative z-10 p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Combos</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none text-primary-foreground sm:text-5xl">
            Lanche + batata + bebida
          </h2>
          <p className="mt-4 max-w-sm text-primary-foreground/85">Combos completos a partir de</p>
          <p className="font-display text-6xl text-gold">{brl(34.9)}</p>
          <a href="#cardapio" className="mt-6 inline-block rounded-full bg-background px-8 py-4 font-display text-xl uppercase text-foreground transition hover:scale-105 active:scale-95">
            Ver combos
          </a>
        </div>
        <img src={comboImg} alt="Combo com lanche, batata e bebida" loading="lazy" width={816} height={816} className="h-64 w-full object-cover md:h-full" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-4 py-16 md:grid-cols-2">
      <div className="reveal mx-auto">
        <img src={logo.url} alt="Logo Zezão Lanches" loading="lazy" className="w-64 rounded-full shadow-fire sm:w-80" width={320} height={320} />
      </div>
      <div className="reveal text-center md:text-left">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Sobre nós</p>
        <h2 className="mt-2 font-display text-4xl uppercase sm:text-5xl">Feito com paixão</h2>
        <p className="mt-4 text-muted-foreground">
          No Zezão Lanches, cada lanche é preparado com cuidado e ingredientes selecionados, do jeito que você gosta.
          Nosso objetivo é simples: entregar sabor de verdade e um atendimento que faz você querer voltar.
        </p>
        <p className="mt-3 text-muted-foreground">Peça pelo site, escolha seus adicionais e receba ou retire seu pedido.</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="scroll-mt-20 bg-card/40 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle kicker="Contato" title="Fale com a gente" />
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={whatsappLink(CONTACT.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="reveal group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-whatsapp">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground"><WhatsAppIcon className="h-7 w-7" /></span>
            <span className="min-w-0"><span className="block text-sm text-muted-foreground">WhatsApp</span><span className="block text-xl font-bold">{CONTACT.whatsappDisplay}</span></span>
          </a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="reveal group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fire text-primary-foreground"><InstagramIcon className="h-7 w-7" /></span>
            <span className="min-w-0"><span className="block text-sm text-muted-foreground">Instagram</span><span className="block truncate text-xl font-bold">{CONTACT.instagramHandle}</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pb-28 pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="Zezão Lanches" loading="lazy" className="h-14 w-14 rounded-full" width={56} height={56} />
          <span className="font-display text-2xl uppercase">Zezão Lanches</span>
        </div>
        <nav className="grid grid-cols-2 gap-2">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-gold">{n.label}</a>
          ))}
        </nav>
        <div className="flex gap-3 sm:justify-end">
          <a href={whatsappLink(CONTACT.whatsappNumber)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:border-whatsapp hover:text-whatsapp"><WhatsAppIcon className="h-5 w-5" /></a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary"><InstagramIcon className="h-5 w-5" /></a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Zezão Lanches · Site demonstrativo — cardápio e preços ilustrativos.
      </p>
    </footer>
  );
}

function FloatingButtons() {
  const { count, setOpen, items } = useCart();
  const total = items.reduce((s, i) => s + (i.basePrice + i.extras.reduce((a, e) => a + e.price, 0)) * i.qty, 0);
  return (
    <>
      <a href={whatsappLink(CONTACT.whatsappNumber)} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className={`fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition hover:scale-110 active:scale-95 ${count > 0 ? "bottom-24" : "bottom-5"}`}>
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
      {count > 0 && (
        <button onClick={() => setOpen(true)} className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-md items-center justify-between rounded-full bg-fire px-6 py-4 text-primary-foreground shadow-fire animate-in slide-in-from-bottom-6 active:scale-95">
          <span className="flex items-center gap-2 font-bold"><ShoppingBag className="h-5 w-5" /> {count} {count === 1 ? "item" : "itens"}</span>
          <span className="font-display text-lg uppercase">Ver carrinho · {brl(total)}</span>
        </button>
      )}
    </>
  );
}
