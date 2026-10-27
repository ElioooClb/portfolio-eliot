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

// --- Carte d'infrastructure (données statiques, voir src/data/topology.ts) ---

export type InfraGroupId = "ovh" | "local" | "external";

export type InfraGroup = {
  id: InfraGroupId;
  label: string;
  detail: string;
  // Plateforme 3D : centre (x, z) et dimensions (largeur, profondeur)
  center: [number, number];
  size: [number, number];
};

export type InfraNodeType = "vps" | "workstation" | "vm" | "service" | "external";

// Modèle 3D dessiné pour chaque élément (src/components/infra/models.tsx)
export type InfraModel =
  | "server"
  | "laptop"
  | "vm-windows-server"
  | "vm-debian"
  | "vm-windows-client"
  | "vm-router"
  | "vm-linux"
  | "database"
  | "backup"
  | "agent"
  | "containers"
  | "monitoring"
  | "cloud"
  | "browser";

// État technique observé, toujours daté : la carte n'affiche jamais de temps réel
export type InfraObservation =
  | { state: "observed"; date: string; source: string }
  | { state: "planned" };

export type InfraNode = {
  id: string;
  label: string;
  // Étiquette courte affichée sur la carte 3D (le titre complet reste dans le panneau)
  shortLabel?: string;
  type: InfraNodeType;
  model: InfraModel;
  // Serveurs : nombre d'unités de baie dessinées (1 à 3)
  units?: number;
  group: InfraGroupId;
  role: string;
  details: string[];
  observation: InfraObservation;
  position: [number, number, number];
  // Machine qui héberge ce service ou cette VM (trait de rattachement)
  host?: string;
  projectId?: string;
};

export type InfraEdgeCategory = "admin" | "data" | "backup" | "deploy" | "monitoring";

export type InfraEdge = {
  from: string;
  to: string;
  label: string;
  // Libellé court affiché sur la carte 3D (le libellé complet reste dans le panneau)
  short: string;
  category: InfraEdgeCategory;
  // verified : constaté lors d'un test daté ; documented : décrit dans la doc ; planned : prévu
  state: "verified" | "documented" | "planned";
};

export type SiteInfo = {
  updatedAt: string;
  cvUpdated: string;
};
