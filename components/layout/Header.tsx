"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav, type NavItem } from "./MobileNav";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] py-4 shadow-none"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Wordmark (Left) */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links (Center) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-1 text-[13px] tracking-[0.18em] uppercase font-medium text-foreground/80 hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px]"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[var(--accent)] transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions: Theme Toggle & CTA */}
          <div className="hidden md:flex items-center gap-5">
            <ThemeToggle />
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-1.5 text-[12px] tracking-[0.2em] uppercase font-medium border border-foreground/30 hover:border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-200 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Enquire
            </Link>
          </div>

          {/* Mobile Right Controls (<768px): Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex items-center justify-center w-9 h-9 rounded-[2px] text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Nav */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={NAV_ITEMS}
      />
    </>
  );
}
export default Header;
