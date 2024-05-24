import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from "split-type";

export function LocationText() {
  const containerRef = useRef();

  useGSAP(
    () => {
      // Your animations here
      const text = new SplitType("h2.location");
      gsap.from(text.chars, {
        x: -100,
        opacity: 0,
        stagger: 0.03,
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

  const copyDirection = async () => {
    const text = "Calle 123, Ciudad, Pais";
    try {
      if (navigator.clipboard) {
        // Use the modern clipboard API if it's available
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback to a more widely supported method if clipboard API is not available
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      console.log("Texto copiado al portapapeles");
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative p-4 md:p-10 my-5 md:my-0 overflow-hidden"
    >
      <h2 className="location text-4xl md:text-6xl font-semibold text-txt-100">
        Aqui te esperamos, no faltes.
      </h2>
      <button
        className="text-txt-200 cursor-pointer underline select-none hover:text-primary-200 active:text-primary-300"
        onClick={copyDirection}
      >
        copiar direccion
      </button>
    </div>
  );
}
