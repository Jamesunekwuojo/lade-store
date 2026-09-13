"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password.");
        setIsLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)]">
      <div className="w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 sm:p-10 shadow-none">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <Image
            src="/logo.png"
            alt="LADÉ'S STORES Logo"
            width={72}
            height={100}
            className="h-16 w-auto object-contain mb-3"
            priority
          />
          <span className="font-serif text-lg sm:text-xl tracking-[0.24em] uppercase text-foreground font-medium select-none">
            LADÉ&apos;S STORES
          </span>
          <h1 className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)] font-medium mt-1">
            Private Admin Portal
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-3 rounded-[4px] bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium tracking-wide text-center"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ladestores.com"
              className="w-full px-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground placeholder:text-[var(--muted-foreground)]/50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-[4px] bg-[var(--background)] border border-[var(--border)] text-sm text-foreground placeholder:text-[var(--muted-foreground)]/50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full py-3 px-4 rounded-[4px] bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 active:opacity-95 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign In to Portal"}
          </button>
        </form>

        {/* Quiet Footer */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]/60 text-center text-[10px] tracking-[0.2em] uppercase text-[var(--muted-foreground)]/70">
          Authorized Personnel Only
        </div>

      </div>
    </div>
  );
}
