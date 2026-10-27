import { createContext, useContext, useMemo, type ReactNode } from "react";
import { Line, RoundedBox } from "@react-three/drei";
import type { ThemeColors } from "../../hooks/useThemeColors";
import type { InfraNode } from "../../types";

// Modèles 3D de l'explorateur d'infrastructure, assemblés à partir de formes
// simples (aucun fichier externe). Chaque modèle repose sur le sol (y = 0) et
// fait face à la caméra (+z). Un élément prévu est dessiné en transparence.

type ModelStyle = { ghost: boolean; colors: ThemeColors };

const ModelContext = createContext<ModelStyle | null>(null);

export const ModelProvider = ({ ghost, colors, children }: ModelStyle & { children: ReactNode }) => {
  const value = useMemo(() => ({ ghost, colors }), [ghost, colors]);
  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
};

const useModel = () => useContext(ModelContext)!;

type Vec3 = [number, number, number];

type MatProps = { color: string; glow?: number; roughness?: number; metalness?: number };

// Matériau commun : opaque, ou translucide pour un élément prévu.
// glow : intensité d'émission (voyants, écrans), coupée en mode prévu.
const Mat = ({ color, glow = 0, roughness = 0.6, metalness = 0.15 }: MatProps) => {
  const { ghost, colors } = useModel();
  // Élément prévu : teinte unique façon « plan », contrastée dans les deux modes
  if (ghost) {
    return (
      <meshStandardMaterial
        color={colors.fg}
        emissive={colors.fg}
        emissiveIntensity={colors.dark ? 0.25 : 0}
        roughness={0.9}
        transparent
        opacity={colors.dark ? 0.32 : 0.22}
        depthWrite={false}
      />
    );
  }
  return (
    <meshStandardMaterial
      color={color}
      emissive={glow > 0 ? color : "#000000"}
      emissiveIntensity={glow}
      roughness={roughness}
      metalness={metalness}
    />
  );
};

const Box = ({ size, position, rotation, ...mat }: MatProps & { size: Vec3; position: Vec3; rotation?: Vec3 }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={size} />
    <Mat {...mat} />
  </mesh>
);

const Rounded = ({ size, position, radius = 0.05, ...mat }: MatProps & { size: Vec3; position: Vec3; radius?: number }) => (
  <RoundedBox args={size} radius={radius} smoothness={3} position={position}>
    <Mat {...mat} />
  </RoundedBox>
);

const Cylinder = ({
  radius,
  height,
  position,
  rotation,
  ...mat
}: MatProps & { radius: number; height: number; position: Vec3; rotation?: Vec3 }) => (
  <mesh position={position} rotation={rotation}>
    <cylinderGeometry args={[radius, radius, height, 32]} />
    <Mat {...mat} />
  </mesh>
);

const Sphere = ({ radius, position, ...mat }: MatProps & { radius: number; position: Vec3 }) => (
  <mesh position={position}>
    <sphereGeometry args={[radius, 24, 16]} />
    <Mat {...mat} />
  </mesh>
);

// --- Serveur en baie : unités empilées, baies de disques, voyants ---------

const UNIT_H = 0.42;
const SERVER_W = 1.9;
const SERVER_D = 1.3;

