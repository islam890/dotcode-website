import { ScrollTrigger } from "gsap/ScrollTrigger";

let refreshFrame: number | null = null;

export function scheduleScrollTriggerRefresh() {
  if (refreshFrame !== null) return;

  refreshFrame = window.requestAnimationFrame(() => {
    refreshFrame = null;
    ScrollTrigger.refresh();
  });
}
