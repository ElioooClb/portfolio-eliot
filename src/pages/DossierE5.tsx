import PdfDocumentViewer from "../components/PdfDocumentViewer";

const DossierE5 = () => {
  return (
    <PdfDocumentViewer
      title="Dossier E5"
      intro="Dossier de l'épreuve E5 du BTS SIO SLAM (obtenu en 2026), qui présente les projets réalisés pendant la formation."
      pdfPath="/dossier-e5.pdf"
      previewTitle="Aperçu du dossier E5"
    />
  );
};

export default DossierE5;
