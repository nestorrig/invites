/* eslint-disable react/prop-types */
import { createContext, useReducer, useState } from "react";

const Context = createContext();

const loadingInitialState = {
  music: false,
};

const reducerOBJECT = (state) => ({
  MUSIC: {
    ...state,
    music: true,
  },
});

const loadingReducer = (state, action) => {
  if (reducerOBJECT(state)[action.type]) {
    return reducerOBJECT(state)[action.type];
  } else {
    return { ...state };
  }
};

function ContextProvider({ children }) {
  const [loading, dispatch] = useReducer(loadingReducer, loadingInitialState);
  const [loaded, setLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  console.log(loading);

  const values = {
    loaded,
    setLoaded,
    isMounted,
    setIsMounted,
    loading,
    dispatch,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
