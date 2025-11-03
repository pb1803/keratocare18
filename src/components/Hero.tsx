import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-eye.jpg";

const Hero = () => {
  const scrollToAssessment = () => {
    const element = document.getElementById("assessment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent px-4 py-2 rounded-full animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Specialty Keratoconus Care by Fellowship-Trained Optometrist
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Your Path To</span>
              <br />
              <span className="gradient-text">Perfect Vision</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-foreground max-w-2xl leading-relaxed">
              Revolutionary keratoconus treatment using cutting-edge specialty contact lenses. Transform your distorted vision into crystal-clear sight.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-6 rounded-xl shadow-md card-hover">
                <CheckCircle2 className="w-10 h-10 text-secondary mb-3" />
                <div className="text-3xl font-bold text-secondary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-md card-hover">
                <Users className="w-10 h-10 text-secondary mb-3" />
                <div className="text-3xl font-bold text-secondary mb-1">5000+</div>
                <div className="text-sm text-muted-foreground">Patients Treated</div>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-md card-hover">
                <Clock className="w-10 h-10 text-secondary mb-3" />
                <div className="text-3xl font-bold text-secondary mb-1">24h</div>
                <div className="text-sm text-muted-foreground">Assessment Results</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToAssessment}
                className="bg-secondary hover:bg-secondary/90 text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-glow transition-all"
              >
                Begin Free Vision Assessment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-8 py-6 border-2 md:hidden"
                asChild
              >
                <a href="tel:+917276861131">Call Now: +91 72768 61131</a>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative animate-fade-in lg:block hidden">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Advanced keratoconus treatment - Specialty contact lens fitting"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: "0s" }}></div>
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-primary/20 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-primary opacity-5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-primary opacity-5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
