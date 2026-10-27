import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { QuadraticBezierCurve3, Quaternion, Vector3 } from "three";
import { edgeCategoryLabel, infraEdges, infraGroups, infraNodes } from "../../data/topology";
import { useThemeColors, type ThemeColors } from "../../hooks/useThemeColors";
import type { InfraEdge, InfraEdgeCategory, InfraGroupId, InfraNode } from "../../types";
import { InfraModelView, ModelProvider, modelHeight, modelRadius } from "./models";

// Scène 3D de l'explorateur d'infrastructure. Chargée à la demande
// (React.lazy) pour ne pas alourdir le reste du site. Rendu à la demande
// (frameloop="demand") : aucune animation continue.

type InfraSceneProps = {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  visibleCategories: Set<InfraEdgeCategory>;
  reducedMotion: boolean;
  resetKey: number;
};

const nodesById = new Map(infraNodes.map((node) => [node.id, node]));

const groupColor = (group: InfraGroupId, colors: ThemeColors) =>
  group === "ovh" ? colors.accent : group === "local" ? colors.local : colors.external;

// --- Plateformes -----------------------------------------------------------

const Platform = ({ groupId, colors }: { groupId: InfraGroupId; colors: ThemeColors }) => {
  const group = infraGroups.find((g) => g.id === groupId)!;
  const color = groupColor(groupId, colors);
  const [cx, cz] = group.center;
  const [w, d] = group.size;
  return (
    <group position={[cx, 0, cz]}>
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[w, 0.12, d]} />
        <meshStandardMaterial color={color} transparent opacity={colors.dark ? 0.1 : 0.08} roughness={0.9} depthWrite={false} />
        <Edges color={color} />
      </mesh>
      <Html position={[0, 0.02, d / 2 + 0.35]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <span className="block whitespace-nowrap text-xs font-semibold uppercase tracking-wide" style={{ color }}>
          {group.label}
        </span>
      </Html>
    </group>
  );
};

// --- Éléments ---------------------------------------------------------------

type NodeProps = {
  node: InfraNode;
  colors: ThemeColors;
  selected: boolean;
  hovered: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
};

