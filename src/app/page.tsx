// Reading this as: Landing for technical founders/designers who value ownership,
// with a brutalist editorial / monochrome atelier language, leaning toward Tailwind v4 + Geist + subtle GSAP.
// Dials: DESIGN_VARIANCE 8 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4
// PromptBar is preserved as the flagship flagship composer.

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Inventory } from "@/components/landing/Inventory";
import { ComposerLab } from "@/components/landing/ComposerLab";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Inventory />
        <ComposerLab />
      </main>
      <Footer />
    </>
  );
}
