import { useEffect } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/Hero";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const serviceTagsBySlug: Record<string, string[]> = {
  "web-development": ["Websites", "Web apps", "E-commerce"],
  "mobile-applications": ["iOS & Android", "React Native", "API integration"],
  "saas-digital-products": ["Product architecture", "Platforms", "Payments"],
  "ai-solutions": ["AI integrations", "Automation", "Workflows"],
  "ui-ux-product-design": ["Product thinking", "User journeys", "Interfaces"],
  "custom-software": ["Integrations", "Internal tools", "Scalable systems"],
};

const capabilities = [
  {
    number: "01",
    title: "Digital experiences",
    items: ["Corporate websites", "Landing pages", "Web applications", "E-commerce & CMS"],
  },
  {
    number: "02",
    title: "Mobile products",
    items: ["Cross-platform apps", "iOS & Android", "App interfaces", "API integration"],
  },
  {
    number: "03",
    title: "Product foundations",
    items: ["Product architecture", "Authentication", "Dashboards & payments", "Connected APIs"],
  },
  {
    number: "04",
    title: "Intelligent systems",
    items: ["AI-powered features", "Workflow automation", "AI integrations", "Data-driven tools"],
  },
] as const;

const process = [
  { number: "01", title: "Discover", copy: "We get close to the idea, its people and the problem worth solving." },
  { number: "02", title: "Define", copy: "We turn what we learn into a focused plan and a shared direction." },
  { number: "03", title: "Design", copy: "We shape the experience and details before the product takes form." },
  { number: "04", title: "Build", copy: "We develop, test and refine the product in close collaboration." },
  { number: "05", title: "Launch", copy: "We help bring it to the world and prepare it for what comes next." },
] as const;

