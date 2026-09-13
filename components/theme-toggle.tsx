"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded border border-border px-3 py-1.5 text-sm font-sans text-foreground transition-colors"
        disabled
      >
        Toggle Theme
      </button>
    );
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer rounded border border-border bg-background px-4 py-2 text-sm font-sans font-medium text-foreground transition-colors hover:bg-muted"
    >
      Current: {theme} ({resolvedTheme}) &mdash; Click to switch
    </button>
  );
}
