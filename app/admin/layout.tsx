import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | LADÉ'S STORES",
  description: "Private management portal for Ladé's Store.",
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
