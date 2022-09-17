import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import Principal from "./components/Principal";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import ToggleTheme from "./components/ToggleTheme";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
    <CssVarsProvider>
      <Principal />
    </CssVarsProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
