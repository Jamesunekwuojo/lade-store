import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | LADÉ EMPIRE",
  description: "Private management portal for LADÉ EMPIRE.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-foreground flex flex-col">
      {children}
    </div>
  );
}
