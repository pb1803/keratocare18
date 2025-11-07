import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-eye.jpg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Respect user prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else mq.addListener(handler);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", handler);
        else mq.removeListener(handler);
      };
    } catch (e) {
      // ignore on SSR or unsupported
    }
  }, []);

  const scrollToAssessment = () => {
    const element = document.getElementById("assessment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 md:pt-20 bg-gradient-hero-new overflow-hidden" ref={ref}>
      {/* Mobile-First Layout */}
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content Column - Mobile Clean Layout */}
          <div className={`order-1 space-y-6 md:space-y-8 text-center lg:text-left ${inView ? "animate-slide-up" : "opacity-0"}`}>
            
            {/* Trust Badge - Hidden on Mobile, Visible on Desktop */}
            <div className={`hidden md:inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full shadow-lg border ${inView ? "animate-fade-in" : "opacity-0"}`}>
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm font-medium text-gray-700">
                Fellowship-Trained Keratoconus Specialist
              </span>
            </div>

            {/* Main Headline - Premium Typography */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              <span className="block animate-fade-in-up text-shadow-premium" style={{ color: '#012A4A', animationDelay: '0.2s', animationFillMode: 'both' }}>
                See the World
              </span>
              <span className="block mt-1 animate-fade-in-up text-shadow-premium" style={{ color: '#000000', animationDelay: '0.4s', animationFillMode: 'both' }}>
                Clearly Again
              </span>
            </h1>

            {/* Subheadline - Enhanced with depth */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed card-depth bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              Transform your keratoconus with advanced specialty contact lenses. 
              <span className="hidden md:inline"> Trusted by 5,000+ patients worldwide.</span>
            </p>

            {/* Premium Stats with Hover Effects */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 py-4">
              <div className="text-center stat-hover">
                <div className="text-2xl md:text-3xl font-black" style={{ color: 'hsl(145 63% 35%)' }}>
                  {inView && <CountUp end={98} duration={reducedMotion ? 0 : 2.5} suffix="%" />}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center stat-hover">
                <div className="text-2xl md:text-3xl font-black" style={{ color: 'hsl(145 63% 35%)' }}>
                  {inView && <CountUp end={5000} duration={reducedMotion ? 0 : 2.5} separator="," suffix="+" />}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="text-center stat-hover">
                <div className="text-2xl md:text-3xl font-black" style={{ color: 'hsl(145 63% 35%)' }}>
                  {inView && <CountUp end={24} duration={reducedMotion ? 0 : 2.5} suffix="h" />}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Results</div>
              </div>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
              <Button
                size="lg"
                onClick={scrollToAssessment}
                className="w-full sm:flex-1 btn-premium-green rounded-full px-6 py-4 text-base font-semibold transition-all transform-gpu active:scale-95"
              >
                Book Free Assessment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:flex-1 btn-premium-white rounded-full px-6 py-4 text-base font-semibold transition-all"
                asChild
              >
                <a href="tel:+917276861131">Call Now</a>
              </Button>
            </div>

            {/* Enhanced Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face&auto=format&q=80" 
                  alt="Happy Indian patient" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover card-depth"
                />
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=64&h=64&fit=crop&crop=face&auto=format&q=80" 
                  alt="Happy Indian patient" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover card-depth"
                />
                <img 
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=64&h=64&fit=crop&crop=face&auto=format&q=80" 
                  alt="Happy Indian patient" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover card-depth"
                />
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=face&auto=format&q=80" 
                  alt="Happy Indian patient" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover card-depth"
                />
              </div>
              <div className="text-sm text-gray-600 card-depth bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="font-semibold">5,000+</span> happy patients
              </div>
            </div>
          </div>

          {/* Desktop Video Column */}
          <div className={`order-2 hidden lg:block ${inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform-gpu">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-80 lg:h-[420px] object-cover image-zoom"
                poster={heroImage}
                role="img"
                aria-label="KeratoCare vision treatment demonstration"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
                <div className="w-full h-80 lg:h-[420px] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}></div>
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: "0s" }}></div>
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/5 to-primary/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
