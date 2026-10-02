import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function NotFoundPage() {
  usePageMetadata(
    "Page not found | DotCode",
    "The page you are looking for could not be found.",
  );

  return (
    <main
      data-light-page-header
      className="relative z-10 min-h-[calc(100svh-1px)] w-full bg-white"
    >
      <Header />
      <section className="mx-auto flex min-h-[62svh] max-w-[1457px] flex-col justify-center px-4 py-16 sm:px-8 lg:px-10">
        <p className="font-sora text-sm font-medium uppercase tracking-[0.12em] text-black/45">
          DotCode / 404
        </p>
        <h1 className="mt-5 max-w-[900px] font-sora text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-black">
          This page could not be found<span className="text-[#A3E635]">.</span>
        </h1>
        <a
          href="/"
          className="mt-9 inline-flex w-fit items-center gap-3 font-inter text-xs font-bold uppercase tracking-[0.1em] text-[#455CE9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#455CE9]"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Home
        </a>
      </section>
    </main>
  );
}
