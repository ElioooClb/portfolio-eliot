import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-line bg-surface p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        404
      </p>
      <h1 className="text-3xl font-semibold text-fg">
        Page introuvable
      </h1>
      <p className="text-sm text-body">
        La page demandée n'existe pas. Revenez à l'accueil ou explorez les
        projets.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/"
          className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg"
        >
          Retour accueil
        </Link>
        <Link
          to="/projects"
          className="rounded-full border border-line px-6 py-2 text-sm font-semibold text-fg hover:border-fg/40"
        >
          Voir les projets
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
