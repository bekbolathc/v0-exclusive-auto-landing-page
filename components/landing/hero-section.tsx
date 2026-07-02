"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Check } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20узнать%20цену%20на%20авточехлы"
const PHONE_NUMBER = "tel:+77079829824"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Пошив авточехлов из экокожи на заказ в Алматы — Exclusive Auto"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      </div>

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            Авточехлы в Алматы — пошив из экокожи под вашу модель
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Индивидуальный пошив авточехлов из экокожи и алькантары в Алматы. Идеальная посадка без складок. Изготовление за 1–2 дня. Бесплатная установка
          </p>

          {/* Benefits */}
          <ul className="space-y-3 mb-10">
            <li className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">Под конкретную модель авто (Camry, K5, BMW и др.)</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">Не универсальные — садятся как заводские</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">Более 10 000 установок в Алматы</span>
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              asChild
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Узнать цену в WhatsApp
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-foreground/20 hover:bg-foreground/10"
              asChild
            >
              <a href={PHONE_NUMBER}>
                <Phone className="w-5 h-5 mr-2" />
                Позвонить
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Ответим за 5 минут • Без обязательств
          </p>
        </div>

        {/* Before/After Preview */}
        <div className="hidden lg:block absolute right-8 bottom-20 w-80">
          <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-2xl">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square">
                <Image
                  src="/images/before-seats.jpg"
                  alt="До установки"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 text-xs bg-background/80 px-2 py-1 rounded">До</span>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/images/after-seats.jpg"
                  alt="После установки"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-primary px-2 py-1 rounded text-primary-foreground">После</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
