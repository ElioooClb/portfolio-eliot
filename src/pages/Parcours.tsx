import { Link } from "react-router-dom";

type Item = {
  title: string;
  place: string;
  period: string;
  text?: string;
  badge?: string;
};

const formations: Item[] = [
  {
    title: "Bachelor Administrateur Systèmes, Réseaux et Bases de Données",
    place: "EPSI, Bordeaux",
    period: "2026 - 2027",
    badge: "En cours, en recherche d'alternance",
  },
  {
    title: "BTS SIO, option Solutions Logicielles et Applications Métiers (SLAM)",
    place: "ESUP, Rennes",
    period: "2024 - 2026",
    badge: "Obtenu",
  },
  {
    title: "Baccalauréat STMG",
    place: "Lycée Alain René Le Sage, Vannes",
    period: "2017",
  },
];

const experiences: Item[] = [
  {
    title: "Gestionnaire de données (alternance)",
    place: "Olga, Noyal-sur-Vilaine",
    period: "08/2025 - 08/2026",
    text: "Support aux utilisateurs, traitement d'anomalies, fiabilisation des données et automatisation de tâches documentaires en Python.",
  },
  {
    title: "Développement ERP (stage de 6 semaines)",
    place: "Tersys, Vannes",
    period: "06/2025 - 07/2025",
    text: "Développement, tests, versioning et déploiement de fonctionnalités.",
  },
  {
    title: "Automatisation (stage de 2 semaines)",
    place: "Morbihan Énergies, Vannes",
    period: "02/2025",
    text: "Formalisation de processus et traitement de données.",
  },
];

const Timeline = ({ items }: { items: Item[] }) => (
  <ol className="space-y-4">
    {items.map((item) => (
      <li key={item.title} className="rounded-2xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-semibold text-fg">{item.title}</h3>
          <span className="text-xs text-subtle">{item.period}</span>
        </div>
        <p className="mt-1 text-sm text-subtle">{item.place}</p>
        {item.badge && (
          <span className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
            {item.badge}
          </span>
        )}
        {item.text && <p className="mt-3 text-sm leading-relaxed text-body">{item.text}</p>}
      </li>
    ))}
  </ol>
);

const Parcours = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-fg">Parcours</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-body">
          Reconverti dans l'informatique après une première expérience
          professionnelle dans la restauration, j'ai repris mes études en
          2024. J'en garde une approche pragmatique, orientée résultats.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="formations-titre">
        <h2 id="formations-titre" className="text-xl font-semibold text-fg">Formation</h2>
        <Timeline items={formations} />
      </section>

      <section className="space-y-4" aria-labelledby="bts-titre">
        <h2 id="bts-titre" className="text-xl font-semibold text-fg">Dossiers du BTS SIO</h2>
        <p className="max-w-2xl text-sm text-body">
          Les dossiers des épreuves E5 et E6, qui présentent les projets
          réalisés pendant le BTS.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/parcours/dossier-e5"
            className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-fg transition hover:border-fg/40"
          >
            Dossier E5
          </Link>
          <Link
            to="/parcours/dossier-e6"
            className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-fg transition hover:border-fg/40"
          >
            Dossier E6
          </Link>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="experiences-titre">
        <h2 id="experiences-titre" className="text-xl font-semibold text-fg">
          Expériences professionnelles
        </h2>
        <Timeline items={experiences} />
      </section>
    </div>
  );
};

export default Parcours;
