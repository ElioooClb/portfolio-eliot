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
    title: "Gestionnaire de données, contrat d'apprentissage",
    place: "Olga, Noyal-sur-Vilaine",
    period: "08/2025 - 08/2026",
    text: "Gestion, mise à jour et fiabilisation des données de référence, support aux utilisateurs, amélioration des processus de gestion des données.",
  },
  {
    title: "Stage de développement (6 semaines)",
    place: "Tersys, Vannes",
    period: "06/2025 - 07/2025",
    text: "Développement de fonctionnalités d'un ERP : code, tests, versioning, déploiement.",
  },
  {
    title: "Stage (2 semaines)",
    place: "Morbihan Énergies, Vannes",
    period: "02/2025",
    text: "Formalisation de processus et automatisation, traitement de données massives, synthèse sur les modèles d'IA.",
  },
];

const Timeline = ({ items }: { items: Item[] }) => (
  <ol className="space-y-4">
    {items.map((item) => (
      <li key={item.title} className="rounded-2xl border border-white/10 bg-slateCard/60 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <span className="text-xs text-slate-400">{item.period}</span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{item.place}</p>
        {item.badge && (
          <span className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-sky-200">
            {item.badge}
          </span>
        )}
        {item.text && <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.text}</p>}
      </li>
    ))}
  </ol>
);

const Parcours = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Parcours</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Reconverti dans l'informatique après une première expérience
          professionnelle dans la restauration, j'ai repris mes études en
          2024. J'en garde une approche pragmatique, orientée résultats.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="formations-titre">
        <h2 id="formations-titre" className="text-xl font-semibold text-white">Formation</h2>
        <Timeline items={formations} />
      </section>

      <section className="space-y-4" aria-labelledby="bts-titre">
        <h2 id="bts-titre" className="text-xl font-semibold text-white">Dossiers du BTS SIO</h2>
        <p className="max-w-2xl text-sm text-slate-300">
          Les dossiers des épreuves E5 et E6, qui présentent les projets
          réalisés pendant le BTS.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/parcours/dossier-e5"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
          >
            Dossier E5
          </Link>
          <Link
            to="/parcours/dossier-e6"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
          >
            Dossier E6
          </Link>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="experiences-titre">
        <h2 id="experiences-titre" className="text-xl font-semibold text-white">
          Expériences professionnelles
        </h2>
        <Timeline items={experiences} />
      </section>
    </div>
  );
};

export default Parcours;
