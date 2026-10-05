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
  created_at: string;
  updated_at: string;
};

// Add real DotCode client projects here when they are ready to publish.
export const projects: Project[] = [];

export const allProjects = projects;
