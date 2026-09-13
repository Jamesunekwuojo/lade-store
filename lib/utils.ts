import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceCents: number, currency: string = "NGN"): string {
  if (currency.toUpperCase() === "NGN") {
    const formatted = new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(priceCents);
    return `₦${formatted}`;
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(priceCents);
  } catch {
    return `${currency} ${priceCents.toLocaleString()}`;
  }
}
