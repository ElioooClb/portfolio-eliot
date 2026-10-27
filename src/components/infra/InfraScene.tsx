import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { infraEdges, infraGroups, infraNodes } from "../../data/topology";
import { useThemeColors, type ThemeColors } from "../../hooks/useThemeColors";
import type { InfraGroupId, InfraNode } from "../../types";

// Scène 3D de l'explorateur d'infrastructure. Chargée à la demande
// (React.lazy) pour ne pas alourdir le reste du site. Rendu à la demande
// (frameloop="demand") : aucune animation continue.

type InfraSceneProps = {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  showFlows: boolean;
  reducedMotion: boolean;
  resetKey: number;
};

const nodesById = new Map(infraNodes.map((node) => [node.id, node]));

const groupColor = (group: InfraGroupId, colors: ThemeColors) =>
  group === "ovh" ? colors.accent : group === "local" ? colors.local : colors.external;

// Hauteur du haut de chaque forme, pour placer étiquettes et rattachements
const shapeTop: Record<InfraNode["type"], number> = {
  vps: 0.45,
  workstation: 0.25,
  vm: 0.25,
  service: 0.28,
  external: 0.45,
};

// Forme selon le type, avec son matériau et son contour passés en enfants
const NodeShape = ({ node, children }: { node: InfraNode; children: ReactNode }) => {
  switch (node.type) {
    case "vps":
      return <RoundedBox args={[1.5, 0.9, 1]} radius={0.06} smoothness={3}>{children}</RoundedBox>;
    case "workstation":
      return <RoundedBox args={[1.7, 0.5, 1]} radius={0.06} smoothness={3}>{children}</RoundedBox>;
    case "vm":
      return <RoundedBox args={[0.9, 0.5, 0.6]} radius={0.05} smoothness={3}>{children}</RoundedBox>;
    case "service":
      return (
        <mesh>
          <sphereGeometry args={[0.28, 32, 16]} />
          {children}
        </mesh>
      );
    default:
      return (
        <mesh>
          <icosahedronGeometry args={[0.45, 0]} />
          {children}
        </mesh>
      );
  }
};

type NodeProps = {
  node: InfraNode;
  colors: ThemeColors;
  selected: boolean;
  // Lié à l'élément sélectionné (flux ou hébergement)
  related: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
};

// Étiquettes toujours visibles pour les machines ; celles des services et des
// VM apparaissent au survol ou à la sélection, pour éviter les chevauchements
const alwaysLabelled: InfraNode["type"][] = ["vps", "workstation", "external"];

// Machines : étiquette devant la forme (le dessus porte leurs services) ;
// services, VM et services externes : étiquette au-dessus
const labelPosition = (node: InfraNode): [number, number, number] =>
  node.type === "vps" || node.type === "workstation"
    ? [0, -0.15, 0.8]
    : [0, shapeTop[node.type] + 0.32, 0];

const InfraNodeMesh = ({ node, colors, selected, related, dimmed, onSelect }: NodeProps) => {
  const [hovered, setHovered] = useState(false);
  const color = groupColor(node.group, colors);
  const planned = node.observation.state === "planned";
  const opacity = planned ? 0.28 : dimmed ? 0.45 : 1;
  const emissive = selected ? 0.55 : hovered ? 0.25 : 0;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  return (
    <group
      position={node.position}
      scale={selected ? 1.08 : 1}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(node.id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <NodeShape node={node}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive}
          roughness={0.55}
          metalness={0.1}
          transparent={opacity < 1}
          opacity={opacity}
          depthWrite={!planned}
        />
        <Edges color={selected ? colors.fg : color} threshold={20} />
      </NodeShape>
      {(alwaysLabelled.includes(node.type) || hovered || selected || related) && (
      <Html
        position={labelPosition(node)}
        center
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <span
          className={`block whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium shadow-sm transition ${
            selected
              ? "border-accent bg-accent text-accent-fg"
              : "border-line bg-surface/90 text-fg"
          } ${dimmed && !selected ? "opacity-50" : ""}`}
        >
          {node.label}
          {planned && <span className="ml-1 text-subtle">· prévu</span>}
        </span>
      </Html>
      )}
    </group>
  );
};

const Platform = ({ groupId, colors }: { groupId: InfraGroupId; colors: ThemeColors }) => {
  const group = infraGroups.find((g) => g.id === groupId)!;
  const color = groupColor(groupId, colors);
  const [cx, cz] = group.center;
  const [w, d] = group.size;
  return (
    <group position={[cx, 0, cz]}>
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[w, 0.12, d]} />
        <meshStandardMaterial color={color} transparent opacity={colors.dark ? 0.14 : 0.12} roughness={0.9} depthWrite={false} />
        <Edges color={color} />
      </mesh>
      <Html position={[0, 0.02, d / 2 + 0.3]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <span className="block whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide" style={{ color }}>
          {group.label}
        </span>
      </Html>
    </group>
  );
};

