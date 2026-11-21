import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { glass } from '@/lib/ui'
import { fmt } from '@/lib/presentation-data'
import { Star } from '../b2b/star'

type Anim = 'up' | 'l' | 'rt' | 'z'

/** Élément qui entre en scène à l'arrivée de la diapo (l'ordre d'apparition est posé par <Slide/>). */
export function R({
  children,
  className,
  anim = 'up',
  style,
  as: Tag = 'div',
}: {
  children?: ReactNode
  className?: string
  anim?: Anim
  style?: CSSProperties
  as?: 'div' | 'li' | 'p' | 'span' | 'h2' | 'h3' | 'figure'
}) {
  return (
    <Tag className={cn('r', anim === 'l' && 'l', anim === 'rt' && 'rt', anim === 'z' && 'z', className)} style={style}>
      {children}
    </Tag>
  )
}

export function Card({ children, className, accent }: { children: ReactNode; className?: string; accent?: boolean }) {
  return (
    <R className={cn(glass, 'p-9', accent && 'border-magenta/60 bg-magenta/10', className)}>{children}</R>
  )
}

/** Pastille de rubrique, avec l'étoile de la marque. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <R className="font-label inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] py-2.5 pl-4 pr-6 text-[22px] font-semibold uppercase tracking-[0.12em] text-bone/70 backdrop-blur-xl">
      <Star className="size-5 text-magenta" />
      {children}
    </R>
  )
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <R as="h2" className={cn('max-w-[1560px] text-[76px] font-black leading-[1] tracking-[-0.035em]', className)}>
      {children}
    </R>
  )
}

export const Mag = ({ children }: { children: ReactNode }) => <span className="text-magenta">{children}</span>

export function Foot({ children }: { children: ReactNode }) {
  return <R className="absolute bottom-[44px] left-[128px] right-[620px] text-[22px] leading-snug text-bone/50">{children}</R>
}

/** Texte dont chaque mot arrive l'un après l'autre. */
export function Words({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className}>
      {text.split(/\s+/).map((w, k) => (
        <span key={k} className="word" style={{ ['--w' as string]: k }}>
          {w}
          {' '}
        </span>
      ))}
    </p>
  )
}

/** Compteur animé : démarre quand la diapo apparaît. */
export function Count({
  to,
  d = 0,
  delay = 700,
  duration = 1500,
  prefix = '',
  suffix = '',
}: {
  to: number
  d?: number
  delay?: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [v, setV] = useState(0)
  const raf = useRef(0)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (reduced) return
    const t0 = performance.now() + delay
    const step = (t: number) => {
      const p = (t - t0) / duration
      if (p < 0) raf.current = requestAnimationFrame(step)
      else if (p >= 1) setV(to)
      else {
        setV(to * (1 - Math.pow(1 - p, 4)))
        raf.current = requestAnimationFrame(step)
      }
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [to, delay, duration, reduced])
  const value = reduced ? to : v
  const shown = value < 0 ? `(${fmt(-value, d)})` : fmt(value, d)
  return (
    <span className="tabular-nums">
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}

export function Check({ className }: { className?: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" className={cn('shrink-0', className)} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#ff2bd6" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Grand chiffre + légende. */
export function Stat({
  children,
  label,
  accent,
  className,
}: {
  children: ReactNode
  label: ReactNode
  accent?: boolean
  className?: string
}) {
  return (
    <Card accent={accent} className={cn('flex flex-1 flex-col gap-2 px-8 py-7', className)}>
      <span className={cn('text-[72px] font-black leading-none tracking-[-0.04em]', accent && 'text-magenta')}>{children}</span>
      <span className="text-[25px] leading-snug text-bone/70">{label}</span>
    </Card>
  )
}
