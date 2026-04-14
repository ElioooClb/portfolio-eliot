import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import projectsData from "../data/projects.json";
import Tag from "../components/Tag";
import type { Project } from "../types";

const projects = projectsData as Project[];

type CaseStudySectionProps = {
  title: string;
  children: ReactNode;
};

const CaseStudySection = ({ title, children }: CaseStudySectionProps) => (
  <section className="rounded-2xl border border-white/10 bg-slateCard/60 p-6">
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    <div className="mt-3 text-sm text-slate-300">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

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
    <div className="flex flex-col gap-6 lg:gap-8">
      <section className="space-y-5 rounded-2xl border border-white/10 bg-slateCard/60 p-6">
        <Link
          to="/projects"
          className="text-sm font-semibold text-accent hover:text-white"
        >
          ← Retour aux projets
        </Link>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag label={project.context} />
            {project.category && <Tag label={project.category} />}
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-slate-900">
              {project.status}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
              {project.date}
            </span>
          </div>

          {project.statusNote && (
            <p className="text-xs text-slate-400">{project.statusNote}</p>
          )}

          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
            {project.summary}
          </p>

          {project.shortOutcome && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-accent">
                Résultat clé
              </p>
              <p className="mt-1 text-sm text-slate-100">{project.shortOutcome}</p>
            </div>
          )}

          {project.role && (
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Rôle :</span> {project.role}
            </p>
          )}

          {project.stack.length > 0 && (
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                Stack technique
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <Tag key={`${project.id}-stack-${tag}`} label={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          {(project.contextDetails ||
            (project.description && project.description.length > 0)) && (
            <CaseStudySection title="Contexte">
              <div className="space-y-2 leading-relaxed">
                {project.contextDetails && <p>{project.contextDetails}</p>}
                {project.description?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </CaseStudySection>
          )}

          {project.problem && (
            <CaseStudySection title="Problème / besoin">
              <p className="leading-relaxed">{project.problem}</p>
            </CaseStudySection>
          )}

          {project.solution && (
            <CaseStudySection title="Solution mise en place">
              <p className="leading-relaxed">{project.solution}</p>
            </CaseStudySection>
          )}

          {project.mainFeatures.length > 0 && (
            <CaseStudySection title="Fonctionnalités principales">
              <BulletList items={project.mainFeatures} />
            </CaseStudySection>
          )}

          {project.technicalHighlights.length > 0 && (
            <CaseStudySection title="Points techniques intéressants">
              <BulletList items={project.technicalHighlights} />
            </CaseStudySection>
          )}

          {project.challenges.length > 0 && (
            <CaseStudySection title="Difficultés rencontrées">
              <BulletList items={project.challenges} />
            </CaseStudySection>
          )}

          {project.learnings.length > 0 && (
            <CaseStudySection title="Apprentissages">
              <BulletList items={project.learnings} />
            </CaseStudySection>
          )}

          {project.competences.length > 0 && (
            <CaseStudySection title="Compétences BTS SIO mobilisées">
              <BulletList items={project.competences} />
            </CaseStudySection>
          )}

        </div>

        <aside className="space-y-6 rounded-2xl border border-white/10 bg-slateCard/60 p-6 lg:sticky lg:top-6 lg:h-fit">
          <div>
            <h2 className="text-lg font-semibold text-white">Badges</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <Tag key={`${project.id}-${badge}`} label={badge} />
              ))}
            </div>
          </div>

          {(project.githubUrl || project.demoUrl) && (
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
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};

export default ProjectDetail;
