import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container-content grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
      <div className="animate-rise">
        <p className="eyebrow mb-5">Managed operations · India-based delivery</p>
        <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
          We run the operations that keep your business promises.
        </h1>
        <p className="mt-6 max-w-lg text-base text-ink-700 md:text-lg">
          Outpro.India stands up dedicated teams for the back-office work your
          customers never see, but always feel — support desks, finance
          operations, data pipelines, and more.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/contact" className="btn-primary">
            Book a scoping call <ArrowUpRight size={16} />
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            See client results
          </Link>
        </div>
      </div>

      <div className="relative hidden overflow-hidden rounded-sm border border-line bg-white md:block">
        <TerminalCard />
      </div>
    </section>
  );
}

function TerminalCard() {
  const rows = [
    { k: "pod.status", v: "active", tone: "ledger" },
    { k: "sla.orders", v: "98.4% on-time", tone: "ledger" },
    { k: "tickets.open", v: "3 (avg 2.1h)", tone: "signal" },
    { k: "close.month_end", v: "day 5 of 5", tone: "ink" },
  ];
  return (
    <div className="flex h-full flex-col justify-between p-8 font-mono text-xs">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 text-ink-400">ops-console — meridian-retail</span>
      </div>
      <div className="mt-8 space-y-4">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between border-b border-line pb-3">
            <span className="text-ink-400">{r.k}</span>
            <span
              className={
                r.tone === "ledger"
                  ? "text-ledger"
                  : r.tone === "signal"
                  ? "text-signal-dim"
                  : "text-ink-900"
              }
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-ink-400">
        <span className="text-ledger">$</span> watching 6 workflows across 3 time
        zones<span className="animate-blink">_</span>
      </p>
    </div>
  );
}
