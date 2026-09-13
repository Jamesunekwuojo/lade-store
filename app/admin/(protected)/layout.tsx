import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-foreground">
      {/* Admin Top Navigation Bar */}
      <header className="w-full border-b border-[var(--border)] bg-[var(--card)] px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="LADÉ'S STORES Logo"
              width={36}
              height={50}
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-serif text-lg font-medium tracking-[0.2em] uppercase text-foreground group-hover:text-[var(--accent)] transition-colors">
              LADÉ&apos;S STORES
            </span>
          </Link>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] font-medium px-2 py-0.5 border border-[var(--accent)]/40 rounded-[2px]">
            Admin
          </span>
        </div>

        {/* Admin Session Info & Logout Button */}
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[var(--muted-foreground)] hidden sm:inline">
            {session.user.email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="py-1.5 px-3 rounded-[3px] border border-[var(--border)] hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400 text-xs font-medium tracking-wider uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
}
