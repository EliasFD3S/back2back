import { Reveal } from './reveal'

const rows = [
  {
    problem: 'Trop ajusté pour passer par-dessus un corset.',
    word: 'Ample',
    body: 'Une coupe oversize avec de la place dans le corps, des emmanchures larges et un col ample. Il s’enfile par-dessus le corset en quelques secondes.',
  },
  {
    problem: 'Un tissu qui s’use en quelques semaines.',
    word: 'Solide',
    body: 'Le sergé de coton 240 g/m² tient face aux frottements du corset : les pièces durent des saisons, pas des semaines.',
  },
  {
    problem: 'Sangles et contours qui se voient.',
    word: 'Opaque',
    body: 'Assez dense pour que rien ne transparaisse. Les sangles, les bords et les contours restent cachés.',
  },
]

const ticker = ['Ample', 'Solide', 'Opaque', 'Stylé', 'Facile à enfiler']

export function Mission() {
  return (
    <section id="why" aria-labelledby="why-title" className="overflow-hidden bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 md:pt-32">
        <Reveal delay={100}>
          <h2
            id="why-title"
            className="max-w-5xl text-balance text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl md:text-8xl"
          >
            Fait pour aller par-dessus le corset.{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">Stylé</span>
              <span aria-hidden="true" className="absolute inset-x-[-0.06em] bottom-[0.04em] top-[0.58em] -rotate-1 bg-magenta" />
            </span>{' '}
            comme si de rien n’était.
          </h2>
        </Reveal>
      </div>

      <div aria-hidden="true" className="mt-16 -rotate-1 scale-105 bg-magenta py-4 text-ink">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((w, i) => (
            <span key={i} className="flex items-center text-2xl font-black uppercase tracking-tight sm:text-3xl">
              <span className="px-6">{w}</span>
              <span>✕</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 md:pb-32">
        <ol>
          {rows.map((row, i) => (
            <Reveal
              as="li"
              key={row.word}
              delay={i * 80}
              className="group grid items-center gap-4 border-t border-bone/20 py-8 last:border-b md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div className="md:col-span-4">
                <span className="text-xs font-bold tabular-nums text-bone/50">{String(i + 1).padStart(2, '0')}</span>
                <p className="relative mt-2 inline text-lg font-bold leading-snug text-bone/50">
                  <span className="bg-gradient-to-r from-magenta to-magenta bg-[length:0%_3px] bg-left-top bg-no-repeat bg-[position:0_55%] pb-1 transition-[background-size] delay-500 duration-1000 group-data-[visible=true]:bg-[length:100%_3px]">
                    {row.problem}
                  </span>
                </p>
              </div>
              <h3 className="text-6xl font-black leading-none tracking-tighter transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:text-magenta sm:text-7xl md:col-span-4 md:text-8xl">
                {row.word}
              </h3>
              <p className="max-w-sm text-pretty leading-relaxed text-bone/75 md:col-span-4">{row.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={150}>
          <p className="mt-12 max-w-2xl text-pretty text-lg leading-relaxed text-bone/75">
            Une collection de <strong className="font-bold text-bone">2 modèles, un tee et un hoodie, en 5 coloris</strong>, au vrai look streetwear.
            Pas de beige, pas d’ambiance médicale. Juste des vêtements qu’on a envie de porter au lycée, avec les potes
            et partout ailleurs.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
