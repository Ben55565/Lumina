import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import ReactDOM from "react-dom/client";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import { useTranslation } from "react-i18next";

import "./index.css";
import "./i18n";
import App from "./App";

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

  const createEmotionCache = (dir) => {
    return createCache({
      key: dir === "rtl" ? "muirtl" : "mui",
      stylisPlugins: dir === "rtl" ? [prefixer, rtlPlugin] : [],
    });
  };

  const useDirection = () => {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === "he";
    const direction = isRtl ? "rtl" : "ltr";

    useEffect(() => {
      document.documentElement.dir = direction;
    }, [direction]);

    return direction;
  };

  const direction = useDirection();
  const emotionCache = useMemo(
    () => createEmotionCache(direction),
    [direction],
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <App toggleTheme={toggleTheme} mode={mode} setMode={setMode} />
      </ThemeProvider>
    </CacheProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeWrapper />);
