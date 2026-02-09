import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import projectsData from "../data/projects.json";
import Tag from "../components/Tag";
import type { Project } from "../types";

const projects = projectsData as Project[];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const resolveAsset = (src: string) => {
    const base = import.meta.env.BASE_URL;
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;
    return `${normalizedBase}${src.replace(/^\/+/, "")}`;
  };
  const resolveFallbackAsset = (src: string) => `/${src.replace(/^\/+/, "")}`;
  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement>,
    src: string
  ) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied) {
      return;
    }
    target.dataset.fallbackApplied = "true";
    target.src = resolveFallbackAsset(src);
  };

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
          {project.statusNote && (
            <p className="text-xs text-slate-400">{project.statusNote}</p>
          )}
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
            <h2 className="text-lg font-semibold text-white">
              Compétences BTS SIO mobilisées
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {project.competences.map((competence) => (
                <li key={competence} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{competence}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Zone images / screenshots
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {project.screenshots && project.screenshots.length > 0 ? (
                project.screenshots.map((src) => {
                  const resolvedSrc = resolveAsset(src);
                  return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveScreenshot(src)}
                    className="group relative overflow-hidden rounded-xl border border-white/10 text-left"
                    aria-label={`Voir la capture du projet ${project.title}`}
                  >
                    <img
                      src={resolvedSrc}
                      alt={`Capture du projet ${project.title}`}
                      className="h-32 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      onError={(event) => handleImageError(event, src)}
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-xs text-white opacity-0 transition group-hover:opacity-100">
                      Cliquer pour agrandir
                    </span>
                  </button>
                  );
                })
              ) : (
                <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/20 bg-slate-900/40 px-4 text-center text-xs text-slate-400">
                  Ajoutez vos captures dans public/assets/projects/{project.id}/
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-2xl border border-white/10 bg-slateCard/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Badges</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <Tag key={`${project.id}-${badge}`} label={badge} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Technologies utilisées ou prévues
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Tag key={`${project.id}-${tag}`} label={tag} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Liens</h2>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-white"
              >
                Code source GitHub
              </a>
            )}
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
            {!project.githubUrl && !project.demoUrl && (
              <p className="text-xs text-slate-400">
                Liens non publics – démonstration sur demande.
              </p>
            )}
          </div>
        </aside>
      </section>
      {activeScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button
            type="button"
            onClick={() => setActiveScreenshot(null)}
            className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:border-white"
          >
            Fermer
          </button>
          <img
            src={resolveAsset(activeScreenshot)}
            alt={`Agrandissement du projet ${project.title}`}
            className="max-h-[85vh] w-auto max-w-[90vw] rounded-2xl border border-white/20 object-contain shadow-2xl"
            onError={(event) => handleImageError(event, activeScreenshot)}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
