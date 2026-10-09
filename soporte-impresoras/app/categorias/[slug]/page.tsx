import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ArticleList";
import { CATEGORIAS, getAll } from "@/lib/articles";
export const dynamicParams = false;
type P = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return CATEGORIAS.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: P): Promise<Metadata> { const slug = (await params).slug; const c = CATEGORIAS.find((x) => x.slug === slug); return c ? { title: c.nombre } : {}; }
export default async function Page({ params }: P) {
  const slug = (await params).slug; const c = CATEGORIAS.find((x) => x.slug === slug); if (!c) notFound();
  return <><h1 className="text-2xl font-bold mb-4">{c.nombre}</h1><ArticleList items={getAll().filter((a) => a.categoria === slug)} /></>;
}
