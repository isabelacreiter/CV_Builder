import { useState } from "react";
import FormPage from "./FormPage";
import VisualizarCurriculo from "./VisualizarCurriculo";

export default function CurriculosPage() {
  const [novoCurriculo, setNovoCurriculo] = useState(null);

  return (
    <div>
      <h1>Gerenciar Currículos</h1>
      <FormPage onNovoCurriculo={setNovoCurriculo} />
      <VisualizarCurriculo novosCurriculos={novoCurriculo} />
    </div>
  );
}
