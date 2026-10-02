import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, RotateCw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/Hero";
import { conceptProjects, type Project } from "@/data/projects";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type LoadState = "loading" | "ready" | "not-found" | "error";

const apiBase = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");

function projectRoute(slug: string) {
  return `/projects/${encodeURIComponent(slug)}`;
}

function orderProjects(items: Project[]) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return Date.parse(b.created_at) - Date.parse(a.created_at);
  });
}

function ProjectShowcase({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">
      <div className="relative flex aspect-[1.15/1] max-h-[850px] items-center justify-center overflow-hidden bg-[#f0f0f0] p-[7%] sm:aspect-[1.85/1]">
        <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(#bdbdbd_.8px,transparent_.8px)] [background-size:16px_16px]" />
        <div className="relative flex size-full items-center overflow-hidden bg-[#171719] px-7 text-white sm:px-14 lg:px-20">
          <div aria-hidden="true" className="absolute -right-[12%] -top-[70%] size-[115%] rounded-full bg-[#455CE9]" />
          <div aria-hidden="true" className="absolute -bottom-[90%] left-[8%] size-[115%] rounded-full border border-white/20" />
          <div className="relative z-10 max-w-[760px]">
            <p className="mb-5 font-inter text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 sm:text-xs">DotCode / {project.category}</p>
            <h2 className="font-sora text-[clamp(2.3rem,8vw,7rem)] font-semibold leading-[0.88] tracking-[-0.075em]">{project.title}<span className="text-[#b7ff3c]">.</span></h2>
          </div>
          <div className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full bg-[#b7ff3c] text-black sm:bottom-10 sm:right-10 sm:size-16">
            <ArrowUpRight className="size-5 sm:size-7" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(conceptProjects);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    const controller = new AbortController();
    const localConcept = conceptProjects.find((item) => item.slug === slug);
    if (localConcept) {
      setProject(localConcept);
      setProjects(conceptProjects);
      setState("ready");
      return () => controller.abort();
    }

    fetch(`${apiBase}/projects/`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Projects request failed (${response.status}).`);
        const payload: unknown = await response.json();
        if (!Array.isArray(payload)) throw new Error("The projects response was not a list.");
        return (payload as Project[]).filter((item) => item.published);
      })
      .then((publishedProjects) => {
        const allProjects = orderProjects([...publishedProjects, ...conceptProjects]);
        setProjects(allProjects);
        const match = allProjects.find((item) => item.slug === slug);
        setProject(match ?? null);
        setState(match ? "ready" : "not-found");
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setState("error");
      });

    return () => controller.abort();
  }, [slug]);

  usePageMetadata(
    project ? `${project.title} | DotCode Projects` : null,
    project?.short_description ?? null,
  );

  const nextProject = useMemo(() => {
    if (!project || projects.length < 2) return null;
    const currentIndex = projects.findIndex((item) => item.slug === project.slug);
    return projects[(currentIndex + 1) % projects.length];
  }, [project, projects]);

  if (state === "loading") {
    return <main className="relative z-10 min-h-dvh bg-white"><Header /><div role="status" className="mx-auto max-w-[1457px] px-4 py-28 font-inter text-sm text-black/55 sm:px-8 lg:px-10">Loading project…</div></main>;
  }

  if (state === "not-found" || state === "error" || !project) {
    return (
      <main className="relative z-10 min-h-dvh bg-white">
        <Header />
        <section className="mx-auto max-w-[1457px] px-4 py-24 sm:px-8 lg:px-10">
          <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/45">Project /</p>
          <h1 className="mt-4 font-sora text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-[-0.07em]">{state === "error" ? "Projects are taking a moment." : "Project not found."}</h1>
          <a href="/projects" className="mt-8 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.12em] text-[#455CE9]"><ArrowLeft className="size-4" aria-hidden="true" /> Back to all projects</a>
          {state === "error" && <button type="button" onClick={() => window.location.reload()} className="ml-5 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.12em] text-black/60"><RotateCw className="size-4" aria-hidden="true" /> Try again</button>}
        </section>
      </main>
    );
  }

  const parsedYear = new Date(project.created_at).getFullYear();
  const year = Number.isNaN(parsedYear) ? "—" : parsedYear;

  return (
    <main className="relative z-10 w-full bg-white">
      <PageHero>
        <Header />
        <div className="mx-auto flex min-h-[58svh] w-full max-w-[1508px] flex-col justify-between gap-12 px-4 pb-8 pt-14 sm:min-h-[64svh] sm:px-8 sm:pb-12 sm:pt-20 lg:px-10 lg:pt-16">
          <div className="flex items-center gap-4 font-inter text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60 sm:text-xs"><span>Project / {project.category}</span><span aria-hidden="true" className="h-px flex-1 bg-white/25" /></div>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <p className="mb-4 font-sora text-sm font-medium uppercase tracking-[0.14em] text-[#b7ff3c] sm:text-base">Selected work</p>
              <h1 data-hero-title className="max-w-[1000px] font-sora text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">{project.title}<span className="text-[#b7ff3c]">.</span></h1>
            </div>
            <div className="flex flex-col items-start gap-5 md:col-span-4 md:pb-2">
              <p className="font-sora text-[clamp(1.25rem,2.3vw,2rem)] font-medium leading-[1.15] tracking-[-0.045em] text-white">{project.short_description}</p>
              {project.project_url && <a href={project.project_url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#b7ff3c] sm:text-xs"><span>Visit live project</span><span className="flex size-9 items-center justify-center rounded-full border border-white/35 transition-colors duration-200 group-hover:border-[#b7ff3c] group-hover:bg-[#b7ff3c] group-hover:text-black"><ArrowUpRight className="size-4" aria-hidden="true" /></span></a>}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/25 pt-4 font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]"><span>{project.client_name || (project.isConcept ? "Concept project" : "DotCode")}</span><span>DotCode / Projects</span></div>
        </div>
      </PageHero>

      <section className="bg-white px-4 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-[1457px] gap-8 border-b border-black/15 pb-10 md:grid-cols-12 md:gap-10 lg:pb-14">
          <div className="md:col-span-4"><p className="font-sora text-sm font-medium tracking-[0.08em] text-black/45">01 / Project details</p><h2 className="mt-5 font-sora text-[clamp(1.8rem,4.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]">A closer look.</h2></div>
          <dl aria-label="Project information" className="grid gap-7 sm:grid-cols-2 md:col-span-8 md:grid-cols-4">
            <ProjectFact label="Role / Services" value={project.category} />
            <ProjectFact label="Client" value={project.client_name || (project.isConcept ? "DotCode concept" : "DotCode")} />
            <ProjectFact label="Project type" value={project.isConcept ? "Concept project" : "Digital product"} />
            <ProjectFact label="Year" value={String(year)} />
          </dl>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1457px] gap-6 md:grid-cols-12 md:gap-10 lg:mt-14">
          <p className="font-sora text-sm font-medium tracking-[0.08em] text-black/45 md:col-span-4">02 / The project</p>
          <div className="md:col-span-8"><h2 className="max-w-[960px] font-sora text-[clamp(2rem,5.2vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]">The thinking behind the work<span className="text-[#455ce9]">.</span></h2><p className="mt-7 max-w-[760px] whitespace-pre-line font-inter text-sm leading-[1.8] text-black/60 sm:text-base">{project.description}</p></div>
        </div>
      </section>

      <ProjectShowcase project={project} />

      {nextProject && (
        <section className="mt-14 bg-[#101012] px-4 py-12 text-white sm:mt-20 sm:px-8 sm:py-16 lg:mt-28 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1457px]">
            <a href={projectRoute(nextProject.slug)} className="group block border-b border-white/20 pb-10 sm:pb-14">
              <div className="flex items-center justify-between gap-5"><p className="font-inter text-[9px] font-bold uppercase tracking-[0.16em] text-white/55 sm:text-[10px]">Next case / {nextProject.category}</p><span className="flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-200 group-hover:border-[#b7ff3c] group-hover:bg-[#b7ff3c] group-hover:text-black sm:size-14"><ArrowUpRight className="size-5" aria-hidden="true" /></span></div>
              <h2 className="mt-8 font-sora text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.075em] transition-colors duration-200 group-hover:text-[#b7ff3c]">{nextProject.title}</h2>
            </a>
            <a href="/projects" className="mt-7 inline-flex items-center gap-3 font-inter text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white sm:mt-9 sm:text-xs"><ArrowLeft className="size-4" aria-hidden="true" /> All projects</a>
          </div>
        </section>
      )}
    </main>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-black/10 pt-4 sm:pt-5">
      <dt className="font-inter text-[9px] font-bold uppercase tracking-[0.14em] text-black/40">{label}</dt>
      <dd className="mt-3 font-sora text-sm font-medium leading-snug text-black sm:text-base">{value}</dd>
    </div>
  );
}
