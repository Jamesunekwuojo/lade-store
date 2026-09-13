"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className={`fixed inset-0 z-50 flex flex-col bg-[var(--background)]/98 backdrop-blur-xl text-foreground md:hidden transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-4"
      }`}
    >
      {/* Top bar inside mobile overlay */}
      <div className="flex items-center justify-between px-4 sm:px-8 h-18 border-b border-[var(--border)]/70 flex-shrink-0">
        <Logo onClick={onClose} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[2px] text-foreground/90 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Centered scrollable navigation links */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 overflow-y-auto gap-8 text-center">
        <nav aria-label="Mobile Navigation Links" className="flex flex-col items-center gap-6 sm:gap-7 w-full">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="w-full py-2 font-serif text-2xl sm:text-3xl font-normal tracking-[0.16em] uppercase text-foreground/90 hover:text-[var(--accent)] active:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px]"
              style={{
                transitionDelay: isOpen ? `${index * 35}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="mt-4 flex flex-col items-center gap-4 w-full max-w-xs">
          <Link
            href="#contact"
            onClick={onClose}
            className="w-full text-center py-3.5 px-6 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase border border-[var(--foreground)] text-foreground hover:bg-[var(--foreground)] hover:text-[var(--background)] active:scale-[0.98] transition-all duration-200 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] shadow-xs"
          >
            Enquire
          </Link>
        </div>
      </div>

      {/* Footer subtle brand tagline in mobile menu */}
      <div className="py-5 text-center border-t border-[var(--border)]/70 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[var(--muted-foreground)] flex-shrink-0">
        Fashion in IR &bull; Modest Haute Couture
      </div>
    </div>
  );
}

export default MobileNav;
