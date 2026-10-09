import Link from "next/link";
export default function NotFound() { return <><h1 className="text-2xl font-bold">No encontramos esa página</h1><p className="mt-3">Prueba desde la <Link href="/">página de inicio</Link> o la lista de <Link href="/articulos">guías</Link>.</p></>; }
