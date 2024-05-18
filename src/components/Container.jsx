import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { Welcome } from "./Welcome";
import { Artists } from "./Artists";

export function Container() {
  const { isMounted } = useContext(Context);
  return (
    <div>
    {/* <div className={isMounted ? "" : "h-svh overflow-hidden"}> */}
      <Welcome />
      <Artists />
      <div className="h-svh"></div>
      {/* <Welcome /> */}
    </div>
  );
}
