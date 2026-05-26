import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../types";

const projects = projectsData as Project[];

const Home = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }

    const updateControls = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1);
    };

    requestAnimationFrame(updateControls);
    container.addEventListener("scroll", updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", updateControls);
      observer.disconnect();
    };
  }, []);

  const scrollByPage = (direction: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }
    const offset = direction === "next" ? container.clientWidth : -container.clientWidth;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-xl shadow-black/30">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Portfolio Eliot Collomb
          </p>
          <h1 className="text-2xl font-medium leading-tight text-white sm:text-3xl">
            Étudiant en BTS SIO option SLAM, je développe des applications, des
            interfaces et des solutions agentiques orientées IA.
          </h1>
          <p className="text-base text-slate-300">
            À travers ce portfolio, je présente mes projets, les technologies
            utilisées et les compétences que je construis progressivement en
            développement web, IA et agentique.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Voir les projets
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Projets récents
            </h2>
            <p className="text-sm text-slate-400">
              Une sélection de projets réalisées pendant le BTS SIO.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByPage("prev")}
                disabled={!canScrollPrev}
                aria-disabled={!canScrollPrev}
                aria-label="Voir les projets précédents"
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={() => scrollByPage("next")}
                disabled={!canScrollNext}
                aria-disabled={!canScrollNext}
                aria-label="Voir les projets suivants"
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
            <Link
              to="/projects"
              className="text-sm font-semibold text-accent hover:text-white"
            >
              Tout voir →
            </Link>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-full snap-start sm:min-w-[50%] lg:min-w-[33.333%]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
