"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20узнать%20цену%20на%20авточехлы"

export function StickyWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 group"
      aria-label="Написать в WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline font-medium">Написать</span>
    </a>
  )
}
