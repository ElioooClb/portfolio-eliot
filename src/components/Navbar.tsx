import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const linkBase =
  "text-sm font-medium transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const links = [
  { to: "/projects", label: "Projets" },
  { to: "/journal", label: "Journal" },
  { to: "/skills", label: "Compétences" },
  { to: "/parcours", label: "Parcours" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <NavLink to="/" className="text-lg font-semibold text-fg">
          Eliot Collomb
          <span className="ml-2 hidden text-sm font-normal text-subtle md:inline">
            Systèmes, réseaux &amp; Cloud/DevOps
          </span>
        </NavLink>
        <div className="flex items-center gap-5">
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-accent" : "text-body"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
