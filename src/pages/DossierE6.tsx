import PdfDocumentViewer from "../components/PdfDocumentViewer";

const DossierE6 = () => {
  return (
    <PdfDocumentViewer
      title="Dossier E6"
      intro="Dossier de l'épreuve E6 du BTS SIO SLAM (obtenu en 2026), qui présente les projets réalisés pendant la formation."
      pdfPath="/dossier-e6.pdf"
      previewTitle="Aperçu du dossier E6"
    />
  );
};

export default DossierE6;
