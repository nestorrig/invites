import { CoupleCard } from "./Cards";
import { WelcomeText } from "./texts";

export function Welcome() {
  return (
    <div className="w-full min-h-svh bg-100 relative">
      <WelcomeText />
      <CoupleCard />
    </div>
  );
}
