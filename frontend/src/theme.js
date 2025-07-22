import { createTheme } from "@mui/material/styles";
import i18n from "./i18n";

const isHebrew = i18n.language?.startsWith("he");

const commonSettings = {
  typography: {
    h1: { fontWeight: 700, fontSize: "2.2rem", color: "#333" },
    h2: { fontWeight: 600, fontSize: "1.8rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "8px 20px",
          width: 80,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          padding: "16px",
          boxShadow: 0,
        },
      },
    },
  },
};

const lightShadows = [
  "none",
  "0px 1px 3px rgba(108, 99, 255, 0.12), 0px 1px 2px rgba(108, 99, 255, 0.14)",
  "0px 2px 6px rgba(108, 99, 255, 0.16), 0px 2px 4px rgba(108, 99, 255, 0.12)",
  "0px 3px 9px rgba(108, 99, 255, 0.20), 0px 3px 6px rgba(108, 99, 255, 0.16)",
  "0px 4px 12px rgba(108, 99, 255, 0.22), 0px 4px 8px rgba(108, 99, 255, 0.18)",
  "0px 5px 15px rgba(108, 99, 255, 0.24), 0px 5px 10px rgba(108, 99, 255, 0.20)",
  "0px 6px 18px rgba(108, 99, 255, 0.26), 0px 6px 12px rgba(108, 99, 255, 0.22)",
  "0px 7px 21px rgba(108, 99, 255, 0.28), 0px 7px 14px rgba(108, 99, 255, 0.24)",
  "0px 8px 24px rgba(108, 99, 255, 0.30), 0px 8px 16px rgba(108, 99, 255, 0.26)",
  "0px 9px 27px rgba(108, 99, 255, 0.32), 0px 9px 18px rgba(108, 99, 255, 0.28)",
  "0px 10px 30px rgba(108, 99, 255, 0.34), 0px 10px 20px rgba(108, 99, 255, 0.30)",
  "0px 11px 33px rgba(108, 99, 255, 0.36), 0px 11px 22px rgba(108, 99, 255, 0.32)",
  "0px 12px 36px rgba(108, 99, 255, 0.38), 0px 12px 24px rgba(108, 99, 255, 0.34)",
  "0px 13px 39px rgba(108, 99, 255, 0.40), 0px 13px 26px rgba(108, 99, 255, 0.36)",
  "0px 14px 42px rgba(108, 99, 255, 0.42), 0px 14px 28px rgba(108, 99, 255, 0.38)",
  "0px 15px 45px rgba(108, 99, 255, 0.44), 0px 15px 30px rgba(108, 99, 255, 0.40)",
  "0px 16px 48px rgba(108, 99, 255, 0.46), 0px 16px 32px rgba(108, 99, 255, 0.42)",
  "0px 17px 51px rgba(108, 99, 255, 0.48), 0px 17px 34px rgba(108, 99, 255, 0.44)",
  "0px 18px 54px rgba(108, 99, 255, 0.50), 0px 18px 36px rgba(108, 99, 255, 0.46)",
  "0px 19px 57px rgba(108, 99, 255, 0.52), 0px 19px 38px rgba(108, 99, 255, 0.48)",
  "0px 20px 60px rgba(108, 99, 255, 0.54), 0px 20px 40px rgba(108, 99, 255, 0.50)",
  "0px 21px 63px rgba(108, 99, 255, 0.56), 0px 21px 42px rgba(108, 99, 255, 0.52)",
  "0px 22px 66px rgba(108, 99, 255, 0.58), 0px 22px 44px rgba(108, 99, 255, 0.54)",
  "0px 23px 69px rgba(108, 99, 255, 0.60), 0px 23px 46px rgba(108, 99, 255, 0.56)",
  "0px 24px 72px rgba(108, 99, 255, 0.62), 0px 24px 48px rgba(108, 99, 255, 0.58)",
];

