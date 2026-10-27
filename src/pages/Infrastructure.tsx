import { Component, lazy, Suspense, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import InfraDetail from "../components/infra/InfraDetail";
import InfraList from "../components/infra/InfraList";
import { TOPOLOGY_OBSERVED_AT, edgeCategoryLabel, infraNodes } from "../data/topology";
import { useThemeColors } from "../hooks/useThemeColors";
import { formatDate } from "../lib/format";
import type { InfraEdgeCategory } from "../types";

const InfraScene = lazy(() => import("../components/infra/InfraScene"));

const ALL_CATEGORIES = Object.keys(edgeCategoryLabel) as InfraEdgeCategory[];

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

const Infrastructure = () => {
  const colors = useThemeColors();
  const hasWebgl = useMemo(webglAvailable, []);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  // Sur petit écran, la liste est plus lisible : la 3D reste disponible
  const narrow = useMemo(() => window.matchMedia("(max-width: 639px)").matches, []);
  const defaultView: "3d" | "list" = hasWebgl && !narrow ? "3d" : "list";

  // Sélection et mode d'affichage dans l'adresse : lien partageable
  // (ex. #/infrastructure?element=hermes&vue=liste)
  const [params, setParams] = useSearchParams();
  const vueParam = params.get("vue");
  const view: "3d" | "list" = !hasWebgl || vueParam === "liste" ? "list" : vueParam === "3d" ? "3d" : defaultView;
  const paramId = params.get("element");
  const selectedId = infraNodes.some((node) => node.id === paramId) ? paramId : null;

  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value === null ? next.delete(key) : next.set(key, value)));
    setParams(next, { replace: true });
  };
  const setSelectedId = (id: string | null) => updateParams({ element: id });
  const setView = (mode: "3d" | "list") =>
    updateParams({ vue: mode === defaultView ? null : mode === "list" ? "liste" : "3d" });

  const [visibleCategories, setVisibleCategories] = useState<Set<InfraEdgeCategory>>(() => new Set(ALL_CATEGORIES));
  const [resetKey, setResetKey] = useState(0);

  const toggleCategory = (category: InfraEdgeCategory) =>
    setVisibleCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });

  const selected = infraNodes.find((node) => node.id === selectedId) ?? null;
  const detail = <InfraDetail node={selected} onSelect={setSelectedId} />;
  const listLayout = (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <InfraList selectedId={selectedId} onSelect={setSelectedId} />
      <aside aria-live="polite">{detail}</aside>
    </div>
  );

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
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="rounded-full border border-line px-4 py-1.5 text-sm text-fg transition hover:border-fg/40"
          >
            Recentrer la vue
          </button>
        )}
      </div>

      {view === "3d" ? (
        <SceneBoundary fallback={listLayout}>
          <div className="space-y-3">
            <div className="relative h-[460px] overflow-hidden rounded-2xl border border-line bg-surface2 sm:h-[600px]">
              <Suspense
                fallback={
                  <p className="flex h-full items-center justify-center text-sm text-subtle">Chargement de la carte 3D…</p>
                }
              >
                <InfraScene
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  visibleCategories={visibleCategories}
                  reducedMotion={reducedMotion}
                  resetKey={resetKey}
                />
              </Suspense>
              {/* Panneau de détail par-dessus la carte sur grand écran */}
              {selected && (
                // z-40 : au-dessus des étiquettes de la carte (z-index 30 au plus)
                <aside aria-live="polite" className={`absolute top-3 z-40 hidden max-h-[calc(100%-24px)] w-80 overflow-y-auto rounded-2xl shadow-xl lg:block ${selected.position[0] > 1 ? "left-3" : "right-3"}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="absolute right-3 top-3 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-body transition hover:border-fg/40 hover:text-fg"
                    aria-label="Fermer le détail"
                  >
                    Fermer
                  </button>
                  {detail}
                </aside>
              )}
              <p className="pointer-events-none absolute left-4 top-3 max-w-[60%] text-[11px] text-subtle">
                Survoler ou cliquer pour voir un élément et ses flux · glisser pour tourner · molette ou pincement pour zoomer
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-subtle">
              <span className="font-semibold text-body">Flux :</span>
              {ALL_CATEGORIES.map((category) => {
                const active = visibleCategories.has(category);
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(category)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                      active ? "border-line bg-surface text-fg" : "border-transparent text-subtle line-through opacity-60"
                    }`}
                    title={active ? "Masquer ces flux" : "Afficher ces flux"}
                  >
                    <span aria-hidden="true" className="h-1 w-4 rounded-full" style={{ background: colors.flow[category] }} />
                    {edgeCategoryLabel[category]}
                  </button>
                );
              })}
              <span>Flèche : sens du flux · pointillés et transparence : prévu</span>
            </div>

            <aside aria-live="polite" className="lg:hidden">
              {detail}
            </aside>
          </div>
        </SceneBoundary>
      ) : (
        <>
          {listLayout}
          {!hasWebgl && (
            <p className="text-xs text-subtle">WebGL n'est pas disponible dans ce navigateur : la carte est affichée en liste.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Infrastructure;
