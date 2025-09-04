import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import CardCurriculo from "../components/CardCurriculo";
import { FaPlus, FaList, FaChartBar } from "react-icons/fa";

export default function LandingPage() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    api.get("/curriculos").then(r => setAll(r.data)).catch(()=>setAll([]));
  }, []);

  const ultimos3 = useMemo(()=> [...all].slice(-3).reverse(), [all]);

  const stats = useMemo(() => {
    const total = all.length;
    const ultimoMes = all.filter(c => (new Date() - new Date(c.createdAt)) / (1000*60*60*24) <= 30).length;
    return { total, ultimoMes, avgWeek: Math.round((ultimoMes/4) || 0) };
  }, [all]);

  return (
    <section className="py-10">
      <div className="hero max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[var(--primary)]">CV Builder</h1>
          <p className="mt-3 text-gray-600">Crie, edite e exporte seu currículo com um visual profissional em poucos minutos.</p>

          <div className="mt-6 flex gap-3">
            <Link to="/criar-curriculo" className="btn-primary flex items-center gap-2"><FaPlus/> Criar Meu Currículo</Link>
            <Link to="/visualizar-curriculos" className="btn-sec flex items-center gap-2"><FaList/> Visualizar Currículos</Link>
          </div>
        </div>

        <div className="w-full md:w-80 space-y-4">
          <div className="stat-card flex items-center gap-3">
            <FaChartBar className="text-2xl text-[var(--primary)]" />
            <div>
              <p className="text-sm text-gray-500">Currículos</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <p className="text-sm text-gray-500">Últimos 30 dias</p>
            <p className="text-2xl font-bold">{stats.ultimoMes}</p>
            <p className="text-xs text-gray-400 mt-1">~{stats.avgWeek} por semana</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Últimos currículos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {ultimos3.length === 0 ? (
            <p className="text-gray-500">Ainda não há currículos cadastrados.</p>
          ) : (
            ultimos3.map(c => <CardCurriculo key={c.id} c={c} />)
          )}
        </div>
      </div>
    </section>
  );
}
