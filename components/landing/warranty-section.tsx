"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Shield, Check } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77001234567?text=Здравствуйте!%20Хочу%20узнать%20условия%20гарантии"

const warrantyPoints = [
  "Не трескается",
  "Не расходятся швы",
  "Исправим бесплатно",
]

export function WarrantySection() {
  return (
    <section className="py-20 md:py-28" id="warranty">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Гарантия 12 месяцев
                </h2>
                <ul className="space-y-3 mb-6">
                  {warrantyPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 justify-center md:justify-start">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/90">{point}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Узнать условия
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
