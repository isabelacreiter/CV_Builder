import { Link } from "react-router-dom";

const CurriculosPage = () => {
  const curriculos = [
    { id: 1, nome: "Ana Silva", cargo: "Desenvolvedora" },
    { id: 2, nome: "Bruno Lima", cargo: "Designer" },
    { id: 3, nome: "Carlos Souza", cargo: "Analista" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Currículos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {curriculos.map(c => (
          <Link key={c.id} to={`/curriculo/${c.id}`} className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="font-bold">{c.nome}</h2>
            <p>{c.cargo}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CurriculosPage;
