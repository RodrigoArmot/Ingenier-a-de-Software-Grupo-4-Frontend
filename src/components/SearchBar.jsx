import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 w-full max-w-xl">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-400" />
        </div>
        <input
          className="w-full rounded-md bg-zinc-900/60 pl-10 pr-3 py-2 text-sm text-text placeholder:text-muted ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
          placeholder="Buscar eventos…"
        />
      </div>
    </div>
  );
}
