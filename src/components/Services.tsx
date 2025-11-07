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
      description: "Custom engineered contact lenses designed specifically for keratoconus",
      keyPoints: [
        "98% success rate with custom fitting",
        "Results visible within 24-48 hours",
        "Reversible & adjustable design"
      ],
    },
    {
      icon: Search,
      badge: "AI-POWERED",
      badgeColor: "bg-primary text-white",
      title: "Advanced Corneal Mapping",
      description: "Precision 3D mapping using AI technology to understand your corneal shape",
      keyPoints: [
        "High-resolution 3D corneal imaging",
        "AI-optimized lens parameter design",
        "Real-time progression monitoring"
      ],
    },
    {
      icon: Activity,
      badge: "INNOVATIVE",
      badgeColor: "bg-orange text-white",
      title: "Vision Therapy Programs",
      description: "Comprehensive training to maximize vision improvement & adaptation",
      keyPoints: [
        "Faster vision adaptation protocols",
        "Reduced glare & nighttime halos",
        "Enhanced daily performance training"
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Revolutionary Treatment Options</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Advanced solutions tailored to your specific vision needs
          </p>

          {/* All Cards Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="p-6 card-hover bg-white/98 backdrop-blur-sm border-2 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full flex flex-col"
              >
                <div className="text-center mb-4">
                  {/* Icon & Badge */}
                  <div className="relative mb-3 inline-block">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto shadow-md">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className={`absolute -top-1 -right-1 text-xs font-bold px-2 py-1 rounded-full ${service.badgeColor} shadow-sm`}>
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>
                </div>
                
                {/* Key Points */}
                <div className="mb-4 flex-grow">
                  <ul className="space-y-2">
                    {service.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start text-xs">
                        <CheckCircle2 className="w-4 h-4 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Button 
                    onClick={() => openWhatsApp(index === 0 ? 'scheduleFitting' : index === 1 ? 'bookMapping' : 'startProgram')}
                    className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 text-sm font-semibold w-full"
                  >
                    {index === 0 ? "Schedule Fitting" : index === 1 ? "Book Mapping" : "Start Program"}
                  </Button>
                  <Button variant="outline" onClick={scrollToContact} className="px-4 py-2 text-sm w-full">
                    Learn More
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
