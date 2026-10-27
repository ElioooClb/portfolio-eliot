// Avancement d'un projet. Distinct de l'état technique d'un composant
// (sain, dégradé, indisponible), qui viendra avec l'explorateur d'infrastructure.
export type ProjectStatus =
  | "planned"
  | "preparation"
  | "in_progress"
  | "completed"
  | "paused"
  | "abandoned";

export type ProjectGroup = "infraops" | "project" | "archive";

export type StepState = "done" | "in_progress" | "planned";

export type ProjectStep = {
  label: string;
  state: StepState;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  group: ProjectGroup;
  context: string;
  category: string;
  role: string;
  period: string;
  status: ProjectStatus;
  statusNote?: string;
  // Date de la dernière information vérifiée sur le projet (AAAA-MM-JJ)
  updatedAt: string;
  problem: string;
  solution: string;
  highlights: string[];
  steps?: ProjectStep[];
  learnings?: string[];
  limits?: string[];
  stack: string[];
  featured: boolean;
  order: number;
  githubUrl?: string;
  demoUrl?: string;
};

export type JournalType = "decision" | "realisation" | "test" | "incident";

export type JournalEntry = {
  date: string;
  type: JournalType;
  title: string;
  text: string;
  projectId?: string;
};

export type SiteInfo = {
  updatedAt: string;
  nextGoal: string;
  cvUpdated: string;
};
