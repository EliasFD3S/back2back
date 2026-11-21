import { useEffect, useState, type RefObject } from 'react'

/** Passe à true (une seule fois) quand l'élément entre dans l'écran. */
export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.3) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}
