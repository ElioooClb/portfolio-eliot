import PdfDocumentViewer from "../components/PdfDocumentViewer";

const DossierE5 = () => {
  return (
    <PdfDocumentViewer
      title="Dossier E5"
      intro="Cette rubrique temporaire permet de consulter rapidement le dossier E5 directement depuis le portfolio, jusqu'à la soutenance BTS SIO."
      pdfPath="/dossier-e5.pdf"
      previewTitle="Aperçu du dossier E5"
    />
  );
};

export default DossierE5;
