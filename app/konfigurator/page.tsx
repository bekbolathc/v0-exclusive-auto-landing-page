import type { Metadata } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { Footer } from '@/components/landing/footer'
import { StickyWhatsApp } from '@/components/landing/sticky-whatsapp'
import { ConfiguratorLoader } from '@/components/configurator/ConfiguratorLoader'

export const metadata: Metadata = {
  title: '3D Конструктор авточехлов — Настройте онлайн и узнайте цену',
  description:
    'Сконфигурируйте авточехлы в 3D онлайн. Выберите материал (экокожа, алькантара), цвет, узор прострочки под вашу модель. Мгновенная цена. Заказ через WhatsApp.',
  alternates: {
    canonical: 'https://exclusive-auto.kz/konfigurator',
  },
}

export default function ConfiguratorPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-12 md:py-16">
        <div className="container px-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Эксклюзивный инструмент
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              3D Конструктор авточехлов в Алматы
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Настройте авточехлы под свой автомобиль прямо сейчас — выберите
              материал, цвет и узор, увидьте результат в реальном времени и
              получите точную цену.
            </p>
          </div>

          {/* Configurator */}
          <ConfiguratorLoader />

          {/* Trust block */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border/50 pt-10">
            {[
              { num: '10 000+', text: 'установок в Алматы' },
              { num: '2 000+', text: 'лекал под модели авто' },
              { num: '12 мес',  text: 'гарантия на работу' },
              { num: '1–2 дня', text: 'срок изготовления' },
            ].map(item => (
              <div key={item.num} className="text-center">
                <p className="text-2xl font-bold text-primary">{item.num}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
