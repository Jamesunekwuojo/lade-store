import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/admin/(protected)/products/actions";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

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
      title={`Edit: ${product.name}`}
      initialData={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        priceCents: product.priceCents,
        currency: product.currency,
        category: product.category,
        isNew: product.isNew,
        isActive: product.isActive,
        images: product.images,
      }}
      existingCategories={categories}
      onSubmitAction={async (formData) => {
        "use server";
        return updateProduct(id, {}, formData);
      }}
    />
  );
}
