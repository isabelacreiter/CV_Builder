import { useEffect, useState } from "react";
import axios from "axios";

export default function VisualizarCurriculo({ novosCurriculos }) {
  const [curriculos, setCurriculos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/curriculos")
      .then((res) => setCurriculos(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (novosCurriculos) {
      setCurriculos((prev) => [...prev, novosCurriculos]);
    }
  }, [novosCurriculos]);

  return (
    <div>
      <h1>Currículos</h1>
      {curriculos.length === 0 ? (
        <p>Nenhum currículo encontrado.</p>
      ) : (
        <ul>
          {curriculos.map((c) => (
            <li key={c.id}>
              <strong>{c.nome}</strong> - {c.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
