import Link from "next/link"
import { Phone, MessageCircle, MapPin } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77001234567"
const PHONE_NUMBER = "tel:+77001234567"
const PHONE_DISPLAY = "+7 700 123 45 67"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold text-xl inline-block mb-4">
              <span className="text-primary">Exclusive</span> Auto
            </Link>
            <p className="text-muted-foreground text-sm">
              Пошив авточехлов на заказ в Алматы. Качественные материалы, идеальная посадка, гарантия 12 месяцев.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={PHONE_NUMBER}
                  className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>г. Алматы, Казахстан</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold mb-4">Режим работы</h3>
            <p className="text-foreground/80">Ежедневно</p>
            <p className="text-foreground/80">с 9:00 до 20:00</p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Exclusive Auto. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