const Server = ({ units = 2 }: { units?: number }) => {
  const { colors } = useModel();
  const m = colors.model;
  const front = SERVER_D / 2;
  return (
    <group>
      <Box size={[SERVER_W + 0.08, 0.1, SERVER_D + 0.08]} position={[0, 0.05, 0]} color={m.bay} />
      {Array.from({ length: units }, (_, i) => {
        const y = 0.1 + i * UNIT_H + UNIT_H / 2;
        return (
          <group key={i} position={[0, y, 0]}>
            <Rounded size={[SERVER_W, UNIT_H - 0.04, SERVER_D]} position={[0, 0, 0]} radius={0.03} color={m.chassis} metalness={0.35} roughness={0.45} />
            <Box size={[SERVER_W - 0.12, UNIT_H - 0.12, 0.02]} position={[0, 0, front + 0.005]} color={m.panel} />
            {[0, 1, 2, 3].map((k) => (
              <Box key={k} size={[0.22, UNIT_H - 0.2, 0.025]} position={[-SERVER_W / 2 + 0.3 + k * 0.27, 0, front + 0.02]} color={m.bay} />
            ))}
            {[0, 1, 2].map((k) => (
              <Box key={`v${k}`} size={[0.42, 0.018, 0.02]} position={[0.3, -0.06 + k * 0.06, front + 0.02]} color={m.bay} />
            ))}
            <Sphere radius={0.032} position={[SERVER_W / 2 - 0.22, 0.04, front + 0.03]} color="#22c55e" glow={1.4} />
            <Sphere radius={0.032} position={[SERVER_W / 2 - 0.34, 0.04, front + 0.03]} color={colors.accent} glow={1.4} />
          </group>
        );
      })}
    </group>
  );
};

// --- Ordinateur portable ---------------------------------------------------

const Laptop = () => {
  const { colors } = useModel();
  const m = colors.model;
  return (
    <group>
      <Rounded size={[1.7, 0.08, 1.15]} position={[0, 0.04, 0]} radius={0.03} color={m.metal} metalness={0.5} roughness={0.35} />
      <Box size={[1.45, 0.012, 0.5]} position={[0, 0.086, -0.15]} color={m.keyboard} />
      <Box size={[0.46, 0.008, 0.28]} position={[0, 0.084, 0.34]} color={m.panel} />
      <group position={[0, 0.08, -0.56]} rotation={[-0.3, 0, 0]}>
        <Rounded size={[1.7, 1.05, 0.05]} position={[0, 0.525, 0]} radius={0.03} color={m.metal} metalness={0.5} roughness={0.35} />
        <Box size={[1.56, 0.9, 0.01]} position={[0, 0.54, 0.03]} color={m.screenDark} />
        {[0.42, 0.3, 0.18, 0.66].map((w, k) => (
          <Box key={k} size={[w, 0.035, 0.005]} position={[-0.62 + w / 2, 0.86 - k * 0.1, 0.037]} color={k === 3 ? colors.accent : "#4ade80"} glow={0.8} />
        ))}
      </group>
    </group>
  );
};

// --- Écran sur pied (VM, supervision, navigateur) --------------------------

const Stand = () => {
  const { colors } = useModel();
  return (
    <group>
      <Rounded size={[0.55, 0.04, 0.36]} position={[0, 0.02, 0]} radius={0.015} color={colors.model.frame} />
      <Cylinder radius={0.04} height={0.36} position={[0, 0.2, -0.04]} color={colors.model.frame} />
    </group>
  );
};

const Screen = ({ width, height, children }: { width: number; height: number; children?: ReactNode }) => {
  const { colors } = useModel();
  const m = colors.model;
  const cy = 0.38 + height / 2;
  return (
    <group>
      <Stand />
      <group position={[0, cy, 0]}>
        <Rounded size={[width, height, 0.06]} position={[0, 0, 0]} radius={0.03} color={m.frame} />
        <Box size={[width - 0.08, 0.08, 0.01]} position={[0, height / 2 - 0.07, 0.033]} color={m.panel} />
        {[0, 1, 2].map((k) => (
          <Sphere key={k} radius={0.016} position={[-width / 2 + 0.1 + k * 0.05, height / 2 - 0.07, 0.04]} color={["#ef4444", "#f59e0b", "#22c55e"][k]} />
        ))}
        <Box size={[width - 0.08, height - 0.2, 0.01]} position={[0, -0.05, 0.032]} color={m.screen} />
        <group position={[0, -0.05, 0.04]}>{children}</group>
      </group>
    </group>
  );
};

const WindowsLogo = ({ size = 0.12 }: { size?: number }) => {
  const { colors } = useModel();
  const gap = size * 0.18;
  const o = (size + gap) / 2;
  return (
    <group>
      {[
        [-o, o],
        [o, o],
        [-o, -o],
        [o, -o],
      ].map(([x, y], k) => (
        <Box key={k} size={[size, size, 0.01]} position={[x, y, 0]} color={colors.model.windows} glow={0.25} />
      ))}
    </group>
  );
};

