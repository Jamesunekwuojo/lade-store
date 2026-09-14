import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[var(--footer-background)] text-[var(--footer-foreground)] border-t border-[var(--footer-border)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-12">
        
        {/* Main 3-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          
          {/* Column 1: Brand Wordmark & Tagline (Left) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            <Link
              href="#home"
              aria-label="LADÉ EMPIRE Home"
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-[var(--footer-foreground)] hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px] w-fit"
            >
              <Image
                src="/logo.png"
                alt="LADÉ EMPIRE Monogram"
                width={56}
                height={77}
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-serif text-lg sm:text-2xl font-medium tracking-[0.2em] sm:tracking-[0.24em] uppercase select-none">
                LADÉ EMPIRE
              </span>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-[var(--footer-muted)] font-light leading-relaxed max-w-sm tracking-wide">
              Fashion in IR &mdash; Promoting Godly heritage, royal dignity, and African cultural pride. Tailored primarily for women, featuring exclusive limited designs for men.
            </p>

            <div className="pt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[var(--footer-muted)]/85 font-sans font-medium">
              &ldquo;I OWN THE CROWN&rdquo; &bull; Haute Modest Couture
            </div>
          </div>

          {/* Column 2: Navigation Links (Center) */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--footer-muted)] mb-4 sm:mb-5">
              Navigation
            </h3>
            <nav
              aria-label="Footer Navigation"
              className="flex flex-col gap-3 sm:gap-3.5"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-[var(--footer-foreground)]/80 hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] w-fit py-0.5"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Minimal Contact Methods (Right) */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--footer-muted)] mb-4 sm:mb-5">
              Connect
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-3.5 text-xs sm:text-[13px] tracking-wide text-[var(--footer-foreground)]/85 list-none p-0 m-0">
              <li>
                <a
                  href="https://instagram.com/lades_stores1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile @lades_stores1"
                  className="hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] inline-flex items-center gap-2"
                >
                  <span className="text-[var(--footer-muted)] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium">IG:</span>
                  <span>@lades_stores1</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:09167656123"
                  aria-label="Phone line 09167656123"
                  className="hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] inline-flex items-center gap-2"
                >
                  <span className="text-[var(--footer-muted)] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium">Tel:</span>
                  <span>09167656123</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:priscillaadeyemi289@gmail.com"
                  aria-label="Email priscillaadeyemi289@gmail.com"
                  className="hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] inline-flex items-center gap-2 break-all"
                >
                  <span className="text-[var(--footer-muted)] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium">Email:</span>
                  <span>priscillaadeyemi289@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Logo Motif */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[var(--footer-border)] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[var(--footer-muted)] text-center sm:text-left">
          <p className="m-0">
            &copy; 2026 LADÉ EMPIRE. All rights reserved.
          </p>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Image
              src="/logo-sm.png"
              alt="LADÉ EMPIRE Emblem"
              width={20}
              height={28}
              className="h-3.5 sm:h-4 w-auto object-contain opacity-85"
            />
            <span className="text-[10px] sm:text-[11px] tracking-[0.24em]">I OWN THE CROWN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
