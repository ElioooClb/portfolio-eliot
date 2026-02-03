const Skills = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Compétences</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Un socle solide en développement front, complété par des bases back
          et une approche produit.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Front-end",
            items: ["React", "TypeScript", "Tailwind", "Vite", "Responsive UI"],
          },
          {
            title: "Back-end",
            items: ["Node.js", "Express", "API REST", "SQL", "Firebase"],
          },
          {
            title: "UX / UI",
            items: ["Design system", "Accessibilité", "Prototypage", "Figma"],
          },
          {
            title: "Méthodes",
            items: ["Agile", "Git", "Tests fonctionnels", "Documentation"],
          },
        ].map((block) => (
          <div
            key={block.title}
            className="rounded-2xl border border-white/10 bg-slateCard/60 p-6"
          >
            <h2 className="text-lg font-semibold text-white">{block.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {block.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Skills;
