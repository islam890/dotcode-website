export type Service = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  featured: boolean;
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};

// Published service content copied from the configured database.
export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    short_description: "Custom web applications and digital products built for your business.",
    description: "We design and develop fast, scalable and responsive web applications tailored to your business needs.",
    featured: true,
    published: true,
    order: 1,
    created_at: "2026-09-24T15:01:25.283801",
    updated_at: "2026-09-24T15:02:26.29876",
  },
];
