'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from './reveal'
import { Star } from './star'
import { useInView } from '@/lib/scroll'

const items = [
  {
    word: 'Ample',
    problem: 'Trop ajusté pour passer par-dessus un corset.',
    body: 'Une coupe oversize avec de la place dans le corps, des emmanchures larges et un col ample. Il s’enfile par-dessus le corset en quelques secondes.',
  },
  {
    word: 'Solide',
    problem: 'Un tissu qui s’use en quelques semaines.',
    body: 'Le sergé de coton 240 g/m² tient face aux frottements du corset : les pièces durent des saisons, pas des semaines.',
  },
  {
    word: 'Opaque',
    problem: 'Sangles et contours qui se voient.',
    body: 'Assez dense pour que rien ne transparaisse. Les sangles, les bords et les contours restent cachés.',
  },
]

const ticker = ['Ample', 'Solide', 'Opaque', 'Stylé', 'Facile à enfiler']

const DURATION = 5000

export function Mission() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.35)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!inView || paused) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), DURATION)
    return () => window.clearTimeout(t)
  }, [inView, paused, active])

  const current = items[active]

  return (
    <section id="why" aria-labelledby="why-title" className="overflow-x-clip bg-ink text-bone">
      <div aria-hidden="true" className="-rotate-1 scale-105 bg-magenta py-3 text-ink">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((w, i) => (
            <span key={i} className="flex items-center text-xl font-black uppercase tracking-tight sm:text-2xl">
              <span className="px-6">{w}</span>
              <Star className="size-5 sm:size-6" />
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 id="why-title" className="text-balance text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
            Fait pour aller par-dessus le corset.{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">Stylé</span>
              <span aria-hidden="true" className="absolute inset-x-[-0.06em] bottom-[0.04em] top-[0.58em] -rotate-1 bg-magenta" />
            </span>{' '}
            comme si de rien n’était.
          </h2>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-bone/75">
            2 modèles, un tee et un hoodie, en 5 coloris, au vrai look streetwear. Pas de beige, pas d’ambiance médicale.
            Juste des vêtements qu’on a envie de porter au lycée, avec les potes et partout ailleurs.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-flex rounded-full bg-bone px-6 py-3.5 text-sm font-black uppercase tracking-wider text-ink transition-transform hover:scale-[1.03]"
          >
            Choisir le mien
          </a>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div role="tablist" aria-label="Pourquoi BACK2BACK" className="flex flex-col">
              {items.map((it, i) => (
                <button
                  key={it.word}
                  role="tab"
                  aria-selected={i === active}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative border-t border-bone/20 py-4 text-left last:border-b"
                >
                  <span
                    className={`block text-6xl font-black leading-none tracking-tighter transition-all duration-500 sm:text-7xl md:text-8xl ${
                      i === active ? 'translate-x-3 text-magenta' : 'text-bone/30 group-hover:text-bone/70'
                    }`}
                  >
                    {it.word}
                  </span>
                  {i === active && inView ? (
                    <span
                      key={`${active}-${paused}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-magenta"
                      style={{ animation: paused ? undefined : `fill ${DURATION}ms linear forwards`, transform: paused ? 'scaleX(1)' : undefined }}
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <div key={active} className="mt-8 min-h-40 animate-in fade-in slide-in-from-bottom-4 duration-500" aria-live="polite">
              <p className="relative inline text-lg font-bold text-bone/50">
                <span className="bg-gradient-to-r from-magenta to-magenta bg-[length:100%_3px] bg-left-top bg-no-repeat bg-[position:0_55%] pb-1">
                  {current.problem}
                </span>
              </p>
              <p className="mt-4 max-w-lg text-pretty text-xl leading-snug">{current.body}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
