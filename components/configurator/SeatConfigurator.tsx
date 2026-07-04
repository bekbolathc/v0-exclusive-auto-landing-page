'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { MessageCircle, Share2, Check, RotateCcw } from 'lucide-react'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type MaterialType = 'ekokozha' | 'combo' | 'alkantara'
type PatternType = 'plain' | 'rhomb' | 'honeycomb' | 'bugatti'

interface SeatConfig {
  carBrand: string
  carModel: string
  material: MaterialType
  mainColor: string
  insertColor: string
  stitchColor: string
  pattern: PatternType
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const COLORS = [
  { id: 'black',    label: 'Чёрный',      hex: '#111111' },
  { id: 'darkgray', label: 'Тёмно-серый', hex: '#383838' },
  { id: 'gray',     label: 'Серый',       hex: '#888888' },
  { id: 'beige',    label: 'Бежевый',     hex: '#c4a882' },
  { id: 'brown',    label: 'Коричневый',  hex: '#7b4226' },
  { id: 'navy',     label: 'Тёмно-синий', hex: '#1c2d54' },
  { id: 'burgundy', label: 'Бордовый',    hex: '#6b1c1c' },
  { id: 'cream',    label: 'Молочный',    hex: '#f0ece0' },
  { id: 'red',      label: 'Красный',     hex: '#8b1414' },
  { id: 'olive',    label: 'Хаки',        hex: '#5c5a2e' },
]

const STITCH_COLORS = [
  { id: 'black',  hex: '#111111' },
  { id: 'white',  hex: '#f0ece0' },
  { id: 'beige',  hex: '#c4a882' },
  { id: 'red',    hex: '#cc2222' },
  { id: 'blue',   hex: '#2244aa' },
  { id: 'orange', hex: '#cc6600' },
]

const PATTERNS: { id: PatternType; label: string; desc: string }[] = [
  { id: 'plain',     label: 'Гладкий', desc: 'Без рисунка'   },
  { id: 'rhomb',     label: 'Ромб',    desc: 'Классика'       },
  { id: 'honeycomb', label: 'Соты',    desc: 'Шестиугольники' },
  { id: 'bugatti',   label: 'Ромб 3D', desc: 'Объёмный'      },
]

const CAR_CATALOG: Record<string, {
  label: string
  models: { id: string; label: string; cls: 'compact' | 'mid' | 'premium' }[]
}> = {
  toyota:    { label: 'Toyota',    models: [
    { id: 'camry',       label: 'Camry',         cls: 'mid'     },
    { id: 'land-cruiser',label: 'Land Cruiser',  cls: 'premium' },
    { id: 'rav4',        label: 'RAV4',          cls: 'mid'     },
    { id: 'corolla',     label: 'Corolla',       cls: 'mid'     },
  ]},
  kia:       { label: 'Kia',       models: [
    { id: 'k5',       label: 'K5',       cls: 'mid'     },
    { id: 'sportage', label: 'Sportage', cls: 'mid'     },
    { id: 'cerato',   label: 'Cerato',   cls: 'mid'     },
    { id: 'rio',      label: 'Rio',      cls: 'compact' },
  ]},
  hyundai:   { label: 'Hyundai',   models: [
    { id: 'sonata',   label: 'Sonata',   cls: 'mid' },
    { id: 'tucson',   label: 'Tucson',   cls: 'mid' },
    { id: 'santa-fe', label: 'Santa Fe', cls: 'mid' },
  ]},
  lexus:     { label: 'Lexus',     models: [
    { id: 'rx',  label: 'RX',       cls: 'premium' },
    { id: 'lx',  label: 'LX 570',   cls: 'premium' },
    { id: 'es',  label: 'ES',       cls: 'premium' },
  ]},
  bmw:       { label: 'BMW',       models: [
    { id: '3',  label: '3 серия', cls: 'mid'     },
    { id: '5',  label: '5 серия', cls: 'premium' },
    { id: 'x5', label: 'X5',      cls: 'premium' },
    { id: 'x7', label: 'X7',      cls: 'premium' },
  ]},
  mercedes:  { label: 'Mercedes',  models: [
    { id: 'c', label: 'C-Class', cls: 'mid'     },
    { id: 'e', label: 'E-Class', cls: 'premium' },
    { id: 's', label: 'S-Class', cls: 'premium' },
    { id: 'glc', label: 'GLC',   cls: 'premium' },
  ]},
  chevrolet: { label: 'Chevrolet', models: [
    { id: 'cobalt',     label: 'Cobalt',     cls: 'compact' },
    { id: 'captiva',    label: 'Captiva',    cls: 'mid'     },
    { id: 'trailblazer',label: 'TrailBlazer',cls: 'mid'     },
  ]},
  haval:     { label: 'Haval',     models: [
    { id: 'jolion', label: 'Jolion', cls: 'mid'     },
    { id: 'f7',     label: 'F7',     cls: 'mid'     },
    { id: 'h9',     label: 'H9',     cls: 'premium' },
    { id: 'dargo',  label: 'Dargo',  cls: 'mid'     },
  ]},
  chery:     { label: 'Chery',     models: [
    { id: 'tiggo7', label: 'Tiggo 7 Pro', cls: 'mid' },
    { id: 'tiggo8', label: 'Tiggo 8 Pro', cls: 'mid' },
  ]},
  geely:     { label: 'Geely',     models: [
    { id: 'coolray', label: 'Coolray',    cls: 'mid' },
    { id: 'atlas',   label: 'Atlas Pro',  cls: 'mid' },
    { id: 'monjaro', label: 'Monjaro',    cls: 'mid' },
  ]},
}

const CLS_PREMIUM: Record<string, number> = { compact: 0, mid: 10000, premium: 20000 }
const MAT_BASE: Record<MaterialType, number> = { ekokozha: 70000, combo: 90000, alkantara: 120000 }
const MAT_PROPS: Record<MaterialType, { roughness: number; metalness: number; label: string }> = {
  ekokozha:  { roughness: 0.28, metalness: 0.04, label: 'Экокожа'   },
  combo:     { roughness: 0.40, metalness: 0.02, label: 'Комбо'     },
  alkantara: { roughness: 0.92, metalness: 0.00, label: 'Алькантара'},
}

const DEFAULT_CONFIG: SeatConfig = {
  carBrand:    'toyota',
  carModel:    'camry',
  material:    'ekokozha',
  mainColor:   '#111111',
  insertColor: '#c4a882',
  stitchColor: '#c4a882',
  pattern:     'rhomb',
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function getPrice(config: SeatConfig): number {
  const base   = MAT_BASE[config.material]
  const model  = CAR_CATALOG[config.carBrand]?.models.find(m => m.id === config.carModel)
  const extra  = model ? CLS_PREMIUM[model.cls] : 0
  return base + extra
}

function createPatternTexture(
  baseColor: string,
  stitchColor: string,
  pattern: PatternType,
): THREE.CanvasTexture {
  const SIZE = 512
  const cv   = document.createElement('canvas')
  cv.width   = SIZE
  cv.height  = SIZE
  const ctx  = cv.getContext('2d')!

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, SIZE, SIZE)

  if (pattern === 'plain') {
    // subtle leather grain
    ctx.globalAlpha = 0.04
    for (let y = 0; y < SIZE; y += 2) {
      for (let x = 0; x < SIZE; x += 2) {
        if ((x + y) % 4 === 0) {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
    ctx.globalAlpha = 1
    const tex = new THREE.CanvasTexture(cv)
    return tex
  }

  ctx.strokeStyle = stitchColor
  ctx.globalAlpha  = 0.7

  if (pattern === 'rhomb') {
    const step = 64
    ctx.lineWidth = 1.6
    for (let row = -2; row < SIZE / (step / 2) + 2; row++) {
      const cy      = row * (step / 2)
      const xOff    = (row % 2 === 0) ? 0 : step / 2
      for (let col = -2; col < SIZE / step + 2; col++) {
        const cx = col * step + xOff
        ctx.beginPath()
        ctx.moveTo(cx,          cy - step / 2)
        ctx.lineTo(cx + step / 2, cy)
        ctx.lineTo(cx,          cy + step / 2)
        ctx.lineTo(cx - step / 2, cy)
        ctx.closePath()
        ctx.stroke()
      }
    }
  } else if (pattern === 'bugatti') {
    // 3D diamond: outer + inner highlight
    const step = 60
    for (let row = -2; row < SIZE / (step / 2) + 2; row++) {
      const cy   = row * (step / 2)
      const xOff = (row % 2 === 0) ? 0 : step / 2
      for (let col = -2; col < SIZE / step + 2; col++) {
        const cx = col * step + xOff
        ctx.strokeStyle = stitchColor
        ctx.lineWidth   = 2.2
        ctx.beginPath()
        ctx.moveTo(cx,          cy - step / 2)
        ctx.lineTo(cx + step / 2, cy)
        ctx.lineTo(cx,          cy + step / 2)
        ctx.lineTo(cx - step / 2, cy)
        ctx.closePath()
        ctx.stroke()
        // inner highlight
        const inner = step * 0.32
        ctx.strokeStyle = lightenHex(stitchColor, 50)
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.moveTo(cx,       cy - inner)
        ctx.lineTo(cx + inner, cy)
        ctx.lineTo(cx,       cy + inner)
        ctx.lineTo(cx - inner, cy)
        ctx.closePath()
        ctx.stroke()
      }
    }
  } else if (pattern === 'honeycomb') {
    const r   = 28
    const h   = r * Math.sqrt(3)
    ctx.lineWidth = 1.8
    for (let row = -2; row <= SIZE / h + 2; row++) {
      for (let col = -2; col <= SIZE / (r * 3) + 2; col++) {
        const cx = col * r * 3 + (row % 2 === 0 ? 0 : r * 1.5)
        const cy = row * h
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 6
          const px    = cx + r * Math.cos(angle)
          const py    = cy + r * Math.sin(angle)
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  ctx.globalAlpha = 1
  return new THREE.CanvasTexture(cv)
}

function lightenHex(hex: string, amt: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (n >> 16) + amt)
  const g = Math.min(255, ((n >> 8) & 0xff) + amt)
  const b = Math.min(255, (n & 0xff) + amt)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// ─────────────────────────────────────────────
// 3D SEAT MESH
// ─────────────────────────────────────────────

function CarSeat({ config }: { config: SeatConfig }) {
  const props     = MAT_PROPS[config.material]
  const roughness = props.roughness
  const metalness = props.metalness

  const [centerTex, setCenterTex] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    const tex = createPatternTexture(config.insertColor, config.stitchColor, config.pattern)
    setCenterTex(tex)
    return () => tex.dispose()
  }, [config.insertColor, config.stitchColor, config.pattern])

  const mainColor = config.mainColor

  return (
    <group position={[0, -0.15, 0]}>

      {/* ── BACKREST ── */}
      {/* Main body */}
      <RoundedBox args={[0.52, 0.66, 0.10]} radius={0.025} smoothness={4} position={[0, 0.38, 0]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Left bolster */}
      <RoundedBox args={[0.09, 0.60, 0.15]} radius={0.035} smoothness={4} position={[-0.27, 0.36, 0.025]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Right bolster */}
      <RoundedBox args={[0.09, 0.60, 0.15]} radius={0.035} smoothness={4} position={[0.27, 0.36, 0.025]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Center panel */}
      <RoundedBox args={[0.30, 0.55, 0.006]} radius={0.012} smoothness={4} position={[0, 0.375, 0.054]}>
        {centerTex
          ? <meshStandardMaterial map={centerTex} roughness={roughness + 0.1} metalness={0} />
          : <meshStandardMaterial color={config.insertColor} roughness={roughness + 0.1} metalness={0} />
        }
      </RoundedBox>

      {/* ── HEADREST ── */}
      <RoundedBox args={[0.30, 0.20, 0.10]} radius={0.03} smoothness={4} position={[0, 0.79, 0.01]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Headrest center */}
      <RoundedBox args={[0.19, 0.13, 0.005]} radius={0.01} smoothness={4} position={[0, 0.79, 0.062]}>
        {centerTex
          ? <meshStandardMaterial map={centerTex} roughness={roughness + 0.1} metalness={0} />
          : <meshStandardMaterial color={config.insertColor} roughness={roughness + 0.1} metalness={0} />
        }
      </RoundedBox>

      {/* Headrest posts */}
      <mesh position={[-0.07, 0.645, 0]}>
        <cylinderGeometry args={[0.010, 0.010, 0.12, 8]} />
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </mesh>
      <mesh position={[0.07, 0.645, 0]}>
        <cylinderGeometry args={[0.010, 0.010, 0.12, 8]} />
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* ── CUSHION ── */}
      {/* Main cushion body */}
      <RoundedBox args={[0.54, 0.085, 0.50]} radius={0.03} smoothness={4} position={[0, 0.00, 0.14]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Left cushion bolster */}
      <RoundedBox args={[0.09, 0.10, 0.44]} radius={0.035} smoothness={4} position={[-0.27, 0.04, 0.12]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Right cushion bolster */}
      <RoundedBox args={[0.09, 0.10, 0.44]} radius={0.035} smoothness={4} position={[0.27, 0.04, 0.12]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Cushion center panel */}
      <RoundedBox args={[0.30, 0.005, 0.38]} radius={0.01} smoothness={4} position={[0, 0.048, 0.11]}>
        {centerTex
          ? <meshStandardMaterial map={centerTex} roughness={roughness + 0.1} metalness={0} />
          : <meshStandardMaterial color={config.insertColor} roughness={roughness + 0.1} metalness={0} />
        }
      </RoundedBox>

      {/* Front roll */}
      <RoundedBox args={[0.54, 0.10, 0.09]} radius={0.04} smoothness={4} position={[0, 0.002, 0.385]}>
        <meshStandardMaterial color={mainColor} roughness={roughness} metalness={metalness} />
      </RoundedBox>

    </group>
  )
}

// ─────────────────────────────────────────────
// 3D SCENE
// ─────────────────────────────────────────────

function SceneBackground() {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#0f0f11')
    return () => { scene.background = null }
  }, [scene])
  return null
}

function Scene({ config }: { config: SeatConfig }) {
  return (
    <>
      <SceneBackground />

      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={1.4} castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-camera-right={2}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.25} />
      <pointLight position={[0, 4, 4]} intensity={0.6} color="#ffe8d4" />

      <Environment preset="studio" />

      <Suspense fallback={null}>
        <CarSeat config={config} />
      </Suspense>

      <ContactShadows
        position={[0, -0.56, 0]}
        opacity={0.55}
        scale={3}
        blur={2.5}
        far={2}
      />

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 10}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={1.3}
        maxDistance={3.5}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </>
  )
}

