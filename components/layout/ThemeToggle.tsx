"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex items-center justify-center w-8 h-8 rounded-[2px] text-foreground/80 hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      {mounted ? (
        <div className="relative w-4 h-4">
          <Sun
            className={`w-4 h-4 absolute inset-0 transition-all duration-300 ease-out transform ${
              isDark
                ? "opacity-0 rotate-90 scale-75 pointer-events-none"
                : "opacity-100 rotate-0 scale-100"
            }`}
            strokeWidth={1.75}
          />
          <Moon
            className={`w-4 h-4 absolute inset-0 transition-all duration-300 ease-out transform ${
              isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75 pointer-events-none"
            }`}
            strokeWidth={1.75}
          />
        </div>
      ) : (
        <div className="w-4 h-4 opacity-0" aria-hidden="true" />
      )}
    </button>
  );
}
