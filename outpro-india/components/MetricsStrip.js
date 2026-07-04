// Signature visual motif: an operations "ledger" readout — reflects Outpro's
// core promise (managed operations you can watch run) rather than a decorative stat block.
const METRICS = [
  { label: "AVG. SLA ADHERENCE", value: "99.2%" },
  { label: "TICKETS RESOLVED / MO", value: "48,600" },
  { label: "AVG. RAMP TO LIVE", value: "18 DAYS" },
  { label: "CLIENT RETENTION", value: "94%" },
];

export default function MetricsStrip() {
  return (
    <div className="border-y border-ink-900/15 bg-ink-900 text-ink-50">
      <div className="container-content overflow-x-auto">
        <div className="flex min-w-max items-stretch divide-x divide-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 py-4 pr-6 text-ink-50/60">
            <span className="h-2 w-2 animate-blink rounded-full bg-ledger" />
            LIVE OPS LEDGER
          </div>
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col justify-center gap-1 px-6 py-4">
              <span className="tracking-[0.14em] text-ink-50/50">{m.label}</span>
              <span className="text-sm font-medium text-signal">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
