// Avancement d'un projet. Distinct de l'état technique d'un composant
// (sain, dégradé, indisponible), qui viendra avec l'explorateur d'infrastructure.
export type ProjectStatus = "planned" | "in_progress" | "completed" | "paused";

export type ProjectGroup = "infraops" | "project" | "archive";

export type StepState = "done" | "in_progress" | "planned";

export type ProjectStep = {
  label: string;
  state: StepState;
};

// Compétence travaillée dans le projet, illustrée par ce qui a été fait.
// upcoming : pas encore pratiquée dans ce projet (affichée « À venir »).
export type ProjectSkill = {
  name: string;
  detail: string;
  upcoming?: boolean;
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
  skills: ProjectSkill[];
  steps?: ProjectStep[];
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
  cvUpdated: string;
};
