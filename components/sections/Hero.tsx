import Link from "next/link";
import Image from "next/image";

const CULTURAL_TRANSLATIONS = [
  { lang: "Yorùbá", phrase: "Mo ni adé", meaning: "I own the crown" },
  { lang: "Igbo", phrase: "Enwere m okpueze", meaning: "I have the royal crown" },
  { lang: "Hausa", phrase: "Ina da rawani", meaning: "I wear the royal turban" },
  { lang: "Swahili", phrase: "Ninamiliki taji", meaning: "I own the crown" },
  { lang: "Zulu", phrase: "NgineSithsaba", meaning: "I wear the crown" },
  { lang: "Amharic", phrase: "ዘውድ አለኝ", meaning: "Zewd Alegn (The Crown is Mine)" },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-label="LADÉ EMPIRE Hero Introduction"
      className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-foreground overflow-hidden"
    >
      {/* Left Column: Editorial Typography & Brand Narrative (~46% on desktop) */}
      <div className="w-full lg:w-[46%] flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-8 pt-24 sm:pt-28 pb-10 sm:pb-14 lg:py-28 z-10">
        <div className="max-w-xl flex flex-col gap-5 sm:gap-7">
          
          {/* 1. Heritage Crown Motif & Signature Slogan */}
          <div className="animate-hero-1 flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <Image
              src="/logo-sm.png"
              alt="LADÉ EMPIRE Emblem"
              width={24}
              height={33}
              className="h-4 sm:h-5 w-auto object-contain flex-shrink-0"
              priority
            />
            <div className="h-px w-5 sm:w-6 bg-[var(--accent)]/50" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs md:text-[13px] tracking-[0.24em] sm:tracking-[0.28em] uppercase font-bold text-[var(--accent)]">
              LADÉ EMPIRE &bull; &ldquo;I OWN THE CROWN&rdquo;
            </span>
          </div>

          {/* 2. Display Serif Headline */}
          <h1 className="animate-hero-2 font-serif text-[2.5rem] leading-[1.06] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-normal tracking-[-0.02em] text-foreground text-balance">
            The HER.<br />
            <span className="text-foreground/95">Heritage.</span><br />
            <span className="text-foreground/95">Elegance.</span><br />
            <span className="text-foreground/95">Royalty.</span><br />
            <span className="italic font-normal text-[var(--accent)] text-[2.15rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] block mt-1">
              &ldquo;I Own The Crown.&rdquo;
            </span>
          </h1>

          {/* 3. Supporting Paragraph with Clear Focus Communication */}
          <p className="animate-hero-3 font-sans text-sm sm:text-base md:text-lg text-[var(--muted-foreground)] max-w-md leading-relaxed font-light tracking-wide">
            Promoting Godly heritage, royal dignity, and rich African cultural recognition.
            Tailored primarily as haute modest couture for women, featuring exclusive limited-edition designs &amp; accessories for men.
          </p>

          {/* 4. Multilingual Cultural Recognition Accent Ribbon */}
          <div className="animate-hero-3 pt-1 flex flex-col gap-1.5 border-l-2 border-[var(--accent)]/60 pl-3.5 py-0.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-semibold">
              Celebrating African Heritage &amp; Languages
            </span>
            <p className="text-xs text-[var(--muted-foreground)] font-serif italic tracking-wide leading-relaxed">
              &ldquo;Mo ni adé&rdquo; (Yorùbá) &bull; &ldquo;Enwere m okpueze&rdquo; (Igbo) &bull; &ldquo;Ina da rawani&rdquo; (Hausa) &bull; &ldquo;Ninamiliki taji&rdquo; (Swahili) &mdash; <span className="font-sans text-[11px] not-italic text-foreground/80 font-medium">Your language and culture is recognized.</span>
            </p>
          </div>

          {/* 5. CTA & Focus Indicator */}
          <div className="animate-hero-4 pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/#collections"
              className="group inline-flex items-center justify-center sm:justify-start gap-3.5 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase border border-foreground/60 text-foreground hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <span>Explore Women&apos;s Couture</span>
              <span
                className="w-5 h-px bg-foreground/60 group-hover:bg-[var(--accent)] group-hover:w-8 transition-all duration-300 hidden sm:inline-block"
                aria-hidden="true"
              />
            </Link>

            <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--muted-foreground)] text-center sm:text-left font-sans">
              + Men&apos;s Capsule
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Full-Bleed Editorial Visual / Lookbook (~54% on desktop) */}
      <div className="w-full lg:w-[54%] relative min-h-[420px] sm:min-h-[480px] lg:min-h-full flex items-center justify-center overflow-hidden animate-hero-img">
        {/* Container with primary color tone and editorial texture */}
        <div className="absolute inset-0 bg-[var(--primary)] flex flex-col items-center justify-center py-10 px-5 sm:py-14 sm:px-10 lg:pt-32 lg:pb-16 lg:px-12 select-none overflow-hidden">
          
          {/* Subtle noise/texture gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/10 opacity-75 pointer-events-none" />
          
          {/* Subtle radial glow */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[var(--accent)]/20 blur-3xl pointer-events-none" />

          {/* Editorial Frame Border */}
          <div className="relative w-full h-full border border-white/20 flex flex-col justify-between p-5 sm:p-8 lg:p-10 pointer-events-none">
            {/* Top metadata */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/90 font-medium font-sans">
              <span>LADÉ EMPIRE</span>
              <span>&ldquo;I OWN THE CROWN&rdquo;</span>
            </div>

            {/* Center Editorial Visual Motif */}
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 text-center my-auto py-6 sm:py-8">
              <Image
                src="/logo.png"
                alt="LADÉ EMPIRE Royal Crest"
                width={160}
                height={220}
                className="w-20 sm:w-28 md:w-36 h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.16em] uppercase text-white font-medium">
                I OWN THE CROWN
              </div>
              <p className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-white/80 max-w-xs font-sans">
                Women&apos;s Modest Haute Couture &bull; Men&apos;s Limited Edition
              </p>
            </div>

            {/* Bottom metadata */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white/75 font-sans">
              <span>FASHION IN IR</span>
              <span>AFRICAN HERITAGE &bull; ROYALTY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
