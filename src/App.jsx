import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { RegistrarProductor } from "./pages/RegistrarProductor";
import { RegistrarLocal } from "./pages/RegistrarLocal";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={ <Layout/> }>
          <Route path="/" element={ <Home/> }/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/registrarProductor" element={ <RegistrarProductor/> }/>
          <Route path="/registrarLocal" element={ <RegistrarLocal/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
