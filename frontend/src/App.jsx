import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FormPage from "./pages/FormPage.jsx";
import CurriculosPage from "./pages/CurriculosPage.jsx";
import VisualizarCurriculo from "./pages/VisualizarCurriculo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/criar-curriculo" element={<FormPage />} />
        <Route path="/visualizar-curriculos" element={<CurriculosPage />} />
        <Route path="/curriculo/:id" element={<VisualizarCurriculo />} />
      </Routes>
    </Router>
  );
}

export default App;
