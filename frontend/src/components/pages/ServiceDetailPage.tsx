import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, RotateCw } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ApiError } from "@/api/client";
import { getServiceBySlug, type Service } from "@/api/services";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/Hero";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type LoadState = "loading" | "ready" | "not-found" | "error";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const [service, setService] = useState<Service | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setService(null);
    setState("loading");

    getServiceBySlug(slug, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setService(result);
        setState("ready");
        window.requestAnimationFrame(() => ScrollTrigger.refresh());
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState(error instanceof ApiError && error.status === 404 ? "not-found" : "error");
      });

    return () => controller.abort();
  }, [slug, retryKey]);

  usePageMetadata(
    service?.title.trim()
      ? `${service.title} | DotCode Services`
      : "Service | DotCode",
    service?.short_description.trim() || "Explore a service offered by DotCode.",
  );

  if (state !== "ready" || !service) {
    const isLoading = state === "loading";
    const title = isLoading
      ? "Loading service…"
      : state === "not-found"
        ? "Service not found."
        : "Services are taking a moment.";

    return (
      <main className="relative z-10 min-h-dvh bg-white">
        <Header />
        <section className="mx-auto max-w-[1457px] px-4 py-24 sm:px-8 lg:px-10">
          <h1 role={isLoading ? "status" : undefined} aria-live={isLoading ? "polite" : undefined} className="font-sora text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-[-0.07em]">
            {title}
          </h1>
          {state === "error" && (
            <button
              type="button"
              onClick={() => setRetryKey((key) => key + 1)}
              className="mt-6 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.12em] text-[#455CE9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#455CE9]"
            >
              <RotateCw className="size-4" aria-hidden="true" /> Try again
            </button>
          )}
          {state !== "loading" && (
            <a href="/services" className="mt-6 flex w-fit items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.12em] text-[#455CE9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#455CE9]">
              <ArrowLeft className="size-4" aria-hidden="true" /> All services
            </a>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="relative z-10 w-full bg-white">
      <PageHero>
        <Header />
        <div className="mx-auto flex min-h-[62svh] w-full max-w-[1508px] flex-col justify-between gap-12 px-4 pb-8 pt-14 sm:min-h-[68svh] sm:px-8 sm:pb-12 sm:pt-20 lg:px-10 lg:pt-16">
          <div className="flex items-center gap-4 font-inter text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60 sm:text-xs">
            <a href="/services" className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Services</a>
            <span aria-hidden="true" className="h-px flex-1 bg-white/25" />
          </div>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <h1 className="max-w-[900px] font-sora text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-white md:col-span-8">
              {service.title}<span className="text-[#b7ff3c]">.</span>
            </h1>
            <p className="max-w-[430px] font-inter text-sm leading-[1.65] text-white/85 sm:text-base md:col-span-4 md:pb-2">
              {service.short_description}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-white/25 pt-4 font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]">
            <span>From idea to product</span><span>DotCode / Services</span>
          </div>
        </div>
      </PageHero>

      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1350px] gap-8 md:grid-cols-12 md:gap-10">
          <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/45 md:col-span-4">01 / The service</p>
          <div className="md:col-span-8">
            <p className="whitespace-pre-line font-inter text-sm leading-[1.8] text-black/65 sm:text-base">{service.description}</p>
            <a href="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#455CE9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Discuss your project <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
