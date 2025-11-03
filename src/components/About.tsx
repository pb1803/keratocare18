import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, GraduationCap, Shield, Star, Quote } from "lucide-react";
import doctorProfile from "@/assets/doctor-profile.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Trusted Excellence in Vision Care</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Led by a Fellowship-trained specialist dedicated to complex vision solutions
          </p>

          {/* Doctor Profile */}
          <Card className="p-8 mb-12 card-hover">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative">
                  <img
                    src={doctorProfile}
                    alt="Dr. Rushikesh Tilekar - Fellowship-trained Optometrist"
                    className="w-full rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-secondary text-white p-3 rounded-lg shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Dr. Rushikesh Tilekar</h3>
                  <p className="text-muted-foreground">Optometrist</p>
                  <p className="text-primary font-semibold">Fellowship in Specialty Contact Lenses</p>
                </div>
                <p className="text-foreground leading-relaxed">
                  "Specialty contact lens practice & dispensing for irregular cornea & complex eye conditions. With over 15 years of dedicated service, I've helped thousands of patients regain their vision and quality of life through advanced specialty contact lens solutions."
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-accent px-4 py-2 rounded-lg">
                    <Award className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-semibold">Board Certified</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent px-4 py-2 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-semibold">Fellowship Trained</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">View Full Bio</Button>
                  <Button className="bg-primary hover:bg-primary/90">Connect</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { number: "5000+", label: "Patients Treated" },
              { number: "15+", label: "Years Experience" },
              { number: "98%", label: "Success Rate" },
              { number: "4.9/5.0", label: "Patient Rating" },
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">What Our Patients Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya M.",
                  location: "Pune, 28",
                  rating: 5,
                  text: "My vision went from completely blurry and distorted to crisp and clear. Dr. Tilekar explained everything and made me feel confident about the lenses. It changed my life!",
                  before: "-8.50 (severe keratoconus)",
                  after: "20/25 vision (corrected)",
                  lens: "Scleral",
                },
                {
                  name: "Amit K.",
                  location: "Pune, 35",
                  rating: 5,
                  text: "I was told I'd never see clearly again. Dr. Tilekar proved them wrong. The custom lenses are comfortable and my vision is better than it's been in years.",
                  before: "Couldn't drive at night",
                  after: "Clear night vision",
                  lens: "Hybrid",
                },
                {
                  name: "Sneha R.",
                  location: "Pune, 24",
                  rating: 5,
                  text: "Professional, knowledgeable, and caring. The entire process was smooth and the results exceeded my expectations. Highly recommend!",
                  before: "Struggled with reading",
                  after: "Reading without strain",
                  lens: "Mini Scleral",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 card-hover">
                  <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange text-orange" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">{testimonial.text}</p>
                  <div className="border-t pt-4 space-y-2">
                    <div className="font-semibold text-foreground">
                      {testimonial.name} <span className="text-muted-foreground font-normal">| {testimonial.location}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="text-muted-foreground">Before: {testimonial.before}</div>
                      <div className="text-secondary font-semibold">After: {testimonial.after}</div>
                      <div className="text-xs text-muted-foreground">Lens Type: {testimonial.lens}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Hospital Affiliations */}
          <Card className="p-8 text-center">
            <h3 className="text-xl font-bold mb-6">Hospital Affiliations</h3>
            <p className="text-muted-foreground mb-6">
              Serving patients across multiple hospitals in Pune
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-neutral-light-gray rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-muted-foreground">Hospital {i + 1}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
