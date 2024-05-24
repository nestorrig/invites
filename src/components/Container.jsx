import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { Welcome } from "./Welcome";
import { Artists } from "./Artists";
import { Location } from "./Location";

export function Container() {
  const { isMounted } = useContext(Context);
  return (
    // <div className="bg-100">
    <div className={`bg-100 ${isMounted ? "" : "h-svh overflow-hidden"}`}>
      <Welcome />
      <Artists />
      <Location />
    </div>
  );
}
