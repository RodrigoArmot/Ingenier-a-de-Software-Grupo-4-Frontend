export default function CategoryCard({ name, image }) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10">
      <img src={image || "https://picsum.photos/seed/cat/800/500"} alt={name} className="h-32 w-full object-cover" />
      <div className="p-3 text-zinc-200 font-medium">{name}</div>
    </div>
  );
}
