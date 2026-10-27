import PdfDocumentViewer from "../components/PdfDocumentViewer";

const CV = () => {
  return (
    <PdfDocumentViewer
      title="Curriculum Vitae"
      intro="Version PDF de mon CV : formation, expériences et compétences."
      pdfPath="/cv-eliot-collomb.pdf"
      previewTitle="Aperçu du CV d'Eliot Collomb"
      downloadLabel="Télécharger le CV"
      openLabel="Ouvrir le CV dans un nouvel onglet"
    />
  );
};

export default CV;
