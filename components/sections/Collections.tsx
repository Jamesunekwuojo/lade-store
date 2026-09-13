"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  PLACEHOLDER_PRODUCTS,
  type CategoryFilter,
} from "@/lib/placeholder-data";

export function Collections() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");

  const filteredProducts =
    selectedCategory === "All"
      ? PLACEHOLDER_PRODUCTS
      : PLACEHOLDER_PRODUCTS.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="w-full bg-[var(--background)] text-foreground py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[var(--border)]">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="h-px w-5 bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-[13px] tracking-[0.26em] uppercase font-medium text-[var(--accent)]">
                The Collection
              </span>
            </div>

            {/* Display Serif Heading */}
            <h2
              id="collections-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.01em] text-foreground leading-[1.1] text-balance"
            >
              Curated for the Modern Woman of Heritage
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[var(--muted-foreground)] font-light leading-relaxed max-w-xl">
              Each silhouette is designed with intentional modesty, royal dignity,
              and refined artistry &mdash; timeless garments crafted for international poise.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative py-1 text-xs sm:text-[13px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px] cursor-pointer ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)] hover:text-foreground"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16 lg:gap-x-12 pt-12 sm:pt-16">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group flex flex-col">
              <Link
                href="#collections"
                aria-label={`View details for ${product.name}, price ${product.priceLabel}`}
                className="flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px]"
              >
                {/* Image Placeholder Area (3:4 portrait) */}
                <div className="aspect-[3/4] relative overflow-hidden bg-[var(--muted)] rounded-[2px] border border-[var(--border)]">
                  {/* Subtle Inner Framing Texture */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center group-hover:scale-[1.025] transition-transform duration-300 ease-out">
                    {/* Top Corner Brand Tag */}
                    <div className="w-full flex items-center justify-between opacity-50 text-[10px] tracking-[0.25em] uppercase font-sans text-foreground">
                      <span>LADÉ&apos;S</span>
                      <span>EDITION</span>
                    </div>

                    {/* Centered Garment Label */}
                    <div className="flex flex-col items-center justify-center gap-3 px-4 my-auto">
                      <svg
                        width="24"
                        height="16"
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[var(--accent)]/60 stroke-current"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 11H17M2 11L3.2 2.5L6.8 6.5L9 1.2L11.2 6.5L14.8 2.5L16 11H2Z"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-serif text-base sm:text-lg font-normal tracking-[0.06em] text-foreground/80">
                        {product.imagePlaceholder}
                      </span>
                      {product.fabricNote && (
                        <span className="text-[11px] tracking-wider text-[var(--muted-foreground)] font-light italic">
                          {product.fabricNote}
                        </span>
                      )}
                    </div>

                    {/* Bottom Corner Tag */}
                    <div className="w-full text-center opacity-40 text-[9px] tracking-[0.25em] uppercase font-sans text-foreground">
                      Haute Modesty &bull; 2026
                    </div>
                  </div>

                  {/* "New" Badge */}
                  {product.isNew && (
                    <span className="absolute top-3 left-3 z-10 border border-[var(--accent)] text-[var(--accent)] text-[10px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-[2px] bg-[var(--background)]/85 backdrop-blur-xs font-medium">
                      New
                    </span>
                  )}
                </div>

                {/* Product Metadata Details */}
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-[var(--muted-foreground)]">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base font-sans font-medium tracking-wide text-foreground pt-0.5">
                    {product.priceLabel}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Lookbook Footnote */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
          <span>Bespoke Tailoring &bull; Custom Modest Couture</span>
          <Link
            href="#contact"
            className="text-[var(--accent)] hover:underline underline-offset-4 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px]"
          >
            Inquire About Custom Fits &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Collections;