const VmWindowsServer = () => (
  <Screen width={1.15} height={0.78}>
    <group position={[0, 0.06, 0]}>
      <WindowsLogo />
    </group>
    {[0, 1].map((k) => (
      <Box key={k} size={[0.5, 0.035, 0.01]} position={[0, -0.17 - k * 0.07, 0]} color="#78716c" />
    ))}
  </Screen>
);

const VmWindowsClient = () => (
  <Screen width={1.15} height={0.78}>
    <WindowsLogo size={0.14} />
  </Screen>
);

const VmDebian = () => {
  const { colors } = useModel();
  return (
    <Screen width={1.15} height={0.78}>
      <mesh rotation={[0, 0, 0.9]}>
        <torusGeometry args={[0.14, 0.035, 12, 40, Math.PI * 1.55]} />
        <Mat color={colors.model.debian} glow={0.2} />
      </mesh>
      <Sphere radius={0.03} position={[0.03, 0.02, 0]} color={colors.model.debian} />
    </Screen>
  );
};

// Routeur : deux flèches opposées, le symbole du routage entre réseaux
const VmRouter = () => {
  const { colors } = useModel();
  const c = colors.flow.data;
  const arrow = (y: number, dir: 1 | -1) => (
    <group key={y} position={[0, y, 0]}>
      <Box size={[0.42, 0.035, 0.01]} position={[-dir * 0.04, 0, 0]} color={c} glow={0.3} />
      <mesh position={[dir * 0.2, 0, 0]} rotation={[0, 0, -dir * (Math.PI / 2)]}>
        <coneGeometry args={[0.065, 0.12, 12]} />
        <Mat color={c} glow={0.3} />
      </mesh>
    </group>
  );
  return (
    <Screen width={1.15} height={0.78}>
      {arrow(0.08, 1)}
      {arrow(-0.12, -1)}
    </Screen>
  );
};

// Linux générique (Rocky) : invite de commande
const VmLinux = () => {
  const { colors } = useModel();
  return (
    <Screen width={1.15} height={0.78}>
      <group position={[-0.12, 0, 0]}>
        <Box size={[0.13, 0.035, 0.01]} position={[0, 0.045, 0]} rotation={[0, 0, -0.6]} color={colors.model.debian} glow={0.2} />
        <Box size={[0.13, 0.035, 0.01]} position={[0, -0.045, 0]} rotation={[0, 0, 0.6]} color={colors.model.debian} glow={0.2} />
      </group>
      <Box size={[0.18, 0.035, 0.01]} position={[0.1, -0.09, 0]} color={colors.model.debian} glow={0.2} />
    </Screen>
  );
};

const Monitoring = () => {
  const { colors, ghost } = useModel();
  const points: Vec3[] = [
    [-0.48, -0.05, 0.01],
    [-0.25, -0.05, 0.01],
    [-0.18, 0.12, 0.01],
    [-0.1, -0.2, 0.01],
    [-0.02, 0.06, 0.01],
    [0.06, -0.05, 0.01],
    [0.2, -0.05, 0.01],
  ];
  return (
    <Screen width={1.25} height={0.82}>
      <Box size={[1.17, 0.62, 0.005]} position={[0, 0, 0.002]} color={colors.model.screenDark} />
      <Line points={points} color={colors.flow.monitoring} lineWidth={2} transparent opacity={ghost ? 0.4 : 1} />
      {[0.12, 0.22, 0.17].map((h, k) => (
        <Box key={k} size={[0.07, h, 0.01]} position={[0.32 + k * 0.1, -0.22 + h / 2, 0.01]} color={colors.flow.monitoring} glow={0.3} />
      ))}
    </Screen>
  );
};

