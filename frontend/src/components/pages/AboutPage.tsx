import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/Hero";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const principles = [
  {
    number: "01",
    title: "Start with purpose",
    copy: "The best products begin with a real need. We take time to understand who it serves and why it matters.",
  },
  {
    number: "02",
    title: "Make it clear",
    copy: "Simplicity takes thought. We make complex technology easier to understand, use and trust.",
  },
  {
    number: "03",
    title: "Care about the details",
    copy: "Every interaction adds up. We sweat the small things that make a digital product feel considered.",
  },
  {
    number: "04",
    title: "Keep moving forward",
    copy: "Good work is a shared process. We stay curious, communicate openly and keep making the product better.",
  },
] as const;

const approach = [
  {
    number: "01",
    title: "Listen closely",
    copy: "We begin with your goals, your users and the challenge behind the idea.",
  },
  {
    number: "02",
    title: "Make with intent",
    copy: "We bring design and engineering together around a clear product direction.",
  },
  {
    number: "03",
    title: "Stay in it together",
    copy: "We share progress, make decisions together and refine the work as it grows.",
  },
] as const;

export function AboutPage() {
  usePageMetadata(
    "About Us | DotCode",
    "DotCode is a software and AI agency building thoughtful digital products, websites and applications from idea to launch.",
  );

  return (
    <>
      <main className="relative z-10 w-full bg-white">
      <PageHero>
        <Header />
        <div className="relative mx-auto flex min-h-[62svh] w-full max-w-[1508px] flex-col justify-between gap-12 px-4 pb-8 pt-14 sm:min-h-[68svh] sm:px-8 sm:pb-12 sm:pt-20 lg:px-10 lg:pt-16">
          <div className="flex items-center gap-4 font-inter text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60 sm:text-xs">
            <span>About us</span><span aria-hidden="true" className="h-px flex-1 bg-white/25" />
          </div>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <p data-anim="hero-head" className="mb-4 font-sora text-sm font-medium uppercase tracking-[0.14em] text-[#b7ff3c] sm:text-base">People · Products · Purpose</p>
              <h1 data-anim="hero-head" data-hero-title className="font-sora text-[clamp(3.6rem,12vw,9rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-white">Who we are<span className="text-[#b7ff3c]">.</span></h1>
            </div>
            <div className="flex flex-col items-start gap-7 md:col-span-4 md:pb-2">
              <p data-anim="hero-copy" data-about-hero-copy className="max-w-[460px] font-sora text-[clamp(1.45rem,3.5vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.055em] text-white">We build digital products that move ideas forward.</p>
              <p data-anim="hero-copy" className="max-w-[390px] font-inter text-sm leading-[1.65] text-white/75 sm:text-base">Software, design and AI — brought together to make useful things for people and businesses.</p>
              <a data-anim="hero-cta" href="#who-we-are" className="group flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#b7ff3c] sm:text-xs"><span>Get to know us</span><span className="flex size-9 items-center justify-center rounded-full border border-white/35 transition-all duration-300 group-hover:border-[#b7ff3c] group-hover:bg-[#b7ff3c] group-hover:text-black"><ArrowDown className="size-4" aria-hidden="true" /></span></a>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/25 pt-4 font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]">
            <span>Software &amp; AI agency</span><span>Idea ? Product ? Impact</span>
          </div>
        </div>
      </PageHero>
        <section
          id="who-we-are"
          className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
        >
          <div
            data-reveal
            className="mx-auto grid max-w-[1350px] gap-10 md:grid-cols-[.42fr_1fr] md:gap-16 lg:gap-24"
          >
            <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/55">
              01 / Who we are
            </p>
            <div>
              <h2 className="max-w-[950px] font-sora text-[clamp(2.1rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-black">
                A software &amp; AI agency for people with something to build.
              </h2>
              <div className="mt-9 flex flex-col gap-6 border-t border-black/15 pt-5 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[510px] font-inter text-sm leading-[1.7] text-black/65 sm:text-base">
                  We partner with businesses, startups and ambitious teams to
                  turn ideas into digital products — from websites and
                  applications to SaaS, AI-powered tools and custom software.
                </p>
                <p className="max-w-[250px] font-sora text-xs font-medium uppercase leading-[1.55] tracking-[0.08em] text-black/50">
                  Thoughtful design / Modern technology / Real-world impact
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white px-4 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-12 grid gap-8 md:grid-cols-[.55fr_1fr] md:items-end sm:mb-16">
              <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/55">
                02 / What we make possible
              </p>
              <h2 className="max-w-[850px] font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.065em]">
                We don&rsquo;t stop at the idea. We make it useful.
              </h2>
            </div>

            <div className="relative border-y border-black/15 py-8 sm:py-12">
              <div
                aria-hidden="true"
                className="absolute left-[7%] right-[7%] top-1/2 hidden h-px -translate-y-1/2 bg-black/15 lg:block"
              />
              <div data-reveal-stagger className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
                {[
                  { title: "IDEA", detail: "A real need worth solving.", accent: "text-black" },
                  { title: "PRODUCT", detail: "A clear, usable experience.", accent: "text-[#2563EB]" },
                  { title: "IMPACT", detail: "A better way forward.", accent: "text-black" },
                ].map((stage, index) => (
                  <div
                    key={stage.title}
                    className={`relative grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 bg-white lg:flex lg:flex-col lg:items-start lg:gap-4 ${index === 1 ? "lg:mx-auto" : ""}`}
                  >
                    <span className={`min-w-0 font-sora text-[clamp(2.7rem,8vw,6.5rem)] font-semibold lg:text-[clamp(2.5rem,4vw,5rem)] leading-[0.9] tracking-[-0.075em] ${stage.accent}`}>
                      {stage.title}
                    </span>
                    <span className="max-w-[190px] font-inter text-xs leading-[1.5] text-black/55 sm:text-sm">
                      {stage.detail}
                    </span>
                    {index < 2 && (
                      <ArrowRight
                        className="col-start-2 row-span-2 row-start-1 size-5 shrink-0 text-[#A3E635] lg:absolute lg:-right-3 lg:top-1/2 lg:-translate-y-1/2"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p data-reveal className="mt-6 max-w-[520px] font-inter text-xs leading-relaxed text-black/55 sm:mt-8 sm:text-sm">
              We bring the right thinking and technology to every step, so the
              finished product answers the need it was made for.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-10 flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:mb-14 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">
                  03 / What we believe
                </p>
                <h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em] text-black">
                  Good work starts here.
                </h2>
              </div>
              <p className="max-w-[330px] font-inter text-sm leading-relaxed text-black/55">
                A few principles guide how we think, make and work together.
              </p>
            </div>
            <div data-reveal-stagger>
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="group grid gap-3 border-b border-black/10 py-6 transition-colors duration-300 hover:border-[#455CE9] sm:grid-cols-[64px_1fr_1fr] sm:items-start sm:gap-6 sm:py-8 lg:grid-cols-[90px_1fr_1fr] lg:gap-10"
                >
                  <span className="font-mono text-[10px] text-black/30 transition-colors group-hover:text-[#455CE9]">
                    {principle.number}
                  </span>
                  <h3 className="font-sora text-[clamp(1.55rem,3.6vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-black transition-transform duration-300 group-hover:translate-x-1">
                    {principle.title}
                  </h3>
                  <p className="max-w-[440px] font-inter text-[13px] leading-[1.6] text-black/55 sm:text-sm">
                    {principle.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-12 grid gap-6 border-b border-black/10 pb-6 md:grid-cols-[.7fr_1.3fr] md:items-end sm:mb-16">
              <div>
                <p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">
                  04 / How we work
                </p>
                <h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em] text-black">
                  A good process feels human.
                </h2>
              </div>
              <p className="max-w-[390px] font-inter text-sm leading-[1.65] text-black/55 md:justify-self-end">
                Clear communication and close collaboration make better work.
                We make room for both from the first conversation onward.
              </p>
            </div>
            <div data-reveal-stagger className="grid border-t border-black/10 md:grid-cols-3">
              {approach.map((item) => (
                <article
                  key={item.number}
                  className="group border-b border-black/10 py-7 md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <span className="font-inter text-[10px] font-semibold text-[#455CE9]">
                    {item.number}
                  </span>
                  <h3 className="mt-6 font-sora text-[clamp(1.4rem,3vw,2.15rem)] font-semibold tracking-[-0.055em] text-black transition-transform duration-300 group-hover:translate-x-1 md:mt-10">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[300px] font-inter text-xs leading-[1.65] text-black/60 sm:text-[13px]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div data-reveal className="mx-auto max-w-[1350px] border-y border-black/10 py-8 sm:py-12">
            <p className="mb-5 font-inter text-[10px] font-bold uppercase tracking-[0.15em] text-black/45 sm:text-xs">
              The DotCode point of view
            </p>
            <h2 className="font-sora text-[clamp(3rem,11vw,9.5rem)] font-semibold leading-[0.82] tracking-[-0.085em] text-black">
              FROM IDEA
              <br />
              <span className="text-[#2563EB]">TO PRODUCT.</span>
            </h2>
            <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4 font-inter text-[9px] font-semibold uppercase tracking-[0.14em] text-black/45 sm:mt-12 sm:text-[10px]">
              <span>Thought through. Built with purpose.</span>
              <span aria-hidden="true" className="hidden size-9 items-center justify-center rounded-full border border-black/25 sm:flex">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

