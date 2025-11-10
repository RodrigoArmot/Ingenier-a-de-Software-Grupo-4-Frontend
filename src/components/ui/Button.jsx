export default function Button({ className = "", as = "button", variant = "primary", children, ...props }) {
  const Comp = as;

  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 disabled:opacity-50 cursor-pointer transition-all";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-600 focus:ring-indigo-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    gray: "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-400",
  };

  return (
    <Comp className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
