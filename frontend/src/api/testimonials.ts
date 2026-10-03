import { requestJson } from "@/api/client";

export type Testimonial = {
  id: number;
  client_name: string;
  client_role: string | null;
  company_name: string | null;
  content: string;
  avatar_url: string | null;
  published: boolean;
};

export function getTestimonials(signal?: AbortSignal): Promise<Testimonial[]> {
  return requestJson<Testimonial[]>("/testimonials/", { signal });
}
