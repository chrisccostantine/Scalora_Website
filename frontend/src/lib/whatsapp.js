const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '96181106116';
const DEFAULT_MESSAGE = "Hello Scalora, I'm interested in learning more about your services for my business.";

export function whatsappLink(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const whatsappNumber = WHATSAPP_NUMBER;
