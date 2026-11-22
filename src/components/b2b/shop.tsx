'use client'

import { useEffect, useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice, products, type GarmentKind } from '@/lib/products'
import { GarmentViewer } from './garment-viewer'
import { isLight } from '@/lib/colors'
import { Gallery } from './gallery'
import { Link } from 'react-router-dom'

const kinds: GarmentKind[] = ['tee', 'hoodie']

export function Shop({ onPurchase }: { onPurchase: (label: string) => void }) {
  const [kind, setKind] = useState<GarmentKind>('tee')
  const [colorIndex, setColorIndex] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  const product = products[kind]
  const colorway = product.colorways[colorIndex]
  const light = isLight(colorway.background)

  useEffect(() => {
    if (!added) return
    const t = window.setTimeout(() => setAdded(false), 2200)
    return () => window.clearTimeout(t)
  }, [added])

  const selectKind = (next: GarmentKind) => {
    setKind(next)
    setColorIndex(0)
    setSize(null)
    setSizeError(false)
  }

  const purchase = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    onPurchase(`${product.name}, ${colorway.name}, taille ${size}`)
    setAdded(true)
  }

  return (
    <section
      id="shop"
      aria-labelledby="shop-title"
      className="bg-black"
    >
      <div className="relative flex flex-col lg:block lg:h-[max(100svh,780px)]">
      <div className="relative h-[75svh] min-h-[520px] lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
        <GarmentViewer kind={kind} colorway={colorway} />

        <div
          className={cn(
            'pointer-events-none absolute inset-x-5 top-20 z-10 flex flex-col gap-5 transition-colors duration-700 sm:inset-x-8 sm:top-24',
            light ? 'text-ink' : 'text-bone',
          )}
        >
          <h2 id="shop-title" className="max-w-xl text-balance text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
            Built to last.
          </h2>
          <div
            role="tablist"
            aria-label="Choisis un vêtement"
            className={cn(
              'pointer-events-auto inline-flex w-fit rounded-full border p-1 backdrop-blur-sm',
              light ? 'border-ink/20 bg-white/30' : 'border-bone/20 bg-black/30',
            )}
          >
            {kinds.map((k) => (
              <button
                key={k}
                role="tab"
                type="button"
                id={`tab-${k}`}
                aria-selected={kind === k}
                aria-controls="product-panel"
                onClick={() => selectKind(k)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors',
                  kind === k
                    ? light
                      ? 'bg-ink text-bone'
                      : 'bg-bone text-ink'
                    : 'opacity-70 hover:opacity-100',
                )}
              >
                {k === 'tee' ? 'Le tee' : 'Le hoodie'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`tab-${kind}`}
        className="relative z-20 flex w-full flex-col bg-black px-5 py-10 text-bone sm:px-8 lg:absolute lg:bottom-6 lg:right-6 lg:top-24 lg:w-[420px] lg:justify-center lg:overflow-y-auto lg:rounded-3xl lg:border lg:border-white/15 lg:bg-black/45 lg:p-7 lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_80px_-30px_rgba(0,0,0,0.8)] lg:backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-magenta px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {product.weight}
          </span>
          <span className="text-xs font-bold font-label uppercase tracking-[0.2em] text-muted-foreground">{product.tagline}</span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="text-3xl font-black tracking-tight">{product.name}</h3>
          <p className="text-2xl font-bold tabular-nums">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-bone/70">{product.description}</p>

        <fieldset className="mt-7">
          <legend className="text-xs font-bold font-label uppercase tracking-[0.2em] text-muted-foreground">
            Couleur : <span className="text-bone">{colorway.name}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colorways.map((c, i) => (
              <label key={c.name} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="colour"
                  value={c.name}
                  checked={i === colorIndex}
                  onChange={() => setColorIndex(i)}
                  className="peer sr-only"
                />
                <span
                  className="block size-10 rounded-full border border-bone/20 ring-offset-2 ring-offset-black transition-shadow peer-checked:ring-2 peer-checked:ring-bone peer-focus-visible:ring-2 peer-focus-visible:ring-magenta"
                  style={{ backgroundColor: c.garment }}
                />
                <span className="sr-only">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="flex w-full items-center justify-between text-xs font-bold font-label uppercase tracking-[0.2em] text-muted-foreground">
            Taille
            <Link to="/size-guide" className="font-bold font-label uppercase tracking-[0.2em] text-magenta underline underline-offset-4 hover:text-bone">Guide des tailles</Link>
          </legend>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {product.sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s)
                    setSizeError(false)
                  }}
                  className="peer sr-only"
                />
                <span className="flex h-10 items-center justify-center rounded-sm border border-border text-sm font-bold transition-colors hover:border-bone/60 peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-magenta">
                  {s}
                </span>
              </label>
            ))}
          </div>
          <p className={cn('mt-2 text-xs', sizeError ? 'text-magenta' : 'text-muted-foreground')} role={sizeError ? 'alert' : undefined}>
            {sizeError ? 'Choisis une taille pour continuer.' : 'Coupe ample. Prends ta taille habituelle pour le rendu voulu.'}
          </p>
        </fieldset>

        <button
          type="button"
          onClick={purchase}
          className={cn(
            'mt-7 inline-flex h-14 w-full shrink-0 items-center justify-center gap-3 rounded-full text-sm font-black uppercase tracking-[0.15em] transition-all',
            added ? 'bg-magenta text-white' : 'bg-bone text-ink hover:bg-white',
          )}
        >
          {added ? (
            <>
              <Check className="size-5" aria-hidden="true" /> Ajouté au panier
            </>
          ) : (
            <>
              <ShoppingBag className="size-5" aria-hidden="true" /> Acheter {formatPrice(product.price)}
            </>
          )}
        </button>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <li>Retours sous 30 jours</li>
          <li>Expédié sous 48 h</li>
        </ul>

      </aside>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Gallery key={kind} images={product.gallery} />
      </div>
    </section>
  )
}
