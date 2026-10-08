
import { useEffect } from "react";

const SITE_URL = "https://www.dotcodeagency.tech";

const LOCALE_PATHS = [
  { locale: "en", path: "/En" },
  { locale: "fr", path: "/Fr" },
  { locale: "ar", path: "/Ar" },
  { locale: "de", path: "/De" },
  { locale: "es", path: "/Es" },
] as const;

function getCanonicalUrl() {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
  if (!configuredSiteUrl) return null;

  try {
    const siteUrl = new URL(configuredSiteUrl);

    if (siteUrl.protocol !== "https:" && siteUrl.protocol !== "http:") {
      return null;
    }

    const routePath = window.location.pathname.replace(/\/+$/, "") || "/";
    return new URL(routePath, `${siteUrl.href.replace(/\/+$/, "")}/`).href;
  } catch {
    return null;
  }
}

function updateMeta(
  selector: string,
  attributes: Record<string, string>,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  const created = !element;

  if (!element) {
    element = document.createElement("meta");

    Object.entries(attributes).forEach(([name, value]) => {
      element?.setAttribute(name, value);
    });

    document.head.append(element);
  }

  const previousContent = element.getAttribute("content");
  element.setAttribute("content", content);

  return () => {
    if (created) {
      element?.remove();
    } else if (previousContent === null) {
      element?.removeAttribute("content");
    } else {
      element?.setAttribute("content", previousContent);
    }
  };
}

function updateLink(
  selector: string,
  attributes: Record<string, string>,
  href: string | null,
) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  const created = !element && href !== null;

  if (!element && href !== null) {
    element = document.createElement("link");

    Object.entries(attributes).forEach(([name, value]) => {
      element?.setAttribute(name, value);
    });

    document.head.append(element);
  }

  const previousHref = element?.getAttribute("href") ?? null;

  if (element && href !== null) {
    element.setAttribute("href", href);
  }

  return () => {
    if (created) {
      element?.remove();
    } else if (element && previousHref === null) {
      element.removeAttribute("href");
    } else if (element) {
      element.setAttribute("href", previousHref!);
    }
  };
}

function updateHreflangLinks() {
  const existingLinks = [
    ...document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]'),
  ];

  const previousLinks = existingLinks.map((link) => link.cloneNode(true) as HTMLLinkElement);
  existingLinks.forEach((link) => link.remove());

  const routePath = window.location.pathname.replace(
    /^\/(?:en|fr|ar|de|es)(?=\/|$)/i,
    "",
  );

  const normalizedPath = routePath.replace(/\/+$/, "");
  const suffix = normalizedPath ? normalizedPath : "";

  const links = [
    ...LOCALE_PATHS.map(({ locale, path }) => ({
      hreflang: locale,
      href: `${SITE_URL}${path}${suffix}`,
    })),
    {
      hreflang: "x-default",
      href: `${SITE_URL}/En${suffix}`,
    },
  ];

  links.forEach(({ hreflang, href }) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = hreflang;
    link.href = href;
    document.head.append(link);
  });

  return () => {
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());

    previousLinks.forEach((link) => document.head.append(link));
  };
}

export function usePageMetadata(
  title: string | null,
  description: string | null,
) {
  useEffect(() => {
    if (!title || !description) return;

    const previousTitle = document.title;
    document.title = title;

    const restoreDescription = updateMeta(
      'meta[name="description"]',
      { name: "description" },
      description,
    );

    const restoreOpenGraphTitle = updateMeta(
      'meta[property="og:title"]',
      { property: "og:title" },
      title,
    );

    const restoreOpenGraphDescription = updateMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      description,
    );

    const restoreOpenGraphType = updateMeta(
      'meta[property="og:type"]',
      { property: "og:type" },
      "website",
    );

    const restoreTwitterCard = updateMeta(
      'meta[name="twitter:card"]',
      { name: "twitter:card" },
      "summary",
    );

    const restoreTwitterTitle = updateMeta(
      'meta[name="twitter:title"]',
      { name: "twitter:title" },
      title,
    );

    const restoreTwitterDescription = updateMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      description,
    );

    const canonicalUrl = getCanonicalUrl();

    const restoreCanonical = updateLink(
      'link[rel="canonical"]',
      { rel: "canonical" },
      canonicalUrl,
    );

    const restoreOpenGraphUrl = canonicalUrl
      ? updateMeta(
          'meta[property="og:url"]',
          { property: "og:url" },
          canonicalUrl,
        )
      : () => {};

    const restoreHreflangLinks = updateHreflangLinks();

    return () => {
      document.title = previousTitle;
      restoreDescription();
      restoreOpenGraphTitle();
      restoreOpenGraphDescription();
      restoreOpenGraphType();
      restoreTwitterCard();
      restoreTwitterTitle();
      restoreTwitterDescription();
      restoreCanonical();
      restoreOpenGraphUrl();
      restoreHreflangLinks();
    };
  }, [title, description]);
}
