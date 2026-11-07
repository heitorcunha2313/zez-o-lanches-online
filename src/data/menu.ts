// Cardápio DEMONSTRATIVO — edite nomes, descrições, preços e imagens aqui.
import burger from "@/assets/burger.jpg";
import combo from "@/assets/combo_meal.jpg";
import fries from "@/assets/fries.jpg";
import drinks from "@/assets/drinks.jpg";
import dessert from "@/assets/dessert.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
};

export type Extra = { id: string; name: string; price: number };

export const CONTACT = {
  whatsappDisplay: "(63) 99201-0189",
  whatsappNumber: "5563992010189",
  instagramHandle: "@zezao.lanches20",
  instagramUrl: "https://www.instagram.com/zezao.lanches20/",
};

export const categories = [
  { id: "hamburgueres", name: "Hambúrgueres" },
  { id: "combos", name: "Combos" },
  { id: "porcoes", name: "Porções" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
];

export const products: Product[] = [
  { id: "lanche-01", category: "hamburgueres", name: "Lanche 01", price: 24.9, image: burger, description: "Pão brioche, blend bovino, queijo e molho da casa." },
  { id: "lanche-02", category: "hamburgueres", name: "Lanche 02", price: 29.9, image: burger, featured: true, description: "Blend bovino, cheddar cremoso, alface, tomate e cebola roxa." },
  { id: "lanche-03", category: "hamburgueres", name: "Lanche 03", price: 34.9, image: burger, featured: true, description: "Blend duplo, bacon crocante, cheddar e cebola caramelizada." },
  { id: "lanche-04", category: "hamburgueres", name: "Lanche 04", price: 39.9, image: burger, description: "Blend triplo, queijo, bacon, ovo e molho especial." },
  { id: "combo-01", category: "combos", name: "Combo 01", price: 34.9, image: combo, description: "Lanche + batata frita + refrigerante lata." },
  { id: "combo-02", category: "combos", name: "Combo 02", price: 42.9, image: combo, featured: true, description: "Lanche especial + batata média + refrigerante lata." },
  { id: "combo-03", category: "combos", name: "Combo 03", price: 49.9, image: combo, description: "Lanche duplo + batata com cheddar + refrigerante lata." },
  { id: "batata-frita", category: "porcoes", name: "Batata Frita", price: 18.9, image: fries, description: "Porção de batatas fritas crocantes e sequinhas." },
  { id: "batata-cheddar", category: "porcoes", name: "Batata com Cheddar", price: 24.9, image: fries, featured: true, description: "Batata frita coberta com cheddar cremoso." },
  { id: "batata-especial", category: "porcoes", name: "Batata Especial", price: 29.9, image: fries, description: "Batata com cheddar e bacon em cubos." },
  { id: "refri-lata", category: "bebidas", name: "Refrigerante Lata", price: 6, image: drinks, description: "Lata 350ml bem gelada." },
  { id: "refri-1l", category: "bebidas", name: "Refrigerante 1L", price: 10, image: drinks, description: "Garrafa de 1 litro para compartilhar." },
  { id: "suco", category: "bebidas", name: "Suco", price: 8, image: drinks, description: "Suco natural do dia." },
  { id: "agua", category: "bebidas", name: "Água", price: 4, image: drinks, description: "Água mineral 500ml." },
  { id: "brownie", category: "sobremesas", name: "Brownie", price: 12, image: dessert, description: "Brownie de chocolate macio por dentro." },
  { id: "milk-shake", category: "sobremesas", name: "Milk-shake", price: 16.9, image: dessert, description: "Milk-shake cremoso com chantilly." },
  { id: "petit-gateau", category: "sobremesas", name: "Petit Gateau", price: 18.9, image: dessert, description: "Bolinho quente de chocolate com sorvete." },
];

export const extras: Extra[] = [
  { id: "bacon", name: "Bacon extra", price: 5 },
  { id: "cheddar", name: "Cheddar extra", price: 4 },
  { id: "hamburguer", name: "Hambúrguer adicional", price: 8 },
  { id: "ovo", name: "Ovo", price: 3 },
  { id: "cebola", name: "Cebola caramelizada", price: 3.5 },
  { id: "molho", name: "Molho especial", price: 2 },
];
