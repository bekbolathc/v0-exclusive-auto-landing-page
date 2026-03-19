"use client"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77001234567?text=Здравствуйте!%20Хочу%20задать%20вопрос"

const faqs = [
  {
    question: "Сколько времени занимает изготовление?",
    answer: "Изготовление авточехлов занимает 1-2 дня. После согласования заказа мы сразу приступаем к работе. Установка занимает около 2-3 часов.",
  },
  {
    question: "Какие материалы вы используете?",
    answer: "Мы работаем только с качественными материалами: экокожа премиум-класса, алькантара и их комбинации. Не используем дешёвый дерматин, который трескается через несколько месяцев.",
  },
  {
    question: "Делаете ли вы установку?",
    answer: "Да, мы выполняем профессиональную установку. Наши мастера аккуратно снимают старые чехлы и устанавливают новые. Всё входит в стоимость.",
  },
  {
    question: "Подойдут ли чехлы на мою модель авто?",
    answer: "Мы шьём чехлы под конкретную модель вашего авто по точным лекалам. Чехлы садятся идеально, без складок и провисаний — как заводские.",
  },
  {
    question: "Можно ли выбрать цвет и дизайн?",
    answer: "Конечно! У нас большой выбор цветов и вариантов строчки (ромб, соты, гладкий). Можете приехать и выбрать материалы вживую или посмотреть примеры в WhatsApp.",
  },
  {
    question: "Какая гарантия на чехлы?",
    answer: "Мы даём гарантию 12 месяцев на все наши изделия. Если швы разойдутся или материал потрескается — исправим бесплатно.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="faq">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Задать вопрос в WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
