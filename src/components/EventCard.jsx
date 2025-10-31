import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10">
      <img
        src={event.image || `https://picsum.photos/seed/${event.id}/800/450`}
        alt={event.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-zinc-100 font-semibold">{event.title}</h3>
          {event.badge ? <Badge>{event.badge}</Badge> : null}
        </div>
        <p className="mt-1 text-sm text-zinc-400">{event.date} • {event.venue}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-zinc-300">Desde <b>S/. {event.price}</b></span>
          <Button className="px-3 py-1.5">Comprar</Button>
        </div>
      </div>
    </div>
  );
}
