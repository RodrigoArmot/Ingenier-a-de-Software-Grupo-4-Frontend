export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Tikea. Todos los derechos reservados.
      </div>
    </footer>
  );
}
