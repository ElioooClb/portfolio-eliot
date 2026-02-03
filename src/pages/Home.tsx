import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../types";

const projects = projectsData as Project[];

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-xl shadow-black/30">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Portfolio développeur front
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Je conçois des interfaces rapides, accessibles et centrées utilisateur.
          </h1>
          <p className="text-base text-slate-300">
            Étudiant BTS SIO, je construis des applications web modernes avec
            React, TypeScript et Tailwind. Découvrez mes projets, mes
            compétences et mes disponibilités.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Voir les projets
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Projets récents
            </h2>
            <p className="text-sm text-slate-400">
              Une sélection d'applications réalisées pendant le BTS SIO.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-semibold text-accent hover:text-white"
          >
            Tout voir →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Design system",
            text: "Des composants réutilisables et des interfaces cohérentes.",
          },
          {
            title: "Performance",
            text: "Optimisation des temps de chargement et des animations.",
          },
          {
            title: "Accessibilité",
            text: "Contrastes élevés, navigation clavier et labels clairs.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-slateCard/60 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
