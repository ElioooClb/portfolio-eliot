export type Project = {
  id: string;
  title: string;
  summary: string;
  context: "BTS" | "perso" | "pro";
  stack: string[];
  competences: string[];
  badges: string[];
  screenshots?: string[];
  date: string;
  status: string;
  statusNote?: string;
  githubUrl?: string;
  demoUrl?: string;
};
