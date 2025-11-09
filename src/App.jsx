import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { RegistrarProductor } from "./pages/RegistrarProductor";
import Layout from "./components/layout/Layout";
import { Signup } from "./pages/Signup";
import { ConfigProfile } from "./pages/ConfigProfile";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/configprofile" element={<ConfigProfile />} />
          <Route path="/registrarProductor" element={<RegistrarProductor />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
