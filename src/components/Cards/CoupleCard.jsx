import { useGSAP } from "@gsap/react";
import images from "../../assets/images";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

export function CoupleCard() {
  const containerRef = useRef();
  const card1Ref = useRef();
  const card2Ref = useRef();
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  gsap.registerPlugin(ScrollTrigger);
  const matchMediaCards = gsap.matchMedia();

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      setClientX(clientX);
      setClientY(clientY);
    });
  }, [clientX, clientY]);

  useGSAP(
    () => {
      matchMediaCards.add(
        {
          // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
          isDesktop: `(min-width: ${768}px)`,
          isMobile: `(max-width: ${768 - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isDesktop } = context.conditions;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          const posX = (clientX - centerX) / centerX;
          const posY = (clientY - centerY) / centerY;

          const rotationX = posY * 20;
          const rotationY = posX * -20;

          gsap.to(card1Ref.current, {
            rotationX: isDesktop ? rotationX : 0,
            rotationY: isDesktop ? rotationY : 0,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          });
          gsap.to(card2Ref.current, {
            rotationX: isDesktop ? rotationX : 0,
            rotationY: isDesktop ? rotationY : 0,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          });
          // const handleMouseMove = (event) => {
          // };

          // window.addEventListener("mousemove", handleMouseMove);
          // window.addEventListener("resize", handleMouseMove);

          // return () => {
          //   window.removeEventListener("mousemove", handleMouseMove);
          // };
        }
      );
    },
    { scope: containerRef, dependencies: [clientX, clientY] }
  );

  useGSAP(() => {
    gsap.to(".reveal-children", {
      scaleX: 0,
      transformOrigin: "right",
      stagger: 0.1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "figure",
        start: "top bottom",
        end: "bottom top",
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });
  });

  return (
    <div
      className="w-full h-[calc(100svh-220px)] md:h-full absolute bottom-0 md:bottom-auto md:top-0 md:right-0 overflow-hidden"
      ref={containerRef}
    >
      <div
        ref={card1Ref}
        className="w-full h-4/5 md:h-full md:w-3/5 absolute top-0 -right-40 md:top-24 md:right-0"
      >
        <figure className="w-full h-full md:h-72 relative">
          <img
            src={images.couple1}
            alt="Pareja"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute w-full h-full top-0 flex flex-col">
            <div
              id="child1"
              className="reveal-children bg-300 w-full h-full"
            ></div>
            <div className="reveal-children bg-300 w-full h-full"></div>
            <div className="reveal-children bg-300 w-full h-full"></div>
          </div>
        </figure>
      </div>
      <div
        ref={card2Ref}
        className="w-full h-4/5 md:h-full md:w-3/5 absolute bottom-0 right-40 md:top-72 md:right-12"
      >
        <figure className="w-full h-full md:h-72 relative bottom-0">
          <img
            src={images.couple2}
            alt="Pareja"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute w-full h-full top-0 flex flex-col">
            <div
              id="child2"
              className="reveal-children bg-300 w-full h-full"
            ></div>
            <div className="reveal-children bg-300 w-full h-full"></div>
            <div className="reveal-children bg-300 w-full h-full"></div>
          </div>
        </figure>
      </div>
    </div>
  );
}
