import { Hero } from "@/components/sections/Hero";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      {/* Anchor targets for non-breaking navigation awaiting subsequent steps */}
      <div id="collections" className="sr-only" aria-hidden="true" />
      <div id="about" className="sr-only" aria-hidden="true" />
      <div id="contact" className="sr-only" aria-hidden="true" />
    </>
  );
}
