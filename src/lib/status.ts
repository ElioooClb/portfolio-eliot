import type { JournalType, ProjectStatus, StepState } from "../types";

export const projectStatusMeta: Record<
  ProjectStatus,
  { label: string; className: string; dotClassName: string }
> = {
  planned: {
    label: "Planifié",
    className: "border-slate-400/30 bg-slate-400/10 text-slate-200",
    dotClassName: "bg-slate-300",
  },
  preparation: {
    label: "En préparation",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    dotClassName: "bg-amber-300",
  },
  in_progress: {
    label: "En cours",
    className: "border-sky-400/40 bg-sky-400/10 text-sky-200",
    dotClassName: "bg-sky-300",
  },
  completed: {
    label: "Terminé",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    dotClassName: "bg-emerald-300",
  },
  paused: {
    label: "En pause",
    className: "border-slate-400/30 bg-slate-400/10 text-slate-300",
    dotClassName: "bg-slate-400",
  },
  abandoned: {
    label: "Abandonné",
    className: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    dotClassName: "bg-rose-300",
  },
};

export const stepStateMeta: Record<
  StepState,
  { label: string; symbol: string; className: string }
> = {
  done: { label: "Fait", symbol: "✓", className: "text-emerald-300" },
  in_progress: { label: "En cours", symbol: "●", className: "text-sky-300" },
  planned: { label: "Prévu", symbol: "○", className: "text-slate-500" },
};

export const journalTypeMeta: Record<JournalType, { label: string; className: string }> = {
  decision: { label: "Décision", className: "text-amber-200" },
  realisation: { label: "Réalisation", className: "text-emerald-200" },
  test: { label: "Test", className: "text-sky-200" },
  incident: { label: "Incident résolu", className: "text-rose-200" },
};
