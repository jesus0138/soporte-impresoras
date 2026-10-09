import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ArticleList";
import { MARCAS, getAll } from "@/lib/articles";
export const dynamicParams = false;
type P = { params: Promise<{ marca: string }> };
export function generateStaticParams() { return MARCAS.map((m) => ({ marca: m.slug })); }
export async function generateMetadata({ params }: P): Promise<Metadata> { const slug = (await params).marca; const m = MARCAS.find((x) => x.slug === slug); return m ? { title: `Guías para impresoras ${m.nombre}` } : {}; }
export default async function Page({ params }: P) {
  const slug = (await params).marca; const m = MARCAS.find((x) => x.slug === slug); if (!m) notFound();
  return <><h1 className="text-2xl font-bold mb-4">Impresoras {m.nombre}</h1><ArticleList items={getAll().filter((a) => a.marca === slug)} /></>;
}
