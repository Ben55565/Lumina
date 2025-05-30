import React, { useState, useEffect, useMemo } from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./i18n";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

function ThemeWrapper() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("lumina-theme-mode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("lumina-theme-mode", mode);
  }, [mode]);

  const themeMode = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeWrapper />);
