import { requestJson } from "@/api/client";

export type NewsletterSubscriptionResponse = {
  id: number;
  email: string;
  created_at: string;
  already_subscribed: boolean;
  message: string;
};

export function createNewsletterSubscription(
  email: string,
): Promise<NewsletterSubscriptionResponse> {
  return requestJson<NewsletterSubscriptionResponse>("/newsletter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}
