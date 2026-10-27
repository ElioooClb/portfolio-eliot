import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import siteData from "../data/site.json";
import type { SiteInfo } from "../types";

const site = siteData as SiteInfo;

type ContactLinkProps = {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
  ariaLabel: string;
};

const ContactLink = ({ href, label, value, icon, external, ariaLabel }: ContactLinkProps) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-white/40 hover:bg-slate-900/70"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="block truncate text-xs text-slate-400">{value}</span>
      </span>
    </a>
  );
};

const Contact = () => {
  const base = import.meta.env.BASE_URL;
  const cvHref = `${base.endsWith("/") ? base : `${base}/`}cv-eliot-collomb.pdf`;

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Contact</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Je recherche une alternance en administration systèmes et réseaux
          pour 2026-2027, dans le cadre de mon Bachelor à l'EPSI Bordeaux.
          N'hésitez pas à me contacter.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Liens de contact">
        <ContactLink
          href="mailto:collomb.eliot@gmail.com"
          label="Email"
          value="collomb.eliot@gmail.com"
          icon={<Mail size={20} />}
          ariaLabel="Envoyer un email à collomb.eliot@gmail.com"
        />
        <ContactLink
          href="https://www.linkedin.com/in/eliot-collomb-36850b342/"
          label="LinkedIn"
          value="linkedin.com/in/eliot-collomb"
          icon={<Linkedin size={20} />}
          external
          ariaLabel="Ouvrir le profil LinkedIn d'Eliot Collomb"
        />
        <ContactLink
          href="https://github.com/ElioooClb"
          label="GitHub"
          value="github.com/ElioooClb"
          icon={<Github size={20} />}
          external
          ariaLabel="Ouvrir le profil GitHub d'Eliot Collomb"
        />
      </section>

      <section className="rounded-2xl border border-white/10 bg-slateCard/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Curriculum vitae</h2>
            <p className="text-sm text-slate-300">Mis à jour en {site.cvUpdated}, format PDF.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={cvHref}
              download
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Télécharger le CV
            </a>
            <Link
              to="/cv"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Aperçu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
