import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import journalData from "../data/journal.json";
import siteData from "../data/site.json";
import ProjectCard from "../components/ProjectCard";
import JournalList from "../components/JournalList";
import { formatDate } from "../lib/format";
import type { JournalEntry, Project, SiteInfo } from "../types";

const projects = ([...projectsData] as Project[]).sort((a, b) => a.order - b.order);
const journal = journalData as JournalEntry[];
const site = siteData as SiteInfo;

const infraops = projects.filter((p) => p.group === "infraops");
const others = projects.filter((p) => p.group === "project" && p.featured);

const Home = () => {
  const base = import.meta.env.BASE_URL;
  const cvHref = `${base.endsWith("/") ? base : `${base}/`}cv-eliot-collomb.pdf`;

  return (
    <div className="flex flex-col gap-16">
      <section className="rounded-3xl border border-line bg-gradient-to-br from-surface via-surface to-accent/10 p-8 shadow-xl shadow-black/5 dark:shadow-black/30 sm:p-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm">
            Administration systèmes, réseaux &amp; Cloud/DevOps
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">
            Je conçois, déploie et documente des infrastructures, avec un goût
            prononcé pour l'automatisation et l'IA.
          </h1>
          <p className="text-base leading-relaxed text-body">
            Étudiant en Bachelor Administrateur Systèmes, Réseaux et Bases de
            Données à l'EPSI Bordeaux, titulaire d'un BTS SIO, je recherche une
            alternance pour 2026-2027. Ce portfolio évolue avec mes projets :
            chaque statut reflète l'état réel, daté.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-strong"
            >
              Voir les projets
            </Link>
            <a
              href={cvHref}
              download
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition hover:border-fg/40 hover:bg-fg/5"
            >
              Télécharger le CV
            </a>
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-body transition hover:text-fg"
            >
              Me contacter →
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="infraops-titre">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <h2 id="infraops-titre" className="text-2xl font-semibold text-fg">
              InfraOps Lab, en construction
            </h2>
            <p className="text-sm leading-relaxed text-subtle">
              Mon projet principal : une petite infrastructure réaliste,
              administrée, automatisée, supervisée et sécurisée, sur deux VPS et
              un lab VMware, sans dépense supplémentaire. Trois volets menés
              par jalons.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/infrastructure" className="text-sm font-semibold text-accent hover:text-accent-strong">
              Explorer l'infrastructure en 3D →
            </Link>
            <Link to="/projects" className="text-sm font-semibold text-accent hover:text-accent-strong">
              Tous les projets →
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infraops.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="autres-titre">
        <h2 id="autres-titre" className="text-2xl font-semibold text-fg">
          Autres réalisations
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {others.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="journal-titre">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="journal-titre" className="text-2xl font-semibold text-fg">
            Dernières avancées
          </h2>
          <Link to="/journal" className="text-sm font-semibold text-accent hover:text-accent-strong">
            Tout le journal →
          </Link>
        </div>
        <JournalList entries={journal.slice(0, 3)} />
        <p className="text-xs text-subtle">
          Site mis à jour le {formatDate(site.updatedAt)}.
        </p>
      </section>
    </div>
  );
};

export default Home;
