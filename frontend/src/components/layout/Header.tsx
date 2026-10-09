import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images, navLinks } from "@/data/site";
import { flaticonIcons } from "@/data/flaticonIcons";
import { stripLocaleFromPath, useLocale } from "@/i18n";

const menuLinks = [{ label: "Home", href: "/" }, ...navLinks].map((link) => ({
  ...link,
  label: link.label.replace(/\b[a-z]/g, (letter) =>
    letter.toUpperCase(),
  ),
}));

const menuSocials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594265138267&locale=fr_FR",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dotcode_agency?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/dotcodeagency",
  },
  { label: "WhatsApp", href: "https://wa.me/213656264776" },
] as const;

const languages = [
  {
    code: "EN",
    name: "English",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    code: "FR",
    name: "Français",
    flag: "https://flagcdn.com/w40/fr.png",
  },
  {
    code: "AR",
    name: "العربية",
    flag: "https://flagcdn.com/w40/dz.png",
  },
  {
    code: "DE",
    name: "Deutsch",
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    code: "ES",
    name: "Español",
    flag: "https://flagcdn.com/w40/es.png",
  },
];

const supportedLanguages = languages.filter((language) =>
  language.code === "EN" || language.code === "FR" || language.code === "AR" || language.code === "DE" || language.code === "ES",
);

function getLanguageName(language: (typeof languages)[number]) {
  if (language.code === "FR") return "Fran\u00e7ais";
  if (language.code === "AR") return "\u0627\u0644\u0639\u0631\u0628\u064a\u0629";
  if (language.code === "ES") return "Espa\u00f1ol";
  return language.name;
}

function LanguageFlag({ src }: { src: string }) {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full">
      <img
        src={src}
        alt=""
        width="40"
        height="20"
        className="h-4 w-8 max-w-none object-cover"
      />
    </span>
  );
}

