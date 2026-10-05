export type Service = {
  id: number;
  number: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  featured: boolean;
  published: boolean;
  order: number;
};

const serviceDescriptions = {
  webDevelopment:
    "Modern websites and web applications designed to perform, engage, and scale.",
  mobileDevelopment:
    "Intuitive mobile experiences built for iOS, Android, and the way people use technology today.",
  saasDevelopment:
    "Scalable SaaS products designed to turn ideas into reliable digital businesses.",
  aiSolutions:
    "Intelligent tools, automation, and integrations built around real business needs.",
  uiUxDesign:
    "Clear, purposeful interfaces that make digital products easier to understand and use.",
  customSoftware:
    "Tailored digital systems built around your workflows, operations, and unique requirements.",
} as const;

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Web Development",
    slug: "web-development",
    short_description: serviceDescriptions.webDevelopment,
    description: serviceDescriptions.webDevelopment,
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 2,
    number: "02",
    title: "Mobile Development",
    slug: "mobile-development",
    short_description: serviceDescriptions.mobileDevelopment,
    description: serviceDescriptions.mobileDevelopment,
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 3,
    number: "03",
    title: "SaaS Development",
    slug: "saas-development",
    short_description: serviceDescriptions.saasDevelopment,
    description: serviceDescriptions.saasDevelopment,
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: 4,
    number: "04",
    title: "AI Solutions",
    slug: "ai-solutions",
    short_description: serviceDescriptions.aiSolutions,
    description: serviceDescriptions.aiSolutions,
    featured: false,
    published: true,
    order: 4,
  },
  {
    id: 5,
    number: "05",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    short_description: serviceDescriptions.uiUxDesign,
    description: serviceDescriptions.uiUxDesign,
    featured: false,
    published: true,
    order: 5,
  },
  {
    id: 6,
    number: "06",
    title: "Custom Software",
    slug: "custom-software",
    short_description: serviceDescriptions.customSoftware,
    description: serviceDescriptions.customSoftware,
    featured: false,
    published: true,
    order: 6,
  },
];
