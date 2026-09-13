"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";

const ProductInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  slug: z.string().min(2, "Slug must be at least 2 characters long"),
  description: z.string().min(5, "Description must be at least 5 characters long"),
  price: z.coerce.number().positive("Price must be a positive number"),
  currency: z.string().default("NGN"),
  category: z.string().min(2, "Category is required"),
  isNew: z.boolean().default(false),
  isActive: z.boolean().default(true),
  existingImages: z.array(z.string()).default([]),
});

export type ActionState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

/**
 * Creates a new Product
 */
export async function createProduct(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug") || slugify(String(formData.get("name") || "")),
    description: formData.get("description"),
    price: formData.get("price"),
    currency: formData.get("currency") || "NGN",
    category: formData.get("category"),
    isNew: formData.get("isNew") === "on" || formData.get("isNew") === "true",
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
    existingImages: formData.getAll("existingImages").map(String),
  };

  const parsed = ProductInputSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const { name, slug, description, price, currency, category, isNew, isActive, existingImages } =
    parsed.data;

  // Process newly uploaded images
  const newFiles = formData.getAll("newImages") as File[];
  const uploadedUrls: string[] = [...existingImages];

  for (const file of newFiles) {
    if (file && file.size > 0 && file.name) {
      try {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }
  }

  try {
    // Determine the highest sortOrder to append to the end
    const lastProduct = await prisma.product.findFirst({
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });
    const nextSortOrder = (lastProduct?.sortOrder ?? 0) + 1;

    // Convert whole price units (e.g. Naira) into priceCents
    const priceCents = Math.round(price);

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        priceCents,
        currency,
        category,
        isNew,
        isActive,
        sortOrder: nextSortOrder,
        images: uploadedUrls,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating product:", error);
    if (error?.code === "P2002") {
      return {
        success: false,
        errors: { slug: ["This slug is already in use by another product."] },
        message: "Slug must be unique.",
      };
    }
    return {
      success: false,
      message: "Failed to create product. Please try again.",
    };
  }
}

/**
 * Updates an existing Product
 */
export async function updateProduct(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug") || slugify(String(formData.get("name") || "")),
    description: formData.get("description"),
    price: formData.get("price"),
    currency: formData.get("currency") || "NGN",
    category: formData.get("category"),
    isNew: formData.get("isNew") === "on" || formData.get("isNew") === "true",
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
    existingImages: formData.getAll("existingImages").map(String),
  };

  const parsed = ProductInputSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const { name, slug, description, price, currency, category, isNew, isActive, existingImages } =
    parsed.data;

  // Process newly uploaded files
  const newFiles = formData.getAll("newImages") as File[];
  const uploadedUrls: string[] = [...existingImages];

  for (const file of newFiles) {
    if (file && file.size > 0 && file.name) {
      try {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }
  }

  try {
    const priceCents = Math.round(price);

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        priceCents,
        currency,
        category,
        isNew,
        isActive,
        images: uploadedUrls,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating product:", error);
    if (error?.code === "P2002") {
      return {
        success: false,
        errors: { slug: ["This slug is already in use by another product."] },
        message: "Slug must be unique.",
      };
    }
    return {
      success: false,
      message: "Failed to update product. Please try again.",
    };
  }
}

/**
 * Deletes a product
 */
export async function deleteProduct(id: string): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized." };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    if (product?.images?.length) {
      for (const imgUrl of product.images) {
        await deleteImage(imgUrl);
      }
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product." };
  }
}

/**
 * Reorders a product by swapping sortOrder with adjacent item
 */
export async function reorderProduct(
  id: string,
  direction: "up" | "down"
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized." };
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { id: true, sortOrder: true },
    });

    const currentIndex = products.findIndex((p) => p.id === id);
    if (currentIndex === -1) return { success: false };

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= products.length) return { success: true };

    const currentItem = products[currentIndex];
    const targetItem = products[targetIndex];

    // Swap sortOrders
    const tempOrder = currentItem.sortOrder;
    const targetOrder = targetItem.sortOrder === tempOrder
      ? (direction === "up" ? tempOrder - 1 : tempOrder + 1)
      : targetItem.sortOrder;

    await prisma.$transaction([
      prisma.product.update({
        where: { id: currentItem.id },
        data: { sortOrder: targetOrder },
      }),
      prisma.product.update({
        where: { id: targetItem.id },
        data: { sortOrder: tempOrder },
      }),
    ]);

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error reordering product:", error);
    return { success: false, message: "Failed to reorder product." };
  }
}
