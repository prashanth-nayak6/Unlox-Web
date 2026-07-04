import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTASection({
  title = "Ready to see your ops on a dashboard like this?",
  description = "Tell us what's manual today. We'll scope a pod, a timeline, and an SLA within a week.",
}) {
  return (
    <div className="container-content">
      <div className="flex flex-col items-start justify-between gap-6 rounded-sm border border-line bg-white p-10 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
          <p className="mt-2 max-w-md text-sm text-ink-700">{description}</p>
        </div>
        <Link href="/contact" className="btn-primary shrink-0">
          Book a scoping call <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
