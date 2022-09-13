import Navegador from "./Navegador";
import Campeonatos from "../pages/Campeonatos";

import ToggleTheme from "./ToggleTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Desempenho from "../pages/Desempenho";
import Header from "../components/Header";

export default function Principal() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/desempenho" element={<Desempenho />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
