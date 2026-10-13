"use client"

import { Check } from "lucide-react"


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
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                  Гарантия 12 месяцев
                </h2>
                <ul className="space-y-3 ">
                  {warrantyPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 justify-center md:justify-start">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/90">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
