// WhatsApp helper functions
const PHONE_NUMBER = "917276861131"; // Without + sign for WhatsApp URLs

export const whatsappMessages = {
  scheduleFitting: `Hi! I would like to schedule a specialty contact lens fitting for keratoconus treatment.

Could you please help me with:
• Available appointment slots
• What to bring for the fitting
• Duration of the appointment
• Consultation fees

Thank you!`,

  bookMapping: `Hello! I'm interested in booking an advanced corneal mapping session.

I would like to know:
• Available dates and times  
• Preparation required
• Cost of the mapping session
• How long the session takes

Looking forward to hearing from you!`,

  startProgram: `Hi there! I'm interested in starting your vision therapy program for keratoconus.

Please provide information about:
• Program duration and schedule
• What exercises are included
• Cost and payment options
• How to get started

Thank you for your time!`,

  generalInquiry: `Hi! I'd like to know more about keratoconus treatment and specialty contact lenses.

Could you please share:
• Treatment options available
• Success rates and outcomes
• Consultation process
• Pricing information

I look forward to your response!`,

  assessment: `Hello! I just completed the vision assessment on your website and would like to discuss my results.

Please let me know:
• Next steps based on my assessment
• Appointment availability
• What to expect during consultation
• Required documents or tests

Thank you!`,

  consultation: `Hi! I would like to book a free consultation for keratoconus treatment.

Please help me with:
• Available consultation slots
• What the consultation includes
• Duration of the appointment
• Location details

Looking forward to hearing from you!`
};

export const createWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (messageType: keyof typeof whatsappMessages): void => {
  const message = whatsappMessages[messageType];
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
};