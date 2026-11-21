export type GarmentKind = 'tee' | 'hoodie'

export type Colorway = {
  name: string
  garment: string
  background: string
  print: string
}

export type Product = {
  id: GarmentKind
  name: string
  tagline: string
  price: number
  weight: string
  description: string
  sizes: string[]
  colorways: Colorway[]
  gallery: { src: string; alt: string }[]
}

export const products: Record<GarmentKind, Product> = {
  tee: {
    id: 'tee',
    name: 'Tee BACK2BACK',
    tagline: 'Tee oversize en sergé',
    price: 40,
    weight: '240 g/m²',
    description:
      'Ample au niveau du corps pour passer facilement par-dessus un corset, avec des emmanchures larges et un col côtelé qui s\'enfile sans effort. Un sergé opaque, résistant aux frottements, qui garde sa forme.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colorways: [
      { name: 'Noir', garment: '#161616', background: '#d8d2c6', print: '#efebe3' },
      { name: 'Os', garment: '#e9e2d4', background: '#2a2824', print: '#141414' },
      { name: 'Olive', garment: '#4b5236', background: '#c9ceb3', print: '#efebe3' },
      { name: 'Argile', garment: '#8f3d2b', background: '#ebcbb9', print: '#efebe3' },
      { name: 'Ardoise', garment: '#3e4752', background: '#c3cad3', print: '#efebe3' },
    ],
    gallery: [
      { src: '/images/tee-1.png', alt: 'Modèle portant le tee BACK2BACK noir devant un mur en béton' },
      { src: '/images/tee-2.png', alt: 'Tee BACK2BACK os plié sur du béton brut, avec le col côtelé visible' },
      { src: '/images/tee-3.png', alt: 'Détail de l\'impression dans le dos du tee BACK2BACK noir' },
    ],
  },
  hoodie: {
    id: 'hoodie',
    name: 'Hoodie BACK2BACK',
    tagline: 'Hoodie oversize épais',
    price: 80,
    weight: '240 g/m²',
    description:
      'Un corps oversize avec de la place pour le corset, un col large et une capuche doublée. Un sergé épais qui cache ce qu\'il y a dessous et supporte les frottements de tous les jours pendant des années.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colorways: [
      { name: 'Noir', garment: '#171717', background: '#cfcac0', print: '#efebe3' },
      { name: 'Gris chiné', garment: '#9b9a96', background: '#232323', print: '#141414' },
      { name: 'Forêt', garment: '#2f3d2c', background: '#bccab0', print: '#efebe3' },
      { name: 'Marine', garment: '#1f273a', background: '#b9c1d6', print: '#efebe3' },
      { name: 'Bordeaux', garment: '#5a1f26', background: '#e3c3c3', print: '#efebe3' },
    ],
    gallery: [
      { src: '/images/hoodie-1.png', alt: 'Modèle portant le hoodie BACK2BACK noir, capuche relevée, au crépuscule' },
      { src: '/images/hoodie-2.png', alt: 'Hoodie BACK2BACK olive suspendu sur une barre en acier' },
      { src: '/images/hoodie-3.png', alt: 'Détail du poignet côtelé et de la couture double du hoodie BACK2BACK' },
    ],
  },
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}
