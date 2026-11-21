import { cn } from '@/lib/utils'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths'

export function Logo({ className, title = 'BACK2BACK' }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label={title}
      fill="currentColor"
      className={cn('block h-8 w-auto text-white', className)}
    >
      {LOGO_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
