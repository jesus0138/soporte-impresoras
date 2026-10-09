import type { MetadataRoute } from "next";
import { CATEGORIAS, MARCAS, getAll } from "@/lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const s = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const fijas = ["", "/articulos", "/sobre-mi", "/contacto", "/politica-de-privacidad", "/terminos-y-condiciones", "/aviso-legal", ...CATEGORIAS.map((c) => `/categorias/${c.slug}`), ...MARCAS.map((m) => `/marcas/${m.slug}`)];
  return [...fijas.map((p) => ({ url: s + p })), ...getAll().map((a) => ({ url: `${s}/articulos/${a.slug}` }))];
}
