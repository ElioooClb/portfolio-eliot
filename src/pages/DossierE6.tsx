import PdfDocumentViewer from "../components/PdfDocumentViewer";

const DossierE6 = () => {
  return (
    <PdfDocumentViewer
      title="Dossier E6"
      intro="Cette rubrique temporaire permet d'accéder au dossier E6 depuis le portfolio pour faciliter la consultation avant la soutenance BTS SIO."
      pdfPath="/dossier-e6.pdf"
      previewTitle="Aperçu du dossier E6"
    />
  );
};

export default DossierE6;
