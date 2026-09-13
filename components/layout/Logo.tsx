import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className = "", onClick }: LogoProps) {
  return (
    <Link
      href="#home"
      onClick={onClick}
      aria-label="LADÉ'S STORES Home"
      className={`group inline-flex items-center text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px] ${className}`}
    >
      <span className="font-serif text-lg sm:text-xl font-medium tracking-[0.24em] uppercase select-none transition-colors duration-200">
        LADÉ&apos;S STORES
      </span>
    </Link>
  );
}
