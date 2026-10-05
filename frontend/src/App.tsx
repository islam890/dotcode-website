import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { AgencyMarquee } from "@/components/sections/AgencyMarquee";
import { About } from "@/components/sections/About";
import { Announcement } from "@/components/sections/Announcement";
import { FAQContact } from "@/components/sections/FAQContact";
import { Brands } from "@/components/sections/Brands";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { AboutPage } from "@/components/pages/AboutPage";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { TestimonialsPage } from "@/components/pages/TestimonialsPage";
import { ContactRoutePage } from "@/components/pages/ContactRoutePage";
import { useGlobalButtonMotion } from "@/hooks/useGlobalButtonMotion";
import { useRevealAnimations } from "@/hooks/useRevealAnimations";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { stripLocaleFromPath, useLocale } from "@/i18n";

gsap.registerPlugin(ScrollTrigger);

function FooterRevealCurve() {
  return (
    <div aria-hidden="true" className="relative z-20 h-0">
      <div
        data-footer-rounded-wrap
        className="relative h-[10vh] w-full -translate-y-px overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[220%] w-[150%] -translate-x-1/2 -translate-y-[54.5%] rounded-[50%] bg-white sm:h-[350%] sm:-translate-y-[71.4%] lg:h-[625%] lg:-translate-y-[84%] xl:h-[750%] xl:-translate-y-[86.666%]" />
      </div>
    </div>
  );
}

export default function App() {
  const rootRef = useRevealAnimations<HTMLDivElement>();
  const { locale } = useLocale();
  useGlobalButtonMotion();
  const footerRevealSpacerRef = useRef<HTMLDivElement>(null);
  const currentPath = stripLocaleFromPath(window.location.pathname).replace(/\/+$/, "") || "/";
  const isServicesRoute = currentPath === "/services";
  const serviceDetailMatch = currentPath.match(/^\/services\/([^/]+)$/);
  let serviceSlug: string | null = null;
  if (serviceDetailMatch) {
    try {
      serviceSlug = decodeURIComponent(serviceDetailMatch[1]);
    } catch {
      serviceSlug = null;
    }
  }
  const isAboutRoute = currentPath === "/about";
  const isProjectsRoute = currentPath === "/projects" || currentPath === "/work";
  const projectDetailMatch = currentPath.match(/^\/(?:projects|work)\/([^/]+)$/);
  let projectSlug: string | null = null;
  if (projectDetailMatch) {
    try {
      projectSlug = decodeURIComponent(projectDetailMatch[1]);
    } catch {
      projectSlug = null;
    }
  }
  const isContactRoute = currentPath === "/contact";
  const isTestimonialsRoute = currentPath === "/testimonials";
  const isNotFoundRoute =
    currentPath !== "/" &&
    !isServicesRoute &&
    !serviceSlug &&
    !isAboutRoute &&
    !isProjectsRoute &&
    !projectSlug &&
    !isContactRoute &&
    !isTestimonialsRoute;

  usePageMetadata(
    currentPath === "/" ? "DotCode Agency" : null,
    currentPath === "/"
      ? "DotCode Agency builds digital products, AI solutions, and modern software experiences from idea to launch."
      : null,
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [locale]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      anchors: true,
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const hero = root?.querySelector<HTMLElement>("main > section:first-child");
    const sections = root
      ? Array.from(
          root.querySelectorAll<HTMLElement>(
            "main > section:not(:first-child)",
          ),
        )
      : [];

    if (
      !root ||
      isNotFoundRoute ||
      !hero ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context(() => {
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

      sections.forEach((section) => {
        gsap.set(section, {
          position: "relative",
          zIndex: 1,
          isolation: "isolate",
        });

        if (section.querySelector("[data-reveal], [data-reveal-stagger]")) {
          return;
        }

        const content = section.firstElementChild;

        if (content instanceof HTMLElement) {
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
        }
      });
    }, root);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [rootRef, isNotFoundRoute]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const spacer = footerRevealSpacerRef.current;
    const footer = root?.querySelector<HTMLElement>("[data-site-footer]");
    const footerContent = footer?.querySelector<HTMLElement>(
      ":scope > div.relative",
    );
    const roundedReveal = root?.querySelector<HTMLElement>(
      "[data-footer-rounded-wrap]",
    );

    if (!root || !spacer || !footer || !footerContent || !roundedReveal) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("all", () => {
      footer.style.pointerEvents = "none";

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        footer.style.pointerEvents = "auto";
        return;
      }

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            footer.style.pointerEvents =
              self.progress > 0.92 ? "auto" : "none";
          },
        },
      });

      reveal.fromTo(
        footer,
        { y: 60 },
        { y: 0, ease: "none" },
        0,
      );
      reveal.fromTo(
        footerContent,
        { y: "10vh" },
        { y: 0, ease: "none" },
        0,
      );
      reveal.fromTo(
        roundedReveal,
        { height: "10vh" },
        { height: 0, ease: "none" },
        0,
      );
    });

    ScrollTrigger.refresh();

    return () => media.revert();
  }, [rootRef]);

  return (
    <div ref={rootRef} className="relative isolate w-full">
      {isServicesRoute ? (
        <ServicesPage />
      ) : serviceSlug ? (
        <ServiceDetailPage slug={serviceSlug} />
      ) : isAboutRoute ? (
        <AboutPage />
      ) : isProjectsRoute ? (
        <ProjectsPage />
      ) : projectSlug ? (
        <ProjectDetailPage slug={projectSlug} />
      ) : isTestimonialsRoute ? (
        <TestimonialsPage />
      ) : isContactRoute ? (
        <ContactRoutePage />
      ) : isNotFoundRoute ? (
        <NotFoundPage />
      ) : (
        <>
          <main className="relative z-10 w-full bg-white">
            <Hero />
            <Brands />
            <About />
            <Services />
            <Announcement />
            <FAQContact />
            <AgencyMarquee />
          </main>
        </>
      )}
      <FooterRevealCurve />
      <div
        ref={footerRevealSpacerRef}
        aria-hidden="true"
        className="h-dvh"
      />
      <Footer />
      <PageTransition />
    </div>
  );
}
