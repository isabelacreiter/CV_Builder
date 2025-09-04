import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../utils/api";
import { FaTrash, FaEdit, FaPrint } from "react-icons/fa";

export default function ViewPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [c, setC] = useState(null);

  useEffect(() => {
    api.get(`/curriculos/${id}`).then((r) => setC(r.data)).catch(()=>setC(null));
  }, [id]);

  const excluir = async () => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Excluir currículo?",
      text: "Essa ação não poderá ser desfeita.",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
    });
    if (confirm.isConfirmed) {
      await api.delete(`/curriculos/${id}`);
      await Swal.fire({ icon: "success", title: "Excluído!" });
      nav("/visualizar-curriculos");
    }
  };

  if (!c) return <p className="py-8 text-center">Carregando currículo...</p>;

  return (
    <>
      <Header />
      <NavBar />
      <section className="py-8 max-w-4xl mx-auto">
        <div className="flex justify-end gap-3 mb-6 no-print">
          <Link to={`/criar-curriculo?id=${c.id}`} className="btn-sec flex items-center gap-2"><FaEdit/> Editar</Link>
          <button onClick={excluir} className="btn-danger flex items-center gap-2"><FaTrash/> Excluir</button>
          <button onClick={() => window.print()} className="btn-primary flex items-center gap-2"><FaPrint/> Exportar PDF</button>
        </div>

        <div className="cv-container">
          <div className="text-center mb-6">
            <h1 className="cv-title">{c.nome}</h1>
            <p className="text-gray-600 text-lg">{c.titulo}</p>
          </div>
          <div>
            <h2 className="cv-subtitle">Contato</h2>
            <p>{c.email} · {c.telefone}</p>
            <p>{c.endereco.rua}, {c.endereco.numero} — {c.endereco.bairro}, {c.endereco.cidade}/{c.endereco.estado} · {c.endereco.cep}</p>
          </div>
          <div>
            <h2 className="cv-subtitle">Resumo Profissional</h2>
            <p className="text-gray-700 whitespace-pre-line">{c.resumo}</p>
          </div>
          <div>
            <h2 className="cv-subtitle">Experiência</h2>
            <ul className="space-y-4">
              {c.experiencias.map((e,i)=>(
                <li key={i}>
                  <p className="font-medium text-[var(--primary)]">{e.cargo} — {e.empresa}</p>
                  <p className="text-sm text-gray-500">{e.inicio} • {e.fim}</p>
                  <p>{e.descricao}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="cv-subtitle">Formação Acadêmica</h2>
            <ul className="space-y-2">
              {c.formacoes.map((f,i)=>(
                <li key={i}>
                  <p className="font-medium text-[var(--primary)]">{f.curso}</p>
                  <p className="text-sm text-gray-500">{f.instituicao} — {f.conclusao}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="cv-subtitle">Idiomas</h2>
            <ul className="flex flex-wrap gap-2">
              {c.idiomas.map((l,i)=>(
                <li key={i} className="px-3 py-1 bg-blue-50 text-[var(--primary)] rounded-full text-sm">
                  {l.idioma} • {l.nivel}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
