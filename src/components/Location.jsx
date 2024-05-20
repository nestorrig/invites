import { LocationCard } from "./Cards";
import { LocationText } from "./texts";

export function Location() {
  return (
    <div className="w-full min-h-svh bg-100 relative flex flex-col justify-between">
      <LocationText />
      <LocationCard />
    </div>
  );
}
