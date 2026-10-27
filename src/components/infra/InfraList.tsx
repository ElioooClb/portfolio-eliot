import { infraGroups, infraNodes } from "../../data/topology";

type InfraListProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

// Vue en liste : alternative complète à la carte 3D (clavier, lecteurs
// d'écran, navigateurs sans WebGL, préférence de l'utilisateur).
const InfraList = ({ selectedId, onSelect }: InfraListProps) => {
  return (
    <div className="space-y-5">
      {infraGroups.map((group) => (
        <section key={group.id} aria-labelledby={`infra-groupe-${group.id}`} className="space-y-2">
          <div>
            <h3 id={`infra-groupe-${group.id}`} className="text-sm font-semibold text-fg">
              {group.label}
            </h3>
            <p className="text-xs text-subtle">{group.detail}</p>
          </div>
          <ul className="grid gap-2">
            {infraNodes
              .filter((node) => node.group === group.id)
              .map((node) => {
                const selected = node.id === selectedId;
                const planned = node.observation.state === "planned";
                return (
                  <li key={node.id} className={node.host ? "pl-5" : ""}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelect(node.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                        selected ? "border-accent bg-accent/10 text-fg" : "border-line bg-surface text-body hover:border-fg/30"
                      }`}
                    >
                      <span>{node.label}</span>
                      <span className="shrink-0 text-xs text-subtle">{planned ? "Prévu" : "En service"}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default InfraList;
