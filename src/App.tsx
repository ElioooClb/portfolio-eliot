import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Journal from "./pages/Journal";
import Skills from "./pages/Skills";
import Parcours from "./pages/Parcours";
import Contact from "./pages/Contact";
import CV from "./pages/CV";
import DossierE5 from "./pages/DossierE5";
import DossierE6 from "./pages/DossierE6";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page text-fg">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/parcours/dossier-e5" element={<DossierE5 />} />
          <Route path="/parcours/dossier-e6" element={<DossierE6 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<CV />} />
          {/* Anciennes adresses, conservées pour les liens déjà partagés */}
          <Route path="/dossier-e5" element={<Navigate to="/parcours/dossier-e5" replace />} />
          <Route path="/dossier-e6" element={<Navigate to="/parcours/dossier-e6" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
