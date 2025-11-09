import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./ui/Button";
import { Ticket } from "lucide-react";

export default function Navbar({}) {
  return (
    <header className="border-b border-zinc-800 bg-background-dark text-zinc-100 items-center">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="px-4 flex items-center justify-center gap-2">
          <Ticket className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Tikea</h1>
        </a>

        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <a href="#" className="text-sm transition">
            Explorar Eventos
          </a>
          <a href="/registrarProductor" className="text-sm transition">
            Colabora con nosotros
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
          <Link to="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
          <Button>Registrarse</Button>
        </nav>
      </div>
    </header>
  );
}
