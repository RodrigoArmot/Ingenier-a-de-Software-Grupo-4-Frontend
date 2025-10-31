import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
        Tu Próximo Evento Inolvidable te Espera
      </h1>
      <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
        Descubre conciertos, deportes, teatro y más. Compra tus entradas de forma fácil y segura.
      </p>
      <div className="mt-6">
        <Button className="px-6 py-2 text-base">Explorar eventos</Button>
      </div>
    </section>
  );
}
