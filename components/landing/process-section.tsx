"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Send, Calculator, Scissors, Wrench } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77001234567?text=Здравствуйте!%20Хочу%20заказать%20авточехлы"

const steps = [
  {
    number: 1,
    icon: Send,
    title: "Пишите в WhatsApp",
    description: "Отправьте модель вашего авто",
  },
  {
    number: 2,
    icon: Calculator,
    title: "Получаете цену",
    description: "Фиксируем стоимость сразу",
  },
  {
    number: 3,
    icon: Scissors,
    title: "Изготавливаем",
    description: "Шьём за 1–2 дня",
  },
  {
    number: 4,
    icon: Wrench,
    title: "Устанавливаем",
    description: "Профессиональный монтаж",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="process">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            От заявки до установки — за 1–2 дня
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold md:right-1/4">
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-foreground/80 mb-8">
          Можно выбрать материалы вживую
        </p>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Написать сейчас
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
