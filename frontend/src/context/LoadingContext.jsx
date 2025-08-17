import { createContext, useState, useContext, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

let externalSetLoading = () => {};

export const setLoadingExternal = (loading, loadingText) =>
  externalSetLoading(loading, loadingText);

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    externalSetLoading = (loadingState, loadingTextState) => {
      setLoading(loadingState);

      if (typeof loadingTextState === "function") {
        setLoadingText(loadingTextState());
      } else if (typeof loadingTextState === "string") {
        setLoadingText(loadingTextState);
      } else {
        setLoadingText("");
      }
    };

    return () => {
      externalSetLoading = () => {};
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, loadingText, setLoading }}>
      {children}

      <Backdrop sx={{ color: "#fff", zIndex: 3000 }} open={loading}>
        <div style={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          {loadingText && <div style={{ marginTop: 8 }}>{loadingText}</div>}
        </div>
      </Backdrop>
    </LoadingContext.Provider>
  );
};
