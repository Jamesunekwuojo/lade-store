import "dotenv/config";
import { prisma } from "../lib/prisma";

const SEED_PRODUCTS = [
  {
    name: "The Ayọ̀wọlé Embroidered Abaya",
    category: "Abayas",
    priceCents: 68000,
    currency: "NGN",
    description: "Raw Silk & Gold Thread Detailing with royal drapery. Women's Couture Signature.",
    images: [],
    isNew: true,
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Adùnní Pleated Wrap Dress",
    category: "Occasion Wear",
    priceCents: 54000,
    currency: "NGN",
    description: "Heavyweight Textured Crepe with sculpted modest silhouette for women.",
    images: [],
    isNew: true,
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Ìyáàfin Royal Brocade Kaftan",
    category: "Occasion Wear",
    priceCents: 82000,
    currency: "NGN",
    description: "Jacquard Gold Brocade honoring heritage and matriarchal sovereignty.",
    images: [],
    isNew: false,
    sortOrder: 3,
    isActive: true,
  },
  {
    name: "Ọmọ́wùmí Tailored Linen Kimono",
    category: "Everyday Modest",
    priceCents: 42000,
    currency: "NGN",
    description: "Breathable Organic Linen designed for effortless poise.",
    images: [],
    isNew: false,
    sortOrder: 4,
    isActive: true,
  },
  {
    name: "Mopélọ́lá Tiered Maxi Abaya",
    category: "Abayas",
    priceCents: 62000,
    currency: "NGN",
    description: "Fine Chiffon & Satin Lining tailored for modest grace.",
    images: [],
    isNew: false,
    sortOrder: 5,
    isActive: true,
  },
  {
    name: "Adéróunmú Ceremonial Boubou",
    category: "Everyday Modest",
    priceCents: 48000,
    currency: "NGN",
    description: "Structured Cotton Twill for everyday distinction.",
    images: [],
    isNew: true,
    sortOrder: 6,
    isActive: true,
  },
  {
    name: "Adémólá Sovereign Agbada Set",
    category: "Men's Capsule (Limited)",
    priceCents: 95000,
    currency: "NGN",
    description: "Hand-loomed textured Aso-Oke with minimalist geometric embroidery. Limited Edition Men's Capsule.",
    images: [],
    isNew: true,
    sortOrder: 7,
    isActive: true,
  },
  {
    name: "Imperial Monogram Leather Fílà & Cuff Set",
    category: "Men's Capsule (Limited)",
    priceCents: 28000,
    currency: "NGN",
    description: "Embossed calfskin accessories crafted in limited quantities.",
    images: [],
    isNew: false,
    sortOrder: 8,
    isActive: true,
  },
];

async function main() {
  console.log("Seeding initial products into database...");
  for (const product of SEED_PRODUCTS) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existing) {
      await prisma.product.create({
        data: product,
      });
    }
  }
  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
