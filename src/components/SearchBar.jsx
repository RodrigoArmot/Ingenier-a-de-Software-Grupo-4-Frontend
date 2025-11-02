import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 w-full max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
        <input
          className="w-full rounded-md bg-zinc-900/60 pl-10 pr-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500"
          placeholder="Buscar eventos…"
        />
      </div>
    </div>
  );
}
