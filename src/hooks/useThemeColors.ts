import { useEffect, useState } from "react";

// Couleurs du thème actif pour la scène 3D (three.js ne lit pas les classes
// Tailwind). Lues dans les variables CSS de src/index.css et relues quand la
// classe "dark" de <html> change.

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
};

const cssColor = (name: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--c-${name}`).trim();
  return `rgb(${value.split(/\s+/).join(", ")})`;
};

const readColors = (): ThemeColors => {
  const dark = document.documentElement.classList.contains("dark");
  return {
    dark,
    accent: cssColor("accent"),
    fg: cssColor("fg"),
    body: cssColor("body"),
    subtle: cssColor("subtle"),
    line: cssColor("line"),
    surface: cssColor("surface"),
    local: dark ? "#60a5fa" : "#2563eb",
    external: dark ? "#a8a29e" : "#78716c",
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
