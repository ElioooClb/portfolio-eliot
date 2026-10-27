import { Component, lazy, Suspense, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import InfraDetail from "../components/infra/InfraDetail";
import InfraList from "../components/infra/InfraList";
import { TOPOLOGY_OBSERVED_AT, infraNodes } from "../data/topology";
import { formatDate } from "../lib/format";

const InfraScene = lazy(() => import("../components/infra/InfraScene"));

const webglAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

// Si la scène 3D plante (pilote graphique, contexte WebGL perdu), on bascule
// sur la vue en liste plutôt que d'afficher une page cassée.
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const legend = [
  { label: "OVHcloud", className: "bg-accent" },
  { label: "Lab local", className: "bg-blue-600 dark:bg-blue-400" },
  { label: "Services externes", className: "bg-stone-500 dark:bg-stone-400" },
];

const Infrastructure = () => {
  const hasWebgl = useMemo(webglAvailable, []);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  // Sélection et mode d'affichage dans l'adresse : lien partageable
  // (ex. #/infrastructure?element=hermes&vue=liste)
  const [params, setParams] = useSearchParams();
  const view: "3d" | "list" = hasWebgl && params.get("vue") !== "liste" ? "3d" : "list";
  const paramId = params.get("element");
  const selectedId = infraNodes.some((node) => node.id === paramId) ? paramId : null;

  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value === null ? next.delete(key) : next.set(key, value)));
    setParams(next, { replace: true });
  };
  const setSelectedId = (id: string | null) => updateParams({ element: id });
  const setView = (mode: "3d" | "list") => updateParams({ vue: mode === "list" ? "liste" : null });
  const [showFlows, setShowFlows] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const selected = infraNodes.find((node) => node.id === selectedId) ?? null;
  const list = <InfraList selectedId={selectedId} onSelect={setSelectedId} />;

  const toggleClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-accent text-accent-fg" : "text-body hover:text-fg"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold text-fg">Infrastructure</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-body">
          Les machines, services et flux sur lesquels reposent mes projets :
          deux VPS chez OVHcloud, mon lab local et les services externes.
          Sélectionnez un élément pour voir son rôle, son état et ses flux.
        </p>
        <p className="max-w-3xl text-xs text-subtle">
          Carte statique, mise à jour à la main après chaque inventaire
          (dernier : {formatDate(TOPOLOGY_OBSERVED_AT)}). Elle n'affiche aucun
          état en temps réel. Les éléments en transparence et les flux en
          pointillés sont prévus, pas encore déployés.
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Mode d'affichage" className="flex rounded-full border border-line bg-surface p-1">
          <button
            type="button"
            className={toggleClass(view === "3d")}
            aria-pressed={view === "3d"}
            onClick={() => setView("3d")}
            disabled={!hasWebgl}
            title={hasWebgl ? undefined : "WebGL indisponible dans ce navigateur"}
          >
            Vue 3D
          </button>
          <button type="button" className={toggleClass(view === "list")} aria-pressed={view === "list"} onClick={() => setView("list")}>
            Vue liste
          </button>
        </div>
        {view === "3d" && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-body">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={showFlows}
                onChange={(event) => setShowFlows(event.target.checked)}
                className="h-4 w-4 accent-[rgb(var(--c-accent))]"
              />
              Afficher les flux
            </label>
            <button
              type="button"
              onClick={() => setResetKey((k) => k + 1)}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-fg transition hover:border-fg/40"
            >
              Recentrer la vue
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
        <div>
          {view === "3d" ? (
            <SceneBoundary fallback={list}>
              <div className="relative h-[420px] overflow-hidden rounded-2xl border border-line bg-surface2 sm:h-[540px]">
                <Suspense
                  fallback={
                    <p className="flex h-full items-center justify-center text-sm text-subtle">
                      Chargement de la carte 3D…
                    </p>
                  }
                >
                  <InfraScene
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    showFlows={showFlows}
                    reducedMotion={reducedMotion}
                    resetKey={resetKey}
                  />
                </Suspense>
                <p className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-subtle">
                  Survoler ou cliquer pour voir un élément · glisser pour tourner · molette ou pincement pour zoomer
                </p>
              </div>
            </SceneBoundary>
          ) : (
            list
          )}
          {!hasWebgl && (
            <p className="mt-3 text-xs text-subtle">
              WebGL n'est pas disponible dans ce navigateur : la carte est affichée en liste.
            </p>
          )}
          {view === "3d" && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-subtle" aria-label="Légende">
              {legend.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-sm ${item.className}`} />
                  {item.label}
                </li>
              ))}
              <li>Trait plein : flux vérifié ou documenté</li>
              <li>Pointillés et transparence : prévu</li>
            </ul>
          )}
        </div>
        <aside aria-live="polite">
          <InfraDetail node={selected} onSelect={setSelectedId} />
        </aside>
      </div>
    </div>
  );
};

export default Infrastructure;
