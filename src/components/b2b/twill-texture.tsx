'use client'

import { useEffect, useRef } from 'react'

export function TwillTexture() {
  const root = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const img = layer.current
    const section = el?.parentElement
    if (!el || !img || !section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 0.5, y: 0.5 }
    const current = { x: 0.5, y: 0.5 }
    let raf = 0

    const render = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      const dx = current.x - 0.5
      const dy = current.y - 0.5
      img.style.transform = `translate3d(${dx * -40}px, ${dy * -40}px, 0) scale(1.12) rotate(${dx * 2}deg)`
      el.style.setProperty('--mx', `${current.x * 100}%`)
      el.style.setProperty('--my', `${current.y * 100}%`)
      if (Math.abs(target.x - current.x) > 0.0005 || Math.abs(target.y - current.y) > 0.0005) {
        raf = requestAnimationFrame(render)
      } else {
        raf = 0
      }
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = (e.clientY - rect.top) / rect.height
      kick()
    }
    const onLeave = () => {
      target.x = 0.5
      target.y = 0.5
      kick()
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    kick()
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-ink"
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
    >
      <div ref={layer} className="absolute -inset-10 scale-[1.12] will-change-transform">
        <img src="/images/twill-370.png" alt="" className="size-full object-cover" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle 520px at var(--mx) var(--my), rgb(255 255 255 / 0.16), transparent 70%), radial-gradient(circle 900px at var(--mx) var(--my), transparent 0%, rgb(0 0 0 / 0.72) 85%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/80" />
    </div>
  )
}