export function ServicesPage() {
  const publishedServices = services
    .filter((service) => service.published)
    .sort((a, b) => a.order - b.order || a.id - b.id);

  usePageMetadata(
    "Services | DotCode",
    "Explore DotCode's web, mobile, SaaS, software and AI services, from product strategy and design through development and launch.",
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <main className="relative z-10 w-full bg-white">
        <PageHero>
          <Header />
          <div data-hero-layout className="mx-auto flex min-h-[62svh] w-full max-w-[1508px] flex-col justify-between gap-12 px-4 pb-8 pt-14 sm:min-h-[68svh] sm:px-8 sm:pb-12 sm:pt-20 lg:px-10 lg:pt-16">
            <div className="flex items-center gap-4 font-inter text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60 sm:text-xs">
              <span>Services</span><span aria-hidden="true" className="h-px flex-1 bg-white/25" />
            </div>
            <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-8">
                <p data-anim="hero-head" className="mb-4 font-sora text-sm font-medium uppercase tracking-[0.14em] text-[#b7ff3c] sm:text-base">Software · Design · AI</p>
                <h1 data-anim="hero-head" data-hero-title className="max-w-[900px] font-sora text-[clamp(3.2rem,10vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-white">What we do<span className="text-[#b7ff3c]">.</span></h1>
              </div>
              <div className="flex flex-col items-start gap-7 md:col-span-4 md:pb-2">
                <p data-anim="hero-copy" data-hero-copy className="max-w-[410px] font-inter text-sm leading-[1.65] text-white/85 sm:text-base">We build useful digital products — from websites and applications to SaaS platforms, AI solutions and custom software.</p>
                <a data-anim="hero-cta" href="#service-list" className="group flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#b7ff3c] sm:text-xs"><span>Explore our services</span><span className="flex size-9 items-center justify-center rounded-full border border-white/35 transition-all duration-300 group-hover:border-[#b7ff3c] group-hover:bg-[#b7ff3c] group-hover:text-black"><ArrowDown className="size-4" aria-hidden="true" /></span></a>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/25 pt-4 font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]">
              <span>From idea to product</span><span>DotCode / Services</span>
            </div>
          </div>
        </PageHero>

        <section className="bg-white px-4 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-24 lg:px-10 lg:pb-12 lg:pt-28">
          <div data-reveal className="mx-auto grid max-w-[1350px] gap-10 md:grid-cols-[.42fr_1fr] md:gap-16 lg:gap-24">
              <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/45">01 / The bigger picture</p>
            <div>
              <h2 className="max-w-[920px] font-sora text-[clamp(2rem,6.1vw,5rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-black">We make technology work for <span className="text-[#2563EB]">people</span>, ideas and the businesses behind them.</h2>
              <div className="mt-9 flex flex-col gap-6 border-t border-black/15 pt-5 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[430px] font-inter text-sm leading-[1.65] text-black/65 sm:text-base">From a first website to a complete software product, we bring design and development together to make digital ideas real.</p>
                <p className="max-w-[270px] font-sora text-xs font-medium uppercase leading-[1.55] tracking-[0.08em] text-black/50">Websites / Applications / SaaS / AI</p>
              </div>
            </div>
          </div>
        </section>

        <section id="service-list" className="bg-white px-4 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-12 lg:px-10 lg:pb-36 lg:pt-14">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-10 grid grid-cols-1 gap-6 border-b border-black/10 pb-6 sm:mb-14 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8"><p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">02 / What we do</p><h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em]">Made for what&rsquo;s next.</h2></div>
              <p className="max-w-[330px] font-inter text-sm leading-relaxed text-black/55 md:col-span-4 md:justify-self-end">A close-knit team for the full journey, from the first conversation to a product people rely on.</p>
            </div>
            <div id="service-offerings" data-reveal-stagger className="border-t border-black/10">
              {publishedServices.length === 0 && <p className="border-b border-black/10 py-8 font-inter text-sm text-black/55">There are no published services yet.</p>}
              {publishedServices.map((service, index) => (
                <article key={service.id} className="group relative grid grid-cols-12 items-center gap-4 border-b border-black/10 px-1 py-7 transition-colors duration-300 sm:gap-5 sm:py-9 md:py-10">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/[0.018] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative col-span-1 font-mono text-[10px] text-black/30 transition-colors group-hover:text-[#455CE9]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="relative col-span-9 font-sora text-[clamp(1.45rem,4vw,2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-black transition-transform duration-300 group-hover:translate-x-0.5 md:col-span-4"><a href={`/services/${encodeURIComponent(service.slug)}`} className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#455CE9]">{service.title}</a></h3>
                  <p className="relative col-span-9 col-start-2 font-inter text-[13px] leading-[1.55] text-black/55 sm:text-sm md:col-span-4 md:col-start-6">{service.description}</p>
                  <div className="relative col-span-9 col-start-2 flex flex-wrap gap-x-4 gap-y-1.5 md:col-span-2 md:col-start-10 md:gap-x-3">{(serviceTagsBySlug[service.slug] ?? []).map((tag) => <span key={tag} className="font-inter text-[9px] font-semibold uppercase tracking-[0.1em] text-black/35 sm:text-[10px]">{tag}</span>)}</div>
                  <a href="https://wa.me/213656264776" target="_blank" rel="noreferrer" aria-label={`Ask about ${service.title} on WhatsApp`} className="group/arrow relative col-span-2 col-start-11 row-start-1 flex size-9 shrink-0 justify-self-end items-center justify-center rounded-full border border-black/10 text-black/55 transition-colors duration-300 hover:border-[#455CE9] hover:bg-[#455CE9] hover:text-white group-hover:border-[#455CE9] group-hover:bg-[#455CE9] group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#455CE9] md:col-span-1 md:col-start-12">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </article>
              ))}
              <div className="h-px w-full bg-black/10" />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-10 grid gap-6 border-b border-black/10 pb-6 md:grid-cols-12 md:items-end sm:mb-12">
              <div className="md:col-span-8"><p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">03 / What it takes</p><h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em] text-black">The right pieces, working together.</h2></div>
              <p className="max-w-[390px] font-inter text-sm leading-[1.65] text-black/55 md:col-span-4 md:justify-self-end">Good products connect thoughtful experiences, sturdy foundations and useful intelligence.</p>
            </div>
            <div id="capability-list" data-reveal-stagger>
              {capabilities.map((item) => <article key={item.number} className="group relative grid grid-cols-12 items-start gap-x-3 gap-y-4 border-b border-black/10 py-6 sm:gap-x-5 sm:py-8 md:items-center">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/[0.018] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative col-span-1 pt-1 font-mono text-[10px] text-black/30 transition-colors group-hover:text-[#455CE9]">{item.number}</span>
                <h3 className="relative col-span-9 font-sora text-[clamp(1.35rem,3vw,2rem)] font-semibold tracking-[-0.05em] text-black md:col-span-4">{item.title}</h3>
                <ul className="relative col-span-9 col-start-2 flex flex-wrap gap-x-4 gap-y-2 md:col-span-6 md:col-start-6 md:gap-x-6">{item.items.map((detail) => <li key={detail} className="font-inter text-[10px] uppercase tracking-[0.12em] text-black/40 sm:text-[11px]">{detail}</li>)}</ul>
                <a href="https://wa.me/213656264776" target="_blank" rel="noreferrer" aria-label={`Ask about ${item.title} on WhatsApp`} className="group/arrow relative col-span-2 col-start-11 row-start-1 flex size-9 shrink-0 justify-self-end items-center justify-center rounded-full border border-black/10 text-black/55 transition-colors duration-300 hover:border-[#455CE9] hover:bg-[#455CE9] hover:text-white group-hover:border-[#455CE9] group-hover:bg-[#455CE9] group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#455CE9] md:col-span-1 md:col-start-12">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </article>)}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1350px]">
            <div data-reveal className="mb-12 flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:mb-16 sm:flex-row sm:items-end"><div><p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">04 / How we work</p><h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em]">A clear path forward.</h2></div><p className="max-w-[325px] font-inter text-sm leading-relaxed text-black/55">Small steps, shared decisions and steady progress from idea to launch.</p></div>
            <div data-reveal-stagger className="grid border-t border-black/15 sm:grid-cols-2 lg:grid-cols-5">
              {process.map((step) => <article key={step.number} className="border-b border-black/15 py-6 sm:px-5 sm:py-7 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"><span className="font-inter text-[10px] font-semibold text-[#455CE9]">{step.number}</span><h3 className="mt-7 font-sora text-2xl font-semibold tracking-[-0.05em] sm:mt-12">{step.title}</h3><p className="mt-3 max-w-[230px] font-inter text-xs leading-[1.6] text-black/60 sm:text-[13px]">{step.copy}</p></article>)}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}




