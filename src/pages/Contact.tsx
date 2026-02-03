const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Contact</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Vous avez un projet ou une alternance à proposer ? Envoyez-moi un
          message ou contactez-moi via mes profils.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-slateCard/60 p-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-200">
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              required
              className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
              placeholder="email@exemple.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
              placeholder="Décrivez votre besoin..."
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Envoyer (UI)
          </button>
        </form>

        <aside className="space-y-4 rounded-2xl border border-white/10 bg-slateCard/60 p-6">
          <h2 className="text-lg font-semibold text-white">Liens directs</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/10 px-4 py-3 transition hover:border-white"
            >
              GitHub : github.com/username
            </a>
            <a
              href="https://www.linkedin.com/in/username/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/10 px-4 py-3 transition hover:border-white"
            >
              LinkedIn : linkedin.com/in/username
            </a>
            <a
              href="mailto:contact@email.com"
              className="block rounded-xl border border-white/10 px-4 py-3 transition hover:border-white"
            >
              Email : contact@email.com
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Contact;
