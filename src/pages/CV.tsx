import PdfDocumentViewer from "../components/PdfDocumentViewer";

const CV = () => {
  return (
    <PdfDocumentViewer
      title="Curriculum Vitae"
      intro="Version PDF de mon CV pour présenter mon parcours BTS SIO, mes projets et mes expériences."
      pdfPath="/cv-eliot-collomb.pdf"
      previewTitle="Aperçu du CV d'Eliot Collomb"
      downloadLabel="Télécharger le CV"
      openLabel="Ouvrir le CV dans un nouvel onglet"
    />
  );
};

export default CV;
