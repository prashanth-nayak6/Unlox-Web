import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-2xl font-bold">This page isn&apos;t in the ledger.</h1>
      <p className="mt-2 text-ink-700">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
