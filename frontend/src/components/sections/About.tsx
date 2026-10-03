import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChartPie, Lightbulb } from "lucide-react";
import { images } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = aboutTextRef.current;
    const stats = statsRef.current;

    if (!text || !stats) return;

    const ctx = gsap.context(() => {
      // About statement: grey → black on scroll
      gsap.to("[data-about-text]", {
        color: "#000000",
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      });

      // Animated counters
      const counters = stats.querySelectorAll<HTMLElement>("[data-counter]");

      counters.forEach((counter) => {
        const target = Number(counter.dataset.counter);
        const suffix = counter.dataset.suffix ?? "";
        const prefix = counter.dataset.prefix ?? "";
        const decimals = Number(counter.dataset.decimals ?? 0);

        const value = { current: 0 };

        gsap.to(value, {
          current: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            const currentValue =
              decimals > 0
                ? value.current.toFixed(decimals)
                : Math.round(value.current).toLocaleString("en-US");

            counter.textContent = `${prefix}${currentValue}${suffix}`;
          },
        });
      });
    }, stats);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="bg-[#ffffff] px-4 py-10 sm:px-8 lg:px-10 lg:py-16"
    >
      <div
        ref={statsRef}
        className="mx-auto flex max-w-[1494px] flex-col items-center gap-22 sm:gap-18"
      >
        {/* ABOUT INTRO */}
        <div
          data-reveal
          className="flex w-full max-w-[832px] flex-col items-center gap-4 text-center sm:gap-6"
        >
          <p className="font-sora text-[14px] font-medium capitalize tracking-[0.08em] text-black/70 sm:text-[16px] md:text-[18px]">
            About us /
          </p>

          <div
            ref={aboutTextRef}
            className="flex w-full flex-col items-center gap-3 sm:gap-[14px]"
          >
            <h2
              data-about-text
              className="w-full max-w-full text-balance font-sora text-[clamp(1.9rem,5.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-[#6b7280] sm:text-[clamp(2.2rem,3vw,3.5rem)] md:text-[46px] lg:text-[52px]"
            >
              A Software &amp; AI agency
            </h2>

            <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 md:gap-x-4">
              <span
                data-about-text
                className="min-w-0 max-w-full text-balance font-sora text-[clamp(1.9rem,5.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-[#6b7280] sm:text-[clamp(2.2rem,3vw,3.5rem)] md:text-[46px] lg:text-[52px]"
              >
                dedicated to building
              </span>

              <span className="inline-flex size-[28px] shrink-0 items-center justify-center rounded-full bg-[#2563eb] sm:size-[32px] md:size-[40px] lg:size-[52px]">
                <ChartPie
                  className="size-[16px] text-black sm:size-[18px] md:size-6 lg:size-7"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>

              <span
                data-about-text
                className="min-w-0 max-w-full text-balance font-sora text-[clamp(1.9rem,5.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-[#6b7280] sm:text-[clamp(2.2rem,3vw,3.5rem)] md:text-[46px] lg:text-[52px]"
              >
                digital
              </span>
            </div>

            <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 md:gap-x-4">
              <span
                data-about-text
                className="min-w-0 max-w-full text-balance font-sora text-[clamp(1.9rem,5.8vw,3.4rem)] font-light leading-[1.06] tracking-[-0.06em] text-[#6b7280] sm:text-[clamp(2.2rem,3vw,3.5rem)] md:text-[46px] lg:text-[52px]"
              >
                solutions that
              </span>

              <span className="inline-flex size-[28px] shrink-0 items-center justify-center rounded-full bg-[#b7ff3c] sm:size-[32px] md:size-[40px] lg:size-[52px]">
                <Lightbulb
                  className="size-[16px] text-black sm:size-[18px] md:size-6 lg:size-7"
                  fill="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>

              <span
                data-about-text
                className="min-w-0 max-w-full text-balance font-sora text-[clamp(1.9rem,5.8vw,3.4rem)] font-light leading-[1.06] tracking-[-0.06em] text-[#6b7280] sm:text-[clamp(2.2rem,3vw,3.5rem)] md:text-[46px] lg:text-[52px]"
              >
                drive growth
              </span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div data-reveal-stagger className="w-full">
          <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:items-stretch md:gap-4 lg:grid-cols-3 lg:gap-5">
            {/* CARD 1 */}
            <div className="relative flex h-full flex-col justify-end pb-4 md:pb-0">
              <div className="relative h-[min(76vw,280px)] w-full rounded-[24px] border border-black/5 bg-[#eef3f9] shadow-[0_20px_40px_rgba(15,23,42,0.05)] sm:h-[320px] md:h-auto md:aspect-[1.28]">
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  <img
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                    src={images.rectangle35}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <img
                  alt=""
                  className="absolute bottom-0 right-0 z-10 h-[150%] object-contain"
                  src={images.image11}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="relative z-10 mx-auto -mt-30 flex w-[92%] flex-col gap-1 rounded-[22px] border border-black/5 bg-white px-4 py-5 shadow-[0_18px_38px_rgba(15,23,42,0.08)] sm:-mt-14 sm:p-5 md:absolute md:bottom-[7%] md:left-[4%] md:mt-0 md:w-[92%]">
                <p
                  data-counter="20"
                  data-suffix=" +"
                  className="font-sora text-[clamp(1.7rem,6vw,2.1rem)] font-bold tracking-[-0.06em] text-black sm:text-[clamp(2rem,5vw,2.5rem)] md:text-[48px]"
                >
                  0 +
                </p>

                <p className="font-inter text-[0.8rem] font-normal leading-[1.2] text-black sm:text-[0.92rem] md:text-[1.1rem]">
                  Digital projects built with modern technologies.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="flex h-full flex-col justify-between rounded-[24px] border border-black/5 bg-[#f2f2f2] p-4 shadow-[0_10px_28px_rgba(15,23,42,0.03)] sm:p-5">
              <div className="flex flex-col gap-3 tracking-[-0.04em] text-black md:gap-4">
                <p className="font-inter text-[0.92rem] font-normal leading-tight text-black/75 sm:text-[1rem] md:text-[1.125rem]">
                  commitment to measurable
                </p>

                <p
                  data-counter="100"
                  data-suffix="%"
                  className="font-sora text-[clamp(2.2rem,7vw,3.2rem)] font-bold md:text-[48px]"
                >
                  0%
                </p>
              </div>

              {/* Smaller + lower avatars */}
              <div className="flex translate-y-2 items-center md:translate-y-3">
                {[
                  images.avatar,
                  images.avatar1,
                  images.avatar2,
                  images.avatar3,
                ].map((avatar, index) => (
                  <div
                    key={`${avatar}-${index}`}
                    className="-mr-1 size-[36px] overflow-hidden rounded-full border-[2px] border-white shadow-[0_8px_16px_rgba(15,23,42,0.08)] sm:size-[30px] md:size-[40px]"
                  >
                    <img
                      alt=""
                      className="size-full object-cover"
                      src={avatar}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}

                <div className="flex size-[36px] items-center justify-center rounded-full border-[2px] border-white bg-[#f9f5ff] text-[#7f56d9] shadow-[0_8px_16px_rgba(127,86,217,0.12)] sm:size-[30px] md:size-[40px]">
                  <span
                    className="font-roboto text-[16px] sm:text-[18px] md:text-[23px]"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    +5
                  </span>
                </div>
              </div>

              <p className="mt-5 font-inter text-[0.85rem] font-normal leading-[1.3] text-black sm:text-[0.92rem] md:text-[1rem]">
                &ldquo;Focused on turning ideas into practical digital
                solutions.&rdquo;
              </p>
            </div>

            {/* CARD 3 */}
            <div className="flex h-full flex-col justify-between gap-6 sm:gap-8 md:col-span-2 md:gap-[9.5%] lg:col-span-1">
              <div className="flex flex-col gap-6 rounded-[24px] bg-[#b7ff3c] p-4 shadow-[0_18px_35px_rgba(163,230,53,0.22)] sm:p-5 md:h-[60.5%] md:justify-between md:gap-3">
                <div className="flex flex-col gap-2 tracking-[-0.04em] text-black">
                  <p className="font-inter text-[0.92rem] font-normal leading-tight text-black/75 sm:text-[1rem] md:text-[1.125rem]">
                    Data Points
                  </p>

                  <p
                    data-counter="230"
                    data-suffix="k +"
                    className="font-sora text-[clamp(2.2rem,7vw,3.2rem)] font-bold md:text-[48px]"
                  >
                    0k +
                  </p>
                </div>

                <p className="font-inter text-[0.85rem] font-normal leading-[1.3] text-black sm:text-[0.92rem] md:text-[1rem]">
                  Digital interactions powered through our solutions.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-[24px] bg-black p-4 text-white shadow-[0_18px_35px_rgba(10,10,10,0.2)] sm:p-5 md:h-[30%]">
                <p className="max-w-[238px] font-inter text-[0.85rem] font-normal leading-[1.25] text-white/90 sm:text-[0.92rem] md:text-[1rem]">
                  Hours invested in<br></br>building and refining<br></br>
                  digital products.
                </p>

                <p
                  data-counter="1200"
                  data-suffix=" +"
                  className="whitespace-nowrap font-sora text-[clamp(1.8rem,6vw,2.5rem)] font-bold tracking-[-0.06em] md:text-[44px]"
                >
                  0 +
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
