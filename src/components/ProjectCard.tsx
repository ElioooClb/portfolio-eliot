import { Link } from "react-router-dom";
import Tag from "./Tag";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slateCard/70 p-6 shadow-lg shadow-black/20 transition-transform hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            {project.context}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
            {project.status}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <Tag key={`${project.id}-${tag}`} label={tag} />
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>{project.date}</span>
        <Link
          to={`/projects/${project.id}`}
          className="font-semibold text-accent hover:text-white"
        >
          Voir le détail →
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
