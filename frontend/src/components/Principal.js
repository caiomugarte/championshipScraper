import Navegador from "./Navegador";
import Campeonatos from "../pages/Campeonatos";

import ToggleTheme from "./ToggleTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";

export default function Principal() {
  return (
    <>
      <Navegador />
      <ToggleTheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
