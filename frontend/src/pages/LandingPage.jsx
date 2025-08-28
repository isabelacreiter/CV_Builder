import { Link } from "react-router-dom";
import CardCurriculo from "../components/CardCurriculo.jsx";

const LandingPage = () => {
  const ultimosCurriculos = [
    { id: 1, nome: "Ana Silva", cargo: "Desenvolvedora" },
    { id: 2, nome: "Bruno Lima", cargo: "Designer" },
    { id: 3, nome: "Carlos Souza", cargo: "Analista" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-orange-500">CV Builder</h1>
        <nav className="space-x-4">
          <Link to="/criar-curriculo" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Criar Meu Currículo</Link>
          <Link to="/visualizar-curriculos" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Visualizar Currículos</Link>
        </nav>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Últimos Currículos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ultimosCurriculos.map(c => (
            <CardCurriculo key={c.id} nome={c.nome} cargo={c.cargo} />
          ))}
        </div>
      </section>

      <section className="p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Dashboard Simples</h2>
        <p>Total de Currículos: 10</p>
        <p>Currículos Criados Hoje: 2</p>
      </section>
    </div>
  );
};

export default LandingPage;
