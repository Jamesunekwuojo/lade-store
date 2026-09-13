import { Hero } from "@/components/sections/Hero";
import { Collections } from "@/components/sections/Collections";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <Collections />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
