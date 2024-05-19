import gsap from "gsap";
import { video1, video2, video3 } from "../assets/videos";
import { ArtistsCard } from "./Cards/ArtistCard";
import { ArtistsText } from "./texts";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export function Artists() {
  const containerRef = useRef();
  const matchMedia = gsap.matchMedia();

  useGSAP(
    () => {
      matchMedia.add(
        {
          isDesktop: `(min-width: ${1024}px)`,
          isMobile: `(max-width: ${1024 - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isDesktop } = context.conditions;

          if (isDesktop) {
            gsap.set("video", {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            });
            gsap
              .to("video", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                stagger: 0.2,
                scrollTrigger: {
                  trigger: "video",
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions: "play reverse play reverse",
                },
              })
          }
        }
      );
    },
    { scope: containerRef }
  );
  return (
    <div className="w-full min-h-screen relative mt-10 md:mt-40">
      <ArtistsText />
      <div ref={containerRef} className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 lg:p-10">
        <ArtistsCard
          video={video1}
          title="Dueto Brenda & Pablo"
          description="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
        />
        <ArtistsCard
          video={video2}
          title="Payaso Manzanitas"
          description="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametl amet lorem ipsum dolor" />
        <ArtistsCard
          video={video3}
          title="Sonido Descalabrado"
          description="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
        />
      </div>
    </div>
  );
}
