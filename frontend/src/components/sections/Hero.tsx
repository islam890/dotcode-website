import { Header } from "@/components/layout/Header";
import { ArrowUpRight, Star } from "lucide-react";
import { images } from "@/data/site";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useLocale } from "@/i18n";

const heroCards = [
  { src: "/assets/hero-card-1.png", alt: "Income and expense dashboard" },
  { src: "/assets/hero-card-2.png", alt: "Intelligence in every decision chart" },
  { src: "/assets/hero-card-3.png", alt: "Strategy, data, and artificial intelligence" },
  { src: "/assets/hero-card-4.png", alt: "Data training interface" },
  { src: "/assets/hero-card-5.png", alt: "Data points dashboard" },
  { src: "/assets/hero-card-6.png", alt: "Business performance dashboard" },
  { src: "/assets/hero-card-7.png", alt: "Live calendar and messages integrations" },
] as const;

export function Hero() {
  const { locale } = useLocale();
  const heroCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsRoot = heroCardsRef.current;
    if (!cardsRoot) return;

    const track = cardsRoot.querySelector<HTMLElement>(".hero-card-track");
    const cards = Array.from(cardsRoot.querySelectorAll<HTMLElement>(".hero-card"));
    if (!track || cards.length === 0) return;

    const context = gsap.context(() => {
      const centerCard = cards[heroCards.length];
      let loopWidth = 0;
      let startX = 0;
      let horizontalLoop: gsap.core.Tween | undefined;

      const positionTrack = () => {
        gsap.set(track, { x: 0 });
        const rootRect = cardsRoot.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        loopWidth = centerCard.offsetLeft - cards[0].offsetLeft;
        startX =
          rootRect.left +
          rootRect.width / 2 -
          (trackRect.left + centerCard.offsetLeft + centerCard.offsetWidth / 2);
        gsap.set(track, { x: startX });
      };

      const updateCardCurve = () => {
        const rootRect = cardsRoot.getBoundingClientRect();
        const center = rootRect.left + rootRect.width / 2;
        const focusRange = Math.max(rootRect.width * 0.52, 1);
        const curveDepth = rootRect.width * 0.06;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const distance = cardRect.left + cardRect.width / 2 - center;
          const normalizedDistance = gsap.utils.clamp(-1.4, 1.4, distance / focusRange);
          const distanceFromCenter = Math.min(Math.abs(normalizedDistance), 1);
          const centerFocus = 1 - distanceFromCenter;
          const edgeFade = gsap.utils.clamp(
            0,
            1,
            (Math.abs(distance) - rootRect.width * 0.34) / Math.max(rootRect.width * 0.16, 1),
          );

          gsap.set(card, {
            y: distanceFromCenter * distanceFromCenter * curveDepth,
            scale: 0.78 + centerFocus * 0.22,
            opacity: 1 - edgeFade * 0.78,
            rotation: normalizedDistance * 5,
            rotationY: normalizedDistance * -72,
            transformPerspective: 1200,
            transformOrigin: "center center",
            force3D: true,
          });
        });
      };

      positionTrack();
      updateCardCurve();

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        horizontalLoop = gsap.to(track, {
          x: () => startX - loopWidth,
          duration: () => Math.max(loopWidth / 78, 1),
          ease: "none",
          repeat: -1,
          onUpdate: updateCardCurve,
        });
      }

      const resizeObserver = new ResizeObserver(() => {
        horizontalLoop?.pause();
        positionTrack();
        updateCardCurve();
        horizontalLoop?.invalidate().restart();
      });
      resizeObserver.observe(cardsRoot);

      return () => resizeObserver.disconnect();
    }, cardsRoot);

    return () => context.revert();
  }, []);

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
                  data-home-hero-title
                  className="w-full max-w-full text-balance font-sora text-[clamp(1.85rem,7vw,4.2rem)] font-extrabold leading-[0.96] tracking-[-1.5px] text-white md:text-[clamp(2.6rem,4vw,4.4rem)] lg:text-[42px]"
                >
                  {locale === "fr" ? (
                    <>
                      Nous créons des<br />
                      produits numériques
                    </>
                  ) : (
                    "We build digital products"
                  )}
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
                className="w-full max-w-[560px] font-inter text-[0.9rem] font-normal leading-[1.5] tracking-[0.61px] text-white/90 sm:text-[0.95rem] md:text-[1rem] lg:text-[1.05rem]"
              >
                We help businesses transform ideas into meaningful digital
                experiences through modern software development, intelligent AI
                solutions, and technology built for growth.
              </p>

              {/* CTA */}
              <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
              <div
                data-anim="hero-cta"
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
              >
                <a
                  href="/work"
                  className="flex min-h-[30px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-3 py-[8px] font-inter text-[9px]! font-extrabold! uppercase tracking-[0.04em] text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-[34px] sm:px-4 sm:py-[9px] sm:text-[10px]! md:min-h-[38px] md:py-[10px] md:text-[11px]!"
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

              <div
                data-hero-cards
                dir="ltr"
                className="relative h-[clamp(10rem,16vw,14rem)] w-screen overflow-hidden [perspective:1200px]"
                aria-label="Featured product visuals"
                ref={heroCardsRef}
              >
                <div className="hero-card-track">
                  {[...heroCards, ...heroCards, ...heroCards, ...heroCards].map(
                    (card, index) => (
                      <img
                        key={`${card.src}-${index}`}
                        src={card.src}
                        alt={card.alt}
                        className="hero-card"
                      />
                    ),
                  )}
                </div>
              </div>

              </div>
            </div>
          </div>

          {/* Rating */}
          <div
            data-anim="hero-rating"
            data-hero-rating
            className="-mt-5 flex flex-col items-center gap-1.5 sm:-mt-6 md:-mt-8"
          >
            <p className="text-center font-inter text-[0.9rem] font-normal tracking-[-0.02em] text-white/90 sm:text-[1rem] md:text-[1.1rem]">
              Rated 4.7/5 by 20+ clients
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
