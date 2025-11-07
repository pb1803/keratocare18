import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Mail, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { openWhatsApp } from "@/lib/whatsapp";

// Simplified contact form that ALWAYS works
const ContactFormReliable = () => {
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

    // Save to localStorage immediately
    try {
      const timestamp = new Date().toISOString();
      const savedMessages = JSON.parse(localStorage.getItem('keratocare_messages') || '[]');
      savedMessages.push({
        ...formData,
        timestamp,
        id: Date.now().toString()
      });
      localStorage.setItem('keratocare_messages', JSON.stringify(savedMessages));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }

    // Create email content
    const subject = encodeURIComponent(`KeratoCare Contact: ${formData.condition || 'General'} - ${formData.name}`);
    const body = encodeURIComponent(`
Hi KeratoCare Team,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Condition: ${formData.condition || 'Not specified'}

Message:
${formData.message || 'No additional message provided'}

---
Submitted: ${new Date().toLocaleString()}
Form: KeratoCare Contact Form
`);

    const mailtoLink = `mailto:keratocare.contact@gmail.com?subject=${subject}&body=${body}`;

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      condition: "",
      message: "",
      agreed: false,
    });

    // Show success message and open email
    toast.success("✅ Opening your email client with pre-filled message. Please send it!", {
      duration: 6000
    });

    // Open email client
    window.open(mailtoLink);
  };

  return (
    <Card className="p-8">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold">Send Us a Message</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-green-600 font-medium">Email Ready</span>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-700">
          📧 <strong>Reliable Email System:</strong> This form opens your email client with a pre-filled message. 
          Your message is also saved locally as backup.
        </p>
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

        <div className="space-y-3">
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-lg py-3">
            <Mail className="w-5 h-5 mr-2" />
            Open Email Client
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              type="button"
              variant="outline"
              onClick={() => window.open('tel:+917276861131')}
              className="flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => openWhatsApp('generalInquiry')}
              className="flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ContactFormReliable;