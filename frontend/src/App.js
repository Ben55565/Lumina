import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DrawerComp from "./components/DrawerComp/DrawerComp.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Alerts from "./components/Alerts/Alerts.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader.jsx";

function App({ toggleTheme, mode, setMode }) {
  const [ShowDrawer, setShowDrawer] = useState(false);

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const theme = useTheme();

  return (
    <LoadingProvider>
      <Box
        sx={{
          display: "flex",
          overflowX: "hidden",
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <GlobalLoader />
        <Router>
          <DrawerComp
            ShowDrawer={ShowDrawer}
            mode={mode}
            setMode={setMode}
            toggleTheme={toggleTheme}
          />
          <Box
            sx={{
              flexGrow: 1,
              ml: ShowDrawer ? `${theme.layout.drawerWidth}px` : 0,
              transition: "margin-left 0.3s ease",
              width: "100%",
            }}
          >
            <Header ShowDrawer={ShowDrawer} setShowDrawer={setShowDrawer} />

            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/register"
                element={<RegisterPage setAlertInfo={setAlertInfo} />}
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>

            <Alerts alertInfo={alertInfo} />
            <Footer />
          </Box>
        </Router>
      </Box>
    </LoadingProvider>
  );
}

export default App;
