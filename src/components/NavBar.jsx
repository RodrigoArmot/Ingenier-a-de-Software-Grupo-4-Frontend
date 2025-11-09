import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./ui/Button";
import { Ticket } from "lucide-react";

export default function Navbar({}) {
  return (
    <header className="border-b border-zinc-800 bg-background-dark text-zinc-100 items-center">
      <div className="flex h-16 items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Tikea</h1>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm hover:text-primary transition">
              Explorar Eventos
            </a>
            <a href="#" className="text-sm hover:text-primary transition">
              Ayuda
            </a>
          </nav>
        </div>

        {/* buscador centrado */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
          <Link to="/signup">
            <Button>Registrarse</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
