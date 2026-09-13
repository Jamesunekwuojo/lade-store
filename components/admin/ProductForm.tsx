"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, Upload, ArrowLeft } from "lucide-react";
import { type ActionState } from "@/app/admin/(protected)/products/actions";
import { slugify } from "@/lib/slugify";

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    slug?: string | null;
    description: string;
    priceCents: number;
    currency?: string;
    category: string;
    isNew: boolean;
    isActive: boolean;
    images: string[];
  };
  existingCategories?: string[];
  onSubmitAction: (formData: FormData) => Promise<ActionState>;
  title: string;
}

export function ProductForm({
  initialData,
  existingCategories = ["Abayas", "Occasion Wear", "Everyday Modest"],
  onSubmitAction,
  title,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(
    Boolean(initialData?.slug)
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState<string>(
    initialData?.priceCents ? String(initialData.priceCents) : ""
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [customCategory, setCustomCategory] = useState("");
  const [isNew, setIsNew] = useState(initialData?.isNew ?? false);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  // Existing image URLs (already uploaded to blob / stored)
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images || []
  );

  // Newly selected local files for upload
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Auto-generate slug when name changes (if not manually edited)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setSlug(slugify(e.target.value));
  };

  // Handle local file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...filesArray]);

    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeExistingImage = (indexToRemove: number) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const removeSelectedFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFilePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    const effectiveCategory =
      category === "__NEW__" ? customCategory.trim() : category;

    if (!effectiveCategory) {
      setFieldErrors((prev) => ({
        ...prev,
        category: ["Please select or enter a category."],
      }));
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug || slugify(name));
    formData.append("description", description);
    formData.append("price", price);
    formData.append("currency", "NGN");
    formData.append("category", effectiveCategory);
    formData.append("isNew", String(isNew));
    formData.append("isActive", String(isActive));

    // Append existing images
    existingImages.forEach((img) => formData.append("existingImages", img));

    // Append newly chosen files
    selectedFiles.forEach((file) => formData.append("newImages", file));

    try {
      const result = await onSubmitAction(formData);
      if (result?.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setFormError(result?.message || "Failed to save product.");
        if (result?.errors) {
          setFieldErrors(result.errors);
        }
        setIsSubmitting(false);
      }
    } catch {
      setFormError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Top Back Nav */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--muted-foreground)] hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 sm:p-10">
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground font-normal mb-8 pb-4 border-b border-[var(--border)]">
          {title}
        </h1>

        {formError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium"
          >
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* 1. Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              Product Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. The Ayọ̀wọlé Embroidered Abaya"
              className="w-full px-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            />
            {fieldErrors.name && (
              <p className="text-xs text-red-500">{fieldErrors.name[0]}</p>
            )}
          </div>

          {/* 2. Slug */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="slug"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              URL Slug *
            </label>
            <div className="flex items-center rounded-[4px] bg-[var(--background)] border border-[var(--border)] px-3 py-2 text-sm text-foreground">
              <span className="text-[var(--muted-foreground)] select-none mr-1">/products/</span>
              <input
                id="slug"
                type="text"
                required
                value={slug}
                onChange={handleSlugChange}
                placeholder="the-ayowole-embroidered-abaya"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            {fieldErrors.slug && (
              <p className="text-xs text-red-500">{fieldErrors.slug[0]}</p>
            )}
          </div>

          {/* 3. Category */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <option value="">Select a category...</option>
              {existingCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="__NEW__">+ Add New Category</option>
            </select>

            {category === "__NEW__" && (
              <input
                type="text"
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter new category name..."
                className="mt-2 w-full px-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              />
            )}
            {fieldErrors.category && (
              <p className="text-xs text-red-500">{fieldErrors.category[0]}</p>
            )}
          </div>

          {/* 4. Price */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="price"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              Price (₦ NGN) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm text-[var(--muted-foreground)] font-serif">
                ₦
              </span>
              <input
                id="price"
                type="number"
                min="0"
                step="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="68000"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              />
            </div>
            {fieldErrors.price && (
              <p className="text-xs text-red-500">{fieldErrors.price[0]}</p>
            )}
          </div>

          {/* 5. Description */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the silhouette, fabric quality, craftsmanship, and occasion fit..."
              className="w-full px-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            />
            {fieldErrors.description && (
              <p className="text-xs text-red-500">{fieldErrors.description[0]}</p>
            )}
          </div>

          {/* 6. Product Images */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Product Images (Vercel Blob Storage)
            </label>

            {/* Thumbnail previews */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
              {/* Existing Images */}
              {existingImages.map((url, idx) => (
                <div
                  key={`existing-${idx}`}
                  className="aspect-[3/4] relative rounded-[3px] overflow-hidden border border-[var(--border)] bg-[var(--muted)] group"
                >
                  <Image
                    src={url}
                    alt={`Product image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(idx)}
                    aria-label="Remove image"
                    className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-[9px] uppercase tracking-wider text-white rounded-[2px]">
                    Saved
                  </span>
                </div>
              ))}

              {/* Newly Chosen Previews */}
              {filePreviews.map((previewUrl, idx) => (
                <div
                  key={`new-${idx}`}
                  className="aspect-[3/4] relative rounded-[3px] overflow-hidden border-2 border-dashed border-[var(--accent)] bg-[var(--muted)]"
                >
                  <Image
                    src={previewUrl}
                    alt="New file preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(idx)}
                    aria-label="Remove new file"
                    className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[var(--accent)] text-[9px] uppercase tracking-wider text-white rounded-[2px]">
                    New
                  </span>
                </div>
              ))}
            </div>

            {/* Upload Selector */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)] rounded-lg cursor-pointer bg-[var(--background)] transition-colors">
              <Upload className="w-6 h-6 text-[var(--muted-foreground)] mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider text-foreground">
                Click to upload images
              </span>
              <span className="text-[11px] text-[var(--muted-foreground)] mt-1">
                Supports JPG, PNG, WEBP (Multiple files allowed)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* 7. Checkboxes: isNew and isActive */}
          <div className="flex flex-wrap gap-8 pt-2">
            <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="w-4 h-4 rounded text-[var(--accent)] focus:ring-[var(--accent)] cursor-pointer"
              />
              <span className="font-medium">Mark as &ldquo;New Arrival&rdquo;</span>
            </label>

            <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-[var(--accent)] focus:ring-[var(--accent)] cursor-pointer"
              />
              <span className="font-medium">Active (Visible on public site)</span>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-[var(--border)]">
            <Link
              href="/admin"
              className="py-2.5 px-5 text-xs font-medium tracking-wider uppercase text-[var(--muted-foreground)] hover:text-foreground transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 rounded-[3px] bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 active:opacity-95 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving Product..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
