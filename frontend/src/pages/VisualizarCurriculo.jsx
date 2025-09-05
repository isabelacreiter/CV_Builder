import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../utils/api";

export default function VisualizarCurriculos() {
  const nav = useNavigate();
  const [curriculos, setCurriculos] = useState([]);

  const fetchCurriculos = async () => {
    try {
      const res = await api.get("/curriculos");
      setCurriculos(res.data);
    } catch {
      Swal.fire({ icon: "error", title: "Erro", text: "Não foi possível carregar os currículos" });
    }
  };

  useEffect(() => {
    fetchCurriculos();
  }, []);

  const handleEditar = (id) => {
    nav(`/form?id=${id}`);
  };

  const handleVisualizar = (c) => {
    Swal.fire({
      title: `<strong>${c.nome}</strong>`,
      html: `
        <p><b>Email:</b> ${c.email}</p>
        <p><b>Telefone:</b> ${c.telefone}</p>
        <p><b>Título:</b> ${c.titulo}</p>
        <p><b>Resumo:</b> ${c.resumo}</p>
        <p><b>Endereço:</b> ${c.endereco.rua}, ${c.endereco.numero} - ${c.endereco.bairro}, ${c.endereco.cidade}/${c.endereco.estado}, CEP: ${c.endereco.cep}</p>
        <hr/>
        <h4>Experiências:</h4>
        ${c.experiencias.map(e => `<p><b>${e.cargo}</b> - ${e.empresa} (${e.inicio} à ${e.fim})<br/>${e.descricao}</p>`).join("")}
        <h4>Formações:</h4>
        ${c.formacoes.map(f => `<p>${f.curso} - ${f.instituicao} (${f.conclusao})</p>`).join("")}
        <h4>Idiomas:</h4>
        ${c.idiomas.map(i => `<p>${i.idioma} - ${i.nivel}</p>`).join("")}
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Fechar",
    });
  };

  return (
    <>
      <Header />
      <NavBar />
      <section className="py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Currículos</h1>
        {curriculos.length === 0 ? (
          <p>Nenhum currículo encontrado.</p>
        ) : (
          <div className="space-y-4">
            {curriculos.map(c => (
              <div key={c.id} className="border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{c.nome}</p>
                  <p className="text-sm text-gray-600">{c.titulo}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary" onClick={() => handleVisualizar(c)}>Visualizar</button>
                  <button className="btn-sec" onClick={() => handleEditar(c.id)}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
