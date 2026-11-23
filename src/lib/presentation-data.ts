/**
 * Chiffres de la présentation. Source : Business Plan BackToBack (novembre 2026), scénario central.
 * Les montants sont en euros hors taxes, sauf mention contraire. A1 = avril 2027 à mars 2028.
 */
export const years = ['A1', 'A2', 'A3'] as const

export const keyFigures = {
  revenue: [91445, 293734, 942165],
  netResult: [-66943, 29501, 150466],
  cashClose: [32732, 53624, 179394],
}

export const orders = {
  corset: [1650, 5300, 6500],
  streetwear: [0, 0, 10500],
  total: [1650, 5300, 17000],
}

export const priceBuild = {
  avgPriceTtc: 58, // 55 % × 40 € + 45 % × 80 €
  teeShare: 55,
  piecesPerOrder: 1.2,
  basketTtc: 69.6,
  basketHt: 57.52,
  shippingTtc: 7.9,
  returnRate: 15,
  vat: 21,
}

/** Compte de résultat détaillé : réservé à l'annexe (questions du jury). */
export const pnl = [
  { label: "Chiffre d'affaires net HT", values: [91445, 293734, 942165], strong: true },
  { label: 'Coûts variables (pièces, expédition, paiement)', values: [-30432, -97753, -313547] },
  { label: 'Marge sur coûts variables', values: [61013, 195981, 628618], highlight: true },
  { label: 'Marketing récurrent', values: [-52000, -85000, -245000] },
  { label: 'Charges externes récurrentes', values: [-17000, -27000, -52000] },
  { label: 'Charges de prélancement', values: [-30000, 0, 0] },
  { label: 'Rémunérations et cotisations', values: [-27456, -51480, -144144] },
  { label: "Excédent brut d'exploitation", values: [-65443, 32501, 187474], highlight: true },
  { label: 'Amortissements', values: [-1500, -3000, -5000] },
  { label: 'Impôt sur les sociétés', values: [0, 0, -32008] },
  { label: 'Résultat net', values: [-66943, 29501, 150466], highlight: true, strong: true },
]

export const marketing = {
  budget: [52000, 85000, 245000],
  cac: [31.5, 16.0, 14.4],
  prelaunch: 19000,
}

export const funding = {
  total: 110000,
  capital: 60000,
  bpi: 50000,
  /** Regroupé pour rester lisible : le détail figure en annexe. */
  uses: [
    { label: 'Lancement : prélancement, prototypes, marque, conformité', value: 30000, color: '#efebe3' },
    { label: 'Équipement, stock initial, TVA avancée', value: 11825, color: '#8a867e' },
    { label: 'Trésorerie restante après le démarrage', value: 68175, color: '#ff2bd6' },
  ],
  maxNeed: 89406,
  maxNeedWithReserve: 109406,
  extraCapacity: 30000,
}

/** Plan de financement détaillé (annexe). */
export const fundingDetail = {
  uses: [
    ['Équipement de préparation et informatique', 4500],
    ['Stock initial de 500 pièces', 3625],
    ['Charges ponctuelles de démarrage', 30000],
    ['TVA déductible avancée', 3700],
    ['Trésorerie restante après le démarrage', 68175],
  ] as [string, number][],
  resources: [
    ['Capital social (6 associés × 10 000 €)', 60000],
    ['Subvention BPI', 50000],
    ['Dette bancaire', 0],
  ] as [string, number][],
}

/** Trésorerie annuelle (scénario central). Plancher de sécurité : 20 000 €. */
export const cash = {
  close: [32732, 53624, 179394],
  low: [32732, 20594, 43056],
  floor: 20000,
}

export const scenarios = [
  { name: 'Prudent', tag: '35 % de commandes en moins', orders3: 11050, revenue3: 612407, cash3: 53488, cash3Kept: -86512 },
  { name: 'Central', tag: 'Notre plan', orders3: 17000, revenue3: 942165, cash3: 179394, main: true },
  { name: 'Haut', tag: '25 % de commandes en plus', orders3: 21250, revenue3: 1177707, cash3: 343540 },
]

/** Annexe : comparaison complète des quatre scénarios. */
export const scenarioTable = {
  cols: ['Prudent, marketing maintenu', 'Prudent, marketing adapté', 'Central', 'Haut'],
  rows: [
    ['Commandes A1', ['1 072', '1 072', '1 650', '2 062']],
    ['Commandes A2', ['3 445', '3 445', '5 300', '6 625']],
    ['Commandes A3', ['11 050', '11 050', '17 000', '21 250']],
    ['CA HT A3', ['612 407', '612 407', '942 165', '1 177 707']],
    ['Résultat avant impôt A2', ['(39 092)', '(9 342)', '29 501', '78 496']],
    ['Résultat avant impôt A3', ['(37 542)', '72 708', '182 474', '339 629']],
    ['Trésorerie de clôture A3', ['(86 512)', '53 488', '179 394', '343 540']],
  ] as [string, string[]][],
}

export const breakeven = { orders: 4421, revenue: 245022, extraKept: 123662, extraAdapted: 45021 }

/** Sensibilités : [libellé, EBE A2, EBE A3, point bas de trésorerie]. */
export const sensitivities = [
  { label: 'Commandes en baisse de 20 %', ebe2: -6695, ebe3: 61751, low: -28806 },
  { label: '1,0 pièce par commande au lieu de 1,2', ebe2: -2796, ebe3: 74259, low: -20733 },
  { label: 'Port facturé supprimé', ebe2: -1255, ebe3: 79200, low: -20220 },
  { label: "Coût d'acquisition en hausse de 25 %", ebe2: 18688, ebe3: 147662, low: 7370 },
  { label: 'Retours à 20 % au lieu de 15 %', ebe2: 17219, ebe3: 138457, low: 11672 },
  { label: 'Livraison à 9 € au lieu de 7 €', ebe2: 21901, ebe3: 153474, low: 14294 },
  { label: 'Pièce plus chère d’un euro', ebe2: 26999, ebe3: 169827, low: 16575 },
]

export const fmt = (v: number, d = 0) =>
  v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d })

/** Montants négatifs entre parenthèses, comme dans le document financier. */
export const money = (v: number) => (v < 0 ? `(${fmt(-v)})` : fmt(v))
