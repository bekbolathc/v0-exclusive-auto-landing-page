"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77001234567?text=Здравствуйте!%20Хочу%20такие%20же%20чехлы"

const galleryItems = [
  {
    before: "/images/before-seats.jpg",
    after: "/images/after-seats.jpg",
    caption: "Toyota Camry 70 — экокожа + алькантара, ромб",
  },
  {
    image: "/images/gallery-1.jpg",
    caption: "Kia K5 — экокожа, чёрный/красный",
  },
  {
    image: "/images/gallery-2.jpg",
    caption: "BMW 5 серии — алькантара, серый",
  },
  {
    image: "/images/gallery-3.jpg",
    caption: "Lexus RX — экокожа, бежевый/коричневый",
  },
  {
    image: "/images/stitching-detail.jpg",
    caption: "Детали строчки — ручная работа",
  },
  {
    image: "/images/hero-interior.jpg",
    caption: "Премиум отделка салона",
  },
]

export function GallerySection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="gallery">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Посмотрите, как меняется салон
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {galleryItems.map((item, index) => (
            <div key={index} className="group">
              {'before' in item && item.before ? (
                <div className="relative rounded-lg overflow-hidden border border-border/50">
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.before}
                        alt="До установки"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 text-xs bg-background/80 px-2 py-1 rounded">
                        До
                      </span>
                    </div>
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.after!}
                        alt="После установки"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 right-2 text-xs bg-primary px-2 py-1 rounded text-primary-foreground">
                        После
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-card">
                    <p className="text-sm text-foreground/90">{item.caption}</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image!}
                      alt={item.caption}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-card">
                    <p className="text-sm text-foreground/90">{item.caption}</p>
                  </div>
                </div>
              )}
            </div>
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
              Хочу так же
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
