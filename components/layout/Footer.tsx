import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[var(--footer-background)] text-[var(--footer-foreground)] border-t border-[var(--footer-border)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-12">
        
        {/* Main 3-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand Wordmark & Tagline (Left) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4">
            <Link
              href="#home"
              aria-label="LADÉ'S STORES Home"
              className="group inline-flex items-center text-[var(--footer-foreground)] hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px] w-fit"
            >
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.24em] uppercase select-none">
                LADÉ&apos;S STORES
              </span>
            </Link>

            <p className="font-sans text-sm text-[var(--footer-muted)] font-light leading-relaxed max-w-sm tracking-wide">
              Fashion in IR &mdash; promoting Godly heritage, elegance, royalty, and modesty in an evolving world.
            </p>

            <div className="pt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--footer-muted)]/80 font-sans">
              Haute Modest Couture &bull; Curated Editions
            </div>
          </div>

          {/* Column 2: Navigation Links (Center) */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col">
            <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--footer-muted)] mb-5">
              Navigation
            </h3>
            <nav
              aria-label="Footer Navigation"
              className="flex flex-col gap-3.5"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-[13px] tracking-[0.18em] uppercase text-[var(--footer-foreground)]/80 hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] w-fit"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Minimal Contact Methods (Right) */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col">
            <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--footer-muted)] mb-5">
              Connect
            </h3>
            <ul className="flex flex-col gap-3.5 text-[13px] tracking-wide text-[var(--footer-foreground)]/85 list-none p-0 m-0">
              <li>
                <a
                  href="https://instagram.com/lades_stores1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile @lades_stores1"
                  className="hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] inline-flex items-center gap-2"
                >
                  <span className="text-[var(--footer-muted)] text-xs uppercase tracking-[0.18em]">IG:</span>
                  <span>@lades_stores1</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:09167656123"
                  aria-label="Phone line 09167656123"
                  className="hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] inline-flex items-center gap-2"
                >
                  <span className="text-[var(--footer-muted)] text-xs uppercase tracking-[0.18em]">Tel:</span>
                  <span>09167656123</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:priscillaadeyemi289@gmail.com"
                  aria-label="Email priscillaadeyemi289@gmail.com"
                  className="hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-[2px] inline-flex items-center gap-2 break-all"
                >
                  <span className="text-[var(--footer-muted)] text-xs uppercase tracking-[0.18em]">Email:</span>
                  <span>priscillaadeyemi289@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Crown Line Motif */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-[var(--footer-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.18em] uppercase text-[var(--footer-muted)]">
          <p className="m-0">
            &copy; 2026 Lade&apos;s Store. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* Subtle Crown Line Icon */}
            <svg
              width="16"
              height="11"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--accent)] stroke-current"
              aria-hidden="true"
            >
              <path
                d="M1 11H17M2 11L3.2 2.5L6.8 6.5L9 1.2L11.2 6.5L14.8 2.5L16 11H2Z"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[11px] tracking-[0.24em]">Fashion in IR</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
