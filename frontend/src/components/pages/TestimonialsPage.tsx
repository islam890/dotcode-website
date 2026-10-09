import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials as publishedTestimonials, type Testimonial } from "@/data/testimonials";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/Hero";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function ClientIdentity({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {testimonial.avatar_url ? (
        <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#A3E635] font-sora text-xs font-bold text-black">
          <span aria-hidden="true">{getInitials(testimonial.client_name)}</span>
          <img
            src={testimonial.avatar_url}
            alt={testimonial.client_name}
            width="44"
            height="44"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : (
        <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#A3E635] font-sora text-xs font-bold text-black">
          {getInitials(testimonial.client_name)}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate font-sora text-sm font-semibold tracking-[-0.025em] text-current">{testimonial.client_name}</p>
        {(testimonial.client_role || testimonial.company_name) && (
          <p className="mt-1 truncate font-inter text-[10px] leading-[1.4] text-current/55 sm:text-xs">
            {[testimonial.client_role, testimonial.company_name].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const targetSpeedRef = useRef(-0.45);
  const currentSpeedRef = useRef(-0.45);
  const previousScrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    if (!track || reduceMotion) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollYRef.current;
      if (delta > 0) targetSpeedRef.current = -0.8;
      if (delta < 0) targetSpeedRef.current = 0.8;
      previousScrollYRef.current = currentScrollY;
    };

    const animate = () => {
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.08;
      positionRef.current += currentSpeedRef.current;
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (positionRef.current >= halfWidth) positionRef.current -= halfWidth;
        if (positionRef.current <= -halfWidth) positionRef.current += halfWidth;
      }
      track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    previousScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, [testimonials]);

  return (
    <div className="overflow-hidden py-2">
      <div ref={trackRef} className="flex w-max items-stretch gap-4 will-change-transform sm:gap-6">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <article key={`${testimonial.id}-${index}`} className="flex w-[min(82vw,480px)] shrink-0 flex-col justify-between border border-black/10 bg-[#f7f7f7] p-6 sm:min-h-[300px] sm:p-8 lg:p-10">
            <div>
              <div className="mb-7 flex items-start justify-between gap-4">
                <span aria-hidden="true" className="font-sora text-5xl leading-[0.7] tracking-[-0.08em] text-[#455CE9]">&ldquo;</span>
              </div>
              <blockquote className="font-sora text-[clamp(1.15rem,2.3vw,1.65rem)] font-medium leading-[1.22] tracking-[-0.045em] text-black">{testimonial.content}</blockquote>
            </div>
            <div className="mt-8 border-t border-black/10 pt-5"><ClientIdentity testimonial={testimonial} /></div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsPage() {
  const testimonials = publishedTestimonials.filter((testimonial) => testimonial.published);

  usePageMetadata(
    "Testimonials | DotCode",
    "Client feedback and experiences from projects built with DotCode.",
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <main className="relative z-10 w-full bg-white text-black">
        <PageHero>
          <Header />
          <div className="relative mx-auto flex min-h-[64svh] w-full max-w-[1508px] flex-col justify-between gap-12 px-4 pb-8 pt-10 sm:min-h-[72svh] sm:px-8 sm:pb-12 sm:pt-14 lg:px-10 lg:pt-16">
            <div className="flex items-center gap-3 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 sm:text-xs"><span className="size-2 rounded-full bg-[#b7ff3c]" /><span>DotCode / Client voices</span></div>
            <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
              <div>
                <p data-anim="hero-head" className="mb-4 font-sora text-sm font-medium uppercase tracking-[0.14em] text-[#b7ff3c] sm:text-base">Testimonials /</p>
                <h1 data-anim="hero-head" data-hero-title className="font-sora text-[clamp(3.25rem,14vw,10rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-white sm:text-[clamp(5.5rem,11vw,9.5rem)]">CLIENT<br /><span className="text-white/60">VOICES.</span></h1>
              </div>
              <div className="flex flex-col items-start gap-7 pb-1 lg:pb-3">
                <p data-anim="hero-copy" className="max-w-[430px] font-sora text-[clamp(1.45rem,3.5vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.055em]">A better product starts with people working well together.</p>
                <p data-anim="hero-copy" className="max-w-[390px] font-inter text-sm leading-[1.6] text-white/70 sm:text-base">Perspectives from the people who have worked with DotCode to bring an idea to life.</p>
                <a data-anim="hero-cta" href="#client-voices" className="group flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:text-[#b7ff3c] sm:text-xs"><span>Hear their stories</span><span className="flex size-9 items-center justify-center rounded-full border border-white/35 transition-all duration-300 group-hover:border-[#b7ff3c] group-hover:bg-[#b7ff3c] group-hover:text-black"><ArrowDown className="size-4" aria-hidden="true" /></span></a>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/25 pt-4 font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]"><span>Good work is shared work</span><span>People / Product / Progress</span></div>
          </div>
        </PageHero>
        <section className="bg-white px-4 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
          <div data-reveal className="mx-auto grid max-w-[1350px] gap-10 md:grid-cols-[.42fr_1fr] md:gap-16 lg:gap-24">
            <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/55">01 / A shared effort</p>
            <div>
              <h2 className="max-w-[930px] font-sora text-[clamp(2.1rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-black">Good products are built <span className="text-[#2563EB]">together.</span></h2>
              <div className="mt-9 flex flex-col gap-6 border-t border-black/15 pt-5 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[510px] font-inter text-sm leading-[1.7] text-black/65 sm:text-base">Every project is a collaboration. These words reflect the people, trust and shared thinking behind the work.</p>
                <p className="max-w-[240px] font-sora text-xs font-medium uppercase leading-[1.55] tracking-[0.08em] text-black/50">Listen well / Make together / Keep improving</p>
              </div>
            </div>
          </div>
        </section>

        <section id="client-voices" className="bg-white px-4 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-10 flex flex-col justify-between gap-5 border-b border-black/15 pb-6 sm:mb-14 sm:flex-row sm:items-end">
              <div><p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/55">02 / In their words</p><h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em]">Made together.</h2></div>
              <p className="max-w-[330px] font-inter text-sm leading-relaxed text-black/60">Honest feedback from people we&rsquo;ve had the pleasure of working with.</p>
            </div>

            {testimonials.length > 0 ? (
              <TestimonialMarquee testimonials={testimonials} />
            ) : (
              <div className="border-y border-black/15 py-14 text-center sm:py-20">
                <p className="font-sora text-[clamp(1.8rem,5vw,3.2rem)] font-semibold tracking-[-0.06em]">No testimonials yet.</p>
                <p className="mx-auto mt-3 max-w-[420px] font-inter text-sm leading-relaxed text-black/60">We&rsquo;ll share client feedback here when it&rsquo;s ready.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
