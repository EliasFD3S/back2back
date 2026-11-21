import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Home, Maximize2, StickyNote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { glass } from '@/lib/ui'
import { Logo } from '../b2b/logo'
import { StarPattern } from '../b2b/star'
import { TwillTexture } from '../b2b/twill-texture'
import { slides } from './slides'

const W = 1920
const H = 1080

function readHash() {
  const n = parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isFinite(n) ? Math.min(slides.length - 1, Math.max(0, n - 1)) : 0
}

/** Pose l'ordre d'apparition (--i) sur les éléments animés d'une diapo. */
function Slide({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>('.r').forEach((el, i) => el.style.setProperty('--i', String(i)))
  }, [index])
  const s = slides[index]
  return (
    <div ref={ref} key={s.id} className="pres-slide absolute inset-0">
      {s.node}
    </div>
  )
}

export default function Presentation() {
  const [current, setCurrent] = useState(readHash)
  const [scale, setScale] = useState(1)
  const [notes, setNotes] = useState(false)
  const [hint, setHint] = useState(true)
  const slide = slides[current]

  const go = useCallback((n: number) => {
    setCurrent((c) => Math.min(slides.length - 1, Math.max(0, typeof n === 'number' ? n : c)))
  }, [])
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), [])
  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])

  useEffect(() => {
    document.title = 'Présentation · BACK2BACK'
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // La présentation est destinée au jury : on la garde hors des moteurs de recherche.
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
    return () => {
      document.body.style.overflow = prevOverflow
      robots.remove()
    }
  }, [])

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#${current + 1}`)
  }, [current])

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 4500)
    return () => window.clearTimeout(t)
  }, [])

  const fullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
    else document.exitFullscreen?.().catch(() => {})
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        next()
      } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(slides.length - 1)
      else if (e.key === 'f' || e.key === 'F') fullscreen()
      else if (e.key === 'n' || e.key === 'N') setNotes((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, fullscreen])

  const touchX = useRef<number | null>(null)

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black text-bone"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 origin-center overflow-hidden bg-ink text-[30px] leading-[1.35]"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('[data-ui]')) return
          const r = e.currentTarget.getBoundingClientRect()
          if (e.clientX - r.left < r.width * 0.3) prev()
          else next()
        }}
      >
        {/* Fond : halos magenta qui se déplacent, sergé ou étoiles selon la diapo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute size-[1000px] rounded-full bg-[radial-gradient(circle,rgba(255,43,214,0.55),transparent_70%)] blur-[120px] transition-transform duration-[2600ms] ease-[cubic-bezier(0.6,0,0.2,1)]"
            style={{ transform: `translate(${[-250, 1150, 520, -320, 900][current % 5]}px, ${[-350, -380, -480, 380, 300][current % 5]}px)` }}
          />
          <div
            className="absolute size-[900px] rounded-full bg-[radial-gradient(circle,rgba(239,235,227,0.12),transparent_70%)] blur-[120px] transition-transform duration-[2600ms] ease-[cubic-bezier(0.6,0,0.2,1)]"
            style={{ transform: `translate(${[1250, -350, 1350, 1050, -300][current % 5]}px, ${[450, 480, 580, -320, -300][current % 5]}px)` }}
          />
          {slide.bg === 'twill' && (
            <div key={`t-${slide.id}`} className="absolute inset-0">
              <TwillTexture />
            </div>
          )}
          {slide.bg === 'stars' && <StarPattern className="text-bone opacity-[0.1]" />}
        </div>

        <Slide index={current} />

        {slide.id !== 'couverture' && slide.id !== 'merci' && (
          <Logo className="absolute right-[128px] top-[56px] h-[46px] opacity-80" />
        )}

        {/* Notes de l'orateur */}
        {notes && (
          <div data-ui className={cn(glass, 'absolute inset-x-[128px] bottom-[110px] z-30 bg-ink/90 px-10 py-7')}>
            <p className="font-label text-[22px] font-bold uppercase tracking-[0.1em] text-magenta">
              {slide.speaker}
              {slide.minutes ? ` · durée cible ${slide.minutes}` : ''}
            </p>
            <p className="mt-2 text-[28px] leading-snug">{slide.notes}</p>
          </div>
        )}

        {hint && (
          <div className={cn(glass, 'font-label absolute left-1/2 top-[44px] z-30 -translate-x-1/2 whitespace-nowrap px-8 py-3.5 text-[22px] text-bone/75')}>
            ← → pour naviguer · F plein écran · N notes
          </div>
        )}

        {/* Interface */}
        <div className="absolute bottom-0 left-0 h-[5px] w-full bg-white/10">
          <div className="h-full bg-magenta transition-[width] duration-700" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
        </div>
        <div data-ui className="absolute bottom-[28px] right-[56px] z-30 flex items-center gap-3">
          <Link to="/" aria-label="Retour au site" className="flex size-[58px] items-center justify-center rounded-full border border-white/15 bg-ink/60 backdrop-blur-xl hover:bg-magenta/40">
            <Home className="size-6" />
          </Link>
          <button type="button" aria-label="Notes de l'orateur" onClick={() => setNotes((v) => !v)} className={cn('flex size-[58px] items-center justify-center rounded-full border border-white/15 backdrop-blur-xl hover:bg-magenta/40', notes ? 'bg-magenta/40' : 'bg-ink/60')}>
            <StickyNote className="size-6" />
          </button>
          <button type="button" aria-label="Diapo précédente" onClick={prev} className="flex size-[58px] items-center justify-center rounded-full border border-white/15 bg-ink/60 backdrop-blur-xl hover:bg-magenta/40">
            <ArrowLeft className="size-6" />
          </button>
          <span className="min-w-[110px] text-center text-[26px] font-semibold text-bone/70">
            <b className="text-bone">{String(current + 1).padStart(2, '0')}</b> / {slides.length}
          </span>
          <button type="button" aria-label="Diapo suivante" onClick={next} className="flex size-[58px] items-center justify-center rounded-full border border-white/15 bg-ink/60 backdrop-blur-xl hover:bg-magenta/40">
            <ArrowRight className="size-6" />
          </button>
          <button type="button" aria-label="Plein écran" onClick={fullscreen} className="flex size-[58px] items-center justify-center rounded-full border border-white/15 bg-ink/60 backdrop-blur-xl hover:bg-magenta/40">
            <Maximize2 className="size-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
