'use client'

import { useRef, useState } from 'react'
import { X } from 'lucide-react'

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(images[0])

  const open = (image: { src: string; alt: string }) => {
    setActive(image)
    dialog.current?.showModal()
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">En vrai</h4>
        <span className="text-xs text-muted-foreground">{images.length} photos</span>
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => open(image)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label={`Agrandir la photo ${i + 1}: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={active.alt}
        className="m-auto max-h-[92svh] w-[min(92vw,720px)] bg-transparent p-0 backdrop:bg-black/85"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <img src={active.src} alt={active.alt} className="absolute inset-0 size-full object-cover" />
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-ink/70 text-bone"
          aria-label="Fermer la photo"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </dialog>
    </div>
  )
}
