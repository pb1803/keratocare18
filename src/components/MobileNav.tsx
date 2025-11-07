import { useState, useEffect } from "react";
import { Home, ClipboardCheck, Info, Mail, Calendar } from "lucide-react";
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

      const sections = ["hero", "about", "assessment", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Mobile navigation"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-5 h-16">
        <button
          onClick={() => scrollToSection("hero")}
          aria-label="Go to Home"
          className={`flex flex-col items-center justify-center space-y-1 transition-all active:scale-105 touch-manipulation ${
            activeSection === "hero" ? "bg-accent text-secondary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => scrollToSection("about")}
          aria-label="Go to About"
          className={`flex flex-col items-center justify-center space-y-1 transition-all active:scale-105 touch-manipulation ${
            activeSection === "about" ? "bg-accent text-secondary" : "text-muted-foreground"
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-xs font-medium">About</span>
        </button>

        <button
          onClick={() => scrollToSection("assessment")}
          aria-label="Go to Assess"
          className={`flex flex-col items-center justify-center space-y-1 transition-all active:scale-105 touch-manipulation ${
            activeSection === "assessment" ? "bg-accent text-secondary" : "text-muted-foreground"
          }`}
        >
          <ClipboardCheck className="w-5 h-5" />
          <span className="text-xs font-medium">Assess</span>
        </button>

        <button
          onClick={() => scrollToSection("contact")}
          aria-label="Go to Contact"
          className={`flex flex-col items-center justify-center space-y-1 transition-all active:scale-105 touch-manipulation ${
            activeSection === "contact" ? "bg-accent text-secondary" : "text-muted-foreground"
          }`}
        >
          <Mail className="w-5 h-5" />
          <span className="text-xs font-medium">Contact</span>
        </button>

        <button
          onClick={() => openWhatsApp('consultation')}
          aria-label="Book appointment"
          className="flex flex-col items-center justify-center space-y-1 bg-green-500 text-white transition-all active:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs font-medium">Book</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
