import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const swatches = [
  { label: "Ромб", bg: "#c4a882", line: "#111111", d: "M0 12 L12 0 L24 12 L12 24 Z" },
  { label: "Соты", bg: "#111111", line: "#cc2222", d: "M6 1 L18 1 L23 12 L18 23 L6 23 L1 12 Z" },
  { label: "Гладкий", bg: "#7b4226", line: "#7b4226", d: "" },
]

export function ConfiguratorTeaser() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="teaser-title">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10 items-center rounded-2xl border border-border/50 bg-card p-8 md:p-12">
          <div>
            <h2 id="teaser-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Соберите чехлы под свою машину — до визита
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-prose">
              Выберите материал, цвет болстеров и вставки, узор и нитку. Вращайте сиденье в 3D,
              увидьте цену сразу и отправьте готовую конфигурацию мастеру в WhatsApp.
            </p>
            <Button size="lg" className="h-auto max-w-full whitespace-normal text-center text-lg px-8 py-6" asChild>
              <Link href="/konfigurator">
                Открыть 3D конструктор
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3" aria-hidden="true">
            {swatches.map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <svg viewBox="0 0 96 128" className="w-full rounded-lg" style={{ background: s.bg }}>
                  {s.d && (
                    <defs>
                      <pattern id={`p-${s.label}`} width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d={s.d} fill="none" stroke={s.line} strokeWidth="1.5" opacity="0.85" />
                      </pattern>
                    </defs>
                  )}
                  {s.d && <rect width="96" height="128" fill={`url(#p-${s.label})`} />}
                </svg>
                <span className="text-sm text-muted-foreground text-center">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
