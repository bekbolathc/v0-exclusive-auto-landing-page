"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20узнать%20точную%20цену"

const priceRanges = [
  { material: "Экокожа", price: "от 70 000 ₸", description: "Практичный выбор" },
  { material: "Комбинированные", price: "от 90 000 ₸", description: "Экокожа + алькантара" },
  { material: "Премиум", price: "от 120 000 ₸", description: "Алькантара / премиум" },
]

export function PricingSection() {
  return (
    <section className="py-20 md:py-28" id="pricing">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Сколько стоят авточехлы
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
            {priceRanges.map((item, index) => (
              <div
                key={item.material}
                className={`flex items-center justify-between p-6 ${
                  index !== priceRanges.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg">{item.material}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          Цена зависит от модели авто и фиксируется до начала работы
        </p>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Узнать точную цену за 5 минут
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
