import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./ui/Button";
import { Ticket } from "lucide-react";

export default function Navbar({}) {
  return (
    <header className="border-b border-zinc-800 bg-background-dark text-zinc-100 items-center">
      <div className="relative flex h-16 items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Tikea</h1>
          </a>
          <nav className="hidden md:flex items-center gap-6 mx-auto">
            <a href="#" className="text-sm transition hover:text-primary">
              Explorar Eventos
            </a>
            <Link to="/registrarProductor" className="text-sm transition hover:text-primary">
              Colabora con nosotros
            </Link>
            <a href="#" className="text-sm transition hover:text-primary">
              Ayuda
            </a>
          </nav>
        </div>

        {/* buscador centrado */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block w-full max-w-md">
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
