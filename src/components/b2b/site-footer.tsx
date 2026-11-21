import { Logo } from './logo'
import { Link } from 'react-router-dom'

type FooterLink = { label: string; href: string }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Boutique',
    links: [
      { label: 'Tee BACK2BACK', href: '/#shop' },
      { label: 'Hoodie BACK2BACK', href: '/#shop' },
      { label: 'Guide des tailles', href: '/size-guide' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { label: 'Livraison', href: '/#contact' },
      { label: 'Retours sous 30 jours', href: '/#contact' },
      { label: 'contact@back2back.xyz', href: 'mailto:contact@back2back.xyz' },
    ],
  },
  {
    title: 'Suivre',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/back2back_officiel/' },
    ],
  },
]

function Anchor({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href === '/size-guide') return <Link to={href} {...rest} />
  return <a href={href} {...rest} />
}

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mt-5 max-w-sm text-balance text-3xl font-bold leading-tight tracking-tight">
              Un tissu épais. Une coupe qui tient. Des vêtements faits pour durer.
            </p>
          </div>
          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Anchor
                        href={link.href}
                        className="break-words text-sm text-bone/85 transition-colors hover:text-magenta"
                        {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {link.label}
                      </Anchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 overflow-hidden" aria-hidden="true">
          <Logo className="mx-auto h-auto w-[min(80vw,720px)]" />
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BACK2BACK. Tous droits réservés.</p>
          <p>Pensé dos à dos, fait pour durer.</p>
        </div>
      </div>
    </footer>
  )
}
