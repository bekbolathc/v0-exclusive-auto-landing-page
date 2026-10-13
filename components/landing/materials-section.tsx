"use client"

import Image from "next/image"


const materials = [
  {
    name: "Экокожа",
    image: "/images/material-ecoleather.jpg",
    features: [
      "Практичная",
      "Легко чистится",
      "Не боится влаги",
    ],
  },
  {
    name: "Алькантара",
    image: "/images/material-alcantara.jpg",
    features: [
      "Мягкая",
      "Премиальный внешний вид",
      "Не скользит",
    ],
  },
  {
    name: "Комбинированные",
    image: "/images/material-combo.jpg",
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
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">
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
                <h3 className="font-display text-3xl font-semibold mb-4">{material.name}</h3>
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
      </div>
    </section>
  )
}
