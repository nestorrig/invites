import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import SplitType from "split-type";
import { Context } from "../context/ContextProvider";
import { Earphones } from "./icons";

export function Loader() {
  const { loaded, setLoaded, setIsMounted, loading } = useContext(Context);
  const textRef = useRef();
  const buttonRef = useRef();
  const containerRef = useRef();
  const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
  const removeLoaderTl = gsap.timeline({
    defaults: { ease: "power4.inOut" },
    paused: true,
  });

  useEffect(() => {
    if (Object.values(loading).every((value) => value === true)) {
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useGSAP(
    (context, contextSafe) => {
      const text = new SplitType(textRef.current);
      gsap.set(textRef.current, { autoAlpha: 1 });

      tl.from(text.chars, {
        y: 40,
        opacity: 0,
        skewX: 30,
        stagger: 0.03,
        duration: 1,
        lazy: false,
      })
        .to(text.chars, {
          y: -40,
          skewX: -10,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
          lazy: false,
        })
        .repeat(-1)
        .eventCallback("onRepeat", function () {
          if (loaded) {
            tl.pause();
            revealbutton.play();
          } else {
            tl.restart();
          }
        });
      const revealbutton = gsap.to(buttonRef.current, {
        opacity: 1,
      });

      revealbutton.pause();

      const onClickButton = contextSafe(() => {
        buttonRef.current.classList.remove("duration-700");
        removeLoaderTl.play();
      });
      buttonRef.current.addEventListener("click", onClickButton);

      removeLoaderTl
        .to(buttonRef.current, {
          scaleX: 0,
          scaleY: 0,
        })
        .to(containerRef.current, {
          autoAlpha: 0,
        })
        .eventCallback("onComplete", () => {
          setIsMounted(true);
        });

      return () => {
        buttonRef.current.removeEventListener("click", onClickButton);
      };
    },

    { dependencies: [loaded], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed flex justify-center items-center h-svh w-screen bg-300 z-50"
    >
      <h3
        ref={textRef}
        className="text-6xl text-txt-100 font-bold absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 w-full text-center"
      >
        Cargando
      </h3>
      <button
        ref={buttonRef}
        className="flex flex-col items-center justify-center gap-4 opacity-0 text-txt-100 text-xl md:hover:text-primary-100 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-full shadow md:hover:shadow-primary-100 duration-700 md:hover:fill-primary-100 fill-white w-40 h-40"
      >
        Empieza Ahora
        <Earphones
          className="inline-block w-6 h-6"
          pathClassName="md:fill-inherit"
        />
      </button>
    </div>
  );
}
