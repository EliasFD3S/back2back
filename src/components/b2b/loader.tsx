'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { Star } from './star'

export function Loader({ ready, duration }: { ready: boolean; duration: number }) {
  const [progress, setProgress] = useState(0)
  const frame = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(p)
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [duration])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={ready}
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-white transition-[opacity,visibility] duration-700',
        ready ? 'invisible opacity-0' : 'visible opacity-100',
      )}
    >
      <span className="sr-only">{ready ? 'Chargé' : 'Chargement de BACK2BACK'}</span>
      <div
        className={cn(
          'transition-all duration-1000 ease-out',
          ready ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100',
        )}
      >
        <div
          className={cn(
            'relative transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
            progress >= 0.5 && '-translate-y-16 sm:-translate-y-20 md:-translate-y-[6.5rem]',
          )}
        >
          <Logo className="relative z-10 h-32 animate-in fade-in zoom-in-95 duration-1000 sm:h-44 md:h-56" />
          {/* À mi-chemin, l'étoile sort du logo par le dessous (translation seule, sans rotation) */}
          <div
            aria-hidden="true"
            className={cn(
              'absolute left-1/2 z-0 -translate-x-1/2 transition-all duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
              progress >= 0.5 ? 'top-[calc(100%+1rem)] scale-100 opacity-100' : 'top-1/2 -translate-y-1/2 scale-50 opacity-0',
            )}
          >
            <Star className="size-24 text-white sm:size-32 md:size-48" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 text-xs font-medium font-label uppercase tracking-[0.2em] text-white/70 sm:inset-x-10 sm:bottom-10">
        <span>Collection SS26</span>
        <span className="tabular-nums text-white">{String(Math.round(progress * 100)).padStart(3, '0')}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
        <div className="h-full origin-left bg-white" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  )
}
