"use client"



const steps = [
  {
    number: 1,
    title: "Пишите в WhatsApp",
    description: "Отправьте модель вашего авто",
  },
  {
    number: 2,
    title: "Получаете цену",
    description: "Фиксируем стоимость сразу",
  },
  {
    number: 3,
    title: "Изготавливаем",
    description: "Шьём за 1–2 дня",
  },
  {
    number: 4,
    title: "Устанавливаем",
    description: "Профессиональный монтаж",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="process">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">
            От заявки до установки — за 1–2 дня
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {steps.map((step) => (
            <div key={step.number} className="text-left border-t border-dashed border-leather/50 pt-5">
              <div className="font-display text-6xl font-semibold text-leather leading-none mb-3" aria-hidden="true">{step.number}</div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-foreground/80 mb-8">
          Можно выбрать материалы вживую
        </p>
      </div>
    </section>
  )
}
