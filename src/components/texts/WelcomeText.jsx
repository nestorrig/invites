import { useContext, useRef } from "react";
import { Context } from "../../context/ContextProvider";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";

export function WelcomeText() {
  const containerRef = useRef();
  const dateRef = useRef();
  const { isMounted } = useContext(Context);

  useGSAP(
    () => {
      const title = new SplitType("h1");
      const dateText = containerRef.current.querySelector("p");
      const dateType = new SplitType(dateText);
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
          toggleActions: "play reverse play reverse",
        },
      });
      tl.scrollTrigger.enable(false);
      tl.from(title.words, {
        y: 200,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        lazy: false,
      })
        .from(
          dateType.words,
          {
            y: 100,
            marginLeft: 40,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
          },
          "<"
        )
        .from(
          title.chars,
          {
            color: "#FFD700",
            stagger: 0.01,
          },
          "-=0.5"
        )
        .from(
          dateType.chars,
          {
            color: "#917800",
            stagger: 0.01,
          },
          "-=0.5"
        );
      tl.pause();

      if (isMounted) {
        tl.play();
      }
    },
    { scope: containerRef, dependencies: [isMounted] }
  );

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[800px] p-4 md:p-10 z-10 relative"
    >
      <h1 className="text-5xl md:text-8xl font-semibold text-txt-100 welcome-title">
        Los invitamos a nuestra despedida de solteros
      </h1>
      <p ref={dateRef} className="text-2xl md:text-4xl text-txt-200">
        8 de Julio, 6PM
      </p>
    </div>
  );
}
