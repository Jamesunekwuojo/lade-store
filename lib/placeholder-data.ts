export interface Product {
  id: string;
  name: string;
  category: "Abayas" | "Occasion Wear" | "Everyday Modest";
  priceLabel: string;
  imagePlaceholder: string;
  isNew: boolean;
  fabricNote?: string;
}

export const CATEGORIES = [
  "All",
  "Abayas",
  "Occasion Wear",
  "Everyday Modest",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "The Ayọ̀wọlé Embroidered Abaya",
    category: "Abayas",
    priceLabel: "₦68,000",
    imagePlaceholder: "The Ayọ̀wọlé Abaya",
    isNew: true,
    fabricNote: "Raw Silk & Gold Thread Detailing",
  },
  {
    id: "prod-2",
    name: "Adùnní Pleated Wrap Dress",
    category: "Occasion Wear",
    priceLabel: "₦54,000",
    imagePlaceholder: "Adùnní Wrap Dress",
    isNew: true,
    fabricNote: "Heavyweight Textured Crepe",
  },
  {
    id: "prod-3",
    name: "Ìyáàfin Royal Brocade Kaftan",
    category: "Occasion Wear",
    priceLabel: "₦82,000",
    imagePlaceholder: "Ìyáàfin Kaftan",
    isNew: false,
    fabricNote: "Jacquard Gold Brocade",
  },
  {
    id: "prod-4",
    name: "Ọmọ́wùmí Tailored Linen Kimono",
    category: "Everyday Modest",
    priceLabel: "₦42,000",
    imagePlaceholder: "Ọmọ́wùmí Kimono",
    isNew: false,
    fabricNote: "Breathable Organic Linen",
  },
  {
    id: "prod-5",
    name: "Mopélọ́lá Tiered Maxi Abaya",
    category: "Abayas",
    priceLabel: "₦62,000",
    imagePlaceholder: "Mopélọ́lá Tiered Abaya",
    isNew: false,
    fabricNote: "Fine Chiffon & Satin Lining",
  },
  {
    id: "prod-6",
    name: "Adéróunmú Ceremonial Boubou",
    category: "Everyday Modest",
    priceLabel: "₦48,000",
    imagePlaceholder: "Adéróunmú Boubou",
    isNew: true,
    fabricNote: "Structured Cotton Twill",
  },
];
