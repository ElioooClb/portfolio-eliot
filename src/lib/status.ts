import type { JournalType, ProjectStatus, StepState } from "../types";

// Chaque couleur a sa variante claire et sombre. Le libellé est toujours
// affiché : la couleur n'est jamais la seule information.
export const projectStatusMeta: Record<
  ProjectStatus,
  { label: string; className: string; dotClassName: string }
> = {
  planned: {
    label: "Planifié",
    className:
      "border-stone-300 bg-stone-100 text-stone-700 dark:border-stone-500/40 dark:bg-stone-400/10 dark:text-stone-200",
    dotClassName: "bg-stone-500 dark:bg-stone-300",
  },
  preparation: {
    label: "En préparation",
    className:
      "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200",
    dotClassName: "bg-violet-500 dark:bg-violet-300",
  },
  in_progress: {
    label: "En cours",
    className:
      "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200",
    dotClassName: "bg-blue-500 dark:bg-blue-300",
  },
  completed: {
    label: "Terminé",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200",
    dotClassName: "bg-emerald-500 dark:bg-emerald-300",
  },
  paused: {
    label: "En pause",
    className:
      "border-stone-300 bg-stone-100 text-stone-600 dark:border-stone-500/40 dark:bg-stone-400/10 dark:text-stone-300",
    dotClassName: "bg-stone-400",
  },
  abandoned: {
    label: "Abandonné",
    className:
      "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200",
    dotClassName: "bg-rose-500 dark:bg-rose-300",
  },
};

export const stepStateMeta: Record<
  StepState,
  { label: string; symbol: string; className: string }
> = {
  done: {
    label: "Fait",
    symbol: "✓",
    className: "text-emerald-700 dark:text-emerald-300",
  },
  in_progress: {
    label: "En cours",
    symbol: "●",
    className: "text-blue-700 dark:text-blue-300",
  },
  planned: { label: "Prévu", symbol: "○", className: "text-subtle" },
};

export const journalTypeMeta: Record<JournalType, { label: string; className: string }> = {
  decision: { label: "Décision", className: "text-violet-700 dark:text-violet-300" },
  realisation: { label: "Réalisation", className: "text-emerald-700 dark:text-emerald-300" },
  test: { label: "Test", className: "text-blue-700 dark:text-blue-300" },
  incident: { label: "Incident résolu", className: "text-rose-700 dark:text-rose-300" },
};
