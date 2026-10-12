import { useEffect, useLayoutEffect, useRef } from "react";
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
      const heroHead = self.selector!('[data-anim="hero-head"]');
      const heroCopy = self.selector!('[data-anim="hero-copy"]');
      const heroCta = self.selector!('[data-anim="hero-cta"]');

      if (heroHead.length) {
        heroTimeline.from(
          heroHead,
          { opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.4",
        );
      }
      if (heroCopy.length) {
        heroTimeline.from(
          heroCopy,
          { opacity: 0, duration: 0.8 },
          "-=0.5",
        );
      }
      if (heroCta.length) {
        heroTimeline.from(
          heroCta,
          { opacity: 0, duration: 0.7 },
          "-=0.5",
        );
      }

      const heroObject = self.selector!('[data-anim="hero-object"]');
      if (heroObject.length) {
        heroTimeline.from(
          heroObject,
          { opacity: 0, scale: 0.96, duration: 1 },
          "-=0.4",
        );
      }

      const heroRating = self.selector!('[data-anim="hero-rating"]');
      if (heroRating.length) {
        heroTimeline.from(heroRating, { opacity: 0, duration: 0.6 }, "-=0.4");
      }

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

export function usePageSectionReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const page = ref.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hero = Array.from(page.children).find(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && child.tagName === "SECTION",
    );
    const sections = Array.from(page.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        child !== hero &&
        child.tagName === "SECTION",
    );

    const context = gsap.context(() => {
      if (hero) {
        gsap.set(hero, { zIndex: 0, isolation: "isolate" });
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      sections.forEach((section) => {
        gsap.set(section, {
          position: "relative",
          zIndex: 1,
          isolation: "isolate",
        });
      });

      page.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      page.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        const children = Array.from(group.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        );
        if (!children.length) return;

        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      sections.forEach((section) => {
        if (section.querySelector("[data-reveal], [data-reveal-stagger]")) return;

        const content = section.firstElementChild;
        if (!(content instanceof HTMLElement)) return;

        gsap.fromTo(
          content,
          { y: 48 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 72%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, page);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  return ref;
}
