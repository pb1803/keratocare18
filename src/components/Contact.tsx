import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { openWhatsApp } from "@/lib/whatsapp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    condition: "",
    message: "",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      toast.error("Please agree to the privacy policy");
      return;
    }
    
    // Send message via WhatsApp
    const whatsappMessage = `Hello! I'm sending you a message from the KeratoCare website.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Condition: ${formData.condition || 'Not specified'}
Message: ${formData.message || 'No additional message'}

Please get back to me at your earliest convenience.

Thank you!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917276861131?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    toast.success("Redirecting to WhatsApp - We'll respond within 24 hours");
    setFormData({
      name: "",
      email: "",
      phone: "",
      condition: "",
      message: "",
      agreed: false,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Connect For Clarity</h2>
          <p className="text-center text-muted-foreground mb-12">
            Multiple ways to reach us - choose what works for you
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <Card className="p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Phone - Instant Connect</h3>
                    <p className="text-2xl font-bold text-primary mb-2">+91 72768 61131</p>
                    <p className="text-sm text-muted-foreground mb-3">Available 24/7 for consultations</p>
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <a href="tel:+917276861131">Call Now</a>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">WhatsApp - Quick Response</h3>
                    <p className="text-sm text-muted-foreground mb-3">Typically respond in 15 minutes</p>
                    <Button 
                      className="w-full bg-secondary hover:bg-secondary/90"
                      onClick={() => openWhatsApp('generalInquiry')}
                    >
                      Open WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Email - Secure & HIPAA Compliant</h3>
                    <p className="text-primary font-semibold mb-2">hello@keratocare.com</p>
                    <p className="text-sm text-muted-foreground mb-3">Detailed inquiries welcome</p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="mailto:hello@keratocare.com">Send Email</a>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p className="text-foreground mb-1">KeratoCare Consulting</p>
                    <p className="text-muted-foreground mb-2">Pune, Maharashtra</p>
                    <p className="text-sm text-muted-foreground">Service Area: Multiple hospitals across Pune</p>
                    <p className="text-sm font-semibold text-secondary mt-2">
                      Monday-Sunday, 9 AM - 6 PM
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keratoconus">Keratoconus</SelectItem>
                      <SelectItem value="post-surgery">Post-Surgery</SelectItem>
                      <SelectItem value="irregular-cornea">Irregular Cornea</SelectItem>
                      <SelectItem value="other">Other Corneal Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your vision concerns..."
                    rows={4}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to the HIPAA privacy policy and consent to being contacted
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        condition: "",
                        message: "",
                        agreed: false,
                      })
                    }
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
