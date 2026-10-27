import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";
import { projectStatusMeta } from "../lib/status";
import type { Project, ProjectGroup } from "../types";

const projects = ([...projectsData] as Project[]).sort((a, b) => a.order - b.order);

const groups: { id: ProjectGroup; title: string; intro: string }[] = [
  {
    id: "infraops",
    title: "InfraOps Lab",
    intro:
      "Mon projet principal, en trois volets : réseau et systèmes, automatisation et déploiement, supervision et sécurité.",
  },
  {
    id: "project",
    title: "Autres réalisations",
    intro: "Projets personnels et projets d'équipe, avec la part qui me revient.",
  },
  {
    id: "archive",
    title: "Archives",
    intro: "Projets arrêtés, conservés pour ce qu'ils m'ont appris.",
  },
];

const Projects = () => {
  return (
    <div className="flex flex-col gap-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-fg">Projets</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-body">
          Chaque fiche indique son avancement réel et la date de sa dernière
          mise à jour. Aucune métrique ni disponibilité n'est inventée : ce qui
          est prévu est présenté comme prévu.
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-subtle" aria-label="Légende des statuts">
          {Object.values(projectStatusMeta).map((meta) => (
            <li key={meta.label} className="flex items-center gap-2">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
              {meta.label}
            </li>
          ))}
        </ul>
      </section>

      {groups.map((group) => {
        const items = projects.filter((p) => p.group === group.id);
        if (items.length === 0) {
          return null;
        }
        return (
          <section key={group.id} className="space-y-6" aria-labelledby={`groupe-${group.id}`}>
            <div className="space-y-1">
              <h2 id={`groupe-${group.id}`} className="text-2xl font-semibold text-fg">
                {group.title}
              </h2>
              <p className="text-sm text-subtle">{group.intro}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Projects;
