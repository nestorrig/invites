import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/ContextProvider";
import { Howl } from "howler";
import { bgTrack } from "../assets/audio";

export function SoundButton() {
  const { dispatch } = useContext(Context);
  const [isAnimating, setIsAnimating] = useState(true);
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [bgTrack],
      autoplay: false,
      loop: true,
      volume: 0.2,
      onload: () => {
        dispatch({ type: "MUSIC" });
      },
    });

    return () => {
      soundRef.current.unload();
    };
  }, [dispatch]);

  useEffect(() => {
    const animationState = isAnimating ? "running" : "paused";
    const loads = document.querySelectorAll(".load");
    loads.forEach((load) => {
      load.style.animationPlayState = animationState;
    });

    if (isAnimating) {
      soundRef.current.play();
      soundRef.current.fade(0, 0.2, 1000);
    } else {
      soundRef.current.fade(0.2, 0, 1000);
      soundRef.current.once("fade", () => {
        soundRef.current.pause();
      });
    }
  }, [isAnimating]);

  const handleClick = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-300 fixed h-10 w-10 bottom-4 right-4 flex justify-center rotate-180 rounded-full border border-primary-100 overflow-hidden"
    >
      <div className="flex relative bottom-1">
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
      </div>
    </div>
  );
}
