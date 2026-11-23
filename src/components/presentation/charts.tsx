import { cash, fmt } from '@/lib/presentation-data'

/** Trésorerie annuelle : clôture et point bas de chaque année, face au plancher de sécurité. */
export function TreasuryChart() {
  const L = 150
  const R = 1600
  const T = 50
  const B = 470
  const ymax = 200000
  const Y = (y: number) => B - ((B - T) * y) / ymax
  const groupW = (R - L) / 3
  const barW = 190
  return (
    <svg viewBox="0 0 1700 580" className="h-full w-full overflow-visible">
      {[0, 50000, 100000, 150000, 200000].map((y) => (
        <g key={y}>
          <line x1={L} x2={R} y1={Y(y)} y2={Y(y)} stroke="rgba(255,255,255,.08)" />
          <text x={L - 20} y={Y(y) + 8} textAnchor="end" fontSize="24" fill="rgba(239,235,227,.6)">
            {fmt(y / 1000)} k€
          </text>
        </g>
      ))}
      {['Année 1', 'Année 2', 'Année 3'].map((t, k) => {
        const cx = L + groupW * k + groupW / 2
        const close = cash.close[k]
        const low = cash.low[k]
        return (
          <g key={t}>
            <rect className="grow-y" style={{ ['--d' as string]: `${0.5 + k * 0.3}s`, transformBox: 'fill-box', transformOrigin: 'bottom' }} x={cx - barW - 10} y={Y(close)} width={barW} height={B - Y(close)} rx="14" fill="#efebe3" opacity=".9" />
            <rect className="grow-y" style={{ ['--d' as string]: `${0.7 + k * 0.3}s`, transformBox: 'fill-box', transformOrigin: 'bottom' }} x={cx + 10} y={Y(low)} width={barW} height={B - Y(low)} rx="14" fill="#ff2bd6" />
            <g className="late" style={{ ['--d' as string]: `${1.2 + k * 0.3}s` }}>
              <text x={cx - barW / 2 - 10} y={Y(close) - 16} textAnchor="middle" fontSize="32" fontWeight="800" fill="#efebe3">
                {fmt(close / 1000, 1)} k€
              </text>
              <text x={cx + barW / 2 + 10} y={Y(low) - 16} textAnchor="middle" fontSize="32" fontWeight="800" fill="#ff2bd6">
                {fmt(low / 1000, 1)} k€
              </text>
            </g>
            <text x={cx} y={B + 50} textAnchor="middle" fontSize="28" fontWeight="700" fill="rgba(239,235,227,.8)">
              {t}
            </text>
          </g>
        )
      })}
      <line className="draw" pathLength={1} style={{ ['--d' as string]: '0.3s' }} x1={L} x2={R} y1={Y(cash.floor)} y2={Y(cash.floor)} stroke="#efebe3" strokeWidth="3" strokeDasharray="10 10" opacity=".8" />
      <text className="late" style={{ ['--d' as string]: '1s' }} x={R} y={Y(cash.floor) - 14} textAnchor="end" fontSize="24" fontWeight="700" fill="#efebe3">
        Plancher de sécurité 20 000 €
      </text>
      <g fontSize="24" fill="rgba(239,235,227,.75)">
        <rect x={L} y={0} width="24" height="24" rx="6" fill="#efebe3" />
        <text x={L + 36} y={20}>Trésorerie de clôture</text>
        <rect x={L + 330} y={0} width="24" height="24" rx="6" fill="#ff2bd6" />
        <text x={L + 366} y={20}>Point bas de l’année</text>
      </g>
    </svg>
  )
}

/** Anneau : chaque segment se dessine l'un après l'autre. */
export function Donut({ parts, size = 560 }: { parts: { value: number; color: string }[]; size?: number }) {
  const total = parts.reduce((a, p) => a + p.value, 0)
  const starts = parts.map((_, k) => parts.slice(0, k).reduce((a, p) => a + (p.value / total) * 100, 0))
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="-rotate-90">
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="26" />
      {parts.map((p, k) => {
        const pct = (p.value / total) * 100
        const o = starts[k]
        return (
          <circle
            key={k}
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={p.color}
            strokeWidth="26"
            pathLength={100}
            strokeDashoffset={-o}
            className="draw-seg"
            style={{ ['--d' as string]: `${0.7 + k * 0.22}s`, ['--len' as string]: Math.max(pct - 0.4, 0) }}
          />
        )
      })}
    </svg>
  )
}
