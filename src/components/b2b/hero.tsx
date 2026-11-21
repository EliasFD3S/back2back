import { ArrowDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

export function Hero({ ready }: { ready: boolean }) {
  const show = (delay: string) =>
    cn('transition-all duration-1000 ease-out', delay, ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')

  return (
    <section id="top" aria-label="Introduction" className="grain relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden">
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        src="/video/hero.mp4"
        poster="/video/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className={cn('absolute inset-0 -z-10 bg-black transition-opacity duration-1000', ready ? 'opacity-45' : 'opacity-75')}
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-24 sm:px-8 sm:pb-14">
        <p className={cn('mb-5 text-xs font-medium font-label uppercase tracking-[0.3em] text-bone/80', show('delay-100'))}>
          Le streetwear qui se porte par-dessus le corset
        </p>
        <h1 className={cn('text-bone', show('delay-200'))}>
          <Logo className="h-[34vw] max-h-64 sm:h-[24vw]" />
        </h1>
        <div className={cn('mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between', show('delay-500'))}>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-bone/85 sm:text-xl">
            Des tees et des hoodies oversize qui passent par-dessus ton corset, résistent aux frottements et ont
            l'allure du streetwear, tout simplement. Mets ton corset, mets ton style, sors.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
            >
              Acheter dès 40 € <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#why"
              className="inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-bone transition-colors hover:bg-bone/10"
            >
              Pourquoi BACK2BACK <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