function getDateTime(locale: "en" | "fr" | "ar" | "de" | "es") {
  const now = new Date();
  const intlLocale = locale === "fr" ? "fr-FR" : locale === "ar" ? "ar-DZ" : locale === "de" ? "de-DE" : locale === "es" ? "es-ES" : "en-GB";

  return {
    day: now.toLocaleDateString(intlLocale, {
      weekday: "long",
    }),
    time: now.toLocaleTimeString(intlLocale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    date: now.toLocaleDateString(intlLocale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };
}

export default function Header() {
  const { locale, setLocale } = useLocale();
  const currentPath = stripLocaleFromPath(window.location.pathname).replace(/\/+$/, "") || "/";
  const [dateTime, setDateTime] = useState(() => getDateTime(locale));
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const selectedLanguage = supportedLanguages.find(
    (language) => language.code.toLowerCase() === locale,
  ) ?? supportedLanguages[0];
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  const navbarRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuReturnFocusRef = useRef<HTMLElement | null>(null);
  const menuLineTopRef = useRef<HTMLSpanElement | null>(null);
  const menuLineBottomRef = useRef<HTMLSpanElement | null>(null);

  const menuPanelRef = useRef<HTMLElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuIntroRef = useRef<HTMLParagraphElement | null>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);
  const menuSocialHeadingRef = useRef<HTMLParagraphElement | null>(null);
  const menuSocialsRef = useRef<HTMLElement[]>([]);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const buttonTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const menuButtonScaleRef = useRef(1);
  const magnetXRef = useRef(0);
  const magnetYRef = useRef(0);

  useEffect(() => {
    setDateTime(getDateTime(locale));
    const interval = window.setInterval(() => {
      setDateTime(getDateTime(locale));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [locale]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const labels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-magnetic-link]"),
    );

    const cleanups = labels.map((label) => {
      const link = label.closest("a");

      if (!link) {
        return () => {};
      }

      const moveX = gsap.quickTo(label, "x", {
        duration: 0.2,
        ease: "power2.out",
      });
      const moveY = gsap.quickTo(label, "y", {
        duration: 0.2,
        ease: "power2.out",
      });

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") {
          return;
        }

        const bounds = link.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        moveX(
          Math.max(
            -14,
            Math.min(14, ((event.clientX - centerX) / bounds.width) * 28),
          ),
        );
        moveY(
          Math.max(
            -10,
            Math.min(10, ((event.clientY - centerY) / bounds.height) * 20),
          ),
        );
      };

      const handlePointerLeave = () => {
        moveX(0);
        moveY(0);
      };

      link.addEventListener("pointermove", handlePointerMove);
      link.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        link.removeEventListener("pointermove", handlePointerMove);
        link.removeEventListener("pointerleave", handlePointerLeave);
        gsap.killTweensOf(label, ["x", "y"]);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  /*
   * Floating menu button:
   * hidden at the top of the page,
   * appears once the user scrolls down.
   */
  useEffect(() => {
    const button = menuButtonRef.current;

    if (!button) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const getShouldShow = () => {
      const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
      const scrollThreshold = isSmallScreen
        ? 0
        : window.innerHeight * 0.3;
      const scrollPosition = Math.max(
        window.scrollY,
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        window.visualViewport?.pageTop ?? 0,
      );

      return scrollPosition > scrollThreshold;
    };

    let previousVisibleState = getShouldShow();

    setHasScrolled(previousVisibleState);

    gsap.set(button, {
      autoAlpha: previousVisibleState ? 1 : 0,
      y: previousVisibleState ? 0 : 22,
      scale: previousVisibleState ? 1 : 0.78,
      pointerEvents: previousVisibleState ? "auto" : "none",
    });

    const updateScrollState = () => {
      const shouldShow = getShouldShow();

      if (shouldShow === previousVisibleState) {
        return;
      }

      previousVisibleState = shouldShow;
      setHasScrolled(shouldShow);

      gsap.killTweensOf(button);

      if (shouldShow) {
        gsap.fromTo(
          button,
          {
            autoAlpha: 0,
            y: 22,
            scale: 0.78,
            pointerEvents: "none",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            pointerEvents: "auto",
            duration: 0.72,
            ease: "power3.out",
            overwrite: true,
          },
        );
      } else {
        gsap.to(button, {
          autoAlpha: 0,
          y: 22,
          scale: 0.78,
          pointerEvents: "none",
          duration: 0.34,
          ease: "power2.in",
          overwrite: true,
        });

        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, { passive: true });
    document.addEventListener("scroll", updateScrollState, {
      passive: true,
      capture: true,
    });

    let scrollCheckFrame = 0;
    const scheduleScrollCheck = () => {
      window.cancelAnimationFrame(scrollCheckFrame);
      scrollCheckFrame = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("touchmove", scheduleScrollCheck, {
      passive: true,
    });
    window.addEventListener("wheel", scheduleScrollCheck, { passive: true });

    window.addEventListener("resize", updateScrollState);
    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(document.documentElement.scrollHeight, window.innerHeight),
      onUpdate: updateScrollState,
      onRefresh: updateScrollState,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      document.removeEventListener("scroll", updateScrollState, true);
      window.removeEventListener("touchmove", scheduleScrollCheck);
      window.removeEventListener("wheel", scheduleScrollCheck);
      window.removeEventListener("resize", updateScrollState);
      window.cancelAnimationFrame(scrollCheckFrame);
      scrollTrigger.kill();
    };
  }, [menuOpen]);

  useEffect(() => {
    const navbar = navbarRef.current;
    const hero = navbar?.closest<HTMLElement>("section");

    if (!navbar || !hero) {
      return;
    }

    gsap.to(navbar, {
      yPercent: hasScrolled ? -110 : 0,
      autoAlpha: hasScrolled ? 0 : 1,
      filter: hasScrolled ? "blur(3px)" : "blur(0px)",
      duration: 0.55,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    gsap.to(hero, {
      filter: hasScrolled ? "blur(3px)" : "blur(0px)",
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    return () => {
      gsap.killTweensOf(navbar);
      gsap.killTweensOf(hero);
    };
  }, [hasScrolled]);

  /*
   * Magnetic menu button.
   */
  useEffect(() => {
    const button = menuButtonRef.current;

    if (!button) {
      return;
    }

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    if (!hasScrolled || !finePointerQuery.matches) {
      gsap.killTweensOf(button);

      magnetXRef.current = 0;
      magnetYRef.current = 0;
      menuButtonScaleRef.current = 1;

      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.25,
        ease: "power3.out",
        overwrite: true,
      });

      if (!menuOpen) {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power3.out",
          overwrite: true,
        });
      }

      return;
    }

    const moveX = gsap.quickTo(button, "x", {
      duration: 0.18,
      ease: "power2.out",
    });

    const moveY = gsap.quickTo(button, "y", {
      duration: 0.18,
      ease: "power2.out",
    });

    const scaleTo = gsap.quickTo(button, "scale", {
      duration: 0.24,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const bounds = button.getBoundingClientRect();

      const deltaX = event.clientX - bounds.left - bounds.width / 2;
      const deltaY = event.clientY - bounds.top - bounds.height / 2;

      magnetXRef.current = deltaX * 0.16;
      magnetYRef.current = deltaY * 0.16;

      moveX(magnetXRef.current);
      moveY(magnetYRef.current);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      scaleTo(menuOpen ? 0.93 : 0.92);
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      magnetXRef.current = 0;
      magnetYRef.current = 0;

      moveX(0);
      moveY(0);

      scaleTo(menuOpen ? 0.96 : 1);
    };

    button.addEventListener("pointermove", handlePointerMove);
    button.addEventListener("pointerenter", handlePointerEnter);
    button.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      button.removeEventListener("pointermove", handlePointerMove);
      button.removeEventListener("pointerenter", handlePointerEnter);
      button.removeEventListener("pointerleave", handlePointerLeave);

      gsap.killTweensOf(button, ["x", "y", "scale"]);

      magnetXRef.current = 0;
      magnetYRef.current = 0;
    };
  }, [hasScrolled, menuOpen]);

  useLayoutEffect(() => {
    const button = menuButtonRef.current;
    const lineTop = menuLineTopRef.current;
    const lineBottom = menuLineBottomRef.current;
    const panel = menuPanelRef.current;
    const overlay = menuOverlayRef.current;
    const intro = menuIntroRef.current;
    const socialHeading = menuSocialHeadingRef.current;

    if (
      !button ||
      !lineTop ||
      !lineBottom ||
      !panel ||
      !overlay ||
      !intro ||
      !socialHeading
    ) {
      return;
    }

    const linkTexts = menuLinksRef.current;
    const socialLinks = menuSocialsRef.current;
    const menuOriginX = locale === "ar" ? "0%" : "100%";

    const context = gsap.context(() => {
      gsap.set(panel, {
        clipPath: `ellipse(0% 76% at ${menuOriginX} 50%)`,
      });

      gsap.set(overlay, {
        autoAlpha: 0,
      });

      gsap.set(intro, {
        y: 10,
        autoAlpha: 0,
      });

      gsap.set(linkTexts, {
        yPercent: 112,
        x: -5,
        autoAlpha: 0,
        scale: 0.97,
      });

      gsap.set(socialHeading, {
        y: 8,
        autoAlpha: 0,
      });

      gsap.set(socialLinks, {
        y: 10,
        autoAlpha: 0,
      });

      gsap.set(button, {
        backgroundColor: "#0A0A0A",
        borderColor: "rgba(255,255,255,0.14)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
      });

      gsap.set(lineTop, {
        y: -3,
        rotation: 0,
      });

      gsap.set(lineBottom, {
        y: 3,
        rotation: 0,
      });

      const buttonTimeline = gsap.timeline({
        paused: true,
      });

      buttonTimeline
        .to(button, {
          scale: 0.96,
          duration: 0.16,
          ease: "power2.out",
        })
        .to(
          button,
          {
            backgroundColor: "#455CE9",
            borderColor: "rgba(69,92,233,0)",
            boxShadow: "0 14px 34px rgba(69,92,233,0.18)",
            duration: 0.32,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          lineTop,
          {
            y: 0,
            rotation: 45,
            duration: 0.28,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          lineBottom,
          {
            y: 0,
            rotation: -45,
            duration: 0.28,
            ease: "power3.out",
          },
          "<",
        );

      const menuTimeline = gsap.timeline({
        paused: true,
      });

      menuTimeline
        .to(
          overlay,
          {
            autoAlpha: 1,
            duration: 0.24,
            ease: "power2.out",
          },
          0,
        )
        .to(
          panel,
          {
            clipPath: `ellipse(130% 180% at ${menuOriginX} 50%)`,
            duration: 0.72,
            ease: "power4.inOut",
          },
          0,
        )
        .to(
          intro,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.46,
            ease: "power3.out",
          },
          0.22,
        )
        .to(
          linkTexts,
          {
            yPercent: 0,
            x: 0,
            autoAlpha: 1,
            duration: 0.62,
            ease: "power4.out",
            stagger: 0.09,
          },
          0.28,
        )
        .to(
          linkTexts,
          {
            scale: 1.02,
            duration: 0.18,
            ease: "power2.out",
            stagger: 0.09,
          },
          0.44,
        )
        .to(
          linkTexts,
          {
            scale: 1,
            duration: 0.22,
            ease: "power2.out",
            stagger: 0.09,
          },
          0.62,
        )
        .to(
          socialHeading,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.38,
            ease: "power3.out",
          },
          0.78,
        )
        .to(
          socialLinks,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.42,
            ease: "power3.out",
            stagger: 0.07,
          },
          0.84,
        );
      menuTimelineRef.current = menuTimeline;
      buttonTimelineRef.current = buttonTimeline;
      menuTimeline.progress(menuOpenRef.current ? 1 : 0).pause();
      buttonTimeline.progress(menuOpenRef.current ? 1 : 0).pause();
    }, button);

    return () => {
      context.revert();
      menuTimelineRef.current = null;
      buttonTimelineRef.current = null;
    };
  }, [locale]);

  useEffect(() => {
    const menuTimeline = menuTimelineRef.current;
    const buttonTimeline = buttonTimelineRef.current;

    if (!menuTimeline || !buttonTimeline) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menuTimeline.progress(menuOpen ? 1 : 0).pause();
      buttonTimeline.progress(menuOpen ? 1 : 0).pause();
      return;
    }

    if (menuOpen) {
      buttonTimeline.timeScale(1).play();
      menuTimeline.timeScale(1).play();
    } else {
      buttonTimeline.eventCallback("onReverseComplete", () => {
        const button = menuButtonRef.current;

        if (button?.matches(":hover")) {
          gsap.to(button, {
            backgroundColor: "#455CE9",
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
      menuTimeline.timeScale(1.24).reverse();
      buttonTimeline.timeScale(1.24).reverse();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      if (menuReturnFocusRef.current?.isConnected) {
        menuReturnFocusRef.current.focus();
      }
      return;
    }

    menuReturnFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : menuButtonRef.current;

    const getFocusableElements = () => {
      const candidates = [
        menuButtonRef.current,
        ...(menuPanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ];
      return candidates.filter((element): element is HTMLElement => element !== null && element.tabIndex >= 0);
    };

    const firstMenuLink = menuLinksRef.current.find((link) => link?.isConnected);
    (firstMenuLink ?? menuPanelRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const activeIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
      const lastIndex = focusableElements.length - 1;
      if (event.shiftKey && activeIndex === 0) {
        event.preventDefault();
        focusableElements[lastIndex].focus();
      } else if (!event.shiftKey && (activeIndex === lastIndex || activeIndex === -1)) {
        event.preventDefault();
        focusableElements[0].focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleMenuToggle = () => {
    if (!hasScrolled) {
      return;
    }

    setMenuOpen((current) => !current);
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLanguageSelect = (
    language: (typeof languages)[number],
  ) => {
    setLocale(
      language.code === "FR"
        ? "fr"
        : language.code === "AR"
          ? "ar"
          : language.code === "DE"
            ? "de"
            : language.code === "ES"
              ? "es"
              : "en",
    );
    setLanguageOpen(false);
  };

  return (
    <>
      {/* =========================================================
          ORIGINAL DOTCODE NAVBAR
          ========================================================= */}
      <header ref={navbarRef} className="relative z-[30] flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-4 sm:px-8 lg:px-10 xl:pt-8">
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-12">
          <div className="flex items-center">
            <a href="/" aria-label="DotCode home" className="block h-[32px] w-[59px] shrink-0 sm:h-[38px] sm:w-[70px] lg:h-[42px] lg:w-[77px]">
              <img
                alt="DotCode"
                width="391"
                height="213"
                className="size-full object-contain"
                src={images.group61}
              />
            </a>
          </div>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-4 font-inter text-[14px] font-medium capitalize text-white/90 lg:flex xl:gap-6 xl:text-[16px]"
          >
            {navLinks.map(({ label, href }) => {
              const isProjectRoute = currentPath === "/projects" ||
                currentPath.startsWith("/projects/") ||
                currentPath.startsWith("/work/");
              const isCurrentPage = href === currentPath ||
                (href === "/projects" && isProjectRoute);

              return (
                <a
                  key={label}
                  href={href}
                  aria-current={isCurrentPage ? "page" : undefined}
                  className="relative whitespace-nowrap transition-all duration-200 hover:text-white"
                >
                  <span
                    data-nav-magnetic-link
                    className={`after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-white/80 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                      isCurrentPage ? "after:scale-x-100" : "after:scale-x-0"
                    }`}
                  >
                    {label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="hidden flex-col items-start justify-center gap-1 capitalize text-white md:flex">
          <p className="font-inter text-[18px] font-bold leading-none tracking-[-0.06em] lg:text-[22px] xl:text-[28px]">
            {dateTime.day}
          </p>

          <p className="font-inter text-[11px] font-medium leading-tight text-white/85 lg:text-[13px]">
            {dateTime.time} - {dateTime.date}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative z-[80]">
            <button
              type="button"
              data-language-selector
              aria-expanded={languageOpen}
              onClick={() =>
                setLanguageOpen((open) => !open)
              }
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-white backdrop-blur-sm transition-colors duration-200 sm:px-3"
            >
              <LanguageFlag src={selectedLanguage.flag} />

              <span className="font-inter text-[12px] font-bold sm:text-[14px]">
                {selectedLanguage.code}
              </span>

              <ChevronDown
                className={`size-3 transition-transform duration-200 ${
                  languageOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {languageOpen && (
              <div data-rtl-anchor="end" className="absolute right-0 top-[calc(100%+8px)] z-[120] min-w-[180px] overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                {supportedLanguages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    data-language-option
                    onClick={() =>
                      handleLanguageSelect(language)
                    }
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                      selectedLanguage.code === language.code
                        ? "bg-[#f3f4f6] text-[#111111]"
                        : "text-[#111111] hover:bg-[#f3f4f6]"
                    }`}
                  >
                    <LanguageFlag src={language.flag} />

                    <span className="flex-1 font-inter text-[13px] font-medium">
                      {getLanguageName(language)}
                    </span>

                    <span className="font-inter text-[11px] font-bold text-[#6b7280]">
                      {language.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-0">
            <a
              href="https://wa.me/213656264776"
              target="_blank"
              rel="noreferrer"
              data-no-global-button-motion
              className="flex items-center justify-center rounded-full bg-[#b7ff3c] px-2.5 py-[8px] font-inter text-[8px]! font-extrabold! uppercase tracking-[0.08em] text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7ff3c] sm:px-3 sm:py-[10px] sm:text-[9px]! lg:text-[10px]!"
            >
              Contact us
            </a>

            <a
              href="tel:+213656264776"
              aria-label="Call DotCode"
              className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#b7ff3c] text-black sm:size-[34px] lg:size-[38px]"
            >
              <img
                src={flaticonIcons.phone}
                alt=""
                width="512"
                height="512"
                className="size-4 brightness-0 sm:size-[18px] lg:size-5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          GSAP SIDE MENU
          ========================================================= */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              ref={menuOverlayRef}
              className={`fixed inset-0 z-[195] bg-black/10 ${
                menuOpen
                  ? "pointer-events-auto"
                  : "pointer-events-none"
              }`}
              onClick={() => setMenuOpen(false)}
              aria-hidden={!menuOpen}
            />

            {/* The same floating menu button sits above the panel as its close control. */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={handleMenuToggle}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" && !menuOpen) {
                  gsap.to(event.currentTarget, {
                    backgroundColor: "#455CE9",
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" && !menuOpen) {
                  gsap.to(event.currentTarget, {
                    backgroundColor: "#0A0A0A",
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu-panel"
              data-rtl-anchor="end-button"
              className={`fixed right-4 top-4 z-[210] flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/15 bg-[#0A0A0A] shadow-[0_12px_32px_rgba(0,0,0,0.14)] md:right-6 md:top-6 md:h-[76px] md:w-[76px] ${hasScrolled ? "" : "hidden"}`}
            >
              <span className="relative block h-4 w-6">
                <span
                  ref={menuLineTopRef}
                  className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center bg-white"
                />

                <span
                  ref={menuLineBottomRef}
                  className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center bg-white"
                />
              </span>
            </button>

            <aside
              ref={menuPanelRef}
              id="site-menu-panel"
              data-rtl-anchor="end-panel"
              aria-labelledby="site-menu-title"
              className={`fixed right-0 top-0 z-[205] h-dvh w-[min(92vw,560px)] overflow-hidden bg-[#0A0A0A] text-white sm:w-[min(560px,58vw)] md:w-[min(500px,62vw)] lg:w-[min(740px,40vw)] ${
                menuOpen
                  ? "pointer-events-auto"
                  : "pointer-events-none"
              }`}
              aria-hidden={!menuOpen}
              aria-modal={menuOpen}
              role="dialog"
              tabIndex={-1}
              inert={!menuOpen}
            >
              <div className="h-full min-h-dvh overflow-y-auto overscroll-contain flex flex-col justify-between md:justify-start px-6 pb-16 pt-20 md:px-10 md:pb-16 md:pt-20 lg:justify-between lg:px-16">
                <div>
                  <p
                    id="site-menu-title"
                    ref={menuIntroRef}
                    className="mb-7 text-xs font-semibold uppercase tracking-[0.14em] text-white/45"
                  >
                    NAVIGATION
                  </p>
                  <div className="mb-8 max-w-[450px] border-b border-white/20" />

                  {/* Main menu links */}
                  <nav className="flex flex-col gap-2">
                    {menuLinks.map((link, index) => (
                      <a
                        key={link.label}
                        ref={(element) => {
                          if (element) {
                            menuLinksRef.current[index] =
                              element;
                          }
                        }}
                        href={link.href}
                        onClick={handleMenuLinkClick}
                        className="group relative block w-fit py-1 pl-8 font-semibold leading-[0.88] tracking-[-0.055em]"
                      >
                        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#A3E635] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <span
                          className="menu-link-text inline-block origin-left transition-transform duration-300 ease-out group-hover:translate-x-1"
                          style={{ fontSize: "clamp(26px, 5vw, 30px)" }}
                        >
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-16 md:mt-5 lg:mt-10">
                  <p
                    ref={menuSocialHeadingRef}
                    className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-white/35"
                  >
                    Follow us
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {menuSocials.map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        ref={(element) => {
                          if (element) {
                            menuSocialsRef.current[index] =
                              element;
                          }
                        }}
                        aria-label={social.label}
                        className="text-sm text-white/65"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            </aside>
          </>,
          document.body,
        )}
    </>
  );
}

export { Header };
