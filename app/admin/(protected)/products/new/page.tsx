import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/app/admin/(protected)/products/actions";

export default async function NewProductPage() {
  const existingProducts = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  const categories = Array.from(
    new Set([
      "Abayas",
      "Occasion Wear",
      "Everyday Modest",
      ...existingProducts.map((p) => p.category).filter(Boolean),
    ])
  );

  return (
    <ProductForm
      title="Create New Product"
      existingCategories={categories}
      onSubmitAction={async (formData) => {
        "use server";
        return createProduct({}, formData);
      }}
    />
  );
}
