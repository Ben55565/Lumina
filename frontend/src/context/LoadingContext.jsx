import { createContext, useState, useContext, useEffect } from "react";

let externalSetLoading = () => {};

export const setLoadingExternal = (state) => externalSetLoading(state);

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    externalSetLoading = setLoading;
    return () => {
      externalSetLoading = () => {};
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
