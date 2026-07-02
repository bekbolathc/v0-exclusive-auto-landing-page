"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20рассчитать%20стоимость%20под%20мою%20машину"

const carBrands = [
  { name: "Toyota", models: "Camry, Land Cruiser, RAV4" },
  { name: "Lexus", models: "RX, ES, GX" },
  { name: "BMW", models: "3, 5, X5, X7" },
  { name: "Mercedes", models: "C, E, S-Class, GLC" },
  { name: "Kia", models: "K5, K7, Sportage" },
  { name: "Hyundai", models: "Sonata, Tucson, Santa Fe" },
  { name: "Chery", models: "Tiggo 7 Pro, Tiggo 8 Pro" },
  { name: "Haval", models: "Jolion, F7, H9, Dargo" },
  { name: "Geely", models: "Coolray, Atlas Pro, Monjaro" },
  { name: "Changan", models: "CS55 Plus, CS75 Plus, UNI-K" },
  { name: "Exeed", models: "TXL, VX, LX" },
  { name: "Chevrolet", models: "Cobalt, Captiva, TrailBlazer" },
  { name: "Jetour", models: "Dashing, X70 Plus, X90 Plus" },
]

export function CarModelsSection() {
  return (
    <section className="py-20 md:py-28" id="models">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Авточехлы в Алматы под любую модель авто
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 2 000 лекал — подбираем под каждую модель, чехлы садятся без складок и провисаний
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {carBrands.map((brand) => (
            <div
              key={brand.name}
              className="bg-card border border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
              <p className="text-sm text-muted-foreground">{brand.models}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-8">
          И многие другие марки и модели
        </p>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Рассчитать под мою машину
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
