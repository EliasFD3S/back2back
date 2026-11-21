/**
 * Chiffres de la présentation. Source : « BackToBack, partie financière » (version actualisée).
 * Les montants sont en euros hors taxes, sauf mention contraire. A1 = avril 2027 à mars 2028.
 */
export const years = ['A1', 'A2', 'A3'] as const

export const keyFigures = {
  revenue: [99758, 249397, 526504],
  netResult: [-36396, 22923, 76648],
  cashClose: [38549, 53522, 143088],
}

export const orders = {
  corset: [1800, 4500, 4500],
  streetwear: [0, 0, 5000],
  total: [1800, 4500, 9500],
  returns: [270, 675, 1425],
}

export const priceBuild = {
  avgPriceTtc: 58,
  piecesPerOrder: 1.2,
  basketTtc: 69.6,
  basketHt: 57.52,
  shippingTtc: 7.9,
  returnRate: 15,
  vat: 21,
}

export const pnl = [
  { label: "Chiffre d'affaires net", values: [99758, 249397, 526504] },
  { label: 'Marge sur coûts variables', values: [66560, 166403, 351296] },
  { label: 'Marketing récurrent', values: [-38000, -62000, -100000] },
  { label: 'Charges externes et prélancement', values: [-36000, -27000, -41000] },
  { label: 'Rémunérations et cotisations', values: [-27456, -51480, -113256] },
  { label: "Excédent brut d'exploitation", values: [-34896, 25923, 97040], highlight: true },
  { label: 'Amortissements et impôt', values: [-1500, -3000, -20392] },
  { label: 'Résultat net', values: [-36396, 22923, 76648], highlight: true, strong: true },
]

export const marketing = {
  budget: [38000, 62000, 100000],
  cac: [24.8, 17.6, 14.0],
}

export const funding = {
  total: 84000,
  uses: [
    { label: 'Équipement de préparation et informatique', value: 4500, color: '#efebe3' },
    { label: 'Stock initial de 500 pièces', value: 3625, color: '#b9b4a9' },
    { label: 'Charges ponctuelles de démarrage', value: 19000, color: '#8a867e' },
    { label: 'TVA déductible avancée', value: 3700, color: '#5d5a54' },
    { label: 'Trésorerie restante après le démarrage', value: 53175, color: '#ff2bd6' },
  ],
  maxNeed: 58837,
  maxNeedWithReserve: 78837,
}

/** Trésorerie de fin de mois, scénario central, 36 mois (modèle mensuel de l'équipe). */
export const cashMonthly = [
  53175, 49865, 47963, 45912, 43599, 41499, 39713, 38785, 39898, 41562, 40621, 39004, 38549, 30619, 29039, 27579, 26110,
  25163, 25452, 27704, 35475, 43233, 45470, 47541, 53522, 44504, 43351, 43268, 43164, 44484, 48475, 56951, 78170, 98606,
  106298, 118036, 143088,
]

export const scenarios = [
  { name: 'Prudent', tag: '35 % de commandes en moins', orders3: 6175, revenue3: 317364, result2: -40859, lowCash: -86080 },
  { name: 'Central', tag: 'Notre plan', orders3: 9500, revenue3: 526504, result2: 22923, lowCash: 25163, main: true },
  { name: 'Haut', tag: '25 % de commandes en plus', orders3: 11875, revenue3: 692283, result2: 65305, lowCash: 47316 },
]

export const breakeven = { orders: 3799, revenue: 210544, extraFunding: 106080 }

export const sensitivities = [
  { label: '1,0 pièce par commande au lieu de 1,2', ebe2: -4215 },
  { label: 'Port facturé supprimé', ebe2: -2853 },
  { label: 'Commandes en baisse de 20 %', ebe2: 703 },
  { label: 'Retours à 20 % au lieu de 15 %', ebe2: 12718 },
  { label: "Coût d'acquisition en hausse de 25 %", ebe2: 15848 },
]

export const fmt = (v: number, d = 0) =>
  v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d })

/** Montants négatifs entre parenthèses, comme dans le document financier. */
export const money = (v: number) => (v < 0 ? `(${fmt(-v)})` : fmt(v))
