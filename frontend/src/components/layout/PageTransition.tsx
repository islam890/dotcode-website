import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const storageKey = "dotcode-page-transition";
const transitionDuration = 760;

type TransitionState = {
  label: string;
  phase: "hidden" | "pre-enter" | "entering" | "covered" | "exiting";
};

function readIncomingTransition(): TransitionState {
  try {
    const stored = window.sessionStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored) as {
        label?: unknown;
        destinationPath?: unknown;
        createdAt?: unknown;
      };
      const age = typeof parsed.createdAt === "number"
        ? Date.now() - parsed.createdAt
        : Number.POSITIVE_INFINITY;
      const navigationEntry = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;
      if (
        typeof parsed.label === "string" &&
        typeof parsed.destinationPath === "string" &&
        normalizePath(parsed.destinationPath) === normalizePath(window.location.pathname) &&
        navigationEntry?.type === "navigate" &&
        age >= 0 &&
        age < 12000
      ) {
        return { label: parsed.label, phase: "covered" };
      }
      window.sessionStorage.removeItem(storageKey);
    }
  } catch {
    // Continue rendering normally if session storage is unavailable.
  }

  return { label: "", phase: "hidden" };
}

function pageLabel(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  const labels: Record<string, string> = {
    "/": "Home",
    "/services": "Services",
    "/about": "About Us",
    "/projects": "Our Projects",
    "/testimonials": "Testimonials",
    "/contact": "Contact",
  };

  if (labels[path]) return labels[path];
  if (path.startsWith("/projects/")) {
    return path
      .split("/")
      .at(-1)!
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return "Page not found";
}

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function PageTransition() {
  const [transition, setTransition] = useState<TransitionState>(readIncomingTransition);
  const navigationPendingRef = useRef(false);
  const navigationTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (transition.phase !== "covered") return;

    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // The transition can still finish without storage access.
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTransition((current) => ({ ...current, phase: "hidden" }));
      return;
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        setTransition((current) => ({ ...current, phase: "exiting" }));
      });
    });

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [transition.phase]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        navigationPendingRef.current
      ) {
        return;
      }

      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const anchor = origin.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank" ||
        anchor.relList.contains("external") ||
        anchor.hasAttribute("data-no-page-transition")
      ) {
        return;
      }

      let destination: URL;
      try {
        destination = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (
        destination.origin !== window.location.origin ||
        normalizePath(destination.pathname) === normalizePath(window.location.pathname)
      ) {
        return;
      }

      event.preventDefault();
      navigationPendingRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.location.assign(destination.href);
        return;
      }

      const label = pageLabel(destination.pathname);
      setTransition({ label, phase: "pre-enter" });
      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = requestAnimationFrame(() => {
          setTransition({ label, phase: "entering" });
        });
      });
      navigationTimerRef.current = window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(
            storageKey,
            JSON.stringify({
              label,
              destinationPath: normalizePath(destination.pathname),
              createdAt: Date.now(),
            }),
          );
        } catch {
          // Navigation still works if storage is unavailable; the cover won't replay.
        }
        window.location.assign(destination.href);
      }, transitionDuration + 40);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const visible = transition.phase !== "hidden";
  const transform =
    transition.phase === "pre-enter"
      ? "translate3d(0, 116%, 0)"
      : transition.phase === "exiting" || transition.phase === "hidden"
        ? "translate3d(0, -116%, 0)"
        : "translate3d(0, 0, 0)";
  const isAnimating = transition.phase === "entering" || transition.phase === "exiting";

  return createPortal(
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#111214] text-[#d0d0d2] ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      onTransitionEnd={(event) => {
        if (event.propertyName === "transform" && transition.phase === "exiting") {
          setTransition((current) => ({ ...current, phase: "hidden" }));
        }
      }}
      style={{
        transform,
        transition: isAnimating
          ? `transform ${transitionDuration}ms cubic-bezier(0.77, 0, 0.175, 1)`
          : "none",
        willChange: visible ? "transform" : "auto",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[-8vh] h-[16vh] w-[150%] -translate-x-1/2 rounded-[50%] bg-[#111214]"
      />
      <p className="flex items-center gap-5 font-inter text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.055em]">
        <span className="text-[0.55em] text-[#aaa]" aria-hidden="true">●</span>
        <span>{transition.label}</span>
      </p>
      <span
        aria-hidden="true"
        className="absolute bottom-[-8vh] left-1/2 h-[16vh] w-[150%] -translate-x-1/2 rounded-[50%] bg-[#111214]"
      />
    </div>,
    document.body,
  );
}
