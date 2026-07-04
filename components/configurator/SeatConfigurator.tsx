'use client'

import { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Environment, ContactShadows, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { MessageCircle, Share2, Check, RotateCcw } from 'lucide-react'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type MaterialType = 'ekokozha' | 'combo' | 'alkantara'
type PatternType  = 'plain' | 'rhomb' | 'honeycomb' | 'bugatti'

interface SeatConfig {
  carBrand:    string
  carModel:    string
  material:    MaterialType
  mainColor:   string
  insertColor: string
  stitchColor: string
  pattern:     PatternType
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const COLORS = [
  { id: 'black',    label: 'Чёрный',      hex: '#111111' },
  { id: 'darkgray', label: 'Тёмно-серый', hex: '#363636' },
  { id: 'gray',     label: 'Серый',       hex: '#858585' },
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
  { id: 'white',  hex: '#ece8dc' },
  { id: 'beige',  hex: '#c4a882' },
  { id: 'red',    hex: '#cc2222' },
  { id: 'blue',   hex: '#2244aa' },
  { id: 'orange', hex: '#cc6600' },
]

const PATTERNS: { id: PatternType; label: string; desc: string }[] = [
  { id: 'plain',     label: 'Гладкий', desc: 'Без рисунка'    },
  { id: 'rhomb',     label: 'Ромб',    desc: 'Классика'        },
  { id: 'honeycomb', label: 'Соты',    desc: 'Шестиугольники'  },
  { id: 'bugatti',   label: 'Ромб 3D', desc: 'Объёмный'       },
]

const CAR_CATALOG: Record<string, {
  label: string
  models: { id: string; label: string; cls: 'compact' | 'mid' | 'premium' }[]
}> = {
  toyota:    { label: 'Toyota',    models: [
    { id: 'camry',        label: 'Camry',         cls: 'mid'     },
    { id: 'land-cruiser', label: 'Land Cruiser',  cls: 'premium' },
    { id: 'rav4',         label: 'RAV4',          cls: 'mid'     },
    { id: 'corolla',      label: 'Corolla',       cls: 'mid'     },
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
    { id: 'rx', label: 'RX',     cls: 'premium' },
    { id: 'lx', label: 'LX 570', cls: 'premium' },
    { id: 'es', label: 'ES',     cls: 'premium' },
  ]},
  bmw:       { label: 'BMW',       models: [
    { id: '3',  label: '3 серия', cls: 'mid'     },
    { id: '5',  label: '5 серия', cls: 'premium' },
    { id: 'x5', label: 'X5',      cls: 'premium' },
    { id: 'x7', label: 'X7',      cls: 'premium' },
  ]},
  mercedes:  { label: 'Mercedes',  models: [
    { id: 'c',   label: 'C-Class', cls: 'mid'     },
    { id: 'e',   label: 'E-Class', cls: 'premium' },
    { id: 's',   label: 'S-Class', cls: 'premium' },
    { id: 'glc', label: 'GLC',     cls: 'premium' },
  ]},
  chevrolet: { label: 'Chevrolet', models: [
    { id: 'cobalt',      label: 'Cobalt',      cls: 'compact' },
    { id: 'captiva',     label: 'Captiva',     cls: 'mid'     },
    { id: 'trailblazer', label: 'TrailBlazer', cls: 'mid'     },
  ]},
  haval:     { label: 'Haval',     models: [
    { id: 'jolion', label: 'Jolion', cls: 'mid'     },
    { id: 'f7',     label: 'F7',     cls: 'mid'     },
    { id: 'h9',     label: 'H9',     cls: 'premium' },
  ]},
  chery:     { label: 'Chery',     models: [
    { id: 'tiggo7', label: 'Tiggo 7 Pro', cls: 'mid' },
    { id: 'tiggo8', label: 'Tiggo 8 Pro', cls: 'mid' },
  ]},
  geely:     { label: 'Geely',     models: [
    { id: 'coolray', label: 'Coolray',   cls: 'mid' },
    { id: 'atlas',   label: 'Atlas Pro', cls: 'mid' },
  ]},
}

const CLS_PREMIUM: Record<string, number> = { compact: 0, mid: 10000, premium: 20000 }
const MAT_BASE: Record<MaterialType, number> = { ekokozha: 70000, combo: 90000, alkantara: 120000 }
const MAT_PROPS: Record<MaterialType, { roughness: number; metalness: number; envMapIntensity: number; label: string }> = {
  ekokozha:  { roughness: 0.30, metalness: 0.05, envMapIntensity: 0.8, label: 'Экокожа'    },
  combo:     { roughness: 0.45, metalness: 0.02, envMapIntensity: 0.5, label: 'Комбо'      },
  alkantara: { roughness: 0.95, metalness: 0.00, envMapIntensity: 0.1, label: 'Алькантара' },
}

const DEFAULT_CONFIG: SeatConfig = {
  carBrand:    'toyota',
  carModel:    'camry',
  material:    'ekokozha',
  mainColor:   '#111111',
  insertColor: '#c4a882',
  stitchColor: '#111111',   // dark stitch on beige insert → clearly visible
  pattern:     'rhomb',
}

// ─────────────────────────────────────────────
// TEXTURE GENERATOR
// ─────────────────────────────────────────────

function createPatternTexture(
  baseColor:   string,
  stitchColor: string,
  pattern:     PatternType,
): THREE.CanvasTexture {
  const SIZE = 1024   // high-res for sharp stitches
  const cv   = document.createElement('canvas')
  cv.width   = SIZE
  cv.height  = SIZE
  const ctx  = cv.getContext('2d')!

  // Base fill
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Leather grain for plain / as a base for others
  ctx.globalAlpha = 0.04
  for (let y = 0; y < SIZE; y += 2) {
    for (let x = 0; x < SIZE; x += 2) {
      if ((x * 3 + y * 7) % 13 < 3) {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }
  ctx.globalAlpha = 1

  if (pattern === 'plain') {
    const tex = new THREE.CanvasTexture(cv)
    return tex
  }

  // ── Draw stitch lines ──
  ctx.strokeStyle = stitchColor
  ctx.lineCap     = 'round'
  ctx.lineJoin    = 'round'
  ctx.globalAlpha = 0.90    // high opacity so lines are clearly visible

  if (pattern === 'rhomb') {
    // Diamond quilting — each diamond ~100px wide
    const step = 100
    ctx.lineWidth = 3

    for (let row = -2; row < SIZE / (step / 2) + 3; row++) {
      const cy   = row * (step / 2)
      const xOff = (row % 2 === 0) ? 0 : step / 2
      for (let col = -2; col < SIZE / step + 3; col++) {
        const cx = col * step + xOff
        ctx.beginPath()
        ctx.moveTo(cx,            cy - step / 2)
        ctx.lineTo(cx + step / 2, cy)
        ctx.lineTo(cx,            cy + step / 2)
        ctx.lineTo(cx - step / 2, cy)
        ctx.closePath()
        ctx.stroke()
      }
    }

    // Double stitch — second inner line offset 8px
    ctx.globalAlpha = 0.35
    ctx.lineWidth   = 1.5
    const gap = 10
    for (let row = -2; row < SIZE / (step / 2) + 3; row++) {
      const cy   = row * (step / 2)
      const xOff = (row % 2 === 0) ? 0 : step / 2
      for (let col = -2; col < SIZE / step + 3; col++) {
        const cx = col * step + xOff
        const s  = step / 2 - gap
        ctx.beginPath()
        ctx.moveTo(cx,     cy - s)
        ctx.lineTo(cx + s, cy)
        ctx.lineTo(cx,     cy + s)
        ctx.lineTo(cx - s, cy)
        ctx.closePath()
        ctx.stroke()
      }
    }

  } else if (pattern === 'bugatti') {
    // 3D diamond — outer + embossed inner
    const step = 90
    for (let row = -2; row < SIZE / (step / 2) + 3; row++) {
      const cy   = row * (step / 2)
      const xOff = (row % 2 === 0) ? 0 : step / 2
      for (let col = -2; col < SIZE / step + 3; col++) {
        const cx = col * step + xOff

        // Outer diamond (bold)
        ctx.strokeStyle = stitchColor
        ctx.lineWidth   = 3.5
        ctx.globalAlpha = 0.90
        ctx.beginPath()
        ctx.moveTo(cx,            cy - step / 2)
        ctx.lineTo(cx + step / 2, cy)
        ctx.lineTo(cx,            cy + step / 2)
        ctx.lineTo(cx - step / 2, cy)
        ctx.closePath()
        ctx.stroke()

        // Inner highlight (lighter, simulates 3D raise)
        const inner = step * 0.30
        ctx.strokeStyle = lightenHex(stitchColor, 70)
        ctx.lineWidth   = 1.5
        ctx.globalAlpha = 0.65
        ctx.beginPath()
        ctx.moveTo(cx,        cy - inner)
        ctx.lineTo(cx + inner, cy)
        ctx.lineTo(cx,        cy + inner)
        ctx.lineTo(cx - inner, cy)
        ctx.closePath()
        ctx.stroke()

        // Shadow on opposite side (simulates depth)
        ctx.strokeStyle = darkenHex(stitchColor, 40)
        ctx.lineWidth   = 1
        ctx.globalAlpha = 0.40
        ctx.beginPath()
        ctx.moveTo(cx,        cy - inner * 0.9)
        ctx.lineTo(cx - inner * 0.9, cy)
        ctx.stroke()
      }
    }

  } else if (pattern === 'honeycomb') {
    const r   = 40         // hexagon radius
    const h   = r * Math.sqrt(3)
    ctx.lineWidth   = 3
    ctx.globalAlpha = 0.90
    for (let row = -2; row <= SIZE / h + 3; row++) {
      for (let col = -2; col <= SIZE / (r * 3) + 3; col++) {
        const cx = col * r * 3 + (row % 2 === 0 ? 0 : r * 1.5)
        const cy = row * h
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 6
          const px    = cx + (r - 2) * Math.cos(angle)
          const py    = cy + (r - 2) * Math.sin(angle)
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.stroke()
      }
    }
    // Inner honeycomb highlight
    ctx.globalAlpha = 0.25
    ctx.lineWidth   = 1.2
    const rInner = r * 0.55
    for (let row = -2; row <= SIZE / h + 3; row++) {
      for (let col = -2; col <= SIZE / (r * 3) + 3; col++) {
        const cx = col * r * 3 + (row % 2 === 0 ? 0 : r * 1.5)
        const cy = row * h
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 6
          const px    = cx + rInner * Math.cos(angle)
          const py    = cy + rInner * Math.sin(angle)
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  ctx.globalAlpha = 1
  const tex = new THREE.CanvasTexture(cv)
  tex.anisotropy = 16
  return tex
}

function lightenHex(hex: string, amt: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (n >> 16) + amt)
  const g = Math.min(255, ((n >> 8) & 0xff) + amt)
  const b = Math.min(255, (n & 0xff) + amt)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function darkenHex(hex: string, amt: number): string {
  return lightenHex(hex, -amt)
}

// ─────────────────────────────────────────────
// MATERIALS HOOK — shared, properly disposed
// ─────────────────────────────────────────────

function useSeatMaterials(config: SeatConfig) {
  const props = MAT_PROPS[config.material]

  const mainMat = useRef(new THREE.MeshStandardMaterial())
  const centerMat = useRef(new THREE.MeshStandardMaterial())

  // Update main material
  useEffect(() => {
    mainMat.current.color.set(config.mainColor)
    mainMat.current.roughness         = props.roughness
    mainMat.current.metalness         = props.metalness
    mainMat.current.envMapIntensity   = props.envMapIntensity
    mainMat.current.needsUpdate       = true
  }, [config.mainColor, config.material, props.roughness, props.metalness, props.envMapIntensity])

  // Update center material + texture
  useEffect(() => {
    const tex = createPatternTexture(config.insertColor, config.stitchColor, config.pattern)
    const oldTex = centerMat.current.map

    centerMat.current.map              = tex
    centerMat.current.roughness        = config.material === 'alkantara' ? 0.96 : props.roughness + 0.12
    centerMat.current.metalness        = 0
    centerMat.current.envMapIntensity  = props.envMapIntensity * 0.6
    centerMat.current.needsUpdate      = true

    return () => { oldTex?.dispose() }
  }, [config.insertColor, config.stitchColor, config.pattern, config.material, props.roughness, props.envMapIntensity])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mainMat.current.dispose()
      centerMat.current.map?.dispose()
      centerMat.current.dispose()
    }
  }, [])

  return { main: mainMat.current, center: centerMat.current }
}

// ─────────────────────────────────────────────
// 3D SEAT — realistic car seat geometry
// ─────────────────────────────────────────────

function Seat({ config }: { config: SeatConfig }) {
  const { main, center } = useSeatMaterials(config)

  // Main bolster colour drives the frame colour
  const M = main
  const C = center

  return (
    // Slight recline: rotate entire seat -8° around X
    <group rotation={[-0.14, 0, 0]}>

      {/* ════════════════════════════════════
          BACKREST
      ════════════════════════════════════ */}

      {/* Rear back shell (slightly behind) */}
      <RoundedBox args={[0.56, 0.70, 0.06]} radius={0.02} smoothness={4}
        position={[0, 0.38, -0.02]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* LEFT BOLSTER — wide, prominent, curves forward */}
      <RoundedBox args={[0.13, 0.64, 0.18]} radius={0.045} smoothness={5}
        position={[-0.255, 0.365, 0.04]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* RIGHT BOLSTER */}
      <RoundedBox args={[0.13, 0.64, 0.18]} radius={0.045} smoothness={5}
        position={[0.255, 0.365, 0.04]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* CENTER PANEL — clearly recessed between bolsters, with texture */}
      <mesh position={[0, 0.375, 0.068]} receiveShadow>
        <planeGeometry args={[0.275, 0.565, 1, 1]} />
        <primitive object={C} attach="material" />
      </mesh>
      {/* Thin frame around center panel */}
      <RoundedBox args={[0.285, 0.575, 0.008]} radius={0.008} smoothness={4}
        position={[0, 0.375, 0.063]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* Top backrest arch — rounds off the top */}
      <RoundedBox args={[0.54, 0.08, 0.13]} radius={0.04} smoothness={4}
        position={[0, 0.725, 0.01]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* Bottom back edge / lumbar support bulge */}
      <RoundedBox args={[0.44, 0.08, 0.15]} radius={0.04} smoothness={4}
        position={[0, 0.065, 0.04]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* ════════════════════════════════════
          HEADREST
      ════════════════════════════════════ */}

      {/* Headrest body — wider at top, tapers slightly */}
      <RoundedBox args={[0.325, 0.225, 0.115]} radius={0.04} smoothness={5}
        position={[0, 0.84, 0.015]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* Headrest center panel */}
      <mesh position={[0, 0.84, 0.078]} receiveShadow>
        <planeGeometry args={[0.195, 0.145, 1, 1]} />
        <primitive object={C} attach="material" />
      </mesh>

      {/* Headrest posts — chrome-look cylinders */}
      <mesh position={[-0.075, 0.705, 0.008]}>
        <cylinderGeometry args={[0.011, 0.011, 0.135, 12]} />
        <meshStandardMaterial color="#888" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0.075, 0.705, 0.008]}>
        <cylinderGeometry args={[0.011, 0.011, 0.135, 12]} />
        <meshStandardMaterial color="#888" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ════════════════════════════════════
          SEAT CUSHION
      ════════════════════════════════════ */}

      {/* Main cushion body */}
      <RoundedBox args={[0.56, 0.10, 0.52]} radius={0.035} smoothness={5}
        position={[0, -0.005, 0.155]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* LEFT CUSHION BOLSTER */}
      <RoundedBox args={[0.13, 0.115, 0.46]} radius={0.04} smoothness={5}
        position={[-0.255, 0.042, 0.135]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* RIGHT CUSHION BOLSTER */}
      <RoundedBox args={[0.13, 0.115, 0.46]} radius={0.04} smoothness={5}
        position={[0.255, 0.042, 0.135]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* CUSHION CENTER PANEL — horizontal, with texture */}
      <mesh position={[0, 0.056, 0.13]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.275, 0.40, 1, 1]} />
        <primitive object={C} attach="material" />
      </mesh>
      {/* Thin frame */}
      <RoundedBox args={[0.285, 0.007, 0.41]} radius={0.005} smoothness={4}
        position={[0, 0.053, 0.13]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* FRONT ROLL — the thick padded front edge */}
      <RoundedBox args={[0.56, 0.115, 0.105]} radius={0.05} smoothness={5}
        position={[0, 0.005, 0.395]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

      {/* REAR CUSHION EDGE / base connection */}
      <RoundedBox args={[0.54, 0.07, 0.07]} radius={0.025} smoothness={4}
        position={[0, -0.03, -0.075]}>
        <primitive object={M} attach="material" />
      </RoundedBox>

    </group>
  )
}

// ─────────────────────────────────────────────
// SCENE
// ─────────────────────────────────────────────

function Scene({ config }: { config: SeatConfig }) {
  return (
    <>
      {/* Lighting setup for leather-like reflections */}
      <ambientLight intensity={0.55} />

      {/* Key light — upper right, warm */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.8}
        color="#fffaf0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-camera-right={2}
      />

      {/* Fill light — upper left, cool */}
      <directionalLight position={[-5, 4, 2]} intensity={0.5} color="#c0d8ff" />

      {/* Rim light — behind for edge glow (critical for leather look) */}
      <directionalLight position={[0, 2, -6]} intensity={0.7} color="#fff" />

      {/* Soft point light for material texture visibility */}
      <pointLight position={[0, 3, 4]} intensity={0.6} color="#ffe8d0" />

      {/* Environment for reflections — crucial for eco-leather gloss */}
      <Environment preset="warehouse" />

      <Suspense fallback={null}>
        <group position={[0, -0.42, 0]}>
          <Seat config={config} />
        </group>
      </Suspense>

      <ContactShadows
        position={[0, -0.42, 0]}
        opacity={0.45}
        scale={3}
        blur={2}
        far={1.5}
      />

      <OrbitControls
        enablePan={false}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={1.4}
        maxDistance={3.8}
        autoRotate
        autoRotateSpeed={0.9}
        target={[0, 0.1, 0]}
      />
    </>
  )
}

// ─────────────────────────────────────────────
// UI PIECES
// ─────────────────────────────────────────────

function ColorSwatch({
  hex, label, selected, onSelect,
}: { hex: string; label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      title={label}
      style={{ backgroundColor: hex }}
      className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${
        selected
          ? 'border-primary scale-110 ring-2 ring-primary/40'
          : 'border-white/10 hover:scale-105 hover:border-white/30'
      }`}
    />
  )
}

const PATTERN_SVGS: Record<PatternType, React.ReactNode> = {
  plain: (
    <rect x="3" y="3" width="34" height="34" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
  rhomb: (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <path d="M8,4 L18,12 L8,20 L-2,12 Z"   transform="translate(2,2)"  />
      <path d="M8,4 L18,12 L8,20 L-2,12 Z"   transform="translate(22,2)" />
      <path d="M8,4 L18,12 L8,20 L-2,12 Z"   transform="translate(2,18)" />
      <path d="M8,4 L18,12 L8,20 L-2,12 Z"   transform="translate(22,18)" />
    </g>
  ),
  honeycomb: (
    <g stroke="currentColor" strokeWidth="1.4" fill="none">
      <polygon points="12,2 20,6 20,14 12,18 4,14 4,6"   />
      <polygon points="28,2 36,6 36,14 28,18 20,14 20,6" />
      <polygon points="12,18 20,22 20,30 12,34 4,30 4,22" />
      <polygon points="28,18 36,22 36,30 28,34 20,30 20,22" />
    </g>
  ),
  bugatti: (
    <g fill="none">
      <g stroke="currentColor" strokeWidth="2">
        <path d="M8,2 L18,10 L8,18 L-2,10 Z"  transform="translate(2,2)"  />
        <path d="M8,2 L18,10 L8,18 L-2,10 Z"  transform="translate(22,2)" />
        <path d="M8,2 L18,10 L8,18 L-2,10 Z"  transform="translate(2,20)" />
        <path d="M8,2 L18,10 L8,18 L-2,10 Z"  transform="translate(22,20)" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        <path d="M8,5 L15,10 L8,15 L1,10 Z"  transform="translate(2,2)"  />
        <path d="M8,5 L15,10 L8,15 L1,10 Z"  transform="translate(22,2)" />
        <path d="M8,5 L15,10 L8,15 L1,10 Z"  transform="translate(2,20)" />
        <path d="M8,5 L15,10 L8,15 L1,10 Z"  transform="translate(22,20)" />
      </g>
    </g>
  ),
}

function PatternCard({ pattern, selected, onClick }: {
  pattern: typeof PATTERNS[0]; selected: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border transition-all ${
        selected
          ? 'border-primary bg-primary/10 shadow-sm shadow-primary/20'
          : 'border-border hover:border-primary/40'
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
// HELPERS
// ─────────────────────────────────────────────

function getPrice(config: SeatConfig): number {
  const base  = MAT_BASE[config.material]
  const model = CAR_CATALOG[config.carBrand]?.models.find(m => m.id === config.carModel)
  return base + (model ? CLS_PREMIUM[model.cls] : 0)
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export function SeatConfigurator() {
  const [config, setConfig] = useState<SeatConfig>(DEFAULT_CONFIG)
  const [copied, setCopied] = useState(false)

  const update = <K extends keyof SeatConfig>(key: K) => (val: SeatConfig[K]) =>
    setConfig(prev => ({ ...prev, [key]: val }))

  const price           = getPrice(config)
  const brandData       = CAR_CATALOG[config.carBrand]
  const modelData       = brandData?.models.find(m => m.id === config.carModel)
  const mainColorLabel  = COLORS.find(c => c.hex === config.mainColor)?.label  ?? ''
  const insertColorLabel= COLORS.find(c => c.hex === config.insertColor)?.label ?? ''
  const patternLabel    = PATTERNS.find(p => p.id === config.pattern)?.label    ?? ''

  const waText = encodeURIComponent(
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
    await navigator.clipboard.writeText(`${window.location.origin}/konfigurator?${params}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

      {/* ── 3D CANVAS ── */}
      <div className="relative w-full h-[460px] md:h-[560px] rounded-2xl overflow-hidden border border-white/8 shadow-2xl bg-[#0d0d10]">
        <Canvas
          camera={{ position: [0.8, 0.5, 2.3], fov: 40 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Scene config={config} />
        </Canvas>

        {/* Reset button */}
        <button
          onClick={() => setConfig(DEFAULT_CONFIG)}
          title="Сбросить конфигурацию"
          className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/8 hover:bg-white/16 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <p className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-white/28 pointer-events-none select-none">
          Тяните для вращения · Колесо для масштаба
        </p>
      </div>

      {/* ── CONTROLS ── */}
      <div className="flex flex-col gap-5 lg:max-h-[560px] overflow-y-auto pr-0.5">

        {/* Car */}
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
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {MAT_PROPS[mat].label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            {config.material === 'ekokozha'  && 'Глянцевое полиуретановое покрытие. Легко чистится, не трескается'}
            {config.material === 'combo'     && 'Болстеры — экокожа, центральные вставки — алькантара'}
            {config.material === 'alkantara' && 'Мягкая матовая замша. Не скользит, приятна на ощупь'}
          </p>
        </section>

        {/* Main color */}
        <section>
          <p className="text-sm font-semibold mb-2">
            Основной цвет <span className="font-normal text-muted-foreground">(болстеры)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <ColorSwatch key={c.id} hex={c.hex} label={c.label}
                selected={config.mainColor === c.hex}
                onSelect={() => update('mainColor')(c.hex)} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{mainColorLabel}</p>
        </section>

        {/* Insert color */}
        <section>
          <p className="text-sm font-semibold mb-2">Цвет центральной вставки</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <ColorSwatch key={c.id} hex={c.hex} label={c.label}
                selected={config.insertColor === c.hex}
                onSelect={() => update('insertColor')(c.hex)} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{insertColorLabel}</p>
        </section>

        {/* Pattern */}
        <section>
          <p className="text-sm font-semibold mb-2">Узор прострочки</p>
          <div className="grid grid-cols-4 gap-2">
            {PATTERNS.map(p => (
              <PatternCard key={p.id} pattern={p}
                selected={config.pattern === p.id}
                onClick={() => update('pattern')(p.id)} />
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
                title={c.id}
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
        <div className="bg-card border border-border/60 rounded-2xl p-4">
          <p className="text-sm text-muted-foreground mb-0.5">Ориентировочная стоимость</p>
          <p className="text-4xl font-bold text-primary tracking-tight">
            {price.toLocaleString('ru-KZ')} <span className="text-2xl font-semibold">тг</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">
            {brandData?.label} {modelData?.label} · {MAT_PROPS[config.material].label} · {patternLabel}
          </p>
          <p className="text-[11px] text-muted-foreground/55 mt-0.5">
            Точная стоимость рассчитывается индивидуально после замеров
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 pb-2">
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-base" asChild>
            <a href={`https://wa.me/77079829824?text=${waText}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Заказать эту конфигурацию
            </a>
          </Button>
          <Button size="sm" variant="outline" className="w-full" onClick={handleShare}>
            {copied
              ? <><Check className="w-4 h-4 mr-2" />Ссылка скопирована!</>
              : <><Share2 className="w-4 h-4 mr-2" />Скопировать ссылку на конфигурацию</>
            }
          </Button>
        </div>

      </div>
    </div>
  )
}
