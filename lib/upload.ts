import { put, del } from "@vercel/blob";

/**
 * Uploads an image file to Vercel Blob Storage.
 * If BLOB_READ_WRITE_TOKEN is not configured in development, falls back to a base64 Data URL.
 */
export async function uploadImage(file: File): Promise<string> {
  if (!file) {
    throw new Error("No file provided for upload");
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const blob = await put(`products/${filename}`, file, {
      access: "public",
      token,
    });
    return blob.url;
  }

  // Fallback for local development if Vercel Blob token is not yet configured:
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const mimeType = file.type || "image/jpeg";
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Deletes a file from Vercel Blob Storage if it matches a blob URL.
 */
export async function deleteImage(url: string): Promise<void> {
  if (!url || !url.startsWith("http")) return;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token && url.includes("public.blob.vercel-storage.com")) {
    try {
      await del(url, { token });
    } catch (error) {
      console.error("[Blob Delete Warning]:", error);
    }
  }
}
