"use client"

import { useState } from "react"
import Image from "next/image"
import { MoveHorizontal } from "lucide-react"

export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: string
  after: string
  caption: string
}) {
  const [pos, setPos] = useState(50)

  return (
    <figure className="max-w-5xl mx-auto mb-10">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/50 select-none">
        <Image src={after} alt={`После: ${caption}`} fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`До: ${caption}`} fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        </div>

        {/* Seam — dashed like a stitch line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px border-l-2 border-dashed border-leather"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center size-11 rounded-full bg-leather text-leather-foreground shadow-lg shadow-black/40">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        <span className="absolute top-3 left-3 rounded bg-background/85 px-2 py-1 text-xs">До</span>
        <span className="absolute top-3 right-3 rounded bg-leather px-2 py-1 text-xs text-leather-foreground">После</span>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Сравнить до и после"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  )
}
