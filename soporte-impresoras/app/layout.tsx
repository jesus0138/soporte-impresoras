import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ads = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Soporte de impresoras en español", template: "%s | Soporte de impresoras" },
  description: "Guías en español para resolver problemas de impresoras Epson, HP, Canon y Brother. Sitio independiente.",
  alternates: { canonical: "./" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        {ads && <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ads}`} crossOrigin="anonymous" strategy="afterInteractive" />}
        <header className="border-b border-[var(--line)] bg-white">
          <nav className="mx-auto max-w-4xl px-4 py-3 flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Principal">
            <Link href="/" className="font-bold text-lg no-underline text-[var(--ink)]">Soporte de impresoras</Link>
            <Link href="/articulos">Guías</Link><Link href="/categorias/luces-y-errores">Categorías</Link>
            <Link href="/marcas/epson">Epson</Link><Link href="/marcas/hp">HP</Link><Link href="/sobre-mi">Sobre mí</Link><Link href="/contacto">Contacto</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl w-full px-4 py-8 flex-1">{children}</main>
        <footer className="border-t border-[var(--line)] bg-white text-sm">
          <div className="mx-auto max-w-4xl px-4 py-5 space-y-2">
            <p>Sitio independiente. No es soporte oficial de Epson, HP, Canon ni Brother.</p>
            <p className="flex flex-wrap gap-x-4"><Link href="/politica-de-privacidad">Privacidad</Link><Link href="/terminos-y-condiciones">Términos</Link><Link href="/aviso-legal">Aviso legal</Link></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
