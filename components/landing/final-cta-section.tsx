"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20узнать%20цену%20на%20авточехлы"
const PHONE_NUMBER = "tel:+77079829824"

export function FinalCTASection() {
  return (
    <section className="py-20 md:py-28" id="contact">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Рассчитаем стоимость под вашу машину за 5 минут
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Просто напишите модель авто — ответим быстро
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90"
              asChild
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6 mr-2" />
                Узнать цену в WhatsApp
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-7 border-foreground/20 hover:bg-foreground/10"
              asChild
            >
              <a href={PHONE_NUMBER}>
                <Phone className="w-6 h-6 mr-2" />
                Позвонить
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            г. Алматы, ул. Тимирязева 42 к15/5, БЦ Азия Мост • Работаем ежедневно с 9:00 до 20:00
          </p>
        </div>
      </div>
    </section>
  )
}
