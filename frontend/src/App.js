import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";

import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DrawerComp from "./components/DrawerComp/DrawerComp.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Alerts from "./components/Alerts/Alerts.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader.jsx";
import DialogBox from "./components/DialogBox/DialogBox.jsx";
import FeedPage from "./pages/FeedPage/FeedPage.jsx";

function App({ toggleTheme, mode, setMode }) {
  const [ShowDrawer, setShowDrawer] = useState(false);
  const [homePageDirectory, setHomePageDirectory] = useState("/about");
  const [userId, setUserId] = useState(null);

  const [jwt, setJwt] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp > currentTime) {
        setHomePageDirectory("/feed");
        setUserId(decoded.userId);
        return token;
      } else {
        setHomePageDirectory("/about");
        localStorage.removeItem("jwtToken");
        setUserId(null);
        return null;
      }
    } catch {
      setHomePageDirectory("/about");
      localStorage.removeItem("jwtToken");
      return null;
    }
  });

  const [showMessageForReLoggingIn, setShowMessageForReLoggingIn] =
    useState(false);

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          localStorage.removeItem("jwtToken");
          setShowMessageForReLoggingIn(true);
          setJwt(null);
          setUserId(null);
          setHomePageDirectory("/about");
        } else {
          setHomePageDirectory("/feed");
          setUserId(decoded.userId);
        }
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (jwt) {
      const decoded = jwtDecode(jwt);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp > currentTime) {
        localStorage.setItem("jwtToken", jwt);
        setHomePageDirectory("/feed");
        setUserId(decoded.userId);
      }
    }
  }, [jwt]);
  // --------------------------------------------

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
            <Header
              ShowDrawer={ShowDrawer}
              setShowDrawer={setShowDrawer}
              jwt={jwt}
              setJwt={setJwt}
              setAlertInfo={setAlertInfo}
              homePageDirectory={homePageDirectory}
              setHomePageDirectory={setHomePageDirectory}
            />

            <Routes>
              <Route
                path="/"
                element={<Navigate to={homePageDirectory} replace />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/register"
                element={<RegisterPage setAlertInfo={setAlertInfo} />}
              />
              <Route
                path="/login"
                element={
                  <LoginPage setAlertInfo={setAlertInfo} setJwt={setJwt} />
                }
              />
              <Route
                path="/feed"
                element={
                  <FeedPage userId={userId} setAlertInfo={setAlertInfo} />
                }
              />
            </Routes>
            {showMessageForReLoggingIn && (
              <DialogBox
                showDialogBox={showMessageForReLoggingIn}
                setshowDialogBox={setShowMessageForReLoggingIn}
                navigateDir="/login"
                title="SessionExpiredDialogBox.title"
                message="SessionExpiredDialogBox.message"
                buttonText="SessionExpiredDialogBox.buttonText"
              />
            )}
            <Alerts alertInfo={alertInfo} />
            <Footer />
          </Box>
        </Router>
      </Box>
    </LoadingProvider>
  );
}

export default App;
