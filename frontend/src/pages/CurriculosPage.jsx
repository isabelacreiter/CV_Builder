import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CurriculosPage() {
  const [curriculos, setCurriculos] = useState([]);
  const [q, setQ] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/curriculos");
      setCurriculos(res.data);
    } catch (err) {
      setCurriculos([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
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
      Swal.fire({ icon: "success", title: "Excluído!" });
      fetchData();
    }
  };

  const filtrados = curriculos.filter(c =>
    (c.nome || "").toLowerCase().includes(q.toLowerCase()) ||
    (c.titulo || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Header />
      <NavBar />
      <section className="py-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Currículos</h1>
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome ou cargo..."
              className="input pr-10"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <p>Nenhum currículo encontrado.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {filtrados.map((c) => (
              <div key={c.id} className="border rounded p-4 relative">
                <h2 className="font-bold">{c.nome}</h2>
                <p className="text-gray-600">{c.titulo}</p>
                <div className="flex gap-2 mt-2">
                  <Link to={`/criar-curriculo?id=${c.id}`} className="btn-sec flex items-center gap-1">
                    <FaEdit /> Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn-danger flex items-center gap-1"
                  >
                    <FaTrash /> Excluir
                  </button>
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
