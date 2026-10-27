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
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 p-8 shadow-xl shadow-black/30 sm:p-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm">
            Administration systèmes, réseaux &amp; Cloud/DevOps
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Je conçois, déploie et documente des infrastructures, avec un goût
            prononcé pour l'automatisation et l'IA.
          </h1>
          <p className="text-base leading-relaxed text-slate-300">
            Étudiant en Bachelor Administrateur Systèmes, Réseaux et Bases de
            Données à l'EPSI Bordeaux, titulaire d'un BTS SIO, je recherche une
            alternance pour 2026-2027. Ce portfolio évolue avec mes projets :
            chaque statut reflète l'état réel, daté.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Voir les projets
            </Link>
            <a
              href={cvHref}
              download
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Télécharger le CV
            </a>
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Me contacter →
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="infraops-titre">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <h2 id="infraops-titre" className="text-2xl font-semibold text-white">
              InfraOps Lab, en construction
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Mon projet principal : une petite infrastructure réaliste,
              administrée, automatisée, supervisée et sécurisée, sur deux VPS et
              un lab VMware, sans dépense supplémentaire. Trois volets menés
              par jalons.
            </p>
          </div>
          <Link to="/projects" className="text-sm font-semibold text-accent hover:text-white">
            Tous les projets →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infraops.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Prochain objectif
          </p>
          <p className="mt-1 text-sm text-slate-200">{site.nextGoal}</p>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="autres-titre">
        <h2 id="autres-titre" className="text-2xl font-semibold text-white">
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
          <h2 id="journal-titre" className="text-2xl font-semibold text-white">
            Dernières avancées
          </h2>
          <Link to="/journal" className="text-sm font-semibold text-accent hover:text-white">
            Tout le journal →
          </Link>
        </div>
        <JournalList entries={journal.slice(0, 3)} />
        <p className="text-xs text-slate-500">
          Site mis à jour le {formatDate(site.updatedAt)}.
        </p>
      </section>
    </div>
  );
};

export default Home;
