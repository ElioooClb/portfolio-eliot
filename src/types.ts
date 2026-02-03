export type Project = {
  id: string;
  title: string;
  summary: string;
  context: "BTS" | "perso" | "pro";
  stack: string[];
  features: string[];
  date: string;
  status: string;
  githubUrl: string;
  demoUrl?: string;
};
