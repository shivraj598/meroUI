import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Features } from "@/components/sections/Features";
import { Install } from "@/components/sections/Install";
import { Design } from "@/components/sections/Design";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <Features />
        <Install />
        <Design />
      </main>
      <Footer />
    </>
  );
}
