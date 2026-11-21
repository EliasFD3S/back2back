'use client'

import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play, RotateCcw, RotateCw, Repeat2, Undo2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Colorway, GarmentKind } from '@/lib/products'
import { isLight } from '@/lib/colors'

const GarmentCanvas = lazy(() => import('./garment-canvas'))

const STEP = Math.PI / 4

class ViewerBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

// Décor du showroom : un dôme sombre, un projecteur qui tombe sur le vêtement et un disque de lumière au sol.
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [--cx:50%] lg:[--cx:calc(50%-220px)]"
    >
      {/* voûte du dôme : sombre sur les bords, claire au centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_95%_at_var(--cx)_55%,transparent_20%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.72)_100%)]" />
      {/* faisceau du projecteur : dégradés radiaux sans bords nets */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_95%_at_var(--cx)_0%,rgba(255,255,255,0.5),rgba(255,255,255,0.14)_55%,transparent_80%)] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_14%_40%_at_var(--cx)_0%,rgba(255,255,255,0.7),transparent_100%)] mix-blend-soft-light" />
      {/* halo au sol sous le vêtement */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_34%_11%_at_var(--cx)_84%,rgba(255,255,255,0.5),transparent_100%)] mix-blend-soft-light" />
      {/* grain du bas pour fondre le sol dans l'ombre */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/45 to-transparent" />
    </div>
  )
}

export function GarmentViewer({ kind, colorway }: { kind: GarmentKind; colorway: Colorway }) {
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [inView, setInView] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const light = isLight(colorway.background)

  useEffect(() => {
    const node = stage.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const controlClass = cn(
    'inline-flex size-11 items-center justify-center rounded-full border backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
    light
      ? 'border-ink/15 bg-white/40 text-ink hover:bg-white/70 focus-visible:outline-ink'
      : 'border-bone/20 bg-black/30 text-bone hover:bg-black/50 focus-visible:outline-bone',
  )

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden transition-colors duration-700',
        light ? 'text-ink' : 'text-bone',
      )}
      style={{ backgroundColor: colorway.background }}
    >
      <Backdrop />

      <div ref={stage} className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing lg:right-[440px]">
        {inView && (
        <ViewerBoundary
          fallback={
            <div className="flex size-full items-center justify-center p-8 text-center text-sm font-medium opacity-70">
              La vue 3D n&apos;est pas disponible sur cet appareil. Regarde les photos dans le panneau.
            </div>
          }
        >
          <Suspense fallback={<div className="flex size-full items-center justify-center text-sm font-medium opacity-60">Chargement de la vue 3D…</div>}>
            <GarmentCanvas kind={kind} colorway={colorway} rotationTarget={rotation} autoRotate={autoRotate} resetKey={resetKey} />
          </Suspense>
        </ViewerBoundary>
        )}
      </div>

      <div
        role="toolbar"
        aria-label="Commandes de la vue 3D"
        className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-2 lg:right-[440px]"
      >
        <button type="button" className={controlClass} onClick={() => setRotation((r) => r - STEP)} aria-label="Tourner à gauche">
          <RotateCcw className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => setRotation((r) => r + Math.PI)}
          aria-label="Retourner pour voir l'autre côté"
        >
          <Repeat2 className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => setAutoRotate((v) => !v)}
          aria-pressed={autoRotate}
          aria-label={autoRotate ? 'Arrêter la rotation automatique' : 'Lancer la rotation automatique'}
        >
          {autoRotate ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
        </button>
        <button type="button" className={controlClass} onClick={() => setRotation((r) => r + STEP)} aria-label="Tourner à droite">
          <RotateCw className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => {
            setRotation(0)
            setAutoRotate(false)
            setResetKey((k) => k + 1)
          }}
          aria-label="Réinitialiser la vue"
        >
          <Undo2 className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
