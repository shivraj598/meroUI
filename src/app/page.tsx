import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Components } from "@/components/sections/Components";
import { Features } from "@/components/sections/Features";
import { Design } from "@/components/sections/Design";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Components />
        <Features />
        <Design />
      </main>
      <Footer />
    </>
  );
}
