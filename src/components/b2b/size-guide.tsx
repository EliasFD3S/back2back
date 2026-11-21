'use client'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { GarmentKind } from '@/lib/products'
import { Logo } from './logo'
import { SiteFooter } from './site-footer'

// Mesures du vêtement à plat, en cm (largeur poitrine, longueur, manche, épaule)
const chart: Record<GarmentKind, { size: string; chest: number; length: number; sleeve: number; shoulder: number }[]> = {
  tee: [
    { size: 'XS', chest: 56, length: 70, sleeve: 22, shoulder: 52 },
    { size: 'S', chest: 58, length: 72, sleeve: 23, shoulder: 54 },
    { size: 'M', chest: 60, length: 74, sleeve: 24, shoulder: 56 },
    { size: 'L', chest: 62, length: 76, sleeve: 25, shoulder: 58 },
    { size: 'XL', chest: 64, length: 78, sleeve: 26, shoulder: 60 },
    { size: 'XXL', chest: 66, length: 80, sleeve: 27, shoulder: 62 },
  ],
  hoodie: [
    { size: 'XS', chest: 60, length: 68, sleeve: 58, shoulder: 54 },
    { size: 'S', chest: 62, length: 70, sleeve: 60, shoulder: 56 },
    { size: 'M', chest: 64, length: 72, sleeve: 62, shoulder: 58 },
    { size: 'L', chest: 66, length: 74, sleeve: 64, shoulder: 60 },
    { size: 'XL', chest: 68, length: 76, sleeve: 66, shoulder: 62 },
    { size: 'XXL', chest: 70, length: 78, sleeve: 68, shoulder: 64 },
  ],
}

const titles: Record<GarmentKind, string> = { tee: 'Tee BACK2BACK', hoodie: 'Hoodie BACK2BACK' }
const kinds: GarmentKind[] = ['tee', 'hoodie']

export function SizeGuide() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Guide des tailles · BACK2BACK'
  }, [])

  return (
    <div className="min-h-svh bg-ink text-bone">
      <header className="border-b border-border">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="Accueil BACK2BACK">
            <Logo className="h-9" />
          </Link>
          <a href="/#shop" className="inline-flex items-center gap-2 text-sm font-medium text-bone/80 hover:text-magenta">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retour à la boutique
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">Guide des tailles</h1>
        <p className="mt-6 max-w-xl text-pretty text-bone/70">
          Coupe oversize et ample, pensée pour passer par-dessus un corset. Prends ta taille habituelle pour le rendu voulu, ou une taille en dessous pour quelque chose de plus ajusté.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          {kinds.map((kind) => (
            <section key={kind} aria-labelledby={`guide-${kind}`}>
              <h2 id={`guide-${kind}`} className="text-xs font-bold uppercase tracking-[0.2em] text-magenta">
                {titles[kind]} · mesures à plat en cm
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm tabular-nums">
                  <thead className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <tr className="border-b border-bone/25">
                      <th className="py-2 pr-4 font-bold">Taille</th>
                      <th className="py-2 pr-4 font-bold">Poitrine</th>
                      <th className="py-2 pr-4 font-bold">Longueur</th>
                      <th className="py-2 pr-4 font-bold">Manche</th>
                      <th className="py-2 font-bold">Épaule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chart[kind].map((r) => (
                      <tr key={r.size} className="border-b border-bone/10">
                        <td className="py-3 pr-4 font-bold">{r.size}</td>
                        <td className="py-3 pr-4">{r.chest}</td>
                        <td className="py-3 pr-4">{r.length}</td>
                        <td className="py-3 pr-4">{r.sleeve}</td>
                        <td className="py-3">{r.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 max-w-xl border-t border-magenta/50 pt-6" aria-labelledby="how-to">
          <h2 id="how-to" className="text-2xl font-black tracking-tight">
            Comment mesurer
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-bone/70">
            <li>Poitrine : pose le vêtement à plat et mesure en ligne droite sous les emmanchures.</li>
            <li>Longueur : du point le plus haut de l'épaule jusqu'à l'ourlet du bas.</li>
            <li>Avec un corset ? Garde ta taille habituelle, la coupe laisse déjà de la place.</li>
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
