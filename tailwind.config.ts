import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        display: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
