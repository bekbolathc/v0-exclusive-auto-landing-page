"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BeforeAfter } from "./before-after"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20такие%20же%20чехлы"

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
]

export function GallerySection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="gallery">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">
            Посмотрите, как меняется салон
          </h2>
        </div>

        <BeforeAfter before={galleryItems[0].before!} after={galleryItems[0].after!} caption={galleryItems[0].caption} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {galleryItems.slice(1).map((item, index) => (
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
                      sizes="(min-width: 1024px) 16rem, 50vw"
                      className="object-cover"
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
            className="h-auto max-w-full whitespace-normal text-center text-lg px-8 py-6 bg-primary hover:bg-primary/90"
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
