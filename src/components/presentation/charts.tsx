import { cashMonthly, fmt } from '@/lib/presentation-data'

/** Trésorerie mensuelle sur 36 mois : courbe qui se dessine, plancher de sécurité, points clés. */
export function TreasuryChart() {
  const v = cashMonthly
  const L = 130
  const R = 1560
  const T = 40
  const B = 480
  const ymax = 150000
  const X = (i: number) => L + ((R - L) * i) / 36
  const Y = (y: number) => B - ((B - T) * y) / ymax

  let d = `M${X(0)} ${Y(v[0])}`
  for (let i = 1; i < v.length; i++) {
    const cx = (X(i - 1) + X(i)) / 2
    d += ` C${cx} ${Y(v[i - 1])} ${cx} ${Y(v[i])} ${X(i)} ${Y(v[i])}`
  }
  const keys = [
    { i: 12, label: 'Fin A1', value: '38 549 €' },
    { i: 24, label: 'Fin A2', value: '53 522 €' },
    { i: 36, label: 'Fin A3', value: '143 088 €' },
  ]
  return (
    <svg viewBox="0 0 1700 580" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="tarea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff2bd6" stopOpacity=".4" />
          <stop offset="1" stopColor="#ff2bd6" stopOpacity="0" />
        </linearGradient>
        <filter id="tglow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {[0, 50000, 100000, 150000].map((y) => (
        <g key={y}>
          <line x1={L} x2={R} y1={Y(y)} y2={Y(y)} stroke="rgba(255,255,255,.08)" />
          <text x={L - 20} y={Y(y) + 8} textAnchor="end" fontSize="24" fill="rgba(239,235,227,.6)">
            {fmt(y / 1000)} k€
          </text>
        </g>
      ))}
      {[12, 24].map((i) => (
        <line key={i} x1={X(i)} x2={X(i)} y1={T} y2={B} stroke="rgba(255,255,255,.12)" strokeDasharray="4 8" />
      ))}
      {['Année 1', 'Année 2', 'Année 3'].map((t, k) => (
        <text key={t} x={X(6 + 12 * k)} y={B + 50} textAnchor="middle" fontSize="24" fill="rgba(239,235,227,.6)">
          {t}
        </text>
      ))}
      <line
        className="draw"
        pathLength={1}
        style={{ ['--d' as string]: '0.3s' }}
        x1={L}
        x2={R}
        y1={Y(20000)}
        y2={Y(20000)}
        stroke="#efebe3"
        strokeWidth="3"
        strokeDasharray="10 10"
        opacity=".7"
      />
      <text className="late" style={{ ['--d' as string]: '1s' }} x={R} y={Y(20000) + 38} textAnchor="end" fontSize="24" fontWeight="700" fill="#efebe3">
        Plancher de sécurité 20 000 €
      </text>
      <path className="late" style={{ ['--d' as string]: '2s' }} d={`${d} L${X(36)} ${B} L${X(0)} ${B} Z`} fill="url(#tarea)" />
      <path className="draw" pathLength={1} style={{ ['--d' as string]: '0.6s' }} d={d} fill="none" stroke="#ff2bd6" strokeWidth="12" filter="url(#tglow)" opacity=".6" />
      <path className="draw" pathLength={1} style={{ ['--d' as string]: '0.6s' }} d={d} fill="none" stroke="#ff2bd6" strokeWidth="6" strokeLinecap="round" />
      {keys.map((k, n) => {
        const x = X(k.i)
        const y = Y(v[k.i])
        const anchor = n === 2 ? 'end' : 'middle'
        return (
          <g key={k.label} className="late" style={{ ['--d' as string]: `${1.3 + n * 0.6}s` }}>
            <circle cx={x} cy={y} r="10" fill="#efebe3" />
            <text x={x} y={y - 44} textAnchor={anchor} fontSize="32" fontWeight="800" fill="#efebe3">
              {k.value}
            </text>
            <text x={x} y={y - 16} textAnchor={anchor} fontSize="24" fill="rgba(239,235,227,.6)">
              {k.label}
            </text>
          </g>
        )
      })}
      <g className="late" style={{ ['--d' as string]: '2.2s' }}>
        <circle
          cx={X(17)}
          cy={Y(v[17])}
          r="10"
          fill="#ff2bd6"
          style={{ animation: 'pres-ping 1.8s ease-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <circle cx={X(17)} cy={Y(v[17])} r="11" fill="#ff2bd6" stroke="#fff" strokeWidth="3" />
        <text x={X(17)} y={Y(v[17]) - 62} textAnchor="middle" fontSize="32" fontWeight="800" fill="#efebe3">
          25 163 €
        </text>
        <text x={X(17)} y={Y(v[17]) - 34} textAnchor="middle" fontSize="24" fill="rgba(239,235,227,.6)">
          point bas, août A2
        </text>
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
