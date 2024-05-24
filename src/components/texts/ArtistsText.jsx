import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from "split-type";

export function ArtistsText() {
  const containerRef = useRef();

  useGSAP(
    () => {
      // Your animations here
      const text = new SplitType("h2");
      gsap.from(text.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        lazy: false,
        color: "#FFD700",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "90% bottom",
          end: "bottom top",
          // markers: true,
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative p-4 md:p-10 mb-10 overflow-hidden"
    >
      <h2 className="text-4xl md:text-6xl font-semibold text-txt-100">
        Contaremos con grandes eventos
      </h2>
    </div>
  );
}
