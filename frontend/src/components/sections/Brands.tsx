import { useEffect, useRef } from "react";
import { brandLogos } from "@/data/site";

export function Brands() {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const targetSpeedRef = useRef(0.45);
  const currentSpeedRef = useRef(0.45);
  const previousScrollY = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY.current;

      if (delta > 0) {
        // Scroll down → Left to Right
        targetSpeedRef.current = 0.8;
      } else if (delta < 0) {
        // Scroll up → Right to Left
        targetSpeedRef.current = -0.8;
      }

      previousScrollY.current = currentScrollY;
    };

    const animate = () => {
      // Smoothly change direction
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * 0.08;

      positionRef.current += currentSpeedRef.current;

      const track = trackRef.current;

      if (track) {
        const halfWidth = track.scrollWidth / 2;

        if (positionRef.current >= halfWidth) {
          positionRef.current -= halfWidth;
        }

        if (positionRef.current <= -halfWidth) {
          positionRef.current += halfWidth;
        }

        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    previousScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const logos = [...brandLogos, ...brandLogos];

  return (
    <section className="-mb-5 overflow-hidden bg-[#ffffff] px-3 py-2 sm:px-5 sm:py-3 lg:px-8">
      <div className="mx-auto max-w-[1500px] overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 sm:gap-8 lg:gap-10 will-change-transform"
        >
          {logos.map(({ src, name }, index) => (
            <div
              key={`${name}-${index}`}
              className="flex h-[38px] w-[100px] shrink-0 items-center justify-center opacity-75 transition-opacity duration-200 hover:opacity-100 sm:h-[42px] sm:w-[120px] lg:h-[46px] lg:w-[140px]"
            >
              <img
                src={src}
                alt={name}
                className="max-h-[65%] max-w-[85%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
