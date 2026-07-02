"use client"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/77079829824?text=Здравствуйте!%20Хочу%20задать%20вопрос%20об%20авточехлах"

const faqs = [
  {
    question: "Сколько стоят авточехлы в Алматы?",
    answer: "Стоимость зависит от материала и модели авто. Авточехлы из экокожи — от 70 000 тг, комбинированные (экокожа + алькантара) — от 90 000 тг, премиум из алькантары — от 120 000 тг. Цена фиксируется до начала работы и не меняется. Напишите нам модель авто — рассчитаем точную стоимость за 5 минут.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer: "Изготовление авточехлов занимает 1–2 рабочих дня. После согласования заказа мы сразу приступаем к работе. Установка занимает около 2–3 часов. Запись на установку можно выбрать удобное для вас время.",
  },
  {
    question: "Какие материалы вы используете?",
    answer: "Мы работаем только с качественными материалами: экокожа премиум-класса, алькантара и их комбинации. Не используем дешёвый дерматин, который трескается через несколько месяцев. Все материалы можно потрогать вживую — приезжайте в наше ателье на ул. Тимирязева 42.",
  },
  {
    question: "Делаете ли вы установку?",
    answer: "Да, мы выполняем профессиональную установку бесплатно. Наши мастера аккуратно снимают старые чехлы и устанавливают новые. Установка включена в стоимость заказа.",
  },
  {
    question: "Подойдут ли чехлы на мою модель авто?",
    answer: "Мы шьём авточехлы под конкретную модель вашего авто по точным лекалам. У нас более 2 000 лекал для всех популярных марок — Toyota, Kia, Hyundai, Lexus, BMW, Mercedes, Chery, Haval и многих других. Чехлы садятся идеально, без складок и провисаний — как заводские.",
  },
  {
    question: "Можно ли выбрать цвет и дизайн?",
    answer: "Конечно! У нас большой выбор цветов и вариантов строчки (ромб, соты, гладкий). Можете приехать в наше ателье и выбрать материалы вживую или посмотреть примеры в WhatsApp. Мы поможем подобрать вариант под интерьер вашего авто.",
  },
  {
    question: "Какая гарантия на авточехлы?",
    answer: "Мы даём гарантию 12 месяцев на все наши изделия. Если швы разойдутся или материал потрескается — исправим бесплатно. За время работы мы сделали более 10 000 установок в Алматы, и качество — наш главный приоритет.",
  },
  {
    question: "Чем отличается экокожа от кожзама?",
    answer: "Экокожа — это современный качественный материал на тканевой основе с полиуретановым покрытием. Она не трескается, не выцветает, легко чистится и служит 5+ лет. Дешёвый кожзам (дерматин) на ПВХ-основе трескается уже через 1–2 года, особенно на морозе. Мы используем только экокожу и алькантару.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="faq">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Часто задаваемые вопросы об авточехлах в Алматы
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
