import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex h-full w-full min-h-[290px] min-w-0 flex-col justify-between gap-8 overflow-hidden rounded-[28px] border border-black/5 bg-[#f2f2f2] px-4 pb-5 pt-4 shadow-[0_12px_24px_rgba(15,23,42,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:bg-[#f8f8f7] hover:shadow-[0_18px_38px_rgba(15,23,42,0.06)] sm:min-h-[330px] sm:px-5 sm:pb-6 sm:pt-5 md:min-h-[380px] md:gap-12 md:px-6 md:pb-7 md:pt-5">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/80 px-3 py-[10px] font-inter text-[10px] font-bold uppercase tracking-[0.08em] text-black sm:px-4 sm:py-[12px] sm:text-[11px] md:text-[13px]">
          {label}
        </div>
        <div className="flex size-[34px] items-center justify-center rounded-full border border-black transition-transform duration-300 group-hover:translate-x-1 sm:size-[40px] md:size-[44px]">
          <ArrowUpRight
            className="size-5 sm:size-6 md:size-7"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 tracking-[-0.06em] text-black md:gap-6">
        <p className="min-w-0 break-words font-sora text-[clamp(1.9rem,7vw,2.8rem)] font-semibold leading-[1] md:text-[clamp(2.2rem,3vw,3.5rem)] lg:text-[48px]">
          {title}
        </p>
        <p className="min-w-0 break-words font-inter text-[0.92rem] font-normal leading-[1.5] text-black/80 sm:text-[0.97rem] md:text-[1.05rem] lg:text-[1.125rem]">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function Services() {
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const [activeServiceDot, setActiveServiceDot] = useState(0);
  const publishedServices = services.filter((service) => service.published).sort((a, b) => a.order - b.order || a.id - b.id);
  const featuredServices = publishedServices.filter((service) => service.featured);
  const featuredIds = new Set(featuredServices.map((service) => service.id));
  const visibleServices = [
    ...featuredServices,
    ...publishedServices.filter((service) => !featuredIds.has(service.id)),
  ].slice(0, 3);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleServicesScroll = () => {
    const track = servicesTrackRef.current;

    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setActiveServiceDot(maxScroll > 0 && track.scrollLeft >= maxScroll / 2 ? 1 : 0);
  };

  const scrollServicesTo = (page: 0 | 1) => {
    const track = servicesTrackRef.current;

    if (!track) return;

    track.scrollTo({
      left: page === 0 ? 0 : track.scrollWidth - track.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const heading = servicesHeadingRef.current;

    if (!heading) return;

    const ctx = gsap.context(() => {
      gsap.to(heading, {
        color: "#000000",
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      });
    }, heading);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="bg-white px-4 py-10 sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="mx-auto flex max-w-[1508px] flex-col items-center gap-8 sm:gap-10 md:gap-12">
        <div
          data-reveal
          className="flex w-full max-w-[760px] flex-col items-center gap-4 text-center text-black sm:gap-5"
        >
          <p className="font-sora text-[15px] font-medium capitalize tracking-[0.08em] text-black/70 sm:text-[16px] md:text-[18px]">
            Services /
          </p>
          <h2
            ref={servicesHeadingRef}
            className="font-sora text-[clamp(1.9rem,5.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#6b7280] md:text-[clamp(2.3rem,3vw,3.2rem)] lg:text-[48px]"
          >
            Comprehensive consulting and intelligent innovation
          </h2>
        </div>

        <div className="flex w-full flex-col gap-8 sm:gap-10">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <p className="max-w-[500px] font-inter text-[0.92rem] font-normal leading-[1.5] tracking-[-0.02em] text-black/80 sm:text-[1rem] md:text-[1.05rem] lg:text-[1.125rem]">
              Whether you&rsquo;re optimizing today or building for tomorrow we
              help you move faster with confidence.
            </p>
            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-black px-3 py-[9px] font-inter text-[9px]! font-extrabold! uppercase tracking-[0.08em] text-[#b7ff3c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:px-4 sm:py-[11px] sm:text-[10px]! md:text-[11px]!"
            >
              get started
            </button>
          </div>

          <div className="flex w-full flex-col gap-3">
            {visibleServices.length === 0 && <p className="py-8 text-center font-inter text-sm text-black/55">There are no published services yet.</p>}
            {visibleServices.length > 0 && <>
            <div
              ref={servicesTrackRef}
              onScroll={handleServicesScroll}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
            >
              {visibleServices.map((service, index) => (
                <div
                  key={service.id}
                  data-service-slide
                  className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink sm:snap-none"
                >
                  <ServiceCard
                    label={`Service ${String(index + 1).padStart(2, "0")}`}
                    title={service.title}
                    desc={service.short_description}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 pt-1 sm:hidden">
              {(visibleServices.length > 1 ? [0, 1] : [0]).map((page) => (
                <button
                  key={page}
                  type="button"
                  aria-label={page === 0 ? "Show first services" : "Show more services"}
                  aria-current={activeServiceDot === page ? "true" : undefined}
                  onClick={() => scrollServicesTo(page as 0 | 1)}
                  className={`h-2 rounded-full transition-all duration-300 ease-out ${
                    activeServiceDot === page
                      ? "w-5 bg-black"
                      : "w-2 bg-black/25 hover:bg-black/50"
                  }`}
                />
              ))}
            </div>
            </>}
          </div>

          <div className="flex flex-row flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
            <p className="font-sora text-[12px] font-normal text-black/60 sm:text-[14px]">
              We have more services
            </p>
            <a
              href="/services#service-list"
              className="group inline-flex items-center gap-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <span
                className="flex items-center justify-center rounded-full bg-black px-2.5 py-[8px] font-inter text-[8px]! font-extrabold! uppercase tracking-[0.08em] text-white transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#111827] sm:px-3 sm:py-[10px] sm:text-[9px]! md:text-[10px]!"
              >
                see all our services
              </span>
              <div className="flex size-[30px] items-center justify-center rounded-full bg-black text-white transition-transform duration-200 group-hover:-translate-y-0.5 sm:size-[34px] md:size-[38px]">
                <ArrowUpRight
                  className="size-5 sm:size-[22px] md:size-6"
                  aria-hidden="true"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
