import React from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../lib/ctw";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-float"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] px-5 py-3 font-semibold text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,211,102,0.4)]"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">Aula experimental</span>
    </a>
  );
}
