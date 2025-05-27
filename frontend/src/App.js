import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";

import HomePage from "./pages/HomePage/HomePage.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DrawerComp from "./components/DrawerComp/DrawerComp.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Alerts from "./components/Alerts/Alerts.jsx";

import { useTheme } from "@mui/material/styles";

function App({ toggleTheme, mode, setMode }) {
  const [ShowDrawer, setShowDrawer] = useState(false);

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const theme = useTheme();

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <DrawerComp setShowDrawer={setShowDrawer} ShowDrawer={ShowDrawer} />
        <Box
          sx={{
            flexGrow: 1,
            ml: ShowDrawer ? `${theme.layout.drawerWidth}` : 0,
            transition: "margin-left 0.3s ease",
            width: "100%",
          }}
        >
          <Header
            ShowDrawer={ShowDrawer}
            setShowDrawer={setShowDrawer}
            mode={mode}
            setMode={setMode}
            toggleTheme={toggleTheme}
          />

          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/register"
              element={<RegisterPage setAlertInfo={setAlertInfo} />}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Alerts alertInfo={alertInfo} />
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
