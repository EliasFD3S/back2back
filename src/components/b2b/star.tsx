import { cn } from '@/lib/utils'

/** Étoile à quatre branches aux côtés creusées : élément récurrent du design BACK2BACK. */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" fill="currentColor" className={cn('block size-10', className)}>
      <path d="M50 0C53 30 58 42 100 50C58 58 53 70 50 100C47 70 42 58 0 50C42 42 47 30 50 0Z" />
    </svg>
  )
}

const STAR_PATH = 'M50 0C53 30 58 42 100 50C58 58 53 70 50 100C47 70 42 58 0 50C42 42 47 30 50 0Z'

/** Motif d'étoiles en contour seul, alignées en diagonale à 45°, à poser en fond d'une section. */
export function StarPattern({ className, size = 44, gap = 28 }: { className?: string; size?: number; gap?: number }) {
  const tile = size + gap
  return (
    <svg aria-hidden="true" className={cn('pointer-events-none absolute inset-0 size-full', className)}>
      <defs>
        <pattern id="star-outline" width={tile} height={tile} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <g transform={`translate(${gap / 2} ${gap / 2}) scale(${size / 100})`}>
            <path d={STAR_PATH} fill="none" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star-outline)" />
    </svg>
  )
}
