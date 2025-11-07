import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { openWhatsApp } from "@/lib/whatsapp";
import { 
  storeMessageSilently,
  generateWhatsAppMessage,
  ContactFormData 
} from "@/lib/admin-storage";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    condition: "",
    message: "",
    agreed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      toast.error("Please agree to the privacy policy");
      return;
    }
    
    // Prepare data for storage
    const contactData: ContactFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      condition: formData.condition || "Not specified",
      message: formData.message || "No additional message",
    };

    try {
      // 🔒 SILENT ADMIN STORAGE (user doesn't see this)
      const storedMessage = storeMessageSilently(contactData);
      
      // 🎯 USER EXPERIENCE: Show success and redirect to WhatsApp
      toast.success("✅ Message received!", {
        description: "Redirecting to WhatsApp for instant support...",
        duration: 3000
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        condition: "",
        message: "",
        agreed: false,
      });
      
      // 💬 Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        const whatsappMessage = generateWhatsAppMessage(contactData);
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/917276861131?text=${encodedMessage}`;
        
        // Open WhatsApp in new window
        window.open(whatsappUrl, '_blank');
        
        toast.info("💚 WhatsApp opened! Send your message there.", {
          duration: 5000
        });
      }, 2000);
      
    } catch (error) {
      console.error("Error handling form submission:", error);
      
      // Even if storage fails, still redirect to WhatsApp
      toast.success("✅ Message received! Redirecting to WhatsApp...");
      
      setTimeout(() => {
        const whatsappMessage = generateWhatsAppMessage(contactData);
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/917276861131?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      }, 1500);
    }
  };

  const handleExportAll = () => {
    // This function is for admin use only - not accessible to regular users
    console.log("Admin export function called");
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

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p className="text-foreground mb-1">KeratoCare Consulting</p>
                    <p className="text-muted-foreground mb-2">Pune, Maharashtra</p>
                    <p className="text-sm text-muted-foreground">Specialized keratoconus care and consultation</p>
                    <p className="text-sm font-semibold text-secondary mt-2">
                      Monday-Sunday, 9 AM - 6 PM
                    </p>
                  </div>
                </div>
              </Card>

              {/* Google Maps */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  Find Us on Map
                </h3>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.78285788757!2d73.72262025!3d18.52460675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699385760000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KeratoCare Consulting Location - Pune, Maharashtra"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="mt-3 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs"
                  >
                    <a
                      href="https://maps.google.com/?q=Pune,Maharashtra"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Send Us a Message</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">WhatsApp Ready</span>
                </div>
              </div>

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
                    Send via WhatsApp
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

                <div className="text-xs text-muted-foreground text-center pt-2">
                  � You'll be redirected to WhatsApp to complete your message.
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