// Circular progress ring (server component, pure SVG).
export default function Ring({ value, total, size = 52 }: { value: number; total: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="5" className="stroke-[rgb(var(--line))]" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          stroke="#02D683"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / total)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold">{value}</span>
    </div>
  );
}
