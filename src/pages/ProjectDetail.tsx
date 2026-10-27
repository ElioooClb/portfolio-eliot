import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import Tag from "../components/Tag";
import StatusBadge from "../components/StatusBadge";
import projectsData from "../data/projects.json";
import { formatDate } from "../lib/format";
import { stepStateMeta } from "../lib/status";
import type { Project } from "../types";

const projects = projectsData as Project[];

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <section className="rounded-2xl border border-white/10 bg-slateCard/60 p-6">
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    <div className="mt-3 text-sm leading-relaxed text-slate-300">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-white">Projet introuvable</h1>
        <Link to="/projects" className="text-sm font-semibold text-accent hover:text-white">
          ← Retour aux projets
        </Link>
      </div>
    );
  }

  const meta = [
    { label: "Rôle", value: project.role },
    { label: "Période", value: project.period },
    { label: "Domaine", value: project.category },
    { label: "Mis à jour le", value: formatDate(project.updatedAt) },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-6">
        <Link to="/projects" className="text-sm font-semibold text-accent hover:text-white">
          ← Retour aux projets
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              {project.context}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">{project.title}</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-300">{project.summary}</p>
          {project.statusNote && (
            <p className="text-sm text-slate-400">{project.statusNote}</p>
          )}
        </div>

        <dl className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wide text-slate-500">{item.label}</dt>
              <dd className="mt-1 text-sm text-slate-200">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Section title="Besoin">
            <p>{project.problem}</p>
          </Section>
          <Section title="Solution">
            <p>{project.solution}</p>
          </Section>
          {project.highlights.length > 0 && (
            <Section title="Points clés">
              <BulletList items={project.highlights} />
            </Section>
          )}
          {project.learnings && project.learnings.length > 0 && (
            <Section title="Ce que j'en retiens">
              <BulletList items={project.learnings} />
            </Section>
          )}
        </div>

        <aside className="space-y-6">
          {project.steps && project.steps.length > 0 && (
            <Section title="Étapes">
              <ol className="space-y-3">
                {project.steps.map((step) => {
                  const state = stepStateMeta[step.state];
                  return (
                    <li key={step.label} className="flex gap-3">
                      <span aria-hidden="true" className={`w-4 shrink-0 text-center ${state.className}`}>
                        {state.symbol}
                      </span>
                      <span>
                        {step.label}
                        <span className="sr-only"> : {state.label}</span>
                        <span aria-hidden="true" className={`ml-2 text-xs ${state.className}`}>
                          {state.label}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Section>
          )}
          {project.limits && project.limits.length > 0 && (
            <Section title="Limites connues">
              <BulletList items={project.limits} />
            </Section>
          )}
          <Section title="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Tag key={`${project.id}-${tag}`} label={tag} />
              ))}
            </div>
          </Section>
          {(project.githubUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
                >
                  Code sur GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Voir la démo
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;
