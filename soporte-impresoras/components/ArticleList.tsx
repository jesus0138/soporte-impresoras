import Link from "next/link";
import type { Meta } from "@/lib/articles";
export default function ArticleList({ items }: { items: Meta[] }) {
  if (!items.length) return <p className="text-slate-600">Todavía no hay guías publicadas en esta sección. Vuelve pronto.</p>;
  return (
    <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((a) => (
        <li key={a.slug} className="py-4">
          <Link href={`/articulos/${a.slug}`} className="text-lg font-semibold">{a.title}</Link>
          <p className="text-slate-700">{a.description}</p>
          <p className="text-sm text-slate-500">{a.marca.toUpperCase()} {a.modelo}{a.draft ? " (borrador, solo visible en desarrollo)" : ""}</p>
        </li>
      ))}
    </ul>
  );
}
