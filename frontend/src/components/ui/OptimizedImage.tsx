import type { ComponentProps } from "react";

type OptimizedImageProps = ComponentProps<"img"> & {
  pictureClassName?: string;
  webpSrc?: string;
};

export function OptimizedImage({
  pictureClassName = "contents",
  webpSrc,
  src,
  ...imageProps
}: OptimizedImageProps) {
  const fallbackSrc = typeof src === "string" ? src : undefined;
  const optimizedSrc =
    webpSrc ?? fallbackSrc?.replace(/\.png(?=$|[?#])/i, ".webp");

  if (!fallbackSrc || !optimizedSrc || optimizedSrc === fallbackSrc) {
    return <img src={src} {...imageProps} />;
  }

  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={optimizedSrc} />
      <img src={fallbackSrc} {...imageProps} />
    </picture>
  );
}
