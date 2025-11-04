import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";
import Footer from "../Footer";

export default function Layout() {
  return (
    <div className="max-w-full max-h-full min-h-dvh grid grid-rows-[auto_1fr]">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