const Browser = () => {
  const { colors } = useModel();
  return (
    <Screen width={1.3} height={0.86}>
      <Box size={[1.05, 0.12, 0.01]} position={[0, 0.2, 0]} color={colors.accent} glow={0.2} />
      {[0, 1, 2].map((k) => (
        <Box key={k} size={[0.6 - k * 0.12, 0.03, 0.01]} position={[-0.22 + k * 0.06 - 0.03 * k, 0.05 - k * 0.07, 0]} color="#a8a29e" />
      ))}
      {[-0.27, 0.27].map((x) => (
        <Box key={x} size={[0.46, 0.16, 0.01]} position={[x + 0.02, -0.22, 0]} color={colors.model.dbCap} />
      ))}
    </Screen>
  );
};

// --- Base de données (recherche RAG) ---------------------------------------

const Database = () => {
  const { colors } = useModel();
  const m = colors.model;
  return (
    <group>
      {[0, 1, 2].map((k) => (
        <group key={k} position={[0, 0.11 + k * 0.26, 0]}>
          <Cylinder radius={0.45} height={0.22} position={[0, 0, 0]} color={m.db} metalness={0.3} roughness={0.4} />
          <Cylinder radius={0.452} height={0.02} position={[0, 0.1, 0]} color={m.dbCap} />
        </group>
      ))}
      {/* Loupe : la base sert à la recherche */}
      <group position={[0.42, 0.48, 0.42]} rotation={[0, 0, -0.6]}>
        <mesh>
          <torusGeometry args={[0.13, 0.03, 12, 32]} />
          <Mat color={colors.flow.data} glow={0.25} />
        </mesh>
        <Cylinder radius={0.025} height={0.2} position={[0, -0.23, 0]} color={colors.flow.data} />
      </group>
    </group>
  );
};

// --- Sauvegardes : archive et flèche circulaire ----------------------------

const Backup = () => {
  const { colors } = useModel();
  const m = colors.model;
  return (
    <group>
      <Rounded size={[0.85, 0.5, 0.62]} position={[0, 0.25, 0]} radius={0.04} color={m.archive} />
      <Box size={[0.88, 0.05, 0.65]} position={[0, 0.43, 0]} color={m.panel} />
      <Box size={[0.3, 0.08, 0.01]} position={[0, 0.25, 0.315]} color={m.dbCap} />
      <group position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.6, 0.035, 10, 48, Math.PI * 1.6]} />
          <Mat color={colors.flow.backup} glow={0.3} />
        </mesh>
        {/* Pointe de flèche au début de l'arc, orientée à l'inverse de son sens */}
        <mesh position={[0.6, -0.05, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.08, 0.2, 12]} />
          <Mat color={colors.flow.backup} glow={0.3} />
        </mesh>
      </group>
    </group>
  );
};

// --- Agent : tête de robot -------------------------------------------------

const Agent = () => {
  const { colors } = useModel();
  const m = colors.model;
  return (
    <group>
      <Cylinder radius={0.32} height={0.12} position={[0, 0.06, 0]} color={m.robotDark} />
      <Cylinder radius={0.08} height={0.15} position={[0, 0.19, 0]} color={m.robotDark} />
      <Rounded size={[0.86, 0.62, 0.62]} position={[0, 0.57, 0]} radius={0.14} color={m.robotBody} roughness={0.35} />
      <Rounded size={[0.66, 0.28, 0.04]} position={[0, 0.6, 0.3]} radius={0.06} color={m.robotDark} />
      <Sphere radius={0.06} position={[-0.15, 0.6, 0.33]} color={colors.accent} glow={1.2} />
      <Sphere radius={0.06} position={[0.15, 0.6, 0.33]} color={colors.accent} glow={1.2} />
      <Cylinder radius={0.09} height={0.06} position={[-0.46, 0.57, 0]} rotation={[0, 0, Math.PI / 2]} color={m.robotDark} />
      <Cylinder radius={0.09} height={0.06} position={[0.46, 0.57, 0]} rotation={[0, 0, Math.PI / 2]} color={m.robotDark} />
      <Cylinder radius={0.02} height={0.22} position={[0, 0.99, 0]} color={m.robotDark} />
      <Sphere radius={0.06} position={[0, 1.13, 0]} color={colors.accent} glow={1.2} />
    </group>
  );
};

