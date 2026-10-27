type PdfDocumentViewerProps = {
  title: string;
  intro: string;
  pdfPath: string;
  previewTitle: string;
  downloadLabel?: string;
  openLabel?: string;
};

const PdfDocumentViewer = ({
  title,
  intro,
  pdfPath,
  previewTitle,
  downloadLabel = "Télécharger le PDF",
  openLabel = "Ouvrir dans un nouvel onglet",
}: PdfDocumentViewerProps) => {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const resolvedPdfPath = `${normalizedBase}${pdfPath.replace(/^\/+/, "")}`;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-line bg-surface p-6">
        <h1 className="text-3xl font-semibold text-fg">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-body">
          {intro}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={resolvedPdfPath}
            download
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition hover:bg-accent-strong"
          >
            {downloadLabel}
          </a>
          <a
            href={resolvedPdfPath}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-fg transition hover:border-fg/40"
          >
            {openLabel}
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-fg">Aperçu du document</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface2">
          <iframe
            src={resolvedPdfPath}
            title={previewTitle}
            className="h-[65vh] w-full min-h-[420px]"
          />
        </div>
        <p className="mt-3 text-xs text-subtle">
          Si l&apos;aperçu PDF ne s&apos;affiche pas dans votre navigateur,
          utilisez les boutons ci-dessus pour ouvrir ou télécharger le fichier.
        </p>
      </section>
    </div>
  );
};

export default PdfDocumentViewer;
