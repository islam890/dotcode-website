import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowDown, ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/Hero";
import { allProjects, type Project } from "@/data/projects";
import { usePageMetadata } from "@/hooks/usePageMetadata";

gsap.registerPlugin(ScrollTrigger);

function projectRoute(slug: string) {
  return `/projects/${encodeURIComponent(slug)}`;
}

function orderProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return Date.parse(b.created_at) - Date.parse(a.created_at);
  });
}

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className="relative flex aspect-[1.04/1] items-center justify-center overflow-hidden bg-[#ededed] p-[8%]">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(#bdbdbd_.7px,transparent_.7px)] [background-size:12px_12px]" />
      <div className="relative flex aspect-[1.18/1] w-full items-center justify-center overflow-hidden bg-[#171719] px-5 text-center text-white shadow-xl sm:px-8">
        <div aria-hidden="true" className="absolute -right-[18%] -top-[38%] aspect-square w-[82%] rounded-full bg-[#455CE9]" />
        <div aria-hidden="true" className="absolute -bottom-[55%] -left-[14%] aspect-square w-[78%] rounded-full border border-white/25" />
        <span className="relative z-10 max-w-[85%] font-sora text-[clamp(1.1rem,3vw,2.7rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
          {project.title}
        </span>
        <span className="absolute left-1/2 top-1/2 z-20 flex size-[clamp(3.5rem,7vw,6.5rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#455CE9] font-inter text-[clamp(.7rem,1.2vw,1rem)] font-semibold text-white shadow-lg">
          View
        </span>
      </div>
    </div>
  );
}

function matchesCategory(project: Project, category: string) {
  if (category === "ALL") return true;
  const value = project.category.toLowerCase();
  return category === "DESIGN"
    ? value.includes("design") || value.includes("ui/ux")
    : /development|web|mobile|software|saas|application|ai/.test(value);
}

