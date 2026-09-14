"use client";

import Link from "next/link";
import Image from "next/image";

const CULTURAL_BADGES = [
  { lang: "Yorùbá", text: "Mo ni adé" },
  { lang: "Igbo", text: "Enwere m okpueze" },
  { lang: "Hausa", text: "Ina da rawani" },
  { lang: "Swahili", text: "Ninamiliki taji" },
  { lang: "Zulu", text: "NgineSithsaba" },
  { lang: "Amharic", text: "ዘውድ አለኝ" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full bg-[var(--background)] text-foreground py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 sm:gap-14 lg:gap-16 xl:gap-24">
        
        {/* Left Column: Editorial Brand Visual / Lookbook Frame (~48% on desktop) */}
        <div className="w-full lg:w-[48%] relative min-h-[420px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-[2px] overflow-hidden bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--border)] select-none">
          {/* Subtle noise/gradient background texture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/10 opacity-80 pointer-events-none" />
          
          {/* Subtle radial warmth */}
          <div className="absolute top-1/3 left-1/4 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[var(--accent)]/15 blur-3xl pointer-events-none" />

          {/* Editorial Framing Frame */}
          <div className="relative z-10 w-full h-full border border-white/20 flex flex-col justify-between p-5 sm:p-8 lg:p-10 pointer-events-none">
            {/* Top Header Tag */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/80 font-sans">
              <span>LADÉ EMPIRE</span>
              <span>ROYAL HERITAGE</span>
            </div>

            {/* Center Brand Crest & "I OWN THE CROWN" Monogram */}
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 text-center my-auto py-6 sm:py-8">
              <Image
                src="/logo.png"
                alt="LADÉ EMPIRE Royal Crest"
                width={140}
                height={193}
                className="w-20 sm:w-28 md:w-32 h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-105"
              />

              <div className="font-serif text-2xl sm:text-3xl lg:text-[2rem] tracking-[0.16em] uppercase text-white font-medium">
                I OWN THE CROWN
              </div>

              <p className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/75 max-w-xs font-sans leading-relaxed">
                A Sacred Symphony of African Heritage, Modesty &amp; Distinction
              </p>
            </div>

            {/* Bottom Metadata */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-white/65 font-sans">
              <span>FASHION IN IR</span>
              <span>THE EMPIRE MANIFESTO</span>
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
              <span className="text-[11px] sm:text-xs md:text-[13px] tracking-[0.24em] sm:tracking-[0.26em] uppercase font-bold text-[var(--accent)]">
                The House of Ladé &bull; LADÉ EMPIRE
              </span>
            </div>

            {/* Section Display Heading */}
            <h2
              id="about-heading"
              className="font-serif text-[2.25rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-normal tracking-[-0.01em] text-foreground text-balance"
            >
              Clothed in Sovereignty,<br />
              <span className="italic text-[var(--accent)]">&ldquo;I Own The Crown.&rdquo;</span>
            </h2>

            {/* Narrative Paragraph 1: Core Values */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[var(--muted-foreground)] font-light leading-[1.7] sm:leading-[1.75] tracking-wide">
              At <strong className="font-semibold text-foreground">LADÉ EMPIRE</strong>, fashion is an intentional expression of God-given
              heritage, African cultural pride, and sovereign poise. True elegance is never an afterthought &mdash;
              it is the quiet, undeniable power of knowing who you are and stepping forth in modest distinction.
            </p>

            {/* Narrative Paragraph 2: African Cultural & Language Recognition */}
            <div className="bg-[var(--muted)]/40 border border-[var(--border)] rounded-lg p-4 sm:p-5 flex flex-col gap-2.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--accent)]">
                Our Languages &bull; Our Heritage
              </span>
              <p className="font-sans text-xs sm:text-sm text-[var(--muted-foreground)] font-light leading-relaxed">
                Whether proclaimed in Yorùbá (<em>&ldquo;Mo ni adé&rdquo;</em>), Igbo (<em>&ldquo;Enwere m okpueze&rdquo;</em>), Hausa (<em>&ldquo;Ina da rawani&rdquo;</em>), or Swahili (<em>&ldquo;Ninamiliki taji&rdquo;</em>) &mdash; your language, lineage, and royal heritage are deeply celebrated here.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {CULTURAL_BADGES.map((b) => (
                  <span
                    key={b.lang}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[var(--background)] border border-[var(--border)] text-[10px] font-sans tracking-wide text-foreground/85"
                  >
                    <span className="text-[var(--accent)] font-semibold">{b.lang}:</span>
                    <span className="italic">{b.text}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Distinctive Brand Pull-Quote */}
            <blockquote className="my-2 sm:my-3 pl-4 sm:pl-6 border-l-2 border-[var(--accent)] flex flex-col gap-2">
              <p className="font-accent text-lg sm:text-2xl lg:text-[1.7rem] text-foreground font-normal italic leading-snug tracking-wide">
                &ldquo;Modesty is not the absence of beauty, but the sovereign declaration that I OWN THE CROWN.&rdquo;
              </p>
              <footer className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[var(--muted-foreground)] font-sans">
                &mdash; LADÉ EMPIRE &bull; Fashion in IR
              </footer>
            </blockquote>

            {/* Narrative Paragraph 3: Women's Core Focus + Men's Limited Accessories */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[var(--muted-foreground)] font-light leading-[1.7] sm:leading-[1.75] tracking-wide">
              While our primary atelier focus is dedicated to creating breathtaking modest couture for <strong className="font-medium text-foreground">women</strong>, LADÉ EMPIRE also presents an exclusive, limited-edition capsule of ceremonial designs, handcrafted caps, and distinguished accessories for <strong className="font-medium text-foreground">men</strong>.
            </p>

            {/* Contact / Consultation Link */}
            <div className="pt-2">
              <Link
                href="/#contact"
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
