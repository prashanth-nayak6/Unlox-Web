import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/portfolio", label: "Case studies" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "All services" },
      { href: "/partners", label: "Partner program" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hairline mt-24 bg-ink-900 text-ink-50">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-bold">
            Outpro<span className="text-signal">.India</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-ink-50/70">
            Operational excellence, delivered. We run the back-office so growing
            businesses can run everything else.
          </p>
          <div className="mt-6 flex gap-4">
            <a aria-label="LinkedIn" href="#" className="text-ink-50/70 hover:text-signal"><Linkedin size={18} /></a>
            <a aria-label="Twitter / X" href="#" className="text-ink-50/70 hover:text-signal"><Twitter size={18} /></a>
            <a aria-label="Instagram" href="#" className="text-ink-50/70 hover:text-signal"><Instagram size={18} /></a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-ink-50/50">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-50/80 hover:text-signal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-2 py-6 text-xs text-ink-50/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Outpro.India. All rights reserved.</p>
          <p>Built for a scalable, brand-consistent digital presence.</p>
        </div>
      </div>
    </footer>
  );
}
