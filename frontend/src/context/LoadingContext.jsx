import { createContext, useState, useContext, useEffect } from "react";

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
    </LoadingContext.Provider>
  );
};