// --- Conteneurs (plateforme de déploiement) --------------------------------

const Containers = () => {
  const { colors } = useModel();
  const [c1, c2, c3] = colors.model.container;
  const container = (x: number, y: number, color: string, key: string) => (
    <group key={key} position={[x, y, 0]}>
      <Box size={[0.62, 0.34, 0.8]} position={[0, 0, 0]} color={color} metalness={0.3} roughness={0.45} />
      {[-0.2, -0.07, 0.07, 0.2].map((dx) => (
        <Box key={dx} size={[0.03, 0.28, 0.01]} position={[dx, 0, 0.405]} color="#0c4a6e" />
      ))}
    </group>
  );
  return (
    <group>
      <Box size={[1.42, 0.08, 0.9]} position={[0, 0.04, 0]} color={colors.model.archive} />
      {container(-0.33, 0.25, c1, "a")}
      {container(0.33, 0.25, c2, "b")}
      {container(0, 0.6, c3, "c")}
    </group>
  );
};

// --- Nuage (GitHub) --------------------------------------------------------

const Cloud = () => {
  const { colors } = useModel();
  const c = colors.model.cloud;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <group position={[0, 0.78, 0]}>
        <Sphere radius={0.42} position={[0, 0, 0]} color={c} roughness={0.8} />
        <Sphere radius={0.32} position={[-0.42, -0.1, 0]} color={c} roughness={0.8} />
        <Sphere radius={0.32} position={[0.42, -0.1, 0]} color={c} roughness={0.8} />
        <Sphere radius={0.3} position={[0.2, 0.22, -0.05]} color={c} roughness={0.8} />
        {/* Branche Git : deux commits reliés */}
        <Sphere radius={0.05} position={[-0.1, -0.05, 0.42]} color={colors.model.frame} />
        <Sphere radius={0.05} position={[0.12, 0.1, 0.4]} color={colors.model.frame} />
        <Cylinder radius={0.015} height={0.27} position={[0.01, 0.025, 0.41]} rotation={[0, 0, -0.95]} color={colors.model.frame} />
      </group>
    </group>
  );
};

// --- Dimensions pour étiquettes, flux et anneau de sélection ---------------

export const modelHeight = (node: InfraNode): number => {
  switch (node.model) {
    case "server":
      return 0.1 + (node.units ?? 2) * UNIT_H;
    case "laptop":
      return 1.1;
    case "database":
      return 0.8;
    case "backup":
      return 0.62;
    case "agent":
      return 1.2;
    case "containers":
      return 0.86;
    case "cloud":
      return 1.22;
    case "browser":
      return 1.26;
    case "monitoring":
      return 1.22;
    default:
      return 1.18;
  }
};

export const modelRadius = (node: InfraNode): number => {
  switch (node.model) {
    case "server":
      return 1.3;
    case "laptop":
      return 1.1;
    case "backup":
      return 0.8;
    case "containers":
      return 0.9;
    case "cloud":
      return 0.85;
    default:
      return 0.75;
  }
};

export const InfraModelView = ({ node }: { node: InfraNode }) => {
  switch (node.model) {
    case "server":
      return <Server units={node.units} />;
    case "laptop":
      return <Laptop />;
    case "vm-windows-server":
      return <VmWindowsServer />;
    case "vm-windows-client":
      return <VmWindowsClient />;
    case "vm-debian":
      return <VmDebian />;
    case "vm-router":
      return <VmRouter />;
    case "vm-linux":
      return <VmLinux />;
    case "database":
      return <Database />;
    case "backup":
      return <Backup />;
    case "agent":
      return <Agent />;
    case "containers":
      return <Containers />;
    case "monitoring":
      return <Monitoring />;
    case "cloud":
      return <Cloud />;
    default:
      return <Browser />;
  }
};
