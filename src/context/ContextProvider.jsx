/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const Context = createContext();

function ContextProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false);

  
  const values = {
    loaded,
    setLoaded,
    isMounted,
    setIsMounted,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { Context, ContextProvider };