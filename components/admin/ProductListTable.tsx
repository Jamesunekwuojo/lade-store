"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowDown, Edit2, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { deleteProduct, reorderProduct } from "@/app/admin/(protected)/products/actions";
import { formatPrice } from "@/lib/utils";

export interface AdminProductRow {
  id: string;
  name: string;
  slug: string | null;
  category: string;
  priceCents: number;
  currency: string;
  isNew: boolean;
  isActive: boolean;
  sortOrder: number;
  images: string[];
}

interface ProductListTableProps {
  products: AdminProductRow[];
}

export function ProductListTable({ products = [] }: ProductListTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    setReorderingId(id);
    try {
      await reorderProduct(id, direction);
    } catch (err) {
      console.error("Reorder failed:", err);
    } finally {
      setReorderingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground font-normal">
            Products Catalog
          </h1>
          <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mt-1">
            {products.length} {products.length === 1 ? "Product" : "Products"} Total
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 active:opacity-95 text-xs font-medium tracking-[0.16em] uppercase transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Table List View */}
      {products.length === 0 ? (
        <div className="p-12 text-center bg-[var(--card)] border border-[var(--border)] rounded-xl flex flex-col items-center gap-3">
          <p className="font-serif text-xl text-foreground">No products found.</p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Click &ldquo;+ Add Product&rdquo; above to create your first product entry.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background)]/50 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                <th className="py-3.5 px-4 w-12 text-center">Order</th>
                <th className="py-3.5 px-4 w-16">Image</th>
                <th className="py-3.5 px-4">Name &amp; Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-foreground">
              {products.map((product, index) => {
                const hasImage = product.images && product.images.length > 0;
                const isFirst = index === 0;
                const isLast = index === products.length - 1;
                const isDeleting = deletingId === product.id;
                const isReordering = reorderingId === product.id;

                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-[var(--muted)]/25 transition-colors ${
                      !product.isActive ? "opacity-60 bg-[var(--background)]/30" : ""
                    }`}
                  >
                    {/* 1. Sort Order Controls */}
                    <td className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <button
                          type="button"
                          disabled={isFirst || isReordering}
                          onClick={() => handleReorder(product.id, "up")}
                          aria-label={`Move ${product.name} up`}
                          className="p-1 text-[var(--muted-foreground)] hover:text-foreground disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={isLast || isReordering}
                          onClick={() => handleReorder(product.id, "down")}
                          aria-label={`Move ${product.name} down`}
                          className="p-1 text-[var(--muted-foreground)] hover:text-foreground disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* 2. Thumbnail / Placeholder */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-16 rounded-[2px] bg-[var(--muted)] border border-[var(--border)] relative overflow-hidden flex items-center justify-center">
                        {hasImage ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-[var(--muted-foreground)]/60" />
                        )}
                      </div>
                    </td>

                    {/* 3. Name & Slug */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-sm text-foreground">
                          {product.name}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                          {product.slug ? `/products/${product.slug}` : `ID: ${product.id}`}
                        </span>
                      </div>
                    </td>

                    {/* 4. Category */}
                    <td className="py-3 px-4">
                      <span className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                        {product.category}
                      </span>
                    </td>

                    {/* 5. Price */}
                    <td className="py-3 px-4 font-serif text-sm">
                      {formatPrice(product.priceCents, product.currency || "NGN")}
                    </td>

                    {/* 6. Badges */}
                    <td className="py-3 px-4">
                      {product.isNew ? (
                        <span className="inline-block px-2 py-0.5 rounded-[2px] border border-[var(--accent)] text-[var(--accent)] text-[10px] font-medium tracking-wider uppercase">
                          New
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--muted-foreground)]/50">&mdash;</span>
                      )}
                    </td>

                    {/* 7. Active Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-medium uppercase tracking-wider ${
                          product.isActive
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"
                        }`}
                      >
                        {product.isActive ? "Active" : "Draft"}
                      </span>
                    </td>

                    {/* 8. Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          className="p-1.5 rounded hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-foreground transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(product.id, product.name)}
                          aria-label={`Delete ${product.name}`}
                          className="p-1.5 rounded hover:bg-red-500/10 text-[var(--muted-foreground)] hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
