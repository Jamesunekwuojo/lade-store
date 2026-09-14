"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface UIProduct {
  id: string;
  name: string;
  category: string;
  priceLabel: string;
  imagePlaceholder: string;
  images?: string[];
  isNew: boolean;
  description?: string;
  fabricNote?: string;
}

interface CollectionsProps {
  products: UIProduct[];
}

export function Collections({ products = [] }: CollectionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Dynamically derive category filter tabs from distinct product categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    );
    return ["All", ...uniqueCategories];
  }, [products]);

  // Filter products client-side
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="w-full bg-[var(--background)] text-foreground py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 border-t border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-14 border-b border-[var(--border)]">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span
                className="h-px w-5 bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-xs md:text-[13px] tracking-[0.24em] sm:tracking-[0.26em] uppercase font-bold text-[var(--accent)]">
                The Collections &bull; LADÉ EMPIRE
              </span>
            </div>

            {/* Display Serif Heading */}
            <h2
              id="collections-heading"
              className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.01em] text-foreground leading-[1.12] text-balance"
            >
              Curated for the Sovereign &amp; Modest
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--muted-foreground)] font-light leading-relaxed max-w-xl">
              Our core atelier focus is magnificent haute couture crafted for <strong className="font-medium text-foreground">women</strong> &mdash; with an exclusive, limited-edition capsule of ceremonial attire &amp; accessories for <strong className="font-medium text-foreground">men</strong>.
            </p>
          </div>

          {/* Dynamic Category Filter Tabs (Horizontal scroll on mobile with touch targets) */}
          {categories.length > 1 && (
            <div
              role="tablist"
              aria-label="Filter products by category"
              className="flex items-center gap-4 sm:gap-7 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative py-1.5 px-1 text-xs sm:text-[13px] tracking-[0.18em] uppercase font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px] cursor-pointer flex-shrink-0 ${
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
          )}
        </div>

        {/* Product Grid or Graceful Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 sm:py-32 text-center flex flex-col items-center justify-center gap-4 px-4">
            <Image
              src="/logo.png"
              alt="LADÉ EMPIRE Emblem"
              width={48}
              height={66}
              className="h-12 w-auto object-contain opacity-80 mb-2"
            />
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-wide">
              New pieces are on their way.
            </h3>
            <p className="text-sm font-sans text-[var(--muted-foreground)] max-w-md font-light leading-relaxed">
              Our artisans are currently preparing the upcoming release. Connect with our styling concierge for bespoke requests or custom fittings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-16 pt-8 sm:pt-14">
            {filteredProducts.map((product) => {
              const hasImage = product.images && product.images.length > 0 && product.images[0];

              return (
                <article key={product.id} className="group flex flex-col">
                  <Link
                    href="#collections"
                    aria-label={`View details for ${product.name}, price ${product.priceLabel}`}
                    className="flex flex-col gap-3.5 sm:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px]"
                  >
                    {/* Image Area (3:4 portrait) */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-[var(--muted)] rounded-[2px] border border-[var(--border)]">
                      {hasImage ? (
                        <Image
                          src={product.images![0]}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-300 ease-out"
                        />
                      ) : (
                        /* Subtle Editorial Placeholder Frame */
                        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between items-center text-center group-hover:scale-[1.025] transition-transform duration-300 ease-out">
                          {/* Top Tag */}
                          <div className="w-full flex items-center justify-between opacity-50 text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-sans text-foreground">
                            <span>LADÉ EMPIRE</span>
                            <span>EDITION</span>
                          </div>

                          {/* Centered Garment Title */}
                          <div className="flex flex-col items-center justify-center gap-3 px-4 my-auto">
                            <Image
                              src="/logo-sm.png"
                              alt="LADÉ EMPIRE Monogram"
                              width={32}
                              height={44}
                              className="h-7 sm:h-8 w-auto object-contain opacity-75"
                            />
                            <span className="font-serif text-base sm:text-lg font-normal tracking-[0.06em] text-foreground/85">
                              {product.imagePlaceholder || product.name}
                            </span>
                            {product.fabricNote && (
                              <span className="text-[11px] tracking-wider text-[var(--muted-foreground)] font-light italic">
                                {product.fabricNote}
                              </span>
                            )}
                          </div>

                          {/* Bottom Tag */}
                          <div className="w-full text-center opacity-40 text-[9px] tracking-[0.24em] uppercase font-sans text-foreground">
                            I OWN THE CROWN &bull; Haute Modesty
                          </div>
                        </div>
                      )}

                      {/* "New" Badge */}
                      {product.isNew && (
                        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 border border-[var(--accent)] text-[var(--accent)] text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-2 sm:px-2.5 py-0.5 rounded-[2px] bg-[var(--background)]/90 backdrop-blur-xs font-semibold">
                          New
                        </span>
                      )}
                    </div>

                    {/* Product Metadata Details */}
                    <div className="flex flex-col gap-1 pt-0.5">
                      <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-[var(--muted-foreground)]">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal text-foreground group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base font-sans font-semibold tracking-wide text-foreground pt-0.5">
                        {product.priceLabel}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Lookbook Footnote */}
        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
          <span>Women&apos;s Modest Haute Couture &bull; Men&apos;s Bespoke Capsule</span>
          <Link
            href="#contact"
            className="text-[var(--accent)] hover:underline underline-offset-4 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px]"
          >
            Inquire About Custom Fittings &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Collections;
