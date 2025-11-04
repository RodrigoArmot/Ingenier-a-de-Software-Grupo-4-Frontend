import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import { eventsFeatured, categories, eventsNext } from "../lib/mock";
import CategoryCard from "../components/CategoryCard";

export const Home = () => {
  return (
    <main className="h-full bg-background-dark text-text">
      <Hero />

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {eventsFeatured.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-12">
        <h2 className="text-xl font-semibold mb-4">Explora por Categoría</h2>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <CategoryCard key={i} name={c.name} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-12 mb-12">
        <h2 className="text-xl font-semibold mb-4">Próximos Eventos</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {eventsNext.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>
    </main>
  );
};
