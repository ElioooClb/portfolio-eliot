const CV = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Curriculum Vitae</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Téléchargez la version PDF de mon CV pour en savoir plus sur mon
          parcours BTS SIO et mes expériences.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slateCard/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">CV PDF</h2>
            <p className="text-sm text-slate-300">
              Dernière mise à jour : février 2026
            </p>
          </div>
          <a
            href={`${
              import.meta.env.BASE_URL
            }CV%20Eliot%20COLLOMB%20Alternance%20informatique%202026.pdf`}
            download
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Télécharger le CV
          </a>
        </div>
      </section>
    </div>
  );
};

export default CV;
