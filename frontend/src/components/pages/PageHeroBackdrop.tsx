/** Shared, low contrast backdrop for the standalone section pages. */
export function PageHeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(69,92,233,0.24),transparent_36%),radial-gradient(ellipse_at_18%_88%,rgba(163,230,53,0.09),transparent_32%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18rem] top-[10%] size-[min(82vw,52rem)] rounded-full border border-white/[0.08] sm:-right-[12rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12rem] top-[20%] size-[min(62vw,40rem)] rounded-full border border-white/[0.06] sm:-right-[8rem]"
      />
    </>
  );
}
