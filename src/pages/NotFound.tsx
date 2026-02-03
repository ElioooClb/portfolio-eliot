import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-slateCard/60 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        404
      </p>
      <h1 className="text-3xl font-semibold text-white">
        Page introuvable
      </h1>
      <p className="text-sm text-slate-300">
        La page demandée n'existe pas. Revenez à l'accueil ou explorez les
        projets.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/"
          className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-slate-900"
        >
          Retour accueil
        </Link>
        <Link
          to="/projects"
          className="rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white hover:border-white"
        >
          Voir les projets
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
