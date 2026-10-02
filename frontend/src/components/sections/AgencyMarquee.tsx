import { useEffect, useRef } from "react";

const agencyLabel = "SOFTWARE & AI AGENCY";
const COPY_COUNT = 24;

export function AgencyMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef(0);
  const loopDistanceRef = useRef(1);

  const targetSpeedRef = useRef(3);
  const currentSpeedRef = useRef(3);

  const previousScrollY = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measureLoop = () => {
      const track = trackRef.current;

      if (!track || track.children.length < 2) {
        return;
      }

      const first = track.children[0] as HTMLElement;
      const second = track.children[1] as HTMLElement;

      const distance = second.offsetLeft - first.offsetLeft;

      if (distance > 0) {
        loopDistanceRef.current = distance;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY.current;

      if (delta > 0) {
        // Scroll DOWN → LEFT → RIGHT
        const boost = Math.min(Math.abs(delta) * 0.35, 5);

        targetSpeedRef.current = 3 + boost;
      } else if (delta < 0) {
        // Scroll UP → RIGHT → LEFT
        const boost = Math.min(Math.abs(delta) * 0.35, 5);

        targetSpeedRef.current = -(3 + boost);
      }

      previousScrollY.current = currentScrollY;
    };

    const animate = () => {
      const loopDistance = loopDistanceRef.current;

      /*
       * Smoothly approach the desired speed.
       */
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * 0.1;

      /*
       * Move continuously.
       */
      positionRef.current += currentSpeedRef.current;

      /*
       * Seamless infinite loop.
       *
       * Positive speed:
       * LEFT → RIGHT
       *
       * Negative speed:
       * RIGHT → LEFT
       */
      if (loopDistance > 0) {
        while (positionRef.current >= 0) {
          positionRef.current -= loopDistance;
        }

        while (positionRef.current <= -loopDistance) {
          positionRef.current += loopDistance;
        }
      }

      const track = trackRef.current;

      if (track) {
        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (motionPreference.matches || animationFrameRef.current !== null) return;
      previousScrollY.current = window.scrollY;
      animationFrameRef.current = requestAnimationFrame(animate);
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    const stopAnimation = () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        stopAnimation();
      } else {
        measureLoop();
        startAnimation();
      }
    };

    previousScrollY.current = window.scrollY;

    measureLoop();

    const resizeObserver = new ResizeObserver(() => {
      measureLoop();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    startAnimation();
    motionPreference.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      stopAnimation();
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section
        aria-label="Agency marquee"
        className="overflow-hidden bg-white py-4 sm:py-5 md:py-6"
      >
        <div className="w-full overflow-hidden">
          <div
            ref={trackRef}
            data-marquee-track
            className="flex w-max items-center whitespace-nowrap will-change-transform"
          >
            {Array.from(
              { length: COPY_COUNT },
              (_, index) => (
                <div
                  key={index}
                  aria-hidden={index > 0}
                  className="shrink-0 pr-10 sm:pr-14 md:pr-20"
                >
                  <span className="font-sora text-[clamp(2rem,7vw,6rem)] font-semibold leading-none tracking-[-0.06em] text-[#9a9a9a]">
                    {agencyLabel}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
