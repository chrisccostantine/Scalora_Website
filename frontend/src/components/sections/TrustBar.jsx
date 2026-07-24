const signals = [
  'Strategy-led execution',
  'Direct founder involvement',
  'Creative & technical delivery under one team',
  'Custom solutions, not templates',
  'Marketing and technology handled together'
];

export default function TrustBar() {
  return (
    <div className="border-y border-white/10 bg-charcoal-900 py-6">
      <div className="section flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {signals.map((signal) => (
          <span key={signal} className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}
