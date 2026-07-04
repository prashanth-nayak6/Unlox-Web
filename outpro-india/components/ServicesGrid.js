import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid({ services, compact = false }) {
  const list = compact ? services.slice(0, 3) : services;
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => {
        const Icon = Icons[s.icon] || Icons.Workflow;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col justify-between bg-white p-7 transition-colors hover:bg-ink-900"
          >
            <div>
              <Icon className="mb-5 text-signal-dim group-hover:text-signal" size={24} strokeWidth={1.5} />
              <h3 className="font-display text-lg font-bold group-hover:text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-ink-700 group-hover:text-ink-50/70">{s.short}</p>
            </div>
            <span className="mt-6 flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-ink-400 group-hover:text-signal">
              Learn more <ArrowRight size={14} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
