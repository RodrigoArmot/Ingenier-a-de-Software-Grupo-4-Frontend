import SearchBar from "./SearchBar";
import Button from "./ui/Button";

export default function Navbar({}) {
  return (
    <header className="border-b border-zinc-800 bg-indigo-950 text-zinc-100 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#" className="px-4">
          <h1 className="text-xl font-semibold">Tikea</h1>
        </a>

        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <a href="#" className="text-sm transition">
            Explorar Eventos
          </a>
          <a href="#" className="text-sm transition">
            Ayuda
          </a>
        </nav>

        {/* Desktop: buscador centrado */}
        <div className="hidden md:flex flex-1 justify-center">
          <SearchBar />
        </div>

        <nav className="ml-auto hidden md:flex items-center gap-2">
          <Button className="bg-zinc-800 hover:bg-zinc-700">
            Iniciar Sesión
          </Button>
          <Button>Registrarse</Button>
        </nav>
      </div>
    </header>
  );
}