// Position de référence de la caméra, calée pour un cadre d'environ 4/3 ;
// reculée proportionnellement quand le cadre est plus étroit (mobile)
const TARGET: [number, number, number] = [0.3, 0.4, -1.6];
const CAMERA_OFFSET: [number, number, number] = [0, 9.9, 11.3];
const REFERENCE_ASPECT = 1.35;
// Objet constant : un littéral recréé à chaque rendu serait réappliqué par
// React Three Fiber à chaque redimensionnement et écraserait le recul calculé
const CAMERA_PROPS = { position: [0.3, 10.3, 9.7] as [number, number, number], fov: 45 };

const Controls = ({ reducedMotion, resetKey }: { reducedMotion: boolean; resetKey: number }) => {
  const ref = useRef<OrbitControlsImpl>(null);
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const factor = Math.min(Math.max(REFERENCE_ASPECT / (width / height), 1), 2.4);
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
      minDistance={6}
      maxDistance={36}
      maxPolarAngle={Math.PI / 2.15}
    />
  );
};

const SceneContent = ({ selectedId, onSelect, showFlows, colors }: Omit<InfraSceneProps, "reducedMotion" | "resetKey"> & { colors: ThemeColors }) => {
  const connected = useMemo(() => {
    if (!selectedId) return null;
    const ids = new Set<string>([selectedId]);
    infraEdges.forEach((edge) => {
      if (edge.from === selectedId) ids.add(edge.to);
      if (edge.to === selectedId) ids.add(edge.from);
    });
    infraNodes.forEach((node) => {
      if (node.host === selectedId) ids.add(node.id);
      if (node.id === selectedId && node.host) ids.add(node.host);
    });
    return ids;
  }, [selectedId]);

  return (
    <>
      <ambientLight intensity={colors.dark ? 0.55 : 0.8} />
      <directionalLight position={[6, 10, 6]} intensity={colors.dark ? 1.1 : 1.3} />
      <directionalLight position={[-6, 4, -4]} intensity={0.35} />

      {infraGroups.map((group) => (
        <Platform key={group.id} groupId={group.id} colors={colors} />
      ))}

      {/* Rattachement d'un service ou d'une VM à sa machine hôte */}
      {infraNodes
        .filter((node) => node.host)
        .map((node) => {
          const host = nodesById.get(node.host!)!;
          const top: [number, number, number] = [host.position[0], host.position[1] + shapeTop[host.type], host.position[2]];
          return (
            <Line
              key={`host-${node.id}`}
              points={[node.position, top]}
              color={colors.subtle}
              lineWidth={1}
              transparent
              opacity={0.45}
            />
          );
        })}

      {showFlows &&
        infraEdges.map((edge) => {
          const a = nodesById.get(edge.from)!;
          const b = nodesById.get(edge.to)!;
          const active = selectedId !== null && (edge.from === selectedId || edge.to === selectedId);
          const mid: [number, number, number] = [
            (a.position[0] + b.position[0]) / 2,
            Math.max(a.position[1], b.position[1]) + 1.3,
            (a.position[2] + b.position[2]) / 2,
          ];
          return (
            <QuadraticBezierLine
              key={`${edge.from}-${edge.to}`}
              start={a.position}
              end={b.position}
              mid={mid}
              color={active ? colors.accent : colors.subtle}
              lineWidth={active ? 2.5 : 1.5}
              dashed={edge.state === "planned"}
              dashSize={0.18}
              gapSize={0.14}
              transparent
              opacity={selectedId === null ? 0.8 : active ? 1 : 0.2}
            />
          );
        })}

      {infraNodes.map((node) => (
        <InfraNodeMesh
          key={node.id}
          node={node}
          colors={colors}
          selected={node.id === selectedId}
          related={connected !== null && connected.has(node.id)}
          dimmed={connected !== null && !connected.has(node.id)}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};

const InfraScene = ({ selectedId, onSelect, showFlows, reducedMotion, resetKey }: InfraSceneProps) => {
  const colors = useThemeColors();

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={CAMERA_PROPS}
      gl={{ alpha: true, antialias: true }}
      onPointerMissed={() => onSelect(null)}
      aria-label="Carte 3D de l'infrastructure : serveurs, services, lab local et flux. Une vue en liste équivalente est disponible."
      role="img"
    >
      <SceneContent selectedId={selectedId} onSelect={onSelect} showFlows={showFlows} colors={colors} />
      <Controls reducedMotion={reducedMotion} resetKey={resetKey} />
    </Canvas>
  );
};

export default InfraScene;
