import { Reveal } from './reveal'
import { TwillTexture } from './twill-texture'

const specs = [
  {
    label: 'Matière',
    span: 'sm:col-span-3',
    value: 'Sergé de coton',
    body: 'Un jersey classique pèse entre 150 et 180 g/m². Notre sergé est plus épais sans être lourd, et reste agréable sur la peau.',
  },
  {
    label: 'Tissage',
    span: 'sm:col-span-3',
    value: 'Diagonale à 45°',
    body: 'Le tissage serré résiste aux frottements du corset, lavage après lavage, au lieu de bouloche et de s’user.',
  },
  {
    label: 'Opacité',
    span: 'sm:col-span-2',
    value: 'Totale',
    body: 'Sangles, bords et contours restent cachés : c’est toi qui décides.',
  },
  {
    label: 'Coupe',
    span: 'sm:col-span-2',
    value: 'Oversize',
    body: 'Épaules tombantes, emmanchures et col larges : il s’enfile sans lutter.',
  },
  {
    label: 'Coutures',
    span: 'sm:col-span-2',
    value: 'Doubles',
    body: 'Doublées aux endroits qui travaillent, pour tenir dans le temps.',
  },
]

const compare = [
  { label: 'T-shirt classique', value: '150 à 180', height: '68%', mine: false },
  { label: 'BACK2BACK', value: '240', height: '100%', mine: true },
]

const glass =
  'rounded-3xl border border-white/15 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl'

export function Craft() {
  return (
    <section id="craft" aria-labelledby="craft-title" className="relative isolate overflow-hidden text-bone">
      <TwillTexture />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2
            id="craft-title"
            className="max-w-5xl text-balance text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Assez solide pour le corset. Assez léger pour la journée.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <Reveal delay={150} className="group lg:col-span-4">
            <div className={`${glass} flex h-full min-h-[20rem] flex-col p-6`}>
              <p className="text-2xl font-black leading-tight tracking-tight">Épaisseur du tissu</p>
              <p className="mt-1 text-base text-bone/60">Grammes de tissu par mètre carré</p>
              <div className="mt-6 flex flex-1 items-end gap-4">
                {compare.map((c) => (
                  <div key={c.label} className="flex flex-1 flex-col gap-3">
                    <span className={`text-3xl font-black tabular-nums ${c.mine ? 'text-magenta' : 'text-bone/60'}`}>
                      {c.value}
                      <span className="ml-1 text-base font-bold">g/m²</span>
                    </span>
                    <div className="relative min-h-40 flex-1">
                      <div
                        className={`absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl transition-[height] duration-1000 ease-out [height:8%] group-data-[visible=true]:[height:var(--h)] ${c.mine ? 'bg-ink ring-2 ring-bone/70 shadow-[0_0_40px_-8px_rgba(239,235,227,0.35)] delay-700' : 'bg-bone/15 ring-1 ring-bone/20 delay-500'}`}
                        style={{ ['--h' as string]: c.height }}
                      >
                        <img
                          src="/images/twill-370.png"
                          alt=""
                          aria-hidden="true"
                          className={`absolute inset-0 size-full object-cover ${c.mine ? 'brightness-[2.4] contrast-[1.35] saturate-0' : 'scale-[2.4] opacity-30 brightness-150 saturate-0 blur-[1px]'}`}
                        />
                      </div>
                    </div>
                    <span className={`text-base font-bold ${c.mine ? 'text-bone' : 'text-bone/60'}`}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-6 lg:col-span-8">
            {specs.map((sp, i) => (
              <Reveal
                as="li"
                key={sp.label}
                delay={250 + i * 110}
                className={`${glass} group p-5 transition-colors hover:bg-white/10 ${sp.span}`}
              >
                <h3 className="text-2xl font-black leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  <span className="block text-magenta">{sp.label}</span>
                  {sp.value}
                </h3>
                <p className="mt-2 text-pretty text-base leading-snug text-bone/75">{sp.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
