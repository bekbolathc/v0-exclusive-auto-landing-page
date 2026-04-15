"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20подобрать%20вариант%20под%20мою%20машину"

const packages = [
  {
    name: "СТАНДАРТ",
    material: "Экокожа",
    price: "от 70 000 ₸",
    label: "Оптимально для ежедневной езды",
    features: [
      "Практичный материал",
      "Легко чистится",
      "Хороший внешний вид",
    ],
    popular: false,
  },
  {
    name: "КОМФОРТ",
    material: "Экокожа + алькантара",
    price: "от 90 000 ₸",
    label: "Самый популярный выбор",
    features: [
      "Мягкий центр",
      "Выглядит дороже",
      "Баланс цена/качество",
    ],
    popular: true,
  },
  {
    name: "ПРЕМИУМ",
    material: "Алькантара / премиум материалы",
    price: "от 120 000 ₸",
    label: "Максимальный комфорт",
    features: [
      "Максимальный комфорт",
      "Премиальный внешний вид",
      "Индивидуальный дизайн",
    ],
    popular: false,
  },
]

export function PackagesSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="packages">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Выберите вариант под свой бюджет и стиль
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative flex flex-col bg-card border-border/50 ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Популярный выбор
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {pkg.material}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center">
                <ul className="space-y-3 mb-6 flex-1 w-full max-w-[200px]">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-foreground">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 mb-8">
          Не используем дешёвый дерматин — только качественные материалы
        </p>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Подобрать вариант под мою машину
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
