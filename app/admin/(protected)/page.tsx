import { prisma } from "@/lib/prisma";
import { ProductListTable, type AdminProductRow } from "@/components/admin/ProductListTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: AdminProductRow[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    products = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      priceCents: p.priceCents,
      currency: p.currency || "NGN",
      isNew: p.isNew,
      isActive: p.isActive,
      sortOrder: p.sortOrder,
      images: p.images || [],
    }));
  } catch (error) {
    console.error("Failed to load products for admin dashboard:", error);
  }

  return (
    <div className="py-6">
      <ProductListTable products={products} />
    </div>
  );
}
