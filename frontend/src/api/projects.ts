import type { Project } from "@/data/projects";
import { requestJson } from "@/api/client";

export function getProjects(signal?: AbortSignal): Promise<Project[]> {
  return requestJson<Project[]>("/projects/", { signal });
}

export function getProjectBySlug(slug: string, signal?: AbortSignal): Promise<Project> {
  return requestJson<Project>(`/projects/${encodeURIComponent(slug)}`, { signal });
}
