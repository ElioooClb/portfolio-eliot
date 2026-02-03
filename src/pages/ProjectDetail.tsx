import { Link, useParams } from "react-router-dom";
import projectsData from "../data/projects.json";
import Tag from "../components/Tag";
import type { Project } from "../types";

const projects = projectsData as Project[];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold text-white">
          Projet introuvable
        </h1>
        <p className="text-sm text-slate-300">
          Le projet demandé n'existe pas ou a été déplacé.
        </p>
        <Link
          to="/projects"
          className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-slate-900"
        >
          Retour aux projets
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <Link
          to="/projects"
          className="text-sm font-semibold text-accent hover:text-white"
        >
          ← Retour aux projets
        </Link>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              {project.context}
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-slate-900">
              {project.status}
            </span>
            <span className="text-xs text-slate-400">{project.date}</span>
          </div>
          <h1 className="text-3xl font-semibold text-white">
            {project.title}
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            {project.summary}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6 rounded-2xl border border-white/10 bg-slateCard/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Contexte</h2>
            <p className="mt-2 text-sm text-slate-300">
              Projet réalisé dans un contexte {project.context}.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Fonctionnalités</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6 rounded-2xl border border-white/10 bg-slateCard/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Tag key={`${project.id}-${tag}`} label={tag} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Liens</h2>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-white"
            >
              Code source GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Voir la démo
              </a>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ProjectDetail;