const NodeView = ({ node, colors, selected, hovered, dimmed, onSelect, onHover }: NodeProps) => {
  const planned = node.observation.state === "planned";
  const height = modelHeight(node);
  const radius = modelRadius(node);

  return (
    <group
      position={node.position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(node.id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(node.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "";
      }}
    >
      <ModelProvider ghost={planned} colors={colors}>
        <InfraModelView node={node} />
      </ModelProvider>

      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
          <ringGeometry args={[radius, radius + 0.08, 64]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={selected ? 0.95 : 0.5} depthWrite={false} />
        </mesh>
      )}

      <Html position={[0, height + 0.32, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
        <span
          className={`block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm transition ${
            selected ? "border-accent bg-accent text-accent-fg" : planned ? "border-dashed border-subtle bg-surface/80 text-body" : "border-line bg-surface/90 text-fg"
          } ${dimmed ? "opacity-40" : ""}`}
        >
          {node.shortLabel ?? node.label}
          {planned && <span className="sr-only"> (prévu)</span>}
        </span>
      </Html>
    </group>
  );
};

// --- Flux : arc coloré par catégorie, flèche de direction, libellé ---------

const UP = new Vector3(0, 1, 0);
const edgeKey = (edge: InfraEdge) => `${edge.from}-${edge.to}`;

// Données statiques : géométrie des arcs calculée une seule fois
const edgeGeometry = new Map(
  infraEdges.map((edge) => {
    const a = nodesById.get(edge.from)!;
    const b = nodesById.get(edge.to)!;
    const start = new Vector3(a.position[0], modelHeight(a) + 0.05, a.position[2]);
    const end = new Vector3(b.position[0], modelHeight(b) + 0.05, b.position[2]);
    const mid = start.clone().lerp(end, 0.5);
    mid.y = Math.max(start.y, end.y) + 0.6 + start.distanceTo(end) * 0.17;
    const curve = new QuadraticBezierCurve3(start, mid, end);
    const arrowAt = 0.9;
    return [
      edgeKey(edge),
      {
        points: curve.getPoints(48),
        arrowPosition: curve.getPoint(arrowAt),
        arrowRotation: new Quaternion().setFromUnitVectors(UP, curve.getTangent(arrowAt).normalize()),
        apex: curve.getPoint(0.5),
      },
    ] as const;
  }),
);

const Flow = ({
  edge,
  colors,
  highlighted,
  dimmed,
  labelOffset,
  onHover,
}: {
  edge: InfraEdge;
  colors: ThemeColors;
  highlighted: boolean;
  dimmed: boolean;
  // Décalage vertical du libellé à l'écran (px), calculé contre les chevauchements
  labelOffset: number;
  onHover: (key: string | null) => void;
}) => {
  const key = edgeKey(edge);
  const geometry = edgeGeometry.get(key)!;
  const color = colors.flow[edge.category];
  const planned = edge.state === "planned";
  const opacity = dimmed ? 0.12 : highlighted ? 1 : 0.75;

  return (
    <group>
      {/* Zone de survol invisible, plus large que le trait visible */}
      <Line
        points={geometry.points}
        lineWidth={16}
        transparent
        opacity={0}
        depthWrite={false}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(key);
          document.body.style.cursor = "help";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
      />
      <Line
        points={geometry.points}
        color={color}
        lineWidth={highlighted ? 4 : 2.2}
        dashed={planned}
        dashSize={0.25}
        gapSize={0.18}
        transparent
        opacity={opacity}
      />
      <mesh position={geometry.arrowPosition} quaternion={geometry.arrowRotation}>
        <coneGeometry args={[highlighted ? 0.13 : 0.1, highlighted ? 0.34 : 0.28, 14]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      {highlighted && (
        <Html position={geometry.apex} center zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
          <span
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-fg shadow-md"
            style={{ transform: `translateY(${labelOffset}px)` }}
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: color }} />
            {edge.short}
            {planned && <span className="text-subtle">· prévu</span>}
          </span>
        </Html>
      )}
    </group>
  );
};

// --- Placement des libellés de flux sans chevauchement ----------------------

type Rect = { x: number; y: number; w: number; h: number };
const overlaps = (a: Rect, b: Rect) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
// Largeur approchée d'une étiquette en texte de 12 px
const textWidth = (text: string, padding: number) => text.length * 6.6 + padding;
const LABEL_H = 24;
const CANDIDATE_OFFSETS = [0, -28, 28, -56, 56, -84, 84, -112, 112];

// --- Caméra ------------------------------------------------------------------

// Position de référence de la caméra, calée pour un cadre d'environ 16/9 ;
// reculée proportionnellement quand le cadre est plus étroit
const TARGET: [number, number, number] = [-0.5, 0.4, -1.5];
const CAMERA_OFFSET: [number, number, number] = [0, 15.8, 10.7];
const REFERENCE_ASPECT = 1.75;
// Objet constant : un littéral recréé à chaque rendu serait réappliqué par
// React Three Fiber à chaque redimensionnement et écraserait le recul calculé
const CAMERA_PROPS = {
  position: [TARGET[0] + CAMERA_OFFSET[0], TARGET[1] + CAMERA_OFFSET[1], TARGET[2] + CAMERA_OFFSET[2]] as [number, number, number],
  fov: 45,
};

const Controls = ({ reducedMotion, resetKey }: { reducedMotion: boolean; resetKey: number }) => {
  const ref = useRef<OrbitControlsImpl>(null);
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const factor = Math.min(Math.max(REFERENCE_ASPECT / (width / height), 1), 3);
    camera.position.set(
      TARGET[0] + CAMERA_OFFSET[0] * factor,
      TARGET[1] + CAMERA_OFFSET[1] * factor,
      TARGET[2] + CAMERA_OFFSET[2] * factor,
    );
    ref.current?.target.set(...TARGET);
    ref.current?.update();
    ref.current?.saveState();
    invalidate();
  }, [camera, width, height, invalidate]);

  useEffect(() => {
    if (resetKey > 0) {
      ref.current?.reset();
      invalidate();
    }
  }, [resetKey, invalidate]);

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      target={TARGET}
      enableDamping={!reducedMotion}
      minDistance={7}
      maxDistance={50}
      maxPolarAngle={Math.PI / 2.15}
    />
  );
};

// --- Scène ---------------------------------------------------------------------

