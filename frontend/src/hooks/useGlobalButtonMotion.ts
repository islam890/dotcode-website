import { useEffect } from "react";

const buttonSelector = [
  "button:not(:disabled):not([aria-label='Open menu']):not([aria-label='Close menu'])",
  "a.rounded-full:not([href='/#contact']):not([href='/contact']):not([href^='tel:'])",
  'a[data-anim="hero-cta"]',
  'a[data-footer-social-link]',
  'a[aria-label^="Ask about"]',
].join(",");

export function useGlobalButtonMotion() {
  useEffect(() => {
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    if (currentPath === "/") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const target = origin.closest<HTMLElement>(buttonSelector);
      if (!target) return;

      target.dataset.siteButtonTarget = "true";
      const isSurfaceButton = target.tagName === "BUTTON" || target.matches('a.rounded-full, a[data-footer-social-link], a[aria-label^="Ask about"]');
      target.dataset.siteButtonHovered = isSurfaceButton ? "surface" : "link";
      if (reducedMotion) return;

      const bounds = target.getBoundingClientRect();
      const x = Math.max(-9, Math.min(9, (event.clientX - bounds.left - bounds.width / 2) * 0.14));
      const y = Math.max(-9, Math.min(9, (event.clientY - bounds.top - bounds.height / 2) * 0.14));
      target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const target = origin.closest<HTMLElement>(buttonSelector);
      if (!target) return;
      const destination = event.relatedTarget;
      if (destination instanceof Element && target.contains(destination)) return;

      delete target.dataset.siteButtonHovered;
      target.style.transform = "";
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);
}
