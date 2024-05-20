import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function LocationCard() {
  const containerRef = useRef();

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.to(".reveal-children", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1.5,
        stagger: 0.3,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".reveal-children",
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
    <div
      ref={containerRef}
      className="relative  overflow-hidden h-[calc(100svh-100px)]"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8622.4581621837!2d-99.65740672057194!3d19.29062136095748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89ea33402ba5%3A0x19fcd4be3a072f99!2sCosmovitral!5e0!3m2!1sen!2smx!4v1716159154036!5m2!1sen!2smx"
        width="600"
        height="450"
        loading="lazy"
        className="w-full h-full grayscale contrast-[83%] invert-[92%] focus:border-0 border-0"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute w-full h-full top-0 flex">
        <div id="child1" className="reveal-children bg-100 w-full h-full"></div>
        <div className="reveal-children bg-100 w-full h-full"></div>
        <div className="reveal-children bg-100 w-full h-full"></div>
      </div>
    </div>
  );
}
