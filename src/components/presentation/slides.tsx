/* eslint-disable react-refresh/only-export-components, no-irregular-whitespace */
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { glass } from '@/lib/ui'
import { products } from '@/lib/products'
import {
  breakeven,
  funding,
  keyFigures,
  marketing,
  money,
  orders,
  pnl,
  priceBuild,
  scenarios,
  sensitivities,
  fmt,
} from '@/lib/presentation-data'
import { Logo } from '../b2b/logo'
import { Star } from '../b2b/star'
import { Card, Check, Chip, Count, Foot, H2, Mag, R, Stat, Words } from './ui'
import { Donut, TreasuryChart } from './charts'

export type SlideDef = {
  id: string
  speaker: string
  minutes?: string
  notes: string
  /** Fond de la diapo : sergé (texture du site) ou motif d'étoiles. */
  bg?: 'twill' | 'stars'
  node: ReactNode
}

const Frame = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('absolute inset-0 flex flex-col gap-8 px-[128px] pb-[130px] pt-[92px]', className)}>{children}</div>
)

const teeImg = products.tee.gallery[0].src
const hoodieImg = products.hoodie.gallery[0].src

/* ------------------------------------------------------------------ 1 */
const cover: SlideDef = {
  id: 'couverture',
  speaker: 'Intervenant 1',
  minutes: '1 min 50',
  notes:
    "Accroche. Imaginer un adolescent à qui l'on vient de prescrire un corset : le placard, les tee-shirts trop fins, les sweats qui remontent. Poser le sujet : un vêtement de streetwear pensé pour se porter par-dessus un corset.",
  bg: 'twill',
  node: (
    <Frame className="justify-center">
      <div className="flex w-[1060px] flex-col gap-9">
        <Chip>Soutenance · Projet de création d'entreprise</Chip>
        <R anim="z">
          <Logo className="h-[230px] drop-shadow-[0_0_40px_rgba(255,43,214,0.35)]" />
        </R>
        <Words
          className="text-[92px] font-black leading-[0.98] tracking-[-0.04em]"
          text="Le streetwear qui se porte par-dessus un corset."
        />
        <R as="p" className="max-w-[900px] text-[32px] leading-snug text-bone/75">
          Tee-shirt à 40 €, hoodie à 80 €. Opaques, résistants, pensés d'abord pour les ados porteurs de corset.
        </R>
      </div>

      <R anim="z" className="absolute right-[150px] top-[86px] h-[800px] w-[600px]">
        <div className="absolute inset-0 overflow-hidden rounded-[36px] shadow-[0_40px_120px_rgba(255,43,214,0.3)] ring-1 ring-white/20">
          <img src={teeImg} alt="Tee BACK2BACK porté" className="size-full object-cover" />
        </div>
      </R>

      <div className="absolute -left-16 -right-16 bottom-[64px] flex h-[92px] -rotate-2 items-center overflow-hidden bg-magenta shadow-[0_20px_80px_rgba(255,43,214,0.4)]">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center text-[46px] font-black uppercase tracking-wide text-ink">
              {['Good vibes', 'Real people', 'Better days'].map((w) => (
                <span key={w} className="flex items-center">
                  <span className="px-8">{w}</span>
                  <Star className="size-9" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 2 */
const problem: SlideDef = {
  id: 'probleme',
  speaker: 'Intervenant 1',
  notes:
    "Trois verbes : enfiler, user, oser. Preuves terrain : 15 personnes interrogées, une cinquantaine de témoignages en ligne, des échanges avec des professionnels de santé. Rester prudent : on ne dit pas que les vêtements aggravent la maladie, ils peuvent seulement freiner le port du corset.",
  node: (
    <Frame>
      <Chip>01 · Le problème</Chip>
      <H2>
        S'habiller avec un corset, <Mag>un défi quotidien.</Mag>
      </H2>
      <div className="flex gap-7">
        {[
          ['01', 'Enfiler', 'Tissus fins ou transparents, vêtements qui remontent, parfois impossibles à enfiler.'],
          ['02', 'User', "Le corset frotte toute la journée et crée des trous : on remplace plus souvent."],
          ['03', 'Oser', "Certains renoncent à des sorties ou ne portent pas leur corset à l'école."],
        ].map(([n, t, b]) => (
          <Card key={n} className="flex flex-1 flex-col gap-3">
            <span className="text-[88px] font-black leading-none tracking-[-0.05em] text-magenta">{n}</span>
            <h3 className="text-[40px] font-black leading-tight">{t}</h3>
            <p className="text-[27px] leading-snug text-bone/70">{b}</p>
          </Card>
        ))}
      </div>
      <div className="flex gap-6">
        <Stat label="personnes interrogées">
          <Count to={15} />
        </Stat>
        <Stat label="témoignages en ligne analysés">
          ≈ <Count to={50} />
        </Stat>
        <Stat label="acteurs confirment : patients, parents, soignants">
          <Count to={3} />
        </Stat>
        <Stat accent label="le prix d'un vêtement classique, jugé acceptable">
          × <Count to={2} />
        </Stat>
      </div>
      <Foot>
        Entretiens, questionnaire et témoignages recueillis par l'équipe. Les vêtements ne sont pas présentés comme une cause médicale : ils peuvent freiner le port du corset.
      </Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 3 */
const ambition: SlideDef = {
  id: 'ambition',
  speaker: 'Intervenant 1',
  notes:
    "Notre ambition est simple : que le corset ne soit plus un obstacle pour s'habiller, sortir et vivre normalement. Pour cela, pas un vêtement médical mais une véritable marque de streetwear.",
  bg: 'twill',
  node: (
    <Frame className="justify-center gap-12">
      <Chip>Notre ambition</Chip>
      <Words
        className="max-w-[1500px] text-[104px] font-black leading-[1] tracking-[-0.04em]"
        text="Que le corset ne soit plus un obstacle pour s'habiller, sortir et vivre normalement."
      />
      <R className="flex items-center gap-6">
        <Star className="size-14 text-magenta" />
        <span className="text-[40px] font-bold text-bone/85">Pas un vêtement médical. Une marque de streetwear.</span>
      </R>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 4 */
const solved = [
  ['Tissu fin, transparent', 'Sergé épais et opaque'],
  ['Corset visible', 'Matière structurée'],
  ['Vêtement qui remonte', 'Longueur adaptée'],
  ['Frottements, usure rapide', 'Tissu résistant'],
  ['Coupe trop serrée', 'Coupe oversize'],
  ['Aspect médical', 'Identité streetwear'],
]
const product: SlideDef = {
  id: 'produit',
  speaker: 'Intervenant 2',
  minutes: '2 min',
  notes:
    "Ce qui différencie BACK2BACK d'un tee ou d'un sweat classique : une collection de deux modèles, tee-shirt et hoodie, en cinq coloris, coupe oversize, matière pensée pour les contraintes du corset. Chaque détail répond à un problème cité en entretien.",
  node: (
    <Frame>
      <Chip>02 · La solution</Chip>
      <H2>
        Chaque détail <Mag>répond à un problème.</Mag>
      </H2>
      <div className="flex flex-1 gap-10">
        <div className="flex flex-[1.5] flex-col gap-3">
          <R className="grid grid-cols-[1fr_60px_1fr] px-8 text-[22px] font-bold uppercase tracking-[0.1em] text-bone/60">
            <span>Vêtement classique</span>
            <span />
            <span className="text-magenta">BACK2BACK</span>
          </R>
          {solved.map(([a, b]) => (
            <R key={a} className={cn(glass, 'grid grid-cols-[1fr_60px_1fr] items-center px-8 py-[18px] text-[29px]')}>
              <span className="text-bone/45 line-through decoration-magenta decoration-[3px]">{a}</span>
              <span className="text-bone/50">→</span>
              <span className="flex items-center gap-4 font-bold">
                <Check />
                {b}
              </span>
            </R>
          ))}
          <R className="mt-2 text-[24px] leading-snug text-bone/55">
            Un vêtement de mode, pas un dispositif médical : aucune promesse de guérison, de correction ou de traitement.
          </R>
        </div>
        <div className="flex flex-1 gap-6">
          {[
            { src: teeImg, name: 'Tee', alt: 'Tee BACK2BACK' },
            { src: hoodieImg, name: 'Hoodie', alt: 'Hoodie BACK2BACK' },
          ].map((p, k) => (
            <R key={p.name} anim="z" className={cn('relative flex-1 overflow-hidden rounded-[32px] ring-1 ring-white/20', k === 1 && 'mt-14')}>
              <img src={p.src} alt={p.alt} className="size-full object-cover" />
              <div className={cn(glass, 'absolute inset-x-4 bottom-4 flex items-center justify-between px-6 py-4 text-[28px]')}>
                <span className="font-bold">{p.name}</span>
                <span className="flex gap-2">
                  {products[k === 0 ? 'tee' : 'hoodie'].colorways.map((c) => (
                    <i key={c.name} className="block size-6 rounded-full ring-1 ring-white/40" style={{ backgroundColor: c.garment }} />
                  ))}
                </span>
              </div>
            </R>
          ))}
        </div>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 5 */
const fabric: SlideDef = {
  id: 'matiere',
  speaker: 'Intervenant 2',
  notes:
    "Un coton sergé épais d'environ 240 g/m², contre 150 à 180 g/m² pour un jersey classique. Trois bénéfices : opacité qui dissimule les reliefs, résistance aux frottements (le sergé sert aux vêtements de travail), et une coupe oversize qui facilite l'enfilage sans comprimer le corset. Le coton reste agréable et respirant.",
  bg: 'twill',
  node: (
    <Frame>
      <Chip>03 · La matière</Chip>
      <H2>
        Un sergé plus épais, <Mag>qui tient.</Mag>
      </H2>
      <div className="flex flex-1 gap-8">
        <R className={cn(glass, 'flex w-[640px] flex-col p-9')}>
          <p className="text-[36px] font-black leading-tight">Épaisseur du tissu</p>
          <p className="mt-1 text-[24px] text-bone/60">Grammes par mètre carré</p>
          <div className="mt-6 flex flex-1 items-end gap-8">
            {[
              { label: 'Jersey classique', value: '150 à 180', h: 68, mine: false },
              { label: 'BACK2BACK', value: '240', h: 100, mine: true },
            ].map((c, k) => (
              <div key={c.label} className="flex h-full flex-1 flex-col justify-end gap-3">
                <span className={cn('whitespace-nowrap text-[40px] font-black leading-none tabular-nums', c.mine ? 'text-magenta' : 'text-bone/60')}>
                  {c.value}
                  <span className="block pt-1 text-[22px] font-bold">g/m²</span>
                </span>
                <div className="relative flex-1">
                  <div
                    className={cn(
                      'grow-y absolute inset-x-0 bottom-0 overflow-hidden rounded-3xl',
                      c.mine ? 'bg-ink ring-2 ring-bone/70 shadow-[0_0_50px_-8px_rgba(239,235,227,0.35)]' : 'bg-bone/15 ring-1 ring-bone/20',
                    )}
                    style={{ height: `${c.h}%`, ['--d' as string]: `${0.9 + k * 0.4}s` }}
                  >
                    <img
                      src="/images/twill-370.png"
                      alt=""
                      className={cn('absolute inset-0 size-full object-cover', c.mine ? 'brightness-[2.4] contrast-[1.35] saturate-0' : 'scale-[2.4] opacity-30 brightness-150 saturate-0 blur-[1px]')}
                    />
                  </div>
                </div>
                <span className={cn('text-[26px] font-bold', c.mine ? 'text-bone' : 'text-bone/60')}>{c.label}</span>
              </div>
            ))}
          </div>
        </R>
        <div className="flex flex-1 flex-col gap-5">
          {[
            ['Opaque', "L'épaisseur et la structure du tissu dissimulent davantage les reliefs du corset."],
            ['Résistant', "Le sergé est une armure utilisée pour des vêtements soumis à des contraintes mécaniques : il tient aux frottements et à l'usure."],
            ['Facile à enfiler', "Silhouette oversize, longueur adaptée, emmanchures et col larges : le corset n'est pas comprimé."],
          ].map(([t, b]) => (
            <Card key={t} className="flex flex-1 flex-col justify-center gap-2 px-9 py-6">
              <h3 className="text-[44px] font-black leading-none text-magenta">{t}</h3>
              <p className="text-[28px] leading-snug text-bone/80">{b}</p>
            </Card>
          ))}
        </div>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 6 */
const positioning: SlideDef = {
  id: 'positionnement',
  speaker: 'Intervenant 2',
  notes:
    "Les vêtements adaptatifs existants répondent à des besoins fonctionnels mais restent éloignés des codes des ados. Le prêt-à-porter est esthétique mais ignore le corset. BACK2BACK réunit les deux. Notre produit ne ressemble pas à un dispositif médical : on le porte par nécessité, mais surtout par envie.",
  node: (
    <Frame>
      <Chip>04 · Le positionnement</Chip>
      <H2>
        La fonction d'un vêtement adapté, <Mag>le style de la rue.</Mag>
      </H2>
      <div className="relative flex flex-1 items-center justify-center">
        <R anim="l" className="absolute left-[130px] top-1/2 size-[560px] -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.06] p-14 pt-24 backdrop-blur-xl">
          <h3 className="text-[40px] font-black">Vêtement adapté</h3>
          <p className="mt-2 w-[250px] text-[26px] leading-snug text-bone/70">Répond au besoin, mais reste éloigné des codes vestimentaires des ados.</p>
        </R>
        <R anim="rt" className="absolute right-[130px] top-1/2 size-[560px] -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.06] p-14 pt-24 text-right backdrop-blur-xl">
          <h3 className="text-[40px] font-black">Prêt-à-porter</h3>
          <p className="ml-auto mt-2 w-[250px] text-[26px] leading-snug text-bone/70">Esthétique, mais ne tient pas compte des contraintes du corset.</p>
        </R>
        <R anim="z" className="relative flex h-[340px] w-[380px] flex-col items-center justify-center gap-5 rounded-[190px] border-2 border-magenta bg-magenta/20 shadow-[0_0_120px_rgba(255,43,214,0.35)] backdrop-blur-xl">
          <Logo className="h-[72px]" />
          <p className="px-10 text-center text-[26px] font-bold leading-tight">On le porte par nécessité, surtout par envie.</p>
        </R>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 7 */
const price: SlideDef = {
  id: 'prix',
  speaker: 'Intervenant 2',
  notes:
    "Prix : 40 euros le tee-shirt, 80 euros le hoodie. Positionnement premium justifié par la technicité, la qualité des matières et la spécialisation du produit. Coût de revient livré à Lyon, douane comprise : environ 5 et 10 euros.",
  node: (
    <Frame>
      <Chip>05 · Le prix</Chip>
      <H2>
        Un prix affiché <Mag>dès le départ.</Mag>
      </H2>
      <div className="flex flex-1 gap-7">
        {[
          { k: 'tee' as const, name: 'Tee-shirt', price: 40, cost: '5 €', ht: '33,33 €', img: teeImg },
          { k: 'hoodie' as const, name: 'Hoodie', price: 80, cost: '10 €', ht: '66,67 €', img: hoodieImg },
        ].map((p) => (
          <R key={p.k} anim="z" className={cn(glass, 'flex flex-1 overflow-hidden')}>
            <img src={p.img} alt={p.name} className="h-full w-[230px] object-cover" />
            <div className="flex flex-1 flex-col justify-center gap-2 p-9">
              <span className="font-label text-[22px] font-bold uppercase tracking-[0.14em] text-bone/60">{p.name}</span>
              <span className="whitespace-nowrap text-[116px] font-black leading-none tracking-[-0.05em] text-magenta">
                <Count to={p.price} suffix=" €" />
              </span>
              <span className="text-[26px] text-bone/60">TTC</span>
              <div className="mt-4 flex justify-between gap-3 whitespace-nowrap border-t border-white/15 pt-4 text-[26px]">
                <span className="text-bone/70">Coût livré à Lyon</span>
                <b>{p.cost}</b>
              </div>
              <div className="flex justify-between gap-3 whitespace-nowrap text-[26px]">
                <span className="text-bone/70">Prix de vente HT</span>
                <b>{p.ht}</b>
              </div>
            </div>
          </R>
        ))}
        <div className="flex w-[380px] flex-col gap-6">
          <Stat accent label="coût moyen d'une pièce livrée (55 % de tee-shirts, 45 % de hoodies)">
            <Count to={7.25} d={2} suffix=" €" />
          </Stat>
          <Stat label="prix moyen TTC par pièce">
            <Count to={58} suffix=" €" />
          </Stat>
        </div>
      </div>
      <Foot>Coûts de revient : 5 € et 10 € par pièce, douane comprise. Livraison facturée séparément au client.</Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 8 */
const market: SlideDef = {
  id: 'marche',
  speaker: 'Intervenant 3',
  minutes: '1 min 55',
  notes:
    "À qui vendre ? D'abord les ados européens qui portent un corset et leurs parents, souvent décisionnaires. Estimation : 0,3 % de jeunes porteurs parmi 33,2 millions de jeunes de 11 à 17 ans dans l'UE, soit environ 99 600 personnes. Attention : 0,3 % est une hypothèse de travail, pas une statistique officielle européenne.",
  node: (
    <Frame>
      <Chip>06 · Le marché</Chip>
      <H2>
        Notre marché de départ : <Mag>l'Union européenne.</Mag>
      </H2>
      <div className="flex flex-1 flex-col justify-center gap-4">
        {[
          { w: '100%', n: <Count to={33.2} d={1} suffix=" M" />, t: 'jeunes de 11 à 17 ans dans l’Union européenne', bg: 'bg-white/[0.07]' },
          { w: '78%', n: <Count to={99600} />, t: 'jeunes porteurs de corset (0,3 %, fourchette de 66 400 à 132 800)', bg: 'bg-magenta/35 border-magenta/60' },
          { w: '72%', n: <Count to={7.9} d={1} suffix=" %" />, t: 'des porteurs devenus clients fin A3 (1,5 % fin A1, 5,1 % fin A2)', bg: 'bg-magenta' },
        ].map((r, k) => (
          <R
            key={k}
            className={cn('flex items-center gap-8 rounded-3xl border border-white/15 px-10 py-7 backdrop-blur-xl', r.bg)}
            style={{ width: r.w }}
          >
            <span className={cn('min-w-[330px] text-[78px] font-black leading-none tracking-[-0.04em]', k === 2 && 'text-ink')}>{r.n}</span>
            <span className={cn('text-[28px] leading-snug', k === 2 ? 'font-semibold text-ink' : 'text-bone/80')}>{r.t}</span>
          </R>
        ))}
      </div>
      <Foot>
        Le taux de 0,3 % est une hypothèse de travail de l'équipe, pas une statistique officielle. Suisse non comptée dans la base, ce qui est prudent.
      </Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 9 */
const twoSteps: SlideDef = {
  id: 'strategie',
  speaker: 'Intervenant 3',
  notes:
    "Développement en deux temps. D'abord les ados porteurs de corset, puis les ados qui ne portent pas de corset mais aiment notre univers. Exemples : The North Face et Patagonia, partis d'un besoin précis pour devenir des références de la mode quotidienne. On ne dépend ainsi pas d'une niche au volume limité.",
  node: (
    <Frame>
      <Chip>07 · La stratégie</Chip>
      <H2>
        Une stratégie <Mag>en deux temps.</Mag>
      </H2>
      <div className="flex flex-1 items-stretch gap-6">
        <Card className="flex flex-1 flex-col gap-4">
          <span className="font-label text-[22px] font-bold uppercase tracking-[0.14em] text-bone/60">Temps 1 · années 1 et 2</span>
          <h3 className="text-[48px] font-black leading-tight">Les ados porteurs de corset</h3>
          <p className="text-[28px] text-bone/75">Cible : jeunes de l'UE et leurs parents, souvent décisionnaires de l'achat.</p>
          <p className="text-[28px] text-bone/75">Volume : 1 800 puis 4 500 commandes.</p>
          <div className="mt-auto border-t border-white/15 pt-5">
            <span className="text-[24px] text-bone/60">Résultat net A2</span>
            <div className="text-[68px] font-black leading-none">
              <Count to={22923} suffix=" €" />
            </div>
          </div>
        </Card>
        <R className="flex w-[120px] items-center justify-center">
          <svg viewBox="0 0 150 60" className="w-full">
            <line className="draw" pathLength={1} x1="0" y1="30" x2="120" y2="30" stroke="#ff2bd6" strokeWidth="6" strokeLinecap="round" />
            <path d="M112 12 L140 30 L112 48" fill="none" stroke="#ff2bd6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </R>
        <Card accent className="flex flex-1 flex-col gap-4">
          <span className="font-label text-[22px] font-bold uppercase tracking-[0.14em] text-magenta">Temps 2 · année 3</span>
          <h3 className="text-[48px] font-black leading-tight">On s'ouvre au streetwear</h3>
          <p className="text-[28px] text-bone/75">Cible : les ados qui aiment l'univers, avec ou sans corset.</p>
          <p className="text-[28px] text-bone/75">Volume : 9 500 commandes, dont 5 000 streetwear.</p>
          <div className="mt-auto border-t border-white/15 pt-5">
            <span className="text-[24px] text-bone/60">Résultat net A3</span>
            <div className="text-[68px] font-black leading-none text-magenta">
              <Count to={76648} suffix=" €" />
            </div>
          </div>
        </Card>
      </div>
      <R className="flex items-center gap-5 text-[28px] text-bone/80">
        <Star className="size-9 text-magenta" />
        <span>
          Comme <b>The North Face</b> et <b>Patagonia</b> : partir d'un besoin précis, en faire une force, puis élargir.
        </span>
      </R>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 10 */
const stations = [
  ['Dongguan', 'Bayee Group, 50 pièces minimum par référence'],
  ['Lyon', 'Réception, contrôle qualité, stockage'],
  ['Points relais', 'Livraison en Europe, retours triés à Lyon'],
  ['Client', 'Port facturé 7,90 € TTC'],
]
const production: SlideDef = {
  id: 'production',
  speaker: 'Intervenant 4',
  minutes: '2 min',
  notes:
    "Production en Chine chez Bayee Group, à Dongguan : coûts maîtrisés, prix accessibles, mais exigences de qualité (grammage, résistance, finitions, conformité). À terme : réinvestir les bénéfices dans une production européenne, voire française. Aucune commande du lot avant validation du prototype.",
  node: (
    <Frame>
      <Chip>08 · La production</Chip>
      <H2>
        De Dongguan <Mag>au client.</Mag>
      </H2>
      <R className="relative mt-4 flex-1">
        <div className="absolute inset-x-[110px] top-[56px] h-[6px] rounded-full bg-white/10">
          <div className="grow-x h-full rounded-full bg-magenta" style={{ ['--d' as string]: '0.9s' }} />
        </div>
        <div className="grid grid-cols-4 gap-6">
          {stations.map(([t, b], k) => (
            <div key={t} className="flex flex-col items-center gap-4 text-center">
              <div className="late flex size-[116px] items-center justify-center rounded-full border border-white/25 bg-ink text-[44px] font-black text-magenta" style={{ ['--d' as string]: `${0.8 + k * 0.5}s` }}>
                {k + 1}
              </div>
              <h3 className="text-[38px] font-black">{t}</h3>
              <p className="max-w-[300px] text-[25px] leading-snug text-bone/70">{b}</p>
            </div>
          ))}
        </div>
      </R>
      <div className="flex gap-6">
        <Stat label="de transport DDP pour 500 pièces, douane comprise">
          <Count to={250} suffix=" €" />
        </Stat>
        <Stat label="coût moyen d'une pièce arrivée à Lyon">
          <Count to={7.25} d={2} suffix=" €" />
        </Stat>
        <Stat accent label="de commandes retournées, remboursées et triées à Lyon">
          <Count to={15} suffix=" %" />
        </Stat>
      </div>
      <Foot>
        Première commande : 500 pièces, 10 références (2 modèles en 5 coloris), 50 pièces par référence, après validation du prototype. À terme, objectif de production européenne.
      </Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 11 */
const channels: SlideDef = {
  id: 'canaux',
  speaker: 'Intervenant 4',
  notes:
    "Trois canaux de même importance : le site Shopify, les réseaux sociaux (Instagram, TikTok) et les partenariats professionnels (PROTEOR, Össur, Thuasne). PROTEOR : près de 100 centres d'orthoprothésistes. Thuasne : 110 pays, plus de 2 500 collaborateurs. Zalando : plus de 60 millions de clients dans 29 marchés. Commission cible de 7 % du chiffre d'affaires HT pour les apporteurs d'affaires.",
  node: (
    <Frame>
      <Chip>09 · La distribution</Chip>
      <H2>
        Trois canaux pour <Mag>ne pas dépendre d'un seul.</Mag>
      </H2>
      <div className="flex flex-1 gap-6">
        {[
          ['Notre site', 'Shopify', "Vente directe, expérience client maîtrisée, prix et relation en main propre."],
          ['Réseaux sociaux', 'Instagram · TikTok', "Faire connaître la marque, présenter les produits, partager des témoignages et créer une communauté."],
          ['Partenariats pro', 'PROTEOR · Össur · Thuasne', "PROTEOR : près de 100 centres. Thuasne : 110 pays, plus de 2 500 collaborateurs."],
        ].map(([t, s, b]) => (
          <Card key={t} className="flex flex-1 flex-col gap-4">
            <Star className="size-14 text-magenta" />
            <h3 className="text-[48px] font-black leading-none">{t}</h3>
            <span className="font-label text-[22px] font-bold uppercase tracking-[0.1em] text-magenta">{s}</span>
            <p className="text-[28px] leading-snug text-bone/75">{b}</p>
          </Card>
        ))}
      </div>
      <R className={cn(glass, 'flex items-center justify-between gap-10 px-10 py-6 text-[27px]')}>
        <span>
          <b>Zalando</b> : plus de 60 millions de clients, 29 marchés. Rapprochement envisagé, <b>hors scénario central</b>.
        </span>
        <span className="whitespace-nowrap">
          Commission cible : <b className="text-magenta">7 %</b> du CA HT
        </span>
      </R>
      <Foot>Les partenariats doivent encore être formalisés : le rôle de PROTEOR et l'absence de commission sont à confirmer par écrit.</Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 12 */
const marketingSlide: SlideDef = {
  id: 'marketing',
  speaker: 'Intervenant 4',
  notes:
    "Le budget marketing augmente avec les ventes (35 % fixe, 65 % qui suit les ventes) alors que le coût pour acquérir un nouveau client baisse : réseau PROTEOR, associations, parrainage et contenu réutilisé apportent des clients à coût faible.",
  node: (
    <Frame>
      <Chip>10 · Le marketing</Chip>
      <H2>
        Plus on grandit, <Mag>moins un client coûte.</Mag>
      </H2>
      <R className={cn(glass, 'flex flex-1 flex-col justify-center gap-8 p-12')}>
        {['A1', 'A2', 'A3'].map((y, k) => (
          <div key={y} className="grid grid-cols-[90px_1fr_420px] items-center gap-8">
            <span className="text-[44px] font-black">{y}</span>
            <div className="h-[72px] rounded-2xl bg-white/[0.06]">
              <div
                className="grow-x flex h-full items-center rounded-2xl bg-magenta px-6 text-[32px] font-black text-ink"
                style={{ width: `${(marketing.budget[k] / 100000) * 100}%`, ['--d' as string]: `${0.9 + k * 0.3}s` }}
              >
                {fmt(marketing.budget[k])} €
              </div>
            </div>
            <span className="text-[30px] text-bone/80">
              <b className="text-[52px] font-black text-bone">{fmt(marketing.cac[k], 1)} €</b> par nouveau client
            </span>
          </div>
        ))}
      </R>
      <Foot>Budget marketing récurrent HT. 35 % du marketing est fixe et 65 % suit les ventes.</Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 13 */
const revenueBuild: SlideDef = {
  id: 'ca',
  speaker: 'Intervenant 5',
  minutes: '2 min',
  notes:
    "Le chiffre d'affaires se calcule en prix, quantité et hypothèses. Prix moyen de 58 € TTC par pièce, 1,2 pièce par commande : 69,60 € TTC, soit 57,52 € HT avec 21 % de TVA moyenne. En A1 : 1 800 commandes, moins 15 % de retours remboursés, plus le port facturé, soit 99 758 € HT.",
  node: (
    <Frame>
      <Chip>11 · Le modèle économique</Chip>
      <H2>
        Prix × quantité, <Mag>rien de plus.</Mag>
      </H2>
      <div className="flex items-center gap-5">
        {[
          { n: <Count to={priceBuild.avgPriceTtc} suffix=" €" />, t: 'prix moyen TTC par pièce' },
          { op: '×' },
          { n: <Count to={priceBuild.piecesPerOrder} d={1} />, t: 'pièce par commande' },
          { op: '=' },
          { n: <Count to={priceBuild.basketHt} d={2} suffix=" €" />, t: 'HT par commande (TVA moyenne 21 %)', accent: true },
          { op: '×' },
          { n: 'N', t: 'commandes, moins 15 % de retours' },
        ].map((x, k) =>
          x.op ? (
            <R key={k} className="text-[64px] font-black text-bone/40">
              {x.op}
            </R>
          ) : (
            <Card key={k} accent={x.accent} className="flex flex-1 flex-col gap-2 px-7 py-6">
              <span className={cn('text-[62px] font-black leading-none tracking-[-0.04em]', x.accent && 'text-magenta')}>{x.n}</span>
              <span className="text-[23px] leading-snug text-bone/70">{x.t}</span>
            </Card>
          ),
        )}
      </div>
      <R className={cn(glass, 'flex flex-1 flex-col justify-center gap-5 p-10')}>
        <p className="text-[26px] font-bold uppercase tracking-[0.08em] text-bone/60">Exemple, année 1</p>
        <div className="flex items-center gap-5 text-[34px]">
          {[
            ['1 800 × 57,52 €', '103 537 €', 'ventes HT'],
            ['−', '15 531 €', '15 % de retours'],
            ['+', '11 752 €', 'port facturé (7,90 € TTC)'],
            ['=', '99 758 €', "chiffre d'affaires net HT"],
          ].map(([a, b, c], k) => (
            <R key={k} className={cn('flex flex-1 flex-col', k === 3 && 'text-magenta')}>
              <span className="text-[24px] text-bone/60">{a === '−' || a === '+' || a === '=' ? a : a}</span>
              <b className="text-[52px] font-black leading-tight">{b}</b>
              <span className="text-[22px] text-bone/60">{c}</span>
            </R>
          ))}
        </div>
      </R>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 14 */
const revenue3: SlideDef = {
  id: 'trois-ans',
  speaker: 'Intervenant 5',
  notes:
    "Scénario central sur trois ans : 1 800 commandes en A1, 4 500 en A2, 9 500 en A3 dont 5 000 hors corset. Le volume corset reste à 4 500 car la niche se sature ; la croissance vient de l'ouverture au streetwear en année 3, environ 0,015 % des 33,2 millions de jeunes de l'UE.",
  node: (
    <Frame>
      <Chip>12 · Les prévisions</Chip>
      <H2>
        Trois ans de croissance, <Mag>portée par le streetwear.</Mag>
      </H2>
      <R className={cn(glass, 'flex flex-1 items-end justify-around gap-10 px-14 pb-10 pt-8')}>
        {['A1', 'A2', 'A3'].map((y, k) => {
          const heights = [14, 34, 72]
          return (
            <div key={y} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
              <span className={cn('text-[56px] font-black leading-none tabular-nums', k === 2 && 'text-magenta')}>
                <Count to={keyFigures.revenue[k]} suffix=" €" />
              </span>
              <div
                className={cn('grow-y w-full max-w-[340px] rounded-t-3xl', k === 2 ? 'bg-magenta' : 'bg-white/20')}
                style={{ height: `${heights[k]}%`, ['--d' as string]: `${0.8 + k * 0.3}s` }}
              />
              <span className="text-[34px] font-black">{y}</span>
              <span className="text-center text-[24px] leading-snug text-bone/70">
                {fmt(orders.total[k])} commandes
                <br />
                {k === 2 ? '4 500 corset · 5 000 streetwear' : `${fmt(orders.corset[k])} corset`}
              </span>
            </div>
          )
        })}
      </R>
      <Foot>Chiffre d'affaires net HT, après 15 % de retours remboursés, port facturé inclus.</Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 15 */
const pnlSlide: SlideDef = {
  id: 'resultat',
  speaker: 'Intervenant 5',
  notes:
    "Année 1 : phase d'investissement, perte nette de 36 396 € (prélancement, acquisition des premiers clients, structuration). Année 2 : résultat net positif de 22 923 €. Année 3 : 76 648 €. Les charges s'adaptent aux volumes : 35 % du marketing est fixe, 65 % suit les ventes.",
  node: (
    <Frame>
      <Chip>13 · Le compte de résultat</Chip>
      <H2>
        Une perte au lancement, <Mag>puis rentable.</Mag>
      </H2>
      <R className={cn(glass, 'flex flex-col px-9 py-4')}>
        <div className="grid grid-cols-[1fr_260px_260px_260px] px-4 py-3 text-[22px] font-bold uppercase tracking-[0.08em] text-bone/60">
          <span>En euros HT</span>
          {['A1', 'A2', 'A3'].map((y) => (
            <span key={y} className="text-right">
              {y}
            </span>
          ))}
        </div>
        {pnl.map((row) => (
          <div
            key={row.label}
            className={cn(
              'grid grid-cols-[1fr_260px_260px_260px] items-center border-t border-white/10 px-4 py-[10px] text-[28px]',
              row.highlight && 'my-1 rounded-2xl border-t-0 bg-magenta/20 font-bold',
              row.strong && 'text-[32px] font-black',
            )}
          >
            <span>{row.label}</span>
            {row.values.map((v, k) => (
              <span key={k} className={cn('text-right tabular-nums', v < 0 && !row.highlight && 'text-bone/55', row.strong && k === 2 && 'text-magenta')}>
                {money(v)}
              </span>
            ))}
          </div>
        ))}
      </R>
      <Foot>Prélancement de 19 000 € rattaché à l'année 1. Impôt de 15 392 € en année 3 après report des pertes.</Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 16 */
const financing: SlideDef = {
  id: 'financement',
  speaker: 'Intervenant 5',
  notes:
    "Financement : 84 000 € d'apports en capital, soit 14 000 € par associé, déjà confirmés par les six associés. Ni prêt bancaire ni subvention retenus dans le scénario central : ils restent une marge de manœuvre. 19 000 € de démarrage : 8 000 € de prélancement, 4 000 € de prototypes, 2 000 € de création et administratif, 2 000 € de site, 3 000 € de conformité européenne.",
  node: (
    <Frame>
      <Chip>14 · Le financement</Chip>
      <H2>
        84 000 € de capital, <Mag>déjà confirmés.</Mag>
      </H2>
      <div className="flex flex-1 items-center gap-16">
        <R anim="z" className="relative shrink-0">
          <Donut size={520} parts={funding.uses.map((u) => ({ value: u.value, color: u.color }))} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[78px] font-black leading-none tracking-[-0.04em]">
              <Count to={84000} suffix=" €" />
            </span>
            <span className="mt-2 text-[26px] text-bone/65">6 associés × 14 000 €</span>
          </div>
        </R>
        <div className="flex flex-1 flex-col gap-2">
          {funding.uses.map((u) => (
            <R key={u.label} className="grid grid-cols-[28px_1fr_150px] items-center gap-5 px-4 py-3 text-[27px]">
              <i className="block size-6 rounded-lg" style={{ backgroundColor: u.color }} />
              <span>{u.label}</span>
              <span className="text-right font-black tabular-nums">{fmt(u.value)}</span>
            </R>
          ))}
          <R className={cn(glass, 'mt-3 flex items-center justify-between px-8 py-5 text-[26px]')}>
            <span className="text-bone/75">Besoin maximal de financement</span>
            <span>
              <b className="text-[40px] font-black text-magenta">{fmt(funding.maxNeed)} €</b>
              <span className="ml-3 text-bone/60">{fmt(funding.maxNeedWithReserve)} € avec réserve</span>
            </span>
          </R>
        </div>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 17 */
const scenariosSlide: SlideDef = {
  id: 'scenarios',
  speaker: 'Intervenant 5',
  notes:
    "Seuil de rentabilité : environ 3 799 commandes par an, soit 210 544 € de chiffre d'affaires HT. Le scénario central prévoit 4 500 commandes en A2 et le dépasse. Seul le central tient avec 84 000 €. Le scénario prudent (35 % de commandes en moins) demanderait 106 080 € de financement complémentaire : c'est le risque principal.",
  node: (
    <Frame>
      <Chip>15 · Seuil et scénarios</Chip>
      <H2>
        Un central solide, <Mag>un prudent à financer.</Mag>
      </H2>
      <div className="flex flex-1 items-stretch gap-6">
        {scenarios.map((s) => (
          <Card key={s.name} accent={s.main} className={cn('flex flex-1 flex-col gap-3', s.main && '-translate-y-3')}>
            <span className={cn('font-label text-[21px] font-bold uppercase tracking-[0.1em]', s.main ? 'text-magenta' : 'text-bone/60')}>{s.tag}</span>
            <h3 className="mb-2 text-[56px] font-black leading-none">{s.name}</h3>
            {[
              ['Commandes A3', fmt(s.orders3)],
              ['CA A3', `${fmt(s.revenue3)} €`],
              ['Résultat avant impôt A2', `${money(s.result2)} €`],
              ['Point bas trésorerie', `${money(s.lowCash)} €`],
            ].map(([a, b]) => (
              <div key={a} className="flex items-baseline justify-between gap-4 text-[26px]">
                <span className="text-bone/70">{a}</span>
                <b className={cn('text-[30px] tabular-nums', b.startsWith('(') && 'text-bone/55')}>{b}</b>
              </div>
            ))}
          </Card>
        ))}
      </div>
      <div className="flex gap-6">
        <Stat label="commandes par an pour atteindre le seuil de rentabilité (210 544 € de CA HT)">
          <Count to={breakeven.orders} />
        </Stat>
        <Stat accent label="de financement complémentaire dans le prudent, réserve de 20 000 € comprise">
          <Count to={breakeven.extraFunding} suffix=" €" />
        </Stat>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 18 */
const treasury: SlideDef = {
  id: 'tresorerie',
  speaker: 'Intervenant 6',
  minutes: '1 min 50',
  notes:
    "Plancher de sécurité fixé à 20 000 €. Dans le scénario central, la trésorerie ne descend jamais sous ce seuil pendant trois ans. Point bas de 25 163 € en août de l'année 2, après l'investissement de début d'année et avant le pic d'automne.",
  node: (
    <Frame>
      <Chip>16 · La trésorerie</Chip>
      <H2>
        Au-dessus de 20 000 € <Mag>pendant 36 mois.</Mag>
      </H2>
      <R className={cn(glass, 'flex-1 px-10 py-6')}>
        <TreasuryChart />
      </R>
      <Foot>Scénario central, soldes de fin de mois. Point bas de 25 163 € en août de l'année 2.</Foot>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 19 */
const risks: SlideDef = {
  id: 'risques',
  speaker: 'Intervenant 6',
  notes:
    "Trois paramètres font basculer le projet : le panier de 1,2 pièce, la facturation du port et le volume. Règle de pilotage : si la projection de trésorerie à 13 semaines passe sous 20 000 €, ou si les retours dépassent 18 % sur deux cohortes, on gèle le marketing payé et on active un financement complémentaire.",
  node: (
    <Frame>
      <Chip>17 · Les risques</Chip>
      <H2>
        Des risques chiffrés, <Mag>une règle de pilotage.</Mag>
      </H2>
      <div className="flex flex-1 gap-8">
        <R className={cn(glass, 'flex flex-[1.4] flex-col justify-center gap-2 px-9 py-6')}>
          <p className="mb-2 text-[24px] font-bold uppercase tracking-[0.08em] text-bone/60">Excédent d'exploitation A2, un seul paramètre change</p>
          {sensitivities.map((s, k) => (
            <div key={s.label} className="grid grid-cols-[1fr_190px] items-center gap-6 border-t border-white/10 py-3 text-[27px]">
              <span>{s.label}</span>
              <span className={cn('text-right text-[32px] font-black tabular-nums', s.ebe2 < 5000 && 'text-magenta')} style={{ animationDelay: `${k * 80}ms` }}>
                {money(s.ebe2)} €
              </span>
            </div>
          ))}
          <p className="mt-2 text-[24px] text-bone/60">Référence centrale : 25 923 €.</p>
        </R>
        <div className="flex flex-1 flex-col gap-6">
          <Card accent className="flex flex-col gap-3">
            <span className="font-label text-[22px] font-bold uppercase tracking-[0.1em] text-magenta">Règle de pilotage</span>
            <p className="text-[30px] leading-snug">
              Trésorerie à 13 semaines sous 20 000 € ou retours au-dessus de 18 % sur deux cohortes :{' '}
              <b>on gèle le marketing payé et on active un financement complémentaire.</b>
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <span className="font-label text-[22px] font-bold uppercase tracking-[0.1em] text-bone/60">Les trois paramètres décisifs</span>
            {['Le panier de 1,2 pièce', 'La facturation du port', 'Le volume de commandes'].map((t) => (
              <p key={t} className="flex items-center gap-4 text-[28px]">
                <Star className="size-7 text-magenta" />
                {t}
              </p>
            ))}
          </Card>
        </div>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 20 */
const nextSteps: SlideDef = {
  id: 'etapes',
  speaker: 'Intervenant 6',
  notes:
    "Ce qui reste à valider : la demande réelle, les conditions du fournisseur et la qualité en série, la formalisation des partenariats. On ne construit pas la réussite sur des accords non signés. Indicateurs suivis : taux de conversion, coût d'acquisition, panier moyen, taux de retour, trésorerie. Développement progressif : valider le produit, s'implanter sur le marché du corset, bâtir une marque, élargir au streetwear.",
  node: (
    <Frame>
      <Chip>18 · La suite</Chip>
      <H2>
        Valider d'abord, <Mag>grandir ensuite.</Mag>
      </H2>
      <div className="relative">
        <div className="absolute inset-x-[90px] top-[41px] h-[4px] rounded-full bg-white/10">
          <div className="grow-x h-full rounded-full bg-magenta" style={{ ['--d' as string]: '0.8s' }} />
        </div>
        <div className="relative grid grid-cols-4 gap-6">
          {[
            ['Valider le produit', 'Prototype, tests de lavage, de frottement et d’opacité'],
            ['Marché du corset', 'S’implanter auprès des porteurs en Europe'],
            ['Une marque reconnue', 'Communauté, partenaires, réseaux'],
            ['Le streetwear', 'Élargir la clientèle'],
          ].map(([t, b], k) => (
            <R key={t} className="flex flex-col gap-3">
              <span className="flex size-[84px] items-center justify-center rounded-full border border-white/25 bg-ink text-[34px] font-black text-magenta">
                {k + 1}
              </span>
              <h3 className="text-[34px] font-black leading-tight">{t}</h3>
              <p className="text-[24px] leading-snug text-bone/70">{b}</p>
            </R>
          ))}
        </div>
      </div>
      <div className="flex flex-1 gap-6">
        <Card className="flex flex-1 flex-col gap-3">
          <h3 className="text-[34px] font-black">À valider</h3>
          {[
            'La demande réelle, mesurée sur les premiers mois de vente',
            'Les conditions du fournisseur et la qualité en série',
            'Les partenariats, à formaliser par écrit',
          ].map((t) => (
            <p key={t} className="flex gap-4 text-[26px] leading-snug text-bone/80">
              <Star className="mt-1 size-6 shrink-0 text-magenta" />
              {t}
            </p>
          ))}
        </Card>
        <Card accent className="flex flex-1 flex-col gap-3">
          <h3 className="text-[34px] font-black">Indicateurs suivis</h3>
          <div className="flex flex-wrap gap-3">
            {['Taux de conversion', "Coût d'acquisition", 'Panier moyen', 'Taux de retour', 'Trésorerie'].map((t) => (
              <span key={t} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[26px] font-semibold">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-auto text-[24px] text-bone/65">Plancher de sécurité de trésorerie : 20 000 €.</p>
        </Card>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 21 */
const ask: SlideDef = {
  id: 'demande',
  speaker: 'Intervenant 6',
  notes:
    "Notre demande : un financement de 84 000 € en capital, soit 14 000 € par associé, déjà confirmés par les six membres de l'équipe. Notre promesse : rentable en année 2, trésorerie au-dessus de 20 000 € sur 36 mois, capitaux propres de 84 000 à 147 175 € fin A3. Aucune commande du lot de 500 pièces avant la validation du prototype.",
  bg: 'twill',
  node: (
    <Frame className="justify-center">
      <Chip>19 · Demande et promesse</Chip>
      <div className="flex items-center gap-20">
        <div className="flex flex-1 flex-col gap-4">
          <span className="font-label text-[26px] font-bold uppercase tracking-[0.14em] text-magenta">Notre demande</span>
          <R anim="z" as="span" className="whitespace-nowrap text-[210px] font-black leading-[0.9] tracking-[-0.06em] text-magenta">
            <Count to={84000} duration={2000} suffix=" €" />
          </R>
          <R as="p" className="max-w-[700px] text-[34px] leading-snug text-bone/80">
            de capital pour lancer BACK2BACK, apportés par les six associés : 14 000 € chacun.
          </R>
        </div>
        <div className="flex w-[760px] flex-col gap-4">
          <span className="font-label text-[26px] font-bold uppercase tracking-[0.14em] text-bone/60">Notre promesse</span>
          {[
            'Une marque rentable dès l’année 2',
            'Une trésorerie au-dessus de 20 000 € pendant 36 mois',
            'Des capitaux propres de 84 000 € à 147 175 € fin A3',
            'Aucune commande du lot avant la validation du prototype',
          ].map((t, k) => (
            <R key={t} className={cn(glass, 'flex items-center gap-6 px-8 py-6 text-[31px] leading-snug', k === 3 && 'border-magenta/60')}>
              <Check />
              {t}
            </R>
          ))}
        </div>
      </div>
    </Frame>
  ),
}

/* ------------------------------------------------------------------ 22 */
const thanks: SlideDef = {
  id: 'merci',
  speaker: 'Intervenant 6',
  notes: "Conclusion : un vêtement pensé pour s'adapter à vous, et non l'inverse. Merci pour votre attention, puis questions du jury.",
  bg: 'stars',
  node: (
    <Frame className="items-center justify-center gap-10 text-center">
      <R anim="z">
        <Logo className="h-[300px] drop-shadow-[0_0_60px_rgba(255,43,214,0.35)]" />
      </R>
      <Words
        className="max-w-[1300px] text-[64px] font-black leading-[1.05] tracking-[-0.03em]"
        text="Un vêtement pensé pour s'adapter à vous, et non l'inverse."
      />
      <R className="flex items-center gap-5 text-[40px] font-bold text-magenta">
        <Star className="size-10" />
        Merci pour votre attention
        <Star className="size-10" />
      </R>
    </Frame>
  ),
}

export const slides: SlideDef[] = [
  cover,
  problem,
  ambition,
  product,
  fabric,
  positioning,
  price,
  market,
  twoSteps,
  production,
  channels,
  marketingSlide,
  revenueBuild,
  revenue3,
  pnlSlide,
  financing,
  scenariosSlide,
  treasury,
  risks,
  nextSteps,
  ask,
  thanks,
]

