import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { RegistrarProductor } from "./pages/RegistrarProductor";
import { RegistrarLocal } from "./pages/RegistrarLocal";
import { RegistrarEvento } from "./pages/RegistrarEvento";
import Layout from "./components/layout/Layout";
import { Signup } from "./pages/Signup";
import { ConfigProfile } from "./pages/ConfigProfile";
import { DeleteProfile } from "./pages/DeleteProfile";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/configprofile" element={<ConfigProfile />} />
          <Route path="/user/deleteprofile" element={<DeleteProfile />} />
          <Route path="/registrarProductor" element={<RegistrarProductor />} />
          <Route path="/registrarLocal" element={<RegistrarLocal />} />
          <Route path="/registrarEvento" element={<RegistrarEvento />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
