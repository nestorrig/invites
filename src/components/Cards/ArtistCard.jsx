/* eslint-disable react/prop-types */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

export function ArtistsCard({ video, title, description }) {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const matchMediaCard = gsap.matchMedia();

  const desktopTl = gsap.timeline({
    defaults: { ease: "power2.out" },
    paused: true,
  });

  useGSAP(
    () => {
      matchMediaCard.add(
        {
          isDesktop: `(min-width: ${1024}px)`,
          isMobile: `(max-width: ${1024 - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isDesktop } = context.conditions;

          if (isDesktop) return;
          if (!containerRef.current) return;

          const mobileTl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "10% 50%",
              end: "70% top",
              // markers: true,
              toggleActions: "play reverse play reverse",
            },
          });

          const titulo = containerRef.current.querySelector("h3");
          const parrafo = containerRef.current.querySelector("p");
          const fade = containerRef.current.querySelector(".fade");

          gsap.set(titulo, { y: 100, opacity: 0 });
          gsap.set(parrafo, { y: 100, opacity: 0 });
          gsap.set(fade, { opacity: 0, rotateX: 180 });

          mobileTl
            .to(titulo, {
              y: 0,
              opacity: 1,
              duration: 0.5,
            })
            .to(
              parrafo,
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
              },
              "-=0.3"
            )
            .to(
              fade,
              {
                opacity: 1,
              },
              "-=0.3"
            );
        }
      );
    },
    { scope: containerRef }
  );
  useGSAP(
    () => {
      matchMediaCard.add(
        {
          isDesktop: `(min-width: ${1024}px)`,
          isMobile: `(max-width: ${1024 - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isDesktop } = context.conditions;

          const titulo = containerRef.current.querySelector("h3");
          const parrafo = containerRef.current.querySelector("p");
          const fade = containerRef.current.querySelector(".fade");

          if (!isDesktop) return;

          desktopTl
            .fromTo(
              fade,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.5,
              }
            )
            .fromTo(
              titulo,
              {
                y: 10,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
              },
              "-=0.5"
            )
            .fromTo(
              parrafo,
              {
                opacity: 0,
                y: 10,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
              },
              "-=0.3"
            );

          containerRef.current.addEventListener("mouseenter", () => {
            desktopTl.play();
          });
          containerRef.current.addEventListener("mouseleave", () => {
            desktopTl.reverse();
          });

          return () => {
            containerRef.current.removeEventListener("mouseenter", () => {
              desktopTl.play();
            });
            containerRef.current.removeEventListener("mouseleave", () => {
              desktopTl.reverse();
            });
          };
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full h-[500px] cursor-pointer"
    >
      <video
        src={video}
        autoPlay
        preload="auto"
        muted
        loop
        className="w-full h-full object-cover object-center"
      ></video>
      <div className="fade absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-transparent to-black"></div>
      <div className="absolute p-4 top-0 flex flex-col justify-end lg:justify-start gap-4 h-full">
        <h3 className="text-4xl lg:text-6xl font-semibold text-txt-100">
          {title}
        </h3>
        <p className="text-txt-100 text-xl lg:text-xl leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
