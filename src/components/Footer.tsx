import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-hero-new text-dark-charcoal py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow-lg">
                <img 
                  src="/logo.svg" 
                  alt="KeratoCare Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-dark-charcoal">KeratoCare</span>
            </div>
            <p className="text-medium-gray leading-relaxed max-w-md">
              Pioneering the future of keratoconus care with cutting-edge specialty contact lens solutions. Transforming lives through better vision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-bold text-lg mb-4 text-dark-charcoal hover:text-secondary transition-colors duration-300">Quick Links</h3>
            <ul className="space-y-2">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <button onClick={() => scrollToSection("hero")} className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  Home
                </button>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <button onClick={() => scrollToSection("services")} className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  Services
                </button>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <button onClick={() => scrollToSection("about")} className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  About
                </button>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <button onClick={() => scrollToSection("contact")} className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="font-bold text-lg mb-4 text-dark-charcoal hover:text-secondary transition-colors duration-300">Resources</h3>
            <ul className="space-y-2">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <a href="#" className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  Privacy Policy
                </a>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <a href="#" className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  Terms of Service
                </a>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <a href="#" className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  HIPAA Compliance
                </a>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <a href="#" className="text-medium-gray hover:text-secondary transition-all duration-300 hover:font-semibold">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-light-gray pt-8 mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-dark-charcoal/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow hover:text-white text-dark-charcoal"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 hover:animate-pulse" />
            </a>
            <a
              href="https://www.instagram.com/kerato_care?igsh=am0xbjZoYTYwbjds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-charcoal/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow hover:text-white text-dark-charcoal"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 hover:animate-pulse" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-dark-charcoal/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow hover:text-white text-dark-charcoal"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 hover:animate-pulse" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2 text-sm text-medium-gray animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="hover:text-dark-charcoal transition-colors duration-300">© 2024 KeratoCare. All rights reserved. Dr. Rushikesh Tilekar. Specialty Contact Lens Practice.</p>
          <p className="text-xs hover:text-dark-charcoal transition-colors duration-300">
            <strong>Disclaimer:</strong> Information on this site is educational. Consult Dr. Tilekar for personalized medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
