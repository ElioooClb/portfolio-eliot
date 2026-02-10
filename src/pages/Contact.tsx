import { Github, Linkedin, Mail } from "lucide-react";

type ContactLinkProps = {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
  ariaLabel: string;
};

const ContactLink = ({
  href,
  label,
  value,
  icon,
  external,
  ariaLabel,
}: ContactLinkProps) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-white/40 hover:bg-slate-900/70"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-accent">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-slate-400">{value}</p>
        </div>
      </div>
      <span className="text-xs text-slate-400">Ouvrir</span>
    </a>
  );
};

const Contact = () => {
  const cvHref = `${import.meta.env.BASE_URL}CV%20Eliot%20COLLOMB%20Alternance%20informatique%202026.pdf`;

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white">Curriculum Vitae</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Téléchargez la version PDF de mon CV pour en savoir plus sur ma formation et mes expériences.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slateCard/60 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">CV PDF</h3>
              <p className="text-sm text-slate-300">
                Dernière mise à jour : février 2026
              </p>
            </div>
            <a
              href={cvHref}
              download
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Télécharger le CV
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Liens de contact</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ContactLink
              href="https://github.com/ElioooClb"
              label="GitHub"
              value="github.com/ElioooClb"
              icon={<Github size={20} />}
              external
              ariaLabel="Ouvrir le profil GitHub d'Eliot Collomb"
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
              href="mailto:collomb.eliot@gmail.com"
              label="Email"
              value="collomb.eliot@gmail.com"
              icon={<Mail size={20} />}
              ariaLabel="Envoyer un email à collomb.eliot@gmail.com"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
