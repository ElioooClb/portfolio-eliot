/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slateBg: "#0f172a",
        slateCard: "#111827",
        accent: "#38bdf8",
        accentSoft: "#0ea5e9",
      },
    },
  },
  plugins: [],
};
