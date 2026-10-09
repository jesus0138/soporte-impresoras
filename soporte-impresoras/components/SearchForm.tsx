export default function SearchForm({ q = "" }: { q?: string }) {
  return (
    <form action="/buscar" method="get" role="search" className="flex gap-2 max-w-xl">
      <label htmlFor="q" className="sr-only">Buscar una solución</label>
      <input id="q" name="q" type="search" defaultValue={q} placeholder="Ej: Epson L3250 luces parpadeando"
        className="flex-1 rounded border border-[var(--line)] bg-white px-3 py-2" />
      <button type="submit" className="rounded bg-[var(--brand)] px-4 py-2 font-semibold text-white">Buscar</button>
    </form>
  );
}
