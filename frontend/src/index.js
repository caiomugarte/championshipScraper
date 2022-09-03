import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses";

import Navegador from "./components/Navegador";
import Campeonatos from "./pages/Campeonatos";

import ToggleTheme from "./components/ToggleTheme";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <Navegador />
      <ToggleTheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