function moveButtonTowardPointer(event: ReactMouseEvent<HTMLButtonElement>) {
  const button = event.currentTarget;
  const bounds = button.getBoundingClientRect();
  const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
  const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
  button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function resetMagneticButton(event: ReactMouseEvent<HTMLButtonElement>) {
  event.currentTarget.style.transform = "translate3d(0, 0, 0)";
}

function ProjectArchiveRow({ project, hovered, onHover }: { project: Project; hovered: boolean; onHover: (id: number | null, x?: number, y?: number) => void }) {
  const year = Number.isNaN(Date.parse(project.created_at))
    ? "—"
    : new Date(project.created_at).getFullYear();
  const content = (
    <div className={`grid grid-cols-1 items-center gap-3 transition-opacity duration-300 sm:grid-cols-12 sm:gap-5 lg:gap-8 ${hovered ? "sm:opacity-[.45]" : ""}`}>
      <div className="sm:col-span-8">
        <h3 className="font-sora text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.06em] text-black transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[500px] font-inter text-xs leading-[1.6] text-black/55 sm:text-sm sm:hidden">{project.short_description}</p>
      </div>
      <p className="font-inter text-xs text-black/55 sm:col-span-3 sm:text-sm">{project.category}</p>
      <p className="hidden font-inter text-sm text-black/50 sm:col-span-1 sm:block">{year}</p>
    </div>
  );

  return (
    <a data-project-item href={projectRoute(project.slug)} className="group relative block border-b border-black/10 px-2 py-6 transition-colors duration-300 hover:bg-black/[0.018] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#455CE9] sm:px-4 sm:py-8" aria-label={`View project: ${project.title}`} onMouseEnter={(event) => onHover(project.id, event.clientX, event.clientY)} onMouseMove={(event) => onHover(project.id, event.clientX, event.clientY)} onMouseLeave={() => onHover(null)} onFocus={(event) => { const rect = event.currentTarget.getBoundingClientRect(); onHover(project.id, rect.left + rect.width / 2, rect.top + rect.height / 2); }} onBlur={() => onHover(null)}>
      {content}
    </a>
  );
}

function ProjectGridCard({ project }: { project: Project }) {
  const content = <><ProjectArtwork project={project} /><div className="flex items-start justify-between gap-4 pt-4"><div><p className="font-inter text-[9px] font-bold uppercase tracking-[0.12em] text-black/45">{project.category}</p><h3 className="mt-2 font-sora text-2xl font-medium tracking-[-0.06em]">{project.title}</h3><p className="mt-2 font-inter text-xs leading-relaxed text-black/55">{project.short_description}</p></div><ArrowUpRight className="mt-1 size-5 shrink-0" aria-hidden="true" /></div></>;
  return <a className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#455CE9]" href={projectRoute(project.slug)} aria-label={`View project: ${project.title}`}>{content}</a>;
}

export function ProjectsPage() {
  const projects = useMemo(() => orderProjects(allProjects), []);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewPositionRef = useRef<HTMLDivElement>(null);
  const hoveredProjectIdRef = useRef<number | null>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const previewFrameRef = useRef<number | null>(null);
  const didFilterRef = useRef(false);

  const movePreviewToPointer = () => {
    const preview = previewPositionRef.current;
    if (!preview) return;
    const halfPreview = Math.min(window.innerWidth * 0.14, 220);
    const x = Math.max(halfPreview + 12, Math.min(pointerPositionRef.current.x, window.innerWidth - halfPreview - 12));
    const y = Math.max(halfPreview + 12, Math.min(pointerPositionRef.current.y, window.innerHeight - halfPreview - 12));
    preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  const updateProjectPreview = (id: number | null, x?: number, y?: number) => {
    if (hoveredProjectIdRef.current !== id) {
      hoveredProjectIdRef.current = id;
      setHoveredProjectId(id);
    }
    if (id === null || x === undefined || y === undefined) return;
    pointerPositionRef.current = { x, y };
    if (previewFrameRef.current !== null) return;
    previewFrameRef.current = window.requestAnimationFrame(() => {
      previewFrameRef.current = null;
      movePreviewToPointer();
    });
  };

  usePageMetadata(
    "Our Projects | DotCode",
    "Explore DotCode projects across digital products, software, websites, applications and AI solutions.",
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [projects]);

  const categories = ["ALL", "DESIGN", "DEVELOPMENT"];
  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesCategory(project, activeCategory)),
    [activeCategory, projects],
  );
  const canShowProjects = true;

  useLayoutEffect(() => {
    if (!didFilterRef.current) {
      didFilterRef.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-project-item]");
    if (!cards?.length) return;
    gsap.fromTo(cards, { autoAlpha: 0.45, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.045, ease: "power2.out", overwrite: true });
  }, [activeCategory]);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview || hoveredProjectId === null) return;
    movePreviewToPointer();
    gsap.fromTo(preview, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "power1.out", overwrite: true });
  }, [hoveredProjectId]);

  useEffect(() => () => {
    if (previewFrameRef.current !== null) window.cancelAnimationFrame(previewFrameRef.current);
  }, []);

  return (
    <>
      <main className="relative z-10 w-full bg-white">
        <PageHero>
          <Header />
          <div className="relative mx-auto flex min-h-[62svh] w-full max-w-[1508px] flex-col justify-between gap-12 px-4 pb-8 pt-14 sm:min-h-[68svh] sm:px-8 sm:pb-12 sm:pt-20 lg:px-10 lg:pt-16">
            <div className="flex items-center gap-4 font-inter text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60 sm:text-xs"><span>Selected work</span><span aria-hidden="true" className="h-px flex-1 bg-white/25" /></div>
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
              <div className="md:col-span-7">
                <p data-anim="hero-head" className="mb-4 font-sora text-sm font-medium uppercase tracking-[0.14em] text-[#b7ff3c] sm:text-base">Our projects /</p>
                <h1 data-anim="hero-head" className="max-w-[850px] font-sora text-[clamp(3rem,4.8vw,5rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white">Creating next level<br />digital products</h1>
              </div>
              <div className="flex flex-col items-start gap-5 md:col-span-4 md:col-start-9 md:gap-6">
                <p data-anim="hero-copy" className="max-w-[440px] font-sora text-[clamp(1.4rem,2.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.055em] text-white">We don&rsquo;t just talk about digital products. We build them.</p>
                <p data-anim="hero-copy" className="max-w-[390px] font-inter text-sm leading-[1.65] text-white/75 sm:text-base">A selection of software, websites, applications and AI products shaped around real ideas.</p>
                <a data-anim="hero-cta" href="#projects" className="group flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#b7ff3c] sm:text-xs"><span>Explore the work</span><span className="flex size-9 items-center justify-center rounded-full border border-white/35 transition-all duration-300 group-hover:border-[#b7ff3c] group-hover:bg-[#b7ff3c] group-hover:text-black"><ArrowDown className="size-4" aria-hidden="true" /></span></a>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/25 pt-4 font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]"><span>Ideas made tangible</span><span>DotCode / Projects</span></div>
          </div>
        </PageHero>
        <section id="projects" className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div data-reveal className="mb-8 grid grid-cols-1 gap-6 border-b border-black/10 pb-6 sm:mb-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8"><p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">01 / Project archive</p><h2 className="font-sora text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.065em] text-black">Built for the real world.</h2></div>
              <p className="max-w-[330px] font-inter text-sm leading-relaxed text-black/55 md:col-span-4 md:justify-self-end">Digital work made with care, intention and a clear reason to exist.</p>
            </div>

            {canShowProjects && projects.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center justify-between gap-5 sm:mb-12">
                <nav aria-label="Filter projects by category" className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => {
                    const selected = activeCategory === category;
                    const hovered = hoveredControl === `filter-${category}`;
                    const count = category === "ALL" ? null : projects.filter((project) => matchesCategory(project, category)).length;
                    const label = category === "ALL" ? "All" : category === "DESIGN" ? "Design" : "Development";
                    return (
                      <button key={category} type="button" aria-pressed={selected} onClick={() => setActiveCategory(category)} onMouseEnter={() => setHoveredControl(`filter-${category}`)} onMouseMove={moveButtonTowardPointer} onMouseLeave={(event) => { resetMagneticButton(event); setHoveredControl(null); }} className={`group inline-flex min-h-12 items-center gap-1 rounded-full border px-5 font-inter text-sm font-medium tracking-[-0.04em] transition-[color,background-color,border-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#455CE9] sm:min-h-[78px] sm:px-9 sm:text-base ${hovered ? "border-[#455CE9] bg-[#455CE9] text-white" : selected ? "border-[#1d1d1f] bg-[#1d1d1f] text-white" : "border-black/15 bg-white text-black"}`}>
                        <span>{label}</span>{count !== null && <sup className={`-mt-2 text-[10px] transition-colors duration-200 ${hovered || selected ? "text-white/65" : "text-black/45"}`}>{count}</sup>}
                      </button>
                    );
                  })}
                </nav>
                <div role="group" aria-label="Project view" className="flex gap-2">
                  {(["list", "grid"] as const).map((mode) => {
                    const selected = viewMode === mode;
                    const hovered = hoveredControl === `view-${mode}`;
                    const Icon = mode === "list" ? List : LayoutGrid;
                    return (
                      <button key={mode} type="button" aria-label={mode === "list" ? "List view" : "Grid view"} aria-pressed={selected} onClick={() => { setViewMode(mode); setHoveredProjectId(null); hoveredProjectIdRef.current = null; }} onMouseEnter={() => setHoveredControl(`view-${mode}`)} onMouseMove={moveButtonTowardPointer} onMouseLeave={(event) => { resetMagneticButton(event); setHoveredControl(null); }} className={`flex size-12 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#455CE9] sm:size-[78px] ${hovered ? "border-[#455CE9] bg-[#455CE9] text-white" : selected ? "border-[#1d1d1f] bg-[#1d1d1f] text-white" : "border-black/15 bg-white text-black"}`}>
                        <Icon className={mode === "list" ? "size-5" : "size-4"} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}



            {projects.length === 0 && <div className="border-y border-black/15 py-14 text-center sm:py-20"><p className="font-sora text-[clamp(1.8rem,5vw,3.2rem)] font-semibold tracking-[-0.06em]">The next project is taking shape.</p><p className="mx-auto mt-3 max-w-[420px] font-inter text-sm leading-relaxed text-black/60">We&rsquo;re preparing the work to share here. Have an idea of your own? Let&rsquo;s make it real.</p></div>}

            {projects.length > 0 && visibleProjects.length === 0 && <div className="border-y border-black/15 py-14 text-center font-inter text-sm text-black/55">No projects in this category yet.</div>}

            {canShowProjects && visibleProjects.length > 0 && (
              <div ref={listRef} className="relative">
                {viewMode === "list" ? (
                  <>
                    <div className="hidden grid-cols-12 gap-5 border-b border-black/15 px-4 pb-3 font-inter text-[9px] font-bold uppercase tracking-[0.14em] text-black/40 sm:grid lg:gap-8">
                      <span className="col-span-8">Client</span><span className="col-span-3">Services</span><span className="col-span-1">Year</span>
                    </div>
                    {visibleProjects.map((project) => <ProjectArchiveRow key={project.id} project={project} hovered={hoveredProjectId === project.id} onHover={updateProjectPreview} />)}
                    {hoveredProjectId !== null && viewMode === "list" && (() => {
                      const project = visibleProjects.find((item) => item.id === hoveredProjectId);
                      if (!project) return null;
                      return <div ref={previewPositionRef} className="pointer-events-none fixed left-0 top-0 z-[60] hidden w-[min(28vw,440px)] sm:block"><div ref={previewRef}><ProjectArtwork project={project} /></div></div>;
                    })()}
                  </>
                ) : (
                  <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
                    {visibleProjects.map((project) => <ProjectGridCard key={project.id} project={project} />)}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
