import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { SoundAtmosphere } from "@/components/ui/SoundAtmosphere";

export const metadata: Metadata = {
  title: "LADÉ EMPIRE — I OWN THE CROWN | Luxury Modest Couture & Cultural Heritage",
  description: "LADÉ EMPIRE — Promoting Godly heritage, royal dignity, and African cultural recognition. Haute modest couture tailored primarily for women, with exclusive limited-edition pieces for men.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <SoundAtmosphere />
        </ThemeProvider>
      </body>
    </html>
  );
}
