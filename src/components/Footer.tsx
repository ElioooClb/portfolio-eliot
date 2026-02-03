const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slateBg">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:px-6">
        <p>© 2026 Eliot Collomb. Tous droits réservés.</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/ElioooClb"
            className="transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/eliot-collomb/"
            className="transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="mailto:collomb.eliot@gmail.com"
            className="transition-colors hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
