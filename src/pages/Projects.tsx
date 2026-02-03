import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Tag from "../components/Tag";
import projectsData from "../data/projects.json";
import type { Project } from "../types";

const projects = projectsData as Project[];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = useMemo(() => {
    const all = projects.flatMap((project) => project.stack);
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.summary.toLowerCase().includes(search.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.stack.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [search, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Projets</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Chaque projet reflète un contexte réel (BTS, perso ou pro) avec un
          focus sur l'UX, la performance et la qualité du code.
        </p>
      </section>

      <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-slateCard/60 p-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-slate-200" htmlFor="search">
            Recherche
          </label>
          <input
            id="search"
            type="text"
            placeholder="Titre ou description..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
            aria-label="Rechercher un projet"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={isActive}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "bg-accent text-slate-900"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white hover:border-white"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slateCard/60 p-6 text-sm text-slate-300">
            Aucun projet ne correspond à votre recherche.
          </div>
        ) : (
          filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </section>
    </div>
  );
};

export default Projects;
