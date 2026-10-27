import { projectStatusMeta } from "../lib/status";
import type { ProjectStatus } from "../types";

type StatusBadgeProps = {
  status: ProjectStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const meta = projectStatusMeta[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${meta.className}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
      {meta.label}
    </span>
  );
};

export default StatusBadge;
