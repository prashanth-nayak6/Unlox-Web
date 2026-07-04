export default function Section({ eyebrow, title, description, children, className = "" }) {
  return (
    <section className={`container-content py-16 md:py-20 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-10 max-w-2xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>}
          {description && <p className="mt-3 text-ink-700">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
