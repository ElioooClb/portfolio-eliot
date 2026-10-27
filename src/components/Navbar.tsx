import { NavLink } from "react-router-dom";

const linkBase =
  "text-sm font-medium transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const links = [
  { to: "/projects", label: "Projets" },
  { to: "/journal", label: "Journal" },
  { to: "/skills", label: "Compétences" },
  { to: "/parcours", label: "Parcours" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slateBg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <NavLink to="/" className="text-lg font-semibold text-white">
          Eliot Collomb
          <span className="ml-2 hidden text-sm font-normal text-slate-400 md:inline">
            Systèmes, réseaux &amp; Cloud/DevOps
          </span>
        </NavLink>
        <nav aria-label="Navigation principale" className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-white" : "text-slate-300"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
