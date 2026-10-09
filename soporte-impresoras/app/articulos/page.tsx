import type { Metadata } from "next";
import ArticleList from "@/components/ArticleList";
import { getAll } from "@/lib/articles";
export const metadata: Metadata = { title: "Guías", description: "Todas las guías de solución de problemas de impresoras." };
export default function Page() { return <><h1 className="text-2xl font-bold mb-4">Guías</h1><ArticleList items={getAll()} /></>; }
