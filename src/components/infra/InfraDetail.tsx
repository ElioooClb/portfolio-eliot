import { Link } from "react-router-dom";
import projectsData from "../../data/projects.json";
import { edgeStateLabel, infraEdges, infraGroups, infraNodes } from "../../data/topology";
import { formatDate } from "../../lib/format";
import type { InfraNode, Project } from "../../types";

const projects = projectsData as Project[];

const typeLabel: Record<InfraNode["type"], string> = {
  vps: "Serveur VPS",
  workstation: "Poste de travail",
  vm: "Machine virtuelle",
  service: "Service",
  external: "Service externe",
};

type InfraDetailProps = {
  node: InfraNode | null;
  onSelect: (id: string) => void;
};

const InfraDetail = ({ node, onSelect }: InfraDetailProps) => {
  if (!node) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-5 text-sm text-body">
        <p className="font-semibold text-fg">Sélectionnez un élément</p>
        <p className="mt-2 leading-relaxed">
          Cliquez sur un serveur, un service ou une machine virtuelle pour
          afficher son rôle, son état observé et ses flux.
        </p>
      </div>
    );
  }

  const group = infraGroups.find((g) => g.id === node.group);
  const project = projects.find((p) => p.id === node.projectId);
  const host = infraNodes.find((n) => n.id === node.host);
  const hosted = infraNodes.filter((n) => n.host === node.id);
  const flows = infraEdges
    .filter((edge) => edge.from === node.id || edge.to === node.id)
    .map((edge) => ({
      edge,
      outgoing: edge.from === node.id,
      other: infraNodes.find((n) => n.id === (edge.from === node.id ? edge.to : edge.from))!,
    }));

  return (
    <div className="space-y-4 rounded-2xl border border-line bg-surface p-5 text-sm text-body">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {typeLabel[node.type]} · {group?.label}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-fg">{node.label}</h2>
        <p className="mt-2 leading-relaxed">{node.role}</p>
      </div>

      <p className="rounded-xl border border-line bg-surface2 px-3 py-2 text-xs">
        {node.observation.state === "observed" ? (
          <>
            <span className="font-semibold text-fg">Observé en service</span> le{" "}
            {formatDate(node.observation.date)} ({node.observation.source}).
            État non suivi en temps réel.
          </>
        ) : (
          <>
            <span className="font-semibold text-fg">Prévu</span> : pas encore déployé.
          </>
        )}
      </p>

      <ul className="space-y-1.5">
        {node.details.map((detail) => (
          <li key={detail} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {(host || hosted.length > 0) && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
            {host ? "Hébergé sur" : "Héberge"}
          </p>
          <div className="flex flex-wrap gap-2">
            {(host ? [host] : hosted).map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => onSelect(n.id)}
                className="rounded-full border border-line px-3 py-1 text-xs text-fg transition hover:border-fg/40"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {flows.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Flux</p>
          <ul className="space-y-2">
            {flows.map(({ edge, outgoing, other }) => (
              <li key={`${edge.from}-${edge.to}`} className="leading-snug">
                <span className="text-fg">{edge.label}</span>
                <span className="text-subtle">
                  {" "}
                  {outgoing ? "vers" : "depuis"}{" "}
                </span>
                <button
                  type="button"
                  onClick={() => onSelect(other.id)}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {other.label}
                </button>
                <span className="ml-2 text-xs text-subtle">({edgeStateLabel[edge.state].toLowerCase()})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project && (
        <Link
          to={`/projects/${project.id}`}
          className="inline-block text-sm font-semibold text-accent hover:text-accent-strong"
        >
          Projet : {project.title} →
        </Link>
      )}
    </div>
  );
};

export default InfraDetail;
