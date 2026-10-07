import { requestJson } from "@/api/client";

export type ContactMessageCreate = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  service: string | null;
  budget: string | null;
  budget_currency: string | null;
  message: string;
};

export type ContactMessageResponse = ContactMessageCreate & {
  id: number;
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
