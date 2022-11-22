import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "./screens/Cadastro";
import Painel from "./screens/Painel";
import Login from "./screens/Login";
import Transacoes from "./screens/Transacoes";
import NovaTransf from "./screens/NovaTransf";

const NavRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/nova-transferencia" element={<NovaTransf />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NavRoutes;
