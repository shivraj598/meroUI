import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Inventory } from "@/components/landing/Inventory";
import { ComposerLab } from "@/components/landing/ComposerLab";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Inventory />
        <ComposerLab />
      </main>
      <Footer />
    </>
  );
}
