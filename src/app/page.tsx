import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LibraryIndex } from "@/components/sections/LibraryIndex";
import { Principles } from "@/components/sections/Principles";
import { Playground } from "@/components/sections/Playground";
import { Work } from "@/components/sections/Work";
import { Footer } from "@/components/sections/Footer";
import { getDesigns } from "@/lib/designs";

export default function Home() {
  const entries = getDesigns();

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <LibraryIndex />
        <Principles />
        <Playground />
        <Work entries={entries} />
      </main>
      <Footer />
    </>
  );
}
