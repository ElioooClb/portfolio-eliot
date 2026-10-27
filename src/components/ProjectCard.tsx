import { Link } from "react-router-dom";
import Tag from "./Tag";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../lib/format";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
};

const MAX_TAGS = 5;

const ProjectCard = ({ project }: ProjectCardProps) => {
  const tags = project.stack.slice(0, MAX_TAGS);
  const hiddenTags = project.stack.length - tags.length;

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-lg shadow-black/5 dark:shadow-black/20 transition motion-safe:hover:-translate-y-1 hover:border-fg/20">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            {project.context}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-fg">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-body">{project.summary}</p>
          {project.statusNote && (
            <p className="mt-3 text-xs text-subtle">{project.statusNote}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={`${project.id}-${tag}`} label={tag} />
          ))}
          {hiddenTags > 0 && <Tag label={`+${hiddenTags}`} />}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 text-xs text-subtle">
        <span>Mis à jour le {formatDate(project.updatedAt)}</span>
        <Link
          to={`/projects/${project.id}`}
          className="text-sm font-semibold text-accent hover:text-accent-strong"
          aria-label={`Voir le détail du projet ${project.title}`}
        >
          Voir le détail →
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
