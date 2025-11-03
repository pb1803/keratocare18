import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">KC</span>
            </div>
            <span className="text-2xl font-bold text-foreground">KeratoCare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("hero")} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("assessment")} className="text-foreground hover:text-primary transition-colors">
              Assessment
            </button>
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+917276861131" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors group">
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">+91 72768 61131</span>
            </a>
            <Button onClick={() => scrollToSection("assessment")} className="bg-secondary hover:bg-secondary/90">
              Free Vision Assessment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border animate-slide-up">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection("hero")} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("assessment")} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Assessment
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <div className="pt-4 space-y-3">
              <a href="tel:+917276861131" className="flex items-center space-x-2 py-2 text-primary font-medium">
                <Phone className="w-5 h-5" />
                <span>Call: +91 72768 61131</span>
              </a>
              <Button onClick={() => scrollToSection("assessment")} className="w-full bg-secondary hover:bg-secondary/90">
                Free Vision Assessment
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
