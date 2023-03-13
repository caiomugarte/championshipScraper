import Campeonatos from "../pages/Campeonatos";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import PartidasRound from "../components/PartidasRound";
import Desempenho from "../pages/Desempenho";
import Home from "../pages/Home";

export default function Principal() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/desempenho" element={<Desempenho />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
          <Route path="/partidasRound" element={<PartidasRound />} />
          <Route path='*' element={<div>NOT FOUND RAPAZ</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