const darkShadows = [
  "none",
  "0px 1px 4px rgba(180, 168, 255, 0.30), 0px 1px 3px rgba(180, 168, 255, 0.25)",
  "0px 2px 7px rgba(180, 168, 255, 0.35), 0px 2px 5px rgba(180, 168, 255, 0.30)",
  "0px 3px 10px rgba(180, 168, 255, 0.40), 0px 3px 7px rgba(180, 168, 255, 0.35)",
  "0px 4px 14px rgba(180, 168, 255, 0.45), 0px 4px 10px rgba(180, 168, 255, 0.40)",
  "0px 5px 18px rgba(180, 168, 255, 0.50), 0px 5px 13px rgba(180, 168, 255, 0.45)",
  "0px 6px 22px rgba(180, 168, 255, 0.55), 0px 6px 16px rgba(180, 168, 255, 0.50)",
  "0px 7px 26px rgba(180, 168, 255, 0.60), 0px 7px 19px rgba(180, 168, 255, 0.55)",
  "0px 8px 30px rgba(180, 168, 255, 0.65), 0px 8px 22px rgba(180, 168, 255, 0.60)",
  "0px 9px 34px rgba(180, 168, 255, 0.70), 0px 9px 25px rgba(180, 168, 255, 0.65)",
  "0px 10px 38px rgba(180, 168, 255, 0.72), 0px 10px 28px rgba(180, 168, 255, 0.68)",
  "0px 11px 42px rgba(180, 168, 255, 0.74), 0px 11px 31px rgba(180, 168, 255, 0.70)",
  "0px 12px 46px rgba(180, 168, 255, 0.76), 0px 12px 34px rgba(180, 168, 255, 0.72)",
  "0px 13px 50px rgba(180, 168, 255, 0.78), 0px 13px 37px rgba(180, 168, 255, 0.74)",
  "0px 14px 54px rgba(180, 168, 255, 0.80), 0px 14px 40px rgba(180, 168, 255, 0.76)",
  "0px 15px 58px rgba(180, 168, 255, 0.82), 0px 15px 43px rgba(180, 168, 255, 0.78)",
  "0px 16px 62px rgba(180, 168, 255, 0.84), 0px 16px 46px rgba(180, 168, 255, 0.80)",
  "0px 17px 66px rgba(180, 168, 255, 0.86), 0px 17px 49px rgba(180, 168, 255, 0.82)",
  "0px 18px 70px rgba(180, 168, 255, 0.88), 0px 18px 52px rgba(180, 168, 255, 0.84)",
  "0px 19px 74px rgba(180, 168, 255, 0.90), 0px 19px 55px rgba(180, 168, 255, 0.86)",
  "0px 20px 78px rgba(180, 168, 255, 0.92), 0px 20px 58px rgba(180, 168, 255, 0.88)",
  "0px 21px 82px rgba(180, 168, 255, 0.93), 0px 21px 61px rgba(180, 168, 255, 0.89)",
  "0px 22px 86px rgba(180, 168, 255, 0.94), 0px 22px 64px rgba(180, 168, 255, 0.90)",
  "0px 23px 90px rgba(180, 168, 255, 0.95), 0px 23px 67px rgba(180, 168, 255, 0.91)",
  "0px 24px 94px rgba(180, 168, 255, 0.96), 0px 24px 70px rgba(180, 168, 255, 0.92)",
];

const layout = {
  drawerWidth: 240,
  headerHeight: "5rem",
  footerHeight: 100,
};

const direction = isHebrew ? "rtl" : "ltr";

const typography = {
  fontFamily: isHebrew
    ? "'Assistant', sans-serif"
    : "'Roboto', 'Playfair Display', 'Raleway', sans-serif",
};

export const lightTheme = createTheme({
  direction: direction,
  typography: typography,
  palette: {
    mode: "light",
    primary: { main: "#6C63FF" },
    secondary: { main: "#FFB6B9" },
    buttons: { background: "#FFFFFF", onHover: "#F3F0FF", text: "#333333" },
    background: { default: "#F9F9FB", paper: "#f5f2f2" },
    text: { primary: "#333333", secondary: "#555555", appName: "#FFFFFF" },
    success: { main: "#A0D995" },
    error: { main: "#FF6F61" },
    info: { main: "#89CFF0" },
  },
  shadows: lightShadows,
  layout,
  ...commonSettings,
});

export const darkTheme = createTheme({
  direction: direction,
  typography: typography,
  palette: {
    mode: "dark",
    primary: { main: "#B8A1FF" },
    secondary: { main: "#FFC1CC" },
    buttons: { background: "#6C63FF", onHover: "#cfc7d9", text: "#FFFFFF" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#E0E0E0", secondary: "#B0B0B0", appName: "#c0bdf0" },
    success: { main: "#9AD3BC" },
    error: { main: "#FF6F61" },
    info: { main: "#80D8FF" },
  },
  shadows: darkShadows,
  layout,
  ...commonSettings,
});
