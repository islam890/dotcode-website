export type Testimonial = {
  id: number;
  client_name: string;
  client_role: string | null;
  company_name: string | null;
  content: string;
  avatar_url: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

// Add real client testimonials here when they are ready to publish.
export const testimonials: Testimonial[] = [];
