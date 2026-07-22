import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Menu />
        <Gallery />
        <LocationContact />
      </main>
      <Footer />
    </div>
  );
}
