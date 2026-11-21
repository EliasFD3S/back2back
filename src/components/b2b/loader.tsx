'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

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
        <Logo className="h-24 animate-in fade-in zoom-in-95 duration-1000 sm:h-32 md:h-40" />
      </div>

      <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 text-xs font-medium uppercase tracking-[0.2em] text-white/70 sm:inset-x-10 sm:bottom-10">
        <span>Collection SS26</span>
        <span className="tabular-nums text-white">{String(Math.round(progress * 100)).padStart(3, '0')}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
        <div className="h-full origin-left bg-white" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  )
}
