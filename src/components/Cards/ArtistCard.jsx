/* eslint-disable react/prop-types */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

export function ArtistsCard({ video, title, description }) {
  const containerRef = useRef();
  gsap.registerPlugin(ScrollTrigger);
  const matchMediaCard = gsap.matchMedia();
  const desktopTl = gsap.timeline({
    defaults: { ease: "power2.out" },
    paused: true,
  });
  const mobileTl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 50%",
      end: "50% top",
      toggleActions: "play reverse play reverse",
    },
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

          const titulo = containerRef.current.querySelector("h3");
          const parrafo = containerRef.current.querySelector("p");
          const fade = containerRef.current.querySelector(".fade");

          if (isDesktop) return;

          mobileTl
            .from(titulo, {
              y: 100,
              opacity: 0,
              duration: 0.5,
            })
            .from(
              parrafo,
              {
                y: 100,
                opacity: 0,
                duration: 0.5,
              },
              "-=0.3"
            )
            .to(
              fade,
              {
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
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
            .to(fade, {
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0) 100%)",
              duration: 0.5,
            })
            .fromTo(
              titulo,
              {
                y: 10,
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
      <div className="fade absolute bottom-0 left-0 h-full w-full"></div>
      <div className="absolute p-4 top-0 flex flex-col justify-end lg:justify-start gap-4 h-full">
        <h3 className="text-4xl lg:text-6xl font-semibold text-txt-100 lg:opacity-0">
          {title}
        </h3>
        <p className="text-txt-100 text-xl lg:text-xl leading-normal lg:opacity-0">
          {description}
        </p>
      </div>
    </div>
  );
}
