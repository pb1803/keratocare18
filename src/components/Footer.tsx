import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-neutral-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">KC</span>
              </div>
              <span className="text-2xl font-bold">KeratoCare</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Pioneering the future of keratoconus care with cutting-edge specialty contact lens solutions. Transforming lives through better vision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("hero")} className="text-gray-300 hover:text-secondary transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-gray-300 hover:text-secondary transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="text-gray-300 hover:text-secondary transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-secondary transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  HIPAA Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2 text-sm text-gray-400">
          <p>© 2024 KeratoCare. All rights reserved. Dr. Rushikesh Tilekar. Specialty Contact Lens Practice.</p>
          <p className="text-xs">
            <strong>Disclaimer:</strong> Information on this site is educational. Consult Dr. Tilekar for personalized medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
