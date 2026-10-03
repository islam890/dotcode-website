import { requestJson } from "@/api/client";

export type Service = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  featured: boolean;
  published: boolean;
  order: number;
};

export function getServices(signal?: AbortSignal): Promise<Service[]> {
  return requestJson<Service[]>("/services/", { signal });
}

export function getServiceBySlug(slug: string, signal?: AbortSignal): Promise<Service> {
  return requestJson<Service>(`/services/${encodeURIComponent(slug)}`, { signal });
}
