import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Search, Activity, CheckCircle2 } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Eye,
      badge: "MOST POPULAR",
      badgeColor: "bg-secondary text-white",
      title: "Specialty Contact Lenses",
      description: "Transform your vision with custom engineered contact lenses designed specifically for keratoconus",
      features: [
        "Scleral Lenses (Large diameter, vault cornea)",
        "Mini Scleral Lenses (Balanced comfort & FOV)",
        "Hybrid Lenses (Rigid center + soft skirt)",
        "Custom RGP Designs (Precision fitting)",
        "Piggyback Systems (Soft lens under rigid)",
      ],
      benefits: [
        "98% success rate",
        "Results visible within 24-48h",
        "Reversible & adjustable",
        "Long-term vision stability",
      ],
    },
    {
      icon: Search,
      badge: "AI-POWERED",
      badgeColor: "bg-primary text-white",
      title: "Advanced Corneal Mapping",
      description: "Precision mapping using latest technology to understand your exact corneal shape & progression",
      features: [
        "Pentacam HR Imaging (High-resolution 3D mapping)",
        "Corneal Topography (Surface contour analysis)",
        "AI 3D Modeling (Machine learning predictions)",
        "Progression Monitoring (Track changes)",
        "Custom Lens Design (AI-optimized parameters)",
      ],
      benefits: [
        "Identifies lens fit before wear",
        "Monitors disease progression",
        "Prevents complications",
        "Optimizes lens design",
      ],
    },
    {
      icon: Activity,
      badge: "INNOVATIVE",
      badgeColor: "bg-orange text-white",
      title: "Vision Therapy Programs",
      description: "Comprehensive training to maximize vision improvement & adaptation",
      features: [
        "Visual Training Exercises (Enhance processing)",
        "Binocular Therapy (Both eyes coordination)",
        "Accommodation Training (Focus flexibility)",
        "Eye Movement Training (Saccade & pursuit)",
        "Lifestyle Optimization (Screen time management)",
      ],
      benefits: [
        "Faster vision adaptation",
        "Reduced glare & halos",
        "Improved night vision",
        "Enhanced daily performance",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Revolutionary Treatment Options</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Advanced solutions tailored to your specific vision needs
          </p>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="p-8 card-hover animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-6">
                  <service.icon className="w-12 h-12 text-primary" />
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Featured Options:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Benefits:</h4>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <Button variant="outline" className="w-full" onClick={scrollToContact}>Learn More</Button>
                  <Button 
                    onClick={() => openWhatsApp(index === 0 ? 'scheduleFitting' : index === 1 ? 'bookMapping' : 'startProgram')}
                    className="w-full bg-secondary hover:bg-secondary/90"
                  >
                    {index === 0 ? "Schedule Fitting" : index === 1 ? "Book Mapping" : "Start Program"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="bg-card rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Your Treatment Journey</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Initial Assessment",
                  desc: "Comprehensive eye exam + corneal mapping analysis",
                  duration: "1-2 hours",
                },
                {
                  step: "2",
                  title: "Custom Lens Design",
                  desc: "AI-powered lens design tailored to your cornea",
                  duration: "3-5 business days",
                },
                {
                  step: "3",
                  title: "Professional Fitting",
                  desc: "Expert lens fitting + comprehensive training",
                  duration: "1-2 hours",
                },
                {
                  step: "4",
                  title: "Follow-Up Care",
                  desc: "Monitoring, adjustments, ongoing support",
                  duration: "Ongoing",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-secondary to-primary -z-10"></div>
                  )}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                    <p className="text-xs font-semibold text-secondary">{item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
