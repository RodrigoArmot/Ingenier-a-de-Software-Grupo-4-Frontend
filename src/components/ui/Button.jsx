export default function Button({ className = "", as = "button", children, ...props }) {
  const Comp = as;
  return (
    <Comp
      className={
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        "bg-primary text-white hover:bg-primary-600 focus:outline-none focus:ring-2 " +
        "focus:ring-indigo-400 disabled:opacity-50 cursor-pointer transition-all" + className
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
