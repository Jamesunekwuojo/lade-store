import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Lade's Store Hero Introduction"
      className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-foreground overflow-hidden"
    >
      {/* Left Column: Editorial Typography & Brand Narrative (~45% on desktop) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-8 pt-28 pb-12 sm:pt-36 sm:pb-16 lg:py-28 z-10">
        <div className="max-w-xl flex flex-col gap-6 sm:gap-8">
          
          {/* 1. Subtle Heritage Crown Motif & Eyebrow Label */}
          <div className="animate-hero-1 flex items-center gap-3.5">
            {/* Minimal line-crown heritage icon */}
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--accent)] stroke-current flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M1 11H17M2 11L3.2 2.5L6.8 6.5L9 1.2L11.2 6.5L14.8 2.5L16 11H2Z"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="h-px w-6 bg-[var(--accent)]/50" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] tracking-[0.28em] uppercase font-medium text-[var(--accent)]">
              Fashion in IR
            </span>
          </div>

          {/* 2. Display Serif Headline */}
          <h1 className="animate-hero-2 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.85rem] xl:text-[5.5rem] font-normal tracking-[-0.02em] leading-[1.02] text-foreground text-balance">
            Heritage.<br />
            Elegance.<br />
            <span className="italic font-normal text-[var(--accent)]">Modesty.</span>
          </h1>

          {/* 3. Supporting Paragraph */}
          <p className="animate-hero-3 font-sans text-base sm:text-lg text-[var(--muted-foreground)] max-w-md leading-relaxed font-light tracking-wide">
            Promoting Godly heritage, royal grace, and modest sophistication in an evolving world &mdash; where timeless dignity meets international distinction.
          </p>

          {/* 4. Single Understated CTA */}
          <div className="animate-hero-4 pt-2 sm:pt-4">
            <Link
              href="#collections"
              className="group inline-flex items-center gap-3.5 px-8 py-3.5 text-xs sm:text-sm font-medium tracking-[0.22em] uppercase border border-foreground/60 text-foreground hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <span>Explore the Collection</span>
              <span
                className="w-5 h-px bg-foreground/60 group-hover:bg-[var(--accent)] group-hover:w-8 transition-all duration-300"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Full-Bleed Editorial Visual / Placeholder (~55% on desktop) */}
      <div className="w-full lg:w-[55%] relative min-h-[45vh] sm:min-h-[50vh] lg:min-h-full flex items-center justify-center overflow-hidden animate-hero-img">
        {/* Placeholder container with primary color tone and editorial texture */}
        <div className="absolute inset-0 bg-[var(--primary)] flex flex-col items-center justify-center p-8 sm:p-12 select-none overflow-hidden">
          
          {/* Subtle noise/texture gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-70 pointer-events-none" />
          
          {/* Subtle radial glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[var(--accent)]/15 blur-3xl pointer-events-none" />

          {/* Editorial Frame Border */}
          <div className="relative w-full h-full border border-white/15 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
            {/* Top metadata */}
            <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-white/60 font-sans">
              <span>LADÉ&apos;S STORES</span>
              <span>AUTUMN / WINTER</span>
            </div>

            {/* Center Editorial Visual Motif */}
            <div className="flex flex-col items-center justify-center gap-4 text-center my-auto">
              <svg
                width="36"
                height="24"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/40 stroke-current"
                aria-hidden="true"
              >
                <path
                  d="M1 11H17M2 11L3.2 2.5L6.8 6.5L9 1.2L11.2 6.5L14.8 2.5L16 11H2Z"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="font-serif text-2xl sm:text-3xl tracking-[0.15em] uppercase text-white/80 font-light">
                Editorial Lookbook
              </div>
              <p className="text-[12px] tracking-[0.2em] uppercase text-white/50 max-w-xs font-sans">
                Curated Luxury &bull; Modest Haute Couture
              </p>
            </div>

            {/* Bottom metadata */}
            <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/50 font-sans">
              <span>FASHION IN IR</span>
              <span>ROYAL HERITAGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
