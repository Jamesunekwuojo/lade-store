import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Hero } from "@/components/sections/Hero";
import { Collections, type UIProduct } from "@/components/sections/Collections";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<UIProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      priceLabel: formatPrice(p.priceCents, p.currency || "NGN"),
      imagePlaceholder: p.name,
      images: p.images || [],
      isNew: p.isNew ?? false,
      description: p.description,
    }));
  } catch (error) {
    console.error("Failed to load products from database:", error);
    return [];
  }
}

export default async function MarketingPage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <Collections products={products} />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
