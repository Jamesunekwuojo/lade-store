import { Hero } from "@/components/sections/Hero";
import { Collections } from "@/components/sections/Collections";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <Collections />
      {/* Anchor targets for non-breaking navigation awaiting subsequent steps */}
      <div id="about" className="sr-only" aria-hidden="true" />
      <div id="contact" className="sr-only" aria-hidden="true" />
    </>
  );
}
