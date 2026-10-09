import type { Metadata } from "next";
import ArticleList from "@/components/ArticleList";
import SearchForm from "@/components/SearchForm";
import { buscar } from "@/lib/search";

export const metadata: Metadata = { title: "Buscar", robots: { index: false, follow: true } };

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").slice(0, 100);
  const resultados = q ? buscar(q) : [];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Buscar una solución</h1>
      <SearchForm q={q} />
      {!q && <p className="text-slate-600">Escribe la marca, el modelo o el problema. Por ejemplo: «L3250 en blanco».</p>}
      {q && (
        <section aria-live="polite">
          <p className="mb-3 text-slate-700">{resultados.length} resultado(s) para «{q}»</p>
          {resultados.length > 0 ? <ArticleList items={resultados} /> : (
            <p>No encontramos guías con esos términos. Prueba con menos palabras o revisa las <a href="/articulos">guías disponibles</a>.</p>
          )}
        </section>
      )}
    </div>
  );
}
