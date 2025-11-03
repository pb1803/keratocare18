import { Phone, MessageCircle, Instagram } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 md:bottom-8 z-30 flex flex-col space-y-3 animate-slide-up">
      <a
        href="tel:+917276861131"
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-glow flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6 group-hover:animate-pulse" />
      </a>

      <a
        href="https://wa.me/917276861131?text=Hi,%20I'd%20like%20to%20know%20more%20about%20keratoconus%20treatment"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-glow flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
      </a>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-glow flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 group-hover:animate-pulse" />
      </a>
    </div>
  );
};

export default FloatingButtons;
