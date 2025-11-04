export default function Badge({ children, className = "" }) {
  return (
    <span className={
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
      "bg-indigo-100/10 text-indigo-300 ring-1 ring-indigo-400/30 " + className
    }>
      {children}
    </span>
  );
}
