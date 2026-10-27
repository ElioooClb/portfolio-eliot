import { useEffect, useState } from "react";
import type { InfraEdgeCategory } from "../types";

// Couleurs du thème actif pour la scène 3D (three.js ne lit pas les classes
// Tailwind). Neutres et accent lus dans les variables CSS de src/index.css,
// palettes des modèles et des flux définies ici pour chaque mode. Relues
// quand la classe "dark" de <html> change.

type ModelPalette = {
  chassis: string;
  panel: string;
  bay: string;
  metal: string;
  keyboard: string;
  frame: string;
  screen: string;
  screenDark: string;
  db: string;
  dbCap: string;
  archive: string;
  robotBody: string;
  robotDark: string;
  cloud: string;
  windows: string;
  debian: string;
  container: [string, string, string];
};

export type ThemeColors = {
  dark: boolean;
  accent: string;
  fg: string;
  body: string;
  subtle: string;
  line: string;
  surface: string;
  local: string;
  external: string;
  model: ModelPalette;
  flow: Record<InfraEdgeCategory, string>;
};

const light = {
  local: "#2563eb",
  external: "#78716c",
  model: {
    chassis: "#3f3f46",
    panel: "#52525b",
    bay: "#18181b",
    metal: "#d4d4d8",
    keyboard: "#3f3f46",
    frame: "#27272a",
    screen: "#f5f5f4",
    screenDark: "#1c1917",
    db: "#475569",
    dbCap: "#94a3b8",
    archive: "#a8a29e",
    robotBody: "#f5f5f4",
    robotDark: "#292524",
    cloud: "#e7e5e4",
    windows: "#0078d4",
    debian: "#d70a53",
    container: ["#2496ed", "#1d4ed8", "#0ea5e9"] as [string, string, string],
  },
  flow: { admin: "#4f46e5", data: "#0891b2", backup: "#16a34a", deploy: "#db2777", monitoring: "#d97706" },
};

const dark = {
  local: "#60a5fa",
  external: "#a8a29e",
  model: {
    chassis: "#52525b",
    panel: "#71717a",
    bay: "#27272a",
    metal: "#a1a1aa",
    keyboard: "#27272a",
    frame: "#3f3f46",
    screen: "#292524",
    screenDark: "#0c0a09",
    db: "#64748b",
    dbCap: "#cbd5e1",
    archive: "#78716c",
    robotBody: "#d6d3d1",
    robotDark: "#1c1917",
    cloud: "#d6d3d1",
    windows: "#3b9eff",
    debian: "#f43f5e",
    container: ["#38bdf8", "#3b82f6", "#7dd3fc"] as [string, string, string],
  },
  flow: { admin: "#818cf8", data: "#22d3ee", backup: "#4ade80", deploy: "#f472b6", monitoring: "#fbbf24" },
};

const cssColor = (name: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--c-${name}`).trim();
  return `rgb(${value.split(/\s+/).join(", ")})`;
};

const readColors = (): ThemeColors => {
  const isDark = document.documentElement.classList.contains("dark");
  const palette = isDark ? dark : light;
  return {
    dark: isDark,
    accent: cssColor("accent"),
    fg: cssColor("fg"),
    body: cssColor("body"),
    subtle: cssColor("subtle"),
    line: cssColor("line"),
    surface: cssColor("surface"),
    ...palette,
  };
};

export const useThemeColors = () => {
  const [colors, setColors] = useState<ThemeColors>(readColors);

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(readColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return colors;
};
