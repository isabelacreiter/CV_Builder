import { useEffect, useState } from "react";
import api from "../utils/api";
import CardCurriculo from "../components/CardCurriculo";
import { FaSearch } from "react-icons/fa";

export default function CurriculosPage() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    api.get("/curriculos").then(r => setData(r.data)).catch(()=>setData([]));
  }, []);

  const filtrados = data.filter(c =>
    (c.nome || "").toLowerCase().includes(q.toLowerCase()) ||
    (c.titulo || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section className="py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Currículos</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por nome ou cargo..." className="input pr-10" />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtrados.map(c => <CardCurriculo key={c.id} c={c} />)}
      </div>
    </section>
  );
}
