'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

const links = [
  { href: '#why', label: 'Pourquoi' },
  { href: '#craft', label: 'Savoir-faire' },
  { href: '#shop', label: 'Boutique' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader({ visible, bagCount }: { visible: boolean; bagCount: number }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-700',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0',
        scrolled ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Accueil BACK2BACK">
          <Logo className="h-9" />
        </a>
        <ul className="hidden items-center gap-8 text-sm font-medium text-bone/80 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-bone">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#shop"
          className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-4 py-2 text-sm font-medium text-bone transition-colors hover:bg-bone hover:text-ink"
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          <span>Panier</span>
          <span className="tabular-nums" aria-label={`${bagCount} articles`}>
            ({bagCount})
          </span>
        </a>
      </nav>
    </header>
  )
}
