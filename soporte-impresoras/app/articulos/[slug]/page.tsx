import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAll, getOne } from "@/lib/articles";
export const dynamicParams = false;
type P = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getAll().map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const a = await getOne((await params).slug);
  return a ? { title: a.meta.title, description: a.meta.description, alternates: { canonical: `/articulos/${a.meta.slug}` } } : {};
}
export default async function Page({ params }: P) {
  const a = await getOne((await params).slug);
  if (!a) notFound();
  return (
    <article>
      <p className="text-sm mb-3"><Link href="/articulos">Guías</Link> / <Link href={`/marcas/${a.meta.marca}`}>{a.meta.marca.toUpperCase()}</Link></p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: a.body }} />
    </article>
  );
}
