import Link from "next/link";
import ArticleList from "@/components/ArticleList";
import SearchForm from "@/components/SearchForm";
import { CATEGORIAS, MARCAS, getAll } from "@/lib/articles";

export default function Home() {
  const recientes = getAll().slice(0, 6);
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold leading-tight max-w-2xl">Qué significa la luz de tu impresora y cómo arreglarla</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-700">Guías paso a paso para Epson, HP, Canon y Brother, verificadas con la documentación del fabricante y explicadas en español sencillo.</p>
        <div className="mt-5"><SearchForm /></div>
      </section>
      <section aria-labelledby="marcas"><h2 id="marcas" className="text-xl font-bold mb-3">Elige tu marca</h2>
        <p className="flex flex-wrap gap-3">{MARCAS.map((m) => <Link key={m.slug} href={`/marcas/${m.slug}`} className="rounded border border-[var(--line)] bg-white px-4 py-2 font-semibold no-underline">{m.nombre}</Link>)}</p></section>
      <section aria-labelledby="cats"><h2 id="cats" className="text-xl font-bold mb-3">O busca por problema</h2>
        <ul className="grid gap-2 sm:grid-cols-2">{CATEGORIAS.map((c) => <li key={c.slug}><Link href={`/categorias/${c.slug}`}>{c.nombre}</Link></li>)}</ul></section>
      <section aria-labelledby="rec"><h2 id="rec" className="text-xl font-bold mb-3">Guías recientes</h2><ArticleList items={recientes} /></section>
      <section aria-labelledby="como"><h2 id="como" className="text-xl font-bold mb-2">Cómo se verifica la información</h2>
        <p className="max-w-2xl">Cada guía indica sus fuentes oficiales y distingue los pasos que vienen de la documentación del fabricante de los que se probaron en una impresora real. Si un procedimiento depende del modelo exacto, se avisa.</p></section>
    </div>
  );
}
