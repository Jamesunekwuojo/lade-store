"use client";

import Link from "next/link";
import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full bg-[var(--background)] text-foreground py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 sm:gap-14 lg:gap-16 xl:gap-24">
        
        {/* Left Column: Editorial Brand Visual / Lookbook Frame (~48% on desktop) */}
        <div className="w-full lg:w-[48%] relative min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-[2px] overflow-hidden bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--border)] select-none">
          {/* Subtle noise/gradient background texture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/10 opacity-80 pointer-events-none" />
          
          {/* Subtle radial warmth */}
          <div className="absolute top-1/3 left-1/4 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[var(--accent)]/15 blur-3xl pointer-events-none" />

          {/* Editorial Framing Frame */}
          <div className="relative z-10 w-full h-full border border-white/20 flex flex-col justify-between p-5 sm:p-8 lg:p-10 pointer-events-none">
            {/* Top Header Tag */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/80 font-sans">
              <span>HOUSE OF LADÉ</span>
              <span>MODEST COUTURE</span>
            </div>

            {/* Center Brand Crest & Monogram */}
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 text-center my-auto py-6 sm:py-8">
              <Image
                src="/logo.png"
                alt="House of Ladé Royal Crest"
                width={140}
                height={193}
                className="w-20 sm:w-28 md:w-32 h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-105"
              />

              <div className="font-serif text-2xl sm:text-3xl tracking-[0.14em] uppercase text-white font-light">
                Grace &bull; Royalty
              </div>

              <p className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/70 max-w-xs font-sans leading-relaxed">
                A Sacred Symphony of Modesty &amp; Distinction
              </p>
            </div>

            {/* Bottom Metadata */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-white/60 font-sans">
              <span>INTERNATIONAL RELATIONS</span>
              <span>THE BRAND MANIFESTO</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Story & Manifesto (~52% on desktop) */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center py-2 lg:py-6">
          <div className="max-w-xl flex flex-col gap-5 sm:gap-6">
            
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span
                className="h-px w-5 bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-xs md:text-[13px] tracking-[0.24em] sm:tracking-[0.26em] uppercase font-semibold text-[var(--accent)]">
                The House of Ladé
              </span>
            </div>

            {/* Section Display Heading */}
            <h2
              id="about-heading"
              className="font-serif text-[2.25rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-normal tracking-[-0.01em] text-foreground text-balance"
            >
              Rooted in Grace,<br />
              Clothed in Royal Dignity
            </h2>

            {/* Narrative Paragraph 1 */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[var(--muted-foreground)] font-light leading-[1.7] sm:leading-[1.75] tracking-wide">
              At Ladé&apos;s Stores, fashion is an intentional expression of God-given
              heritage and royal poise. We believe true elegance is never an afterthought &mdash;
              it is the quiet, undeniable strength of knowing who you are and honoring the
              dignity of modest distinction.
            </p>

            {/* Narrative Paragraph 2 */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[var(--muted-foreground)] font-light leading-[1.7] sm:leading-[1.75] tracking-wide">
              In an evolving, fast-paced world, modesty is often misunderstood as restraint.
              Here, it is reclaimed as sovereign confidence: structured cuts, exquisite draping,
              and rich textiles crafted for women navigating global landscapes while remaining
              firmly anchored in timeless values.
            </p>

            {/* Distinctive Brand Pull-Quote */}
            <blockquote className="my-2 sm:my-4 pl-4 sm:pl-6 border-l-2 border-[var(--accent)] flex flex-col gap-2">
              <p className="font-accent text-lg sm:text-2xl lg:text-[1.7rem] text-foreground font-normal italic leading-snug tracking-wide">
                &ldquo;Modesty is not the absence of beauty, but the presence of royal dignity.&rdquo;
              </p>
              <footer className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[var(--muted-foreground)] font-sans">
                &mdash; Fashion in IR &bull; The Ladé Ethos
              </footer>
            </blockquote>

            {/* Narrative Paragraph 3 */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[var(--muted-foreground)] font-light leading-[1.7] sm:leading-[1.75] tracking-wide">
              Every garment is created with purpose and reverent craftsmanship. From diplomatic
              engagements and ceremonial celebrations to everyday modest wear, our collections
              provide a wardrobe of international distinction.
            </p>

            {/* Contact / Consultation Link */}
            <div className="pt-2">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-foreground hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px]"
              >
                <span>Connect with our Styling Concierge</span>
                <span
                  className="w-4 h-px bg-foreground/60 group-hover:bg-[var(--accent)] group-hover:w-7 transition-all duration-300"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
