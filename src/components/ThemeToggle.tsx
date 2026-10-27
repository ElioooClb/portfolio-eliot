import { useState } from "react";
import { Moon, Sun } from "lucide-react";

// Le thème initial est posé par le script de index.html avant le rendu
// (préférence enregistrée, sinon celle du système), pour éviter un flash.
const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour la session
    }
  };

  const label = dark ? "Passer en mode clair" : "Passer en mode sombre";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="rounded-full border border-line p-2 text-subtle transition hover:border-fg/30 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
