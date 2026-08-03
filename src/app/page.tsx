import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Showcase } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { Install } from "@/components/sections/Install";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Manifesto />
        <Showcase />
        <Features />
        <Install />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
