import Link from "next/link";

export default function PortfolioGallery({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((p) => (
        <Link
          key={p.slug}
          href={`/portfolio#${p.slug}`}
          className="group flex flex-col rounded-sm border border-line bg-white p-7 transition-shadow hover:shadow-[0_1px_0_0_theme(colors.signal.DEFAULT)]"
        >
          <p className="eyebrow mb-3">{p.industry}</p>
          <h3 className="font-display text-lg font-bold leading-snug">{p.title}</h3>
          <p className="mt-3 text-sm text-ink-700">{p.summary}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 font-mono">
            {p.kpis.map((k) => (
              <div key={k.label}>
                <dt className="text-[10px] uppercase tracking-wide text-ink-400">{k.label}</dt>
                <dd className="mt-1 text-sm font-medium text-ledger">{k.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs font-medium text-ink-400 group-hover:text-signal-dim">
            {p.client}
          </p>
        </Link>
      ))}
    </div>
  );
}
