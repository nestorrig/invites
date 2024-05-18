import { useContext, useRef } from "react";
import { Context } from "../../context/ContextProvider";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { randomType } from "../../utils";

export function WelcomeText() {
  const containerRef = useRef();
  const dateRef = useRef();
  const { isMounted } = useContext(Context);

  useGSAP(
    () => {
      const title = new SplitType("h1");
      const dateText = containerRef.current.querySelector("p");
      const dateType = new SplitType(dateText, { types: "words" });

      dateType.words.forEach((word, index) => {
        let caracteres = "";

        if (index === 0) caracteres = "0123456789";
        if (index === 1) caracteres = "abcdefghijklmnopqrstuvwxyz";
        if (index === 2) caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (index === 3) caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        randomType(word, caracteres, 1000, false);
      });

      gsap.from(title.words, {
        y: 200,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        lazy: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(dateType.words, {
        y: 100,
        marginLeft: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-[800px] p-4 md:p-10 z-10 relative">
      <h1 className="text-5xl md:text-8xl font-semibold text-txt-100 welcome-title">
        Los invitamos a nuestra despedida de solteros
      </h1>
      <p ref={dateRef} className="text-2xl md:text-4xl text-txt-200">
        8 de Julio, 6PM
      </p>
    </div>
  );
}
