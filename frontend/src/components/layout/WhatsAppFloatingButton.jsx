import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../lib/whatsapp';

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Scalora on WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
