import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimations<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const heroTimeline = gsap.timeline({
        delay: 0.8,
        defaults: { ease: "power3.out" },
      });
      heroTimeline
        .from(
          '[data-anim="hero-head"]',
          { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.4",
        )
        .from(
          '[data-anim="hero-copy"]',
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.5",
        )
        .from(
          '[data-anim="hero-cta"]',
          { y: 20, opacity: 0, duration: 0.7 },
          "-=0.5",
        )
        .from(
          '[data-anim="hero-object"]',
          { y: 60, opacity: 0, scale: 0.96, duration: 1 },
          "-=0.4",
        )
        .from(
          '[data-anim="hero-rating"]',
          { opacity: 0, duration: 0.6 },
          "-=0.4",
        );

      self.selector!("[data-reveal]").forEach((element: Element) => {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });

      self.selector!("[data-reveal-stagger]").forEach((element: Element) => {
        gsap.from(element.children, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 82%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
