import { getAll, type Meta } from "@/lib/articles";

export function normalizar(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function buscar(q: string): Meta[] {
  const terminos = normalizar(q).split(/\s+/).filter(Boolean);
  if (!terminos.length) return [];
  return getAll()
    .map((a) => {
      const titulo = normalizar(a.title);
      const resto = normalizar(`${a.description} ${a.marca} ${a.modelo}`);
      if (!terminos.every((t) => titulo.includes(t) || resto.includes(t))) return null;
      const puntos = terminos.reduce((n, t) => n + (titulo.includes(t) ? 2 : 1), 0);
      return { a, puntos };
    })
    .filter((x): x is { a: Meta; puntos: number } => x !== null)
    .sort((x, y) => y.puntos - x.puntos)
    .map((x) => x.a);
}
