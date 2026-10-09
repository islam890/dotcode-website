import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import { arabic, french, german, spanish } from "@/data/translations"

export type Locale = "en" | "fr" | "ar" | "de" | "es"

const localePathSegments: Record<Locale, string> = {
  en: "En",

  fr: "Fr",

  ar: "Ar",

  de: "De",

  es: "Es",
}

export function localeFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/(en|fr|ar|de|es)(?=\/|$)/i)

  return match ? match[1].toLowerCase() as Locale : null
}

export function stripLocaleFromPath(pathname: string): string {
  const stripped = pathname.replace(/^\/(?:en|fr|ar|de|es)(?=\/|$)/i, "")

  return stripped || "/"
}

export function isAppRoutePath(pathname: string): boolean {
  const route = stripLocaleFromPath(pathname).replace(/\/+$/, "") || "/"

  return (
    route === "/" ||
    /^\/(?:services|about|projects|work|contact|testimonials|privacy-policy)(?:\/|$)/.test(
      route,
    )
  )
}

export function localizePath(pathname: string, locale: Locale): string {
  const route = stripLocaleFromPath(pathname).replace(/\/+$/, "") || "/"

  return `/${localePathSegments[locale]}${route === "/" ? "" : route}`
}

const LocaleContext = createContext<{
  locale: Locale

  setLocale: (locale: Locale) => void
} | null>(null)

const normalizedFrench = new Map(
  Object.entries(french).map(([english, translation]) => [
    english.trim().replace(/\s+/g, " "),

    translation,
  ]),
)

const normalizedArabic = new Map(
  Object.entries(arabic).map(([english, translation]) => [
    english.trim().replace(/\s+/g, " "),

    translation,
  ]),
)

const normalizedGerman = new Map(
  Object.entries(german).map(([english, translation]) => [
    english.trim().replace(/\s+/g, " "),

    translation,
  ]),
)

const normalizedSpanish = new Map(
  Object.entries(spanish).map(([english, translation]) => [
    english.trim().replace(/\s+/g, " "),

    translation,
  ]),
)

function translateText(source: string, locale: Locale) {
  const normalized = source.trim().replace(/\s+/g, " ")

  const dictionary =
    locale === "ar"
      ? normalizedArabic
      : locale === "de"
        ? normalizedGerman
        : locale === "es"
          ? normalizedSpanish
          : normalizedFrench

  const entries =
    locale === "ar"
      ? arabicEntriesByLength
      : locale === "de"
        ? germanEntriesByLength
        : locale === "es"
          ? spanishEntriesByLength
          : frenchEntriesByLength

  const exact = dictionary.get(normalized)

  if (exact) {
    const leading = source.match(/^\s*/)?.[0] ?? ""

    const trailing = source.match(/\s*$/)?.[0] ?? ""

    return `${leading}${exact}${trailing}`
  }

  let translated = source

  for (const [english, translatedText] of entries) {
    if (english.length > 3 && translated.includes(english)) {
      translated = translated.split(english).join(translatedText)
    }
  }

  return translated
}

const frenchEntriesByLength = Object.entries(french).sort(
  ([first], [second]) => second.length - first.length,
)

const arabicEntriesByLength = Object.entries(arabic).sort(
  ([first], [second]) => second.length - first.length,
)

const germanEntriesByLength = Object.entries(german).sort(
  ([first], [second]) => second.length - first.length,
)

const spanishEntriesByLength = Object.entries(spanish).sort(
  ([first], [second]) => second.length - first.length,
)

interface TextState {
  source: string
  rendered: string
  locale: Locale
}

const textStates = new WeakMap<Text, TextState>()

const attributeStates = new WeakMap<Element, Map<string, TextState>>()

function localizeTextNode(node: Text, locale: Locale) {
  const current = node.nodeValue ?? ""

  const previous = textStates.get(node)

  const source =
    previous && current === previous.rendered ? previous.source : current

  const rendered = locale === "en" ? source : translateText(source, locale)

  textStates.set(node, { source, rendered, locale })

  if (rendered !== current) node.nodeValue = rendered
}

function localizeAttribute(element: Element, name: string, locale: Locale) {
  const current = element.getAttribute(name)

  if (current === null) return

  let state = attributeStates.get(element)

  if (!state) {
    state = new Map()

    attributeStates.set(element, state)
  }

  const previous = state.get(name)

  const source =
    previous && current === previous.rendered ? previous.source : current

  const rendered = locale === "en" ? source : translateText(source, locale)

  state.set(name, { source, rendered, locale })

  if (rendered !== current) element.setAttribute(name, rendered)
}

function localizeTree(root: Node, locale: Locale) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = root.parentElement

    if (parent?.closest("script, style, noscript, code, pre, svg")) return

    localizeTextNode(root as Text, locale)

    return
  }

  if (root instanceof Element) {
    if (root.matches("script, style, noscript, code, pre, svg")) return

    for (const attribute of [
      "aria-label",
      "aria-description",
      "alt",
      "placeholder",
      "title",
      "content",
    ]) {
      localizeAttribute(root, attribute, locale)
    }
  }

  for (const child of Array.from(root.childNodes)) localizeTree(child, locale)
}

function LocaleDomSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale

    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"

    localizeTree(document.documentElement, locale)

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") {
          localizeTree(record.target, locale)
        } else {
          record.addedNodes.forEach((node) => localizeTree(node, locale))

          if (
            record.type === "attributes" &&
            record.target instanceof Element
          ) {
            localizeAttribute(record.target, record.attributeName ?? "", locale)
          }
        }
      }
    })

    observer.observe(document.documentElement, {
      subtree: true,

      childList: true,

      characterData: true,

      attributes: true,

      attributeFilter: [
        "aria-label",
        "aria-description",
        "alt",
        "placeholder",
        "title",
        "content",
      ],
    })

    return () => observer.disconnect()
  }, [locale])

  return null
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const pathLocale = localeFromPath(window.location.pathname)

      if (pathLocale) return pathLocale

      const storedLocale = localStorage.getItem("dotcode-locale")

      return storedLocale === "fr" ||
        storedLocale === "ar" ||
        storedLocale === "de" ||
        storedLocale === "es"
        ? storedLocale
        : "en"
    } catch {
      return "en"
    }
  })

  useEffect(() => {
    if (localeFromPath(window.location.pathname)) return

    const localizedPath = localizePath(window.location.pathname, locale)

    window.history.replaceState(
      window.history.state,

      "",

      `${localizedPath}${window.location.search}${window.location.hash}`,
    )
  }, [locale])

  const setLocale = (nextLocale: Locale) => {
    try {
      localStorage.setItem("dotcode-locale", nextLocale)
    } catch {
      // The selected language still applies for this page when storage is unavailable.
    }

    const localizedPath = localizePath(window.location.pathname, nextLocale)

    window.history.replaceState(
      window.history.state,

      "",

      `${localizedPath}${window.location.search}${window.location.hash}`,
    )

    setLocaleState(nextLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <LocaleDomSync locale={locale} />
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) throw new Error("useLocale must be used inside LocaleProvider")

  return context
}
