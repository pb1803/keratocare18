import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VisionAssessment from "@/components/VisionAssessment";
import VisionSlider from "@/components/VisionSlider";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <VisionAssessment />
        <VisionSlider />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileNav />
      <FloatingButtons />
    </div>
  );
};

export default Index;
