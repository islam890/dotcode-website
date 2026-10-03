import { Header } from "@/components/layout/Header";
import { ArrowUpRight, Star } from "lucide-react";
import { images } from "@/data/site";
import type { ReactNode } from "react";

export function Hero() {
  return (
    <section id="home" data-hero-section className="relative min-h-dvh w-full overflow-hidden bg-[#5b9bd5]">
      <img
        src={images.heroSection}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-90"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_48%)]"
      />

      <div className="relative z-10">
        <Header />

        <div data-hero-layout className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 pb-16 pt-10 sm:px-8 sm:pt-16 md:gap-12 md:pt-20 lg:gap-20 lg:pb-20">
          {/* Hero Content */}
          <div data-hero-content className="flex w-full flex-col items-center gap-6 sm:gap-8">
            <div className="flex w-full max-w-[620px] flex-col items-center gap-2 text-center sm:gap-3">
              {/* Headline */}
                <div data-hero-headlines className="flex w-full flex-col gap-2 sm:gap-[14px]">
                <h1
                  data-anim="hero-head"
                  data-hero-title
                  className="w-full max-w-full text-balance font-sora text-[clamp(1.85rem,7vw,4.2rem)] font-extrabold leading-[0.96] tracking-[-1.5px] text-white md:text-[clamp(2.6rem,4vw,4.4rem)] lg:text-[42px]"
                >
                  We build digital products
                </h1>

                <p
                  data-anim="hero-head"
                  data-hero-subtitle
                  className="w-full text-balance font-sora text-[clamp(1.8rem,6vw,3.2rem)] font-light leading-[0.98] tracking-[-1.5px] text-[#f4f7fb] md:text-[clamp(2.4rem,4vw,3.6rem)] lg:text-[58px]"
                >
                  From idea to product.
                </p>
              </div>

              {/* Description */}
              <p
                data-anim="hero-copy"
                data-hero-copy
                className="w-full max-w-[560px] font-inter text-[0.9rem] font-normal leading-[1.5] tracking-[-1px] text-white/90 sm:text-[0.95rem] md:text-[1rem] lg:text-[1.05rem]"
              >
                We help businesses transform ideas into meaningful digital
                experiences through modern software development, intelligent AI
                solutions, and technology built for growth.
              </p>

              {/* CTA */}
              <div
                data-anim="hero-cta"
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
              >
                <a
                  href="/work"
                  className="rounded-full border border-white/30 bg-white/5 px-3 py-[9px] font-inter text-[9px]! font-extrabold! uppercase tracking-[0.04em] text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:py-[11px] sm:text-[10px]! md:text-[11px]!"
                >
                  view our work
                </a>

                <a
                  href="#contact"
                  data-no-page-transition
                  className="group inline-flex items-center gap-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7ff3c]"
                >
                  <span
                    className="flex items-center justify-center rounded-full bg-[#b7ff3c] px-2.5 py-[8px] font-inter text-[8px]! font-extrabold! uppercase tracking-[0.08em] text-black transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#c4ff62] sm:px-3 sm:py-[10px] sm:text-[9px]! md:text-[10px]!"
                  >
                    get started
                  </span>

                  <div
                    aria-hidden="true"
                    className="flex size-[30px] items-center justify-center rounded-full bg-[#b7ff3c] text-black transition-transform duration-200 group-hover:-translate-y-0.5 sm:size-[34px] md:size-[38px]"
                  >
                    <ArrowUpRight
                      className="size-5 sm:size-[22px] md:size-6"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Product Previews */}
          <div data-anim="hero-object" data-hero-products className="w-full max-w-[920px]">
            <img
              src={images.object}
              alt="DotCode digital product previews"
              className="w-full drop-shadow-[0_25px_50px_rgba(8,18,40,0.18)]"
            />
          </div>

          {/* Rating */}
          <div
            data-anim="hero-rating"
            data-hero-rating
            className="-mt-5 flex flex-col items-center gap-1.5 sm:-mt-6 md:-mt-8"
          >
            <p className="text-center font-inter text-[0.9rem] font-normal tracking-[-0.02em] text-white/90 sm:text-[1rem] md:text-[1.1rem]">
              Rated 4.7/5 by 1,223+ clients
            </p>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="size-[18px] sm:size-[20px] md:size-[22px]"
                >
                  <Star
                    className="size-full text-[#ffff48]"
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ children }: { children: ReactNode }) {
  return (
    <section data-hero-section className="relative overflow-hidden bg-[#5b9bd5] text-white">
      <img
        src={images.heroSection}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_48%)]"
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
