import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Innovation from "@/components/Innovation";
import CTA from "@/components/CTA";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Innovation />
        <CTA />
        <Booking />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
