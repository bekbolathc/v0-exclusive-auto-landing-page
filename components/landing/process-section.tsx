"use client"

import { Send, Calculator, Scissors, Wrench } from "lucide-react"


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
      </div>
    </section>
  )
}
