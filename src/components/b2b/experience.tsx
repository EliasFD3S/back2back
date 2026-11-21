'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader } from './loader'
import { SiteHeader } from './site-header'
import { Hero } from './hero'
import { Mission } from './mission'
import { Craft } from './craft'
import { Shop } from './shop'
import { SiteFooter } from './site-footer'

const LOADER_DURATION = 5000

// Le loader ne se joue qu'une fois par session, même si on revient sur l'accueil via le routeur.
let loaderSeen = false

export function Experience() {
  const [ready, setReady] = useState(loaderSeen)
  const [showLoader] = useState(!loaderSeen)
  const [bagCount, setBagCount] = useState(0)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (loaderSeen) return
    window.scrollTo(0, 0)
    const timer = window.setTimeout(() => {
      loaderSeen = true
      setReady(true)
    }, LOADER_DURATION)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.dataset.loading = String(!ready)
  }, [ready])

  const handlePurchase = useCallback((label: string) => {
    setBagCount((count) => count + 1)
    setAnnouncement(`${label} ajouté à ton panier.`)
  }, [])

  return (
    <>
      {showLoader ? <Loader ready={ready} duration={LOADER_DURATION} /> : null}
      <SiteHeader visible={ready} bagCount={bagCount} />
      <main>
        <Hero ready={ready} />
        <Shop onPurchase={handlePurchase} />
        <Mission />
        <Craft />
      </main>
      <SiteFooter />
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  )
}