// ─────────────────────────────────────────────
// SMALL UI PIECES
// ─────────────────────────────────────────────

function ColorSwatch({
  hex, label, selected, onSelect,
}: { hex: string; label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      title={label}
      style={{ backgroundColor: hex }}
      className={`w-8 h-8 rounded-full border-2 transition-all ${
        selected
          ? 'border-primary scale-110 ring-2 ring-primary/40'
          : 'border-white/10 hover:scale-105 hover:border-white/30'
      }`}
    />
  )
}

const PATTERN_SVGS: Record<PatternType, React.ReactNode> = {
  plain: (
    <path d="M4 4 h32 v32 h-32 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  ),
  rhomb: (
    <g stroke="currentColor" strokeWidth="1.4" fill="none">
      <path d="M10 2 L20 10 L10 18 L0 10 Z" transform="translate(0,2)" />
      <path d="M10 2 L20 10 L10 18 L0 10 Z" transform="translate(20,2)" />
      <path d="M10 2 L20 10 L10 18 L0 10 Z" transform="translate(0,18)" />
      <path d="M10 2 L20 10 L10 18 L0 10 Z" transform="translate(20,18)" />
    </g>
  ),
  honeycomb: (
    <g stroke="currentColor" strokeWidth="1.4" fill="none">
      <polygon points="12,2 20,6 20,14 12,18 4,14 4,6" />
      <polygon points="28,2 36,6 36,14 28,18 20,14 20,6" />
      <polygon points="12,18 20,22 20,30 12,34 4,30 4,22" />
      <polygon points="28,18 36,22 36,30 28,34 20,30 20,22" />
    </g>
  ),
  bugatti: (
    <g stroke="currentColor" fill="none">
      <path strokeWidth="2" d="M10 2 L20 10 L10 18 L0 10 Z M30 2 L40 10 L30 18 L20 10 Z M10 18 L20 26 L10 34 L0 26 Z M30 18 L40 26 L30 34 L20 26 Z" transform="translate(0,2)" />
      <path strokeWidth="1" opacity="0.5" d="M10 5 L17 10 L10 15 L3 10 Z M30 5 L37 10 L30 15 L23 10 Z M10 21 L17 26 L10 31 L3 26 Z M30 21 L37 26 L30 31 L23 26 Z" transform="translate(0,2)" />
    </g>
  ),
}

function PatternCard({
  pattern, selected, onClick,
}: { pattern: typeof PATTERNS[0]; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
        selected
          ? 'border-primary bg-primary/10 shadow-sm shadow-primary/20'
          : 'border-border hover:border-primary/40 hover:bg-white/3'
      }`}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-foreground/70">
        {PATTERN_SVGS[pattern.id]}
      </svg>
      <span className="text-xs font-semibold leading-none">{pattern.label}</span>
      <span className="text-[10px] text-muted-foreground leading-none">{pattern.desc}</span>
    </button>
  )
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export function SeatConfigurator() {
  const [config, setConfig] = useState<SeatConfig>(DEFAULT_CONFIG)
  const [copied, setCopied]   = useState(false)
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null)

  const update = <K extends keyof SeatConfig>(key: K) => (val: SeatConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: val }))
  }

  const price        = getPrice(config)
  const brandData    = CAR_CATALOG[config.carBrand]
  const modelData    = brandData?.models.find(m => m.id === config.carModel)
  const mainColorLabel   = COLORS.find(c => c.hex === config.mainColor)?.label  ?? config.mainColor
  const insertColorLabel = COLORS.find(c => c.hex === config.insertColor)?.label ?? config.insertColor
  const patternLabel = PATTERNS.find(p => p.id === config.pattern)?.label ?? config.pattern

  const whatsappText = encodeURIComponent(
    `Здравствуйте! Хочу заказать авточехлы:\n` +
    `🚗 Авто: ${brandData?.label} ${modelData?.label ?? ''}\n` +
    `🎨 Материал: ${MAT_PROPS[config.material].label}\n` +
    `⬛ Основной цвет: ${mainColorLabel}\n` +
    `🟫 Вставка: ${insertColorLabel}\n` +
    `✂️ Узор: ${patternLabel}\n` +
    `💰 Ориентировочная стоимость: ${price.toLocaleString('ru-KZ')} тг`
  )

  const handleShare = async () => {
    const params = new URLSearchParams(config as unknown as Record<string, string>).toString()
    const url    = `${window.location.origin}/konfigurator?${params}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleReset = () => setConfig(DEFAULT_CONFIG)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

      {/* ── 3D CANVAS ── */}
      <div className="relative w-full h-[420px] md:h-[540px] rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
        <Canvas
          camera={{ position: [0.9, 0.55, 2.1], fov: 42 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Scene config={config} />
        </Canvas>

        {/* Reset camera button */}
        <button
          onClick={handleReset}
          title="Сбросить конфигурацию"
          className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <p className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-white/30 pointer-events-none">
          Тяните для вращения · Колесо для масштаба
        </p>
      </div>

      {/* ── CONTROLS ── */}
      <div className="flex flex-col gap-5 lg:max-h-[540px] overflow-y-auto pr-0.5">

        {/* Car selector */}
        <section>
          <p className="text-sm font-semibold mb-2">Ваш автомобиль</p>
          <div className="flex gap-2">
            <select
              value={config.carBrand}
              onChange={e => setConfig(prev => ({
                ...prev,
                carBrand: e.target.value,
                carModel: CAR_CATALOG[e.target.value].models[0].id,
              }))}
              className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.entries(CAR_CATALOG).map(([id, b]) => (
                <option key={id} value={id}>{b.label}</option>
              ))}
            </select>
            <select
              value={config.carModel}
              onChange={e => update('carModel')(e.target.value)}
              className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {brandData?.models.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Material */}
        <section>
          <p className="text-sm font-semibold mb-2">Материал</p>
          <div className="grid grid-cols-3 gap-2">
            {(['ekokozha', 'combo', 'alkantara'] as MaterialType[]).map(mat => (
              <button
                key={mat}
                onClick={() => update('material')(mat)}
                className={`py-2 px-2 rounded-lg border text-sm font-medium transition-all ${
                  config.material === mat
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {MAT_PROPS[mat].label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {config.material === 'ekokozha'  && 'Прочное полиуретановое покрытие. Легко чистится, служит 5+ лет'}
            {config.material === 'combo'     && 'Болстеры — экокожа, центральные вставки — алькантара'}
            {config.material === 'alkantara' && 'Мягкая замша премиум-класса. Не скользит, приятна на ощупь'}
          </p>
        </section>

        {/* Main color */}
        <section>
          <p className="text-sm font-semibold mb-2">
            Основной цвет <span className="font-normal text-muted-foreground">(болстеры)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <ColorSwatch
                key={c.id}
                hex={c.hex}
                label={c.label}
                selected={config.mainColor === c.hex}
                onSelect={() => update('mainColor')(c.hex)}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{mainColorLabel}</p>
        </section>

        {/* Insert color */}
        <section>
          <p className="text-sm font-semibold mb-2">
            Цвет центральной вставки
          </p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <ColorSwatch
                key={c.id}
                hex={c.hex}
                label={c.label}
                selected={config.insertColor === c.hex}
                onSelect={() => update('insertColor')(c.hex)}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{insertColorLabel}</p>
        </section>

        {/* Pattern */}
        <section>
          <p className="text-sm font-semibold mb-2">Узор прострочки</p>
          <div className="grid grid-cols-4 gap-2">
            {PATTERNS.map(p => (
              <PatternCard
                key={p.id}
                pattern={p}
                selected={config.pattern === p.id}
                onClick={() => update('pattern')(p.id)}
              />
            ))}
          </div>
        </section>

        {/* Stitch color */}
        <section>
          <p className="text-sm font-semibold mb-2">Цвет строчки</p>
          <div className="flex gap-2.5 flex-wrap">
            {STITCH_COLORS.map(c => (
              <button
                key={c.id}
                onClick={() => update('stitchColor')(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  config.stitchColor === c.hex
                    ? 'border-primary scale-110 ring-2 ring-primary/40'
                    : 'border-white/10 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Price */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 mt-1">
          <p className="text-sm text-muted-foreground mb-0.5">Ориентировочная стоимость</p>
          <p className="text-4xl font-bold text-primary tracking-tight">
            {price.toLocaleString('ru-KZ')} <span className="text-2xl">тг</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">
            {brandData?.label} {modelData?.label} · {MAT_PROPS[config.material].label} · {patternLabel}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            Точная стоимость рассчитывается после замеров
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 pb-2">
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-base" asChild>
            <a
              href={`https://wa.me/77079829824?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Заказать эту конфигурацию
            </a>
          </Button>
          <Button size="sm" variant="outline" className="w-full" onClick={handleShare}>
            {copied
              ? <><Check className="w-4 h-4 mr-2" /> Ссылка скопирована!</>
              : <><Share2 className="w-4 h-4 mr-2" /> Скопировать ссылку на конфигурацию</>
            }
          </Button>
        </div>

      </div>
    </div>
  )
}
