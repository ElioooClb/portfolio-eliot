/** @type {import('tailwindcss').Config} */

// Couleurs pilotées par des variables CSS (src/index.css) : mode clair par
// défaut, mode sombre sous la classe "dark" posée sur <html>.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: token("page"),
        surface: token("surface"),
        surface2: token("surface-2"),
        line: token("line"),
        fg: token("fg"),
        body: token("body"),
        subtle: token("subtle"),
        accent: {
          DEFAULT: token("accent"),
          strong: token("accent-strong"),
          fg: token("on-accent"),
        },
      },
    },
  },
  plugins: [],
};
