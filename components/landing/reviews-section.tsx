"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Star } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77001234567?text=Здравствуйте!%20Хочу%20получить%20консультацию"

const reviews = [
  {
    name: "Азамат",
    car: "Camry 75",
    text: "Сел идеально, как с завода. Сделали за 2 дня.",
    rating: 5,
  },
  {
    name: "Дастан",
    car: "Kia K5",
    text: "Очень доволен качеством. Материал отличный, строчка ровная.",
    rating: 5,
  },
  {
    name: "Марат",
    car: "BMW X5",
    text: "Премиум вариант взял — выглядит шикарно. Рекомендую.",
    rating: 5,
  },
  {
    name: "Алихан",
    car: "Lexus RX",
    text: "Третий раз обращаюсь. Теперь и на жене машину сделали.",
    rating: 5,
  },
  {
    name: "Нурлан",
    car: "Hyundai Sonata",
    text: "Цена адекватная, качество на высоте. Спасибо!",
    rating: 5,
  },
  {
    name: "Ерлан",
    car: "Toyota Highlander",
    text: "Ребята профессионалы. Быстро и качественно.",
    rating: 5,
  },
]

export function ReviewsSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="reviews">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-muted-foreground">
            Более 300 довольных клиентов в Алматы
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4">{`"${review.text}"`}</p>
                <div className="text-sm">
                  <span className="font-bold">{review.name}</span>
                  <span className="text-muted-foreground"> • {review.car}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Получить консультацию
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
