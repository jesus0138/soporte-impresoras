import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const dir = path.join(process.cwd(), "content", "articulos");
const prod = process.env.NODE_ENV === "production";

export const CATEGORIAS = [
  { slug: "luces-y-errores", nombre: "Luces parpadeantes y códigos de error" },
  { slug: "problemas-de-impresion", nombre: "Problemas de impresión" },
  { slug: "conectividad", nombre: "Conectividad y Wi-Fi" },
  { slug: "instalacion-y-controladores", nombre: "Instalación y controladores" },
  { slug: "limpieza-y-mantenimiento", nombre: "Limpieza y mantenimiento" },
  { slug: "comparativas", nombre: "Comparativas y recomendaciones" },
];
export const MARCAS = [
  { slug: "epson", nombre: "Epson" },
  { slug: "hp", nombre: "HP" },
  { slug: "canon", nombre: "Canon" },
  { slug: "brother", nombre: "Brother" },
];

export type Meta = { slug: string; title: string; description: string; marca: string; modelo: string; categoria: string; date: string; draft: boolean };

function toMeta(slug: string, d: Record<string, unknown>): Meta {
  const date = d.date instanceof Date ? d.date.toISOString().slice(0, 10) : String(d.date ?? "");
  return { slug, title: String(d.title ?? slug), description: String(d.description ?? ""), marca: String(d.marca ?? "").toLowerCase(), modelo: String(d.modelo ?? ""), categoria: String(d.categoria ?? ""), date, draft: d.draft === true };
}

export function getAll(): Meta[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => toMeta(f.replace(/\.md$/, ""), matter(fs.readFileSync(path.join(dir, f), "utf8")).data))
    .filter((a) => !(prod && a.draft)).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getOne(slug: string) {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const meta = toMeta(slug, data);
  if (prod && meta.draft) return null;
  const body = String(await remark().use(gfm).use(html).process(content));
  return { meta, body };
}
