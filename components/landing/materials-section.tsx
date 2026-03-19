"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Droplets, Sparkles, Layers } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Помогите%20подобрать%20материал"

const materials = [
  {
    name: "Экокожа",
    image: "/images/material-ecoleather.jpg",
    icon: Droplets,
    features: [
      "Практичная",
      "Легко чистится",
      "Не боится влаги",
    ],
  },
  {
    name: "Алькантара",
    image: "/images/material-alcantara.jpg",
    icon: Sparkles,
    features: [
      "Мягкая",
      "Премиальный внешний вид",
      "Не скользит",
    ],
  },
  {
    name: "Комбинированные",
    image: "/images/material-combo.jpg",
    icon: Layers,
    features: [
      "Алькантара + экокожа",
      "Баланс цены и внешнего вида",
      "Оптимальный выбор",
    ],
  },
]

export function MaterialsSection() {
  return (
    <section className="py-20 md:py-28" id="materials">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Подберём материал под ваш стиль и бюджет
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {materials.map((material) => (
            <div
              key={material.name}
              className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-video">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <material.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{material.name}</h3>
                </div>
                <ul className="space-y-2">
                  {material.features.map((feature) => (
                    <li key={feature} className="text-foreground/80">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-8">
          Не используем дешёвые материалы, которые трескаются
        </p>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Подобрать материал
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
