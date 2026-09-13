"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { ComponentType } from "react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="1.75"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface ContactMethod {
  title: string;
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
  ariaLabel: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    title: "Instagram",
    label: "Follow & Direct Message",
    value: "@lades_stores1",
    href: "https://instagram.com/lades_stores1",
    isExternal: true,
    ariaLabel: "Message us on Instagram at @lades_stores1",
    icon: InstagramIcon,
  },
  {
    title: "Phone",
    label: "Call or WhatsApp",
    value: "09167656123",
    href: "tel:09167656123",
    ariaLabel: "Call or text 09167656123",
    icon: Phone,
  },
  {
    title: "Email",
    label: "Bespoke Inquiries",
    value: "priscillaadeyemi289@gmail.com",
    href: "mailto:priscillaadeyemi289@gmail.com",
    ariaLabel: "Email us at priscillaadeyemi289@gmail.com",
    icon: Mail,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-[var(--background)] text-foreground py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[var(--border)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Warm & Approachable Card Shell */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="h-px w-5 bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-[13px] tracking-[0.26em] uppercase font-medium text-[var(--accent)]">
              Get in Touch
            </span>
            <span
              className="h-px w-5 bg-[var(--accent)]"
              aria-hidden="true"
            />
          </div>

          {/* Section Display Heading */}
          <h2
            id="contact-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.01em] text-foreground leading-[1.15] max-w-xl text-balance"
          >
            Let&apos;s Connect
          </h2>

          {/* Warm, Approachable Supporting Copy */}
          <p className="mt-4 text-sm sm:text-base text-[var(--muted-foreground)] font-light leading-relaxed max-w-lg">
            Whether you are ordering your next signature modest piece, inquiring about custom fits, or exploring bespoke styling possibilities &mdash; we are always delighted to connect with you.
          </p>

          {/* Contact Methods Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-12">
            {CONTACT_METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <Link
                  key={method.title}
                  href={method.href}
                  target={method.isExternal ? "_blank" : undefined}
                  rel={method.isExternal ? "noopener noreferrer" : undefined}
                  aria-label={method.ariaLabel}
                  className="group flex flex-col items-center justify-between p-6 sm:p-7 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--muted)]/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] cursor-pointer"
                >
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--muted)] text-[var(--accent)] border border-[var(--border)] group-hover:scale-105 group-hover:border-[var(--accent)]/50 transition-all duration-200 mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>

                  {/* Information Details */}
                  <div className="flex flex-col items-center text-center gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--muted-foreground)]">
                      {method.title}
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)]/80 font-light">
                      {method.label}
                    </span>
                    <span className="font-serif text-sm sm:text-base font-normal text-foreground group-hover:text-[var(--accent)] transition-colors duration-200 pt-2 break-all">
                      {method.value}
                    </span>
                  </div>

                  {/* Subtle Action Indicator */}
                  <span className="mt-4 text-[10px] uppercase tracking-[0.22em] font-medium text-[var(--accent)] opacity-80 group-hover:opacity-100 transition-opacity">
                    Connect &rarr;
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Closing Warm Blessing / Note */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-[var(--border)]/60 w-full flex flex-col sm:flex-row items-center justify-center gap-2 text-xs tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
            <span>Dressed in Grace</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Honoring Godly Heritage</span>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Contact;
