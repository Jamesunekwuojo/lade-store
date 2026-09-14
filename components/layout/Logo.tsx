import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  onClick?: () => void;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className = "",
  onClick,
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const sizeConfig = {
    sm: {
      width: 22,
      height: 30,
      imgClass: "h-5 sm:h-6 w-auto",
      textClass: "text-sm sm:text-base tracking-[0.18em]",
    },
    md: {
      width: 30,
      height: 41,
      imgClass: "h-7 sm:h-8 md:h-9 w-auto",
      textClass: "text-base sm:text-lg md:text-xl tracking-[0.2em] sm:tracking-[0.24em]",
    },
    lg: {
      width: 44,
      height: 60,
      imgClass: "h-10 sm:h-11 md:h-12 w-auto",
      textClass: "text-lg sm:text-xl md:text-2xl tracking-[0.22em] sm:tracking-[0.26em]",
    },
  }[size];

  return (
    <Link
      href="/#home"
      onClick={onClick}
      aria-label="LADÉ EMPIRE Home"
      className={`group inline-flex items-center gap-2 sm:gap-3 text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-[2px] whitespace-nowrap ${className}`}
    >
      <Image
        src="/logo.png"
        alt="LADÉ EMPIRE Crown & Monogram"
        width={sizeConfig.width * 2}
        height={sizeConfig.height * 2}
        className={`${sizeConfig.imgClass} object-contain transition-transform duration-300 group-hover:scale-105 select-none flex-shrink-0`}
        priority
      />
      {showWordmark && (
        <span
          className={`font-serif ${sizeConfig.textClass} font-medium uppercase select-none transition-colors duration-200`}
        >
          LADÉ EMPIRE
        </span>
      )}
    </Link>
  );
}

export default Logo;
