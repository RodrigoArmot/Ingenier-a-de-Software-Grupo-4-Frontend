import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
