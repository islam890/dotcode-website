import { useEffect } from "react";

function updateMeta(selector: string, attributes: Record<string, string>, content: string) {
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

export function usePageMetadata(title: string | null, description: string | null) {
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

    return () => {
      document.title = previousTitle;
      restoreDescription();
      restoreOpenGraphTitle();
      restoreOpenGraphDescription();
    };
  }, [title, description]);
}
