import { createTheme } from "@mui/material/styles";

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
];

const darkShadows = [
  "none",
  "0px 1px 4px rgba(180, 168, 255, 0.30), 0px 1px 3px rgba(180, 168, 255, 0.25)",
  "0px 2px 7px rgba(180, 168, 255, 0.35), 0px 2px 5px rgba(180, 168, 255, 0.30)",
  "0px 3px 10px rgba(180, 168, 255, 0.40), 0px 3px 7px rgba(180, 168, 255, 0.35)",
  "0px 4px 14px rgba(180, 168, 255, 0.45), 0px 4px 10px rgba(180, 168, 255, 0.40)",
  "0px 5px 18px rgba(180, 168, 255, 0.50), 0px 5px 13px rgba(180, 168, 255, 0.45)",
  "0px 6px 22px rgba(108, 99, 255, 0.55), 0px 6px 16px rgba(108, 99, 255, 0.50)",
  "0px 7px 26px rgba(108, 99, 255, 0.60), 0px 7px 19px rgba(108, 99, 255, 0.55)",
  "0px 8px 30px rgba(108, 99, 255, 0.65), 0px 8px 22px rgba(108, 99, 255, 0.60)",
];

const layout = {
  drawerWidth: 240,
  headerHeight: "5rem",
  footerHeight: 100,
};

export const lightTheme = createTheme({
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
