import { requestJson } from "@/api/client";

export type ContactMessageCreate = {
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  service: string | null;
  message: string;
};

export type ContactMessageResponse = ContactMessageCreate & {
  id: number;
  company: string | null;
  budget: string | null;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  created_at: string;
  updated_at: string;
};

export function createContactMessage(
  message: ContactMessageCreate,
  signal?: AbortSignal,
): Promise<ContactMessageResponse> {
  return requestJson<ContactMessageResponse>("/contact/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
    signal,
  });
}
