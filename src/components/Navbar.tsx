import { NavLink } from "react-router-dom";

const linkBase =
  "text-sm font-medium transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slateBg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="text-lg font-semibold text-white">
          Malik K.
        </NavLink>
        <nav aria-label="Navigation principale" className="flex gap-4">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-slate-300"}`
            }
          >
            Projets
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-slate-300"}`
            }
          >
            Compétences
          </NavLink>
          <NavLink
            to="/cv"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-slate-300"}`
            }
          >
            CV
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-slate-300"}`
            }
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
