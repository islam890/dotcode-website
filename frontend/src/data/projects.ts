export type Project = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: string;
  client_name: string | null;
  project_url: string | null;
  github_url: string | null;
  featured: boolean;
  published: boolean;
  isConcept?: boolean;
  created_at: string;
  updated_at: string;
};

export const conceptProjects: Project[] = [
  {
    id: -1,
    title: "Morrow House",
    slug: "concept-morrow-house",
    short_description: "A calm, editorial website concept for a contemporary boutique stay.",
    description: "A concept project exploring a thoughtful digital experience for a boutique hospitality brand.",
    category: "Design & Development",
    client_name: null,
    project_url: null,
    github_url: null,
    featured: false,
    published: true,
    isConcept: true,
    created_at: "2026-01-02T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: -2,
    title: "Orbit Desk",
    slug: "concept-orbit-desk",
    short_description: "A focused SaaS workspace concept that brings projects and teams together.",
    description: "A concept project for a modern SaaS workspace, designed around clarity and collaboration.",
    category: "Development",
    client_name: null,
    project_url: null,
    github_url: null,
    featured: false,
    published: true,
    isConcept: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
];
