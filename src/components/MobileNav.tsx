import { useState, useEffect } from "react";
import { Home, ClipboardCheck, Phone, MessageCircle, Calendar } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const MobileNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-5 h-16">
        <button
          onClick={() => scrollToSection("hero")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeSection === "hero" ? "bg-accent text-secondary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => scrollToSection("assessment")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeSection === "assessment" ? "bg-accent text-secondary" : "text-muted-foreground"
          }`}
        >
          <ClipboardCheck className="w-5 h-5" />
          <span className="text-xs font-medium">Assess</span>
        </button>

        <a
          href="tel:+917276861131"
          className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-medium">Call</span>
        </a>

        <button
          onClick={() => openWhatsApp('generalInquiry')}
          className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-secondary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-medium">WhatsApp</span>
        </button>

        <button
          onClick={() => openWhatsApp('consultation')}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeSection === "contact" ? "bg-secondary text-white" : "bg-secondary/90 text-white"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs font-medium">Book</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
