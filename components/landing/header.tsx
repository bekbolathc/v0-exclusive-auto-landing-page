"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"

const phoneNumber = "tel:+77079829824"
const phoneDisplay = "+7 (707) 982-98-24"

const navLinks = [
  { href: "#packages", label: "Пакеты" },
  { href: "#gallery", label: "Работы" },
  { href: "#materials", label: "Материалы" },
  { href: "#pricing", label: "Цены" },
  { href: "#faq", label: "Вопросы" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            <span className="text-primary">Exclusive</span> Auto
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2"
              asChild
            >
              <a href={phoneNumber}>
                <Phone className="w-4 h-4" />
                <span>{phoneDisplay}</span>
              </a>
            </Button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={phoneNumber}
                className="flex items-center gap-2 px-4 py-2 text-primary font-medium"
              >
                <Phone className="w-4 h-4" />
                {phoneDisplay}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