const SceneContent = ({
  selectedId,
  onSelect,
  visibleCategories,
  colors,
}: Pick<InfraSceneProps, "selectedId" | "onSelect" | "visibleCategories"> & { colors: ThemeColors }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const invalidate = useThree((state) => state.invalidate);
  // L'élément sélectionné prime ; à défaut, le survol prévisualise ses flux
  const focusId = selectedId ?? hoveredId;

  // Famille : l'élément et les services ou VM qu'il héberge (un serveur
  // sélectionné montre aussi les flux de ses services)
  const family = useMemo(() => {
    if (!focusId) return null;
    return new Set([focusId, ...infraNodes.filter((node) => node.host === focusId).map((node) => node.id)]);
  }, [focusId]);

  const related = useMemo(() => {
    if (!family || !focusId) return null;
    const ids = new Set<string>(family);
    infraEdges.forEach((edge) => {
      if (!visibleCategories.has(edge.category)) return;
      if (family.has(edge.from)) ids.add(edge.to);
      if (family.has(edge.to)) ids.add(edge.from);
    });
    const host = nodesById.get(focusId)?.host;
    if (host) ids.add(host);
    return ids;
  }, [family, focusId, visibleCategories]);

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    invalidate();
  };
  const handleEdgeHover = (key: string | null) => {
    setHoveredEdge(key);
    invalidate();
  };

  const visibleEdges = infraEdges.filter((edge) => visibleCategories.has(edge.category));
  const highlightedKeys = visibleEdges
    .filter((edge) => (family !== null && (family.has(edge.from) || family.has(edge.to))) || edgeKey(edge) === hoveredEdge)
    .map(edgeKey);
  const highlightedSignature = highlightedKeys.join("|");

  // À chaque image rendue (rendu à la demande : seulement quand la vue
  // change), projette étiquettes d'éléments et libellés de flux à l'écran et
  // décale verticalement les libellés qui se chevauchent
  const [labelOffsets, setLabelOffsets] = useState<Record<string, number>>({});
  const offsetsRef = useRef(labelOffsets);
  const projected = useMemo(() => new Vector3(), []);
  useFrame(({ camera, size }) => {
    const toScreen = (x: number, y: number, z: number) => {
      projected.set(x, y, z).project(camera);
      return { sx: ((projected.x + 1) / 2) * size.width, sy: ((1 - projected.y) / 2) * size.height };
    };
    const placed: Rect[] = infraNodes.map((node) => {
      const { sx, sy } = toScreen(node.position[0], modelHeight(node) + 0.32, node.position[2]);
      const w = textWidth(node.shortLabel ?? node.label, 22);
      return { x: sx - w / 2, y: sy - LABEL_H / 2, w, h: LABEL_H };
    });
    const labels = highlightedKeys
      .map((key) => {
        const edge = infraEdges.find((e) => edgeKey(e) === key)!;
        const { apex } = edgeGeometry.get(key)!;
        const text = edge.short + (edge.state === "planned" ? " · prévu" : "");
        return { key, w: textWidth(text, 36), ...toScreen(apex.x, apex.y, apex.z) };
      })
      .sort((a, b) => a.sy - b.sy);
    const next: Record<string, number> = {};
    labels.forEach(({ key, w, sx, sy }) => {
      let chosen = 0;
      for (const dy of CANDIDATE_OFFSETS) {
        const rect = { x: sx - w / 2, y: sy + dy - LABEL_H / 2, w, h: LABEL_H };
        if (!placed.some((other) => overlaps(rect, other))) {
          chosen = dy;
          break;
        }
      }
      placed.push({ x: sx - w / 2, y: sy + chosen - LABEL_H / 2, w, h: LABEL_H });
      next[key] = chosen;
    });
    const current = offsetsRef.current;
    const changed =
      Object.keys(next).length !== Object.keys(current).length || Object.keys(next).some((k) => next[k] !== current[k]);
    if (changed) {
      offsetsRef.current = next;
      setLabelOffsets(next);
    }
  });
  // Recalcul immédiat quand l'ensemble des libellés affichés change
  useEffect(() => invalidate(), [highlightedSignature, invalidate]);

  return (
    <>
      <ambientLight intensity={colors.dark ? 0.6 : 0.85} />
      <directionalLight position={[6, 12, 8]} intensity={colors.dark ? 1.2 : 1.35} />
      <directionalLight position={[-8, 6, -4]} intensity={0.4} />

      {infraGroups.map((group) => (
        <Platform key={group.id} groupId={group.id} colors={colors} />
      ))}

      {/* Rattachement au sol d'un service ou d'une VM à sa machine hôte */}
      {infraNodes
        .filter((node) => node.host)
        .map((node) => {
          const host = nodesById.get(node.host!)!;
          return (
            <Line
              key={`host-${node.id}`}
              points={[
                [node.position[0], 0.02, node.position[2]],
                [host.position[0], 0.02, host.position[2]],
              ]}
              color={colors.subtle}
              lineWidth={1}
              dashed
              dashSize={0.12}
              gapSize={0.1}
              transparent
              opacity={0.5}
            />
          );
        })}

      {visibleEdges.map((edge) => {
        const key = edgeKey(edge);
        const highlighted = highlightedKeys.includes(key);
        return (
          <Flow
            key={key}
            edge={edge}
            colors={colors}
            highlighted={highlighted}
            dimmed={family !== null && !highlighted}
            labelOffset={labelOffsets[key] ?? 0}
            onHover={handleEdgeHover}
          />
        );
      })}

      {infraNodes.map((node) => (
        <NodeView
          key={node.id}
          node={node}
          colors={colors}
          selected={node.id === selectedId}
          hovered={node.id === hoveredId}
          dimmed={related !== null && !related.has(node.id)}
          onSelect={onSelect}
          onHover={handleHover}
        />
      ))}
    </>
  );
};

const InfraScene = ({ selectedId, onSelect, visibleCategories, reducedMotion, resetKey }: InfraSceneProps) => {
  const colors = useThemeColors();

  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={CAMERA_PROPS}
      gl={{ alpha: true, antialias: true }}
      onPointerMissed={() => onSelect(null)}
      aria-label={`Carte 3D de l'infrastructure : serveurs, services, lab local et flux (${Object.values(edgeCategoryLabel).join(", ").toLowerCase()}). Une vue en liste équivalente est disponible.`}
      role="img"
    >
      <SceneContent selectedId={selectedId} onSelect={onSelect} visibleCategories={visibleCategories} colors={colors} />
      <Controls reducedMotion={reducedMotion} resetKey={resetKey} />
    </Canvas>
  );
};

export default InfraScene;
