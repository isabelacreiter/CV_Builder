import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VisualizarCurriculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const curriculo = { id, nome: "Ana Silva", email: "ana@email.com", cargo: "Desenvolvedora" };

  const handleExcluir = () => {
    Swal.fire({
      title: 'Deseja excluir?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Excluído!', '', 'success');
        navigate("/visualizar-curriculos");
      }
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Currículo de {curriculo.nome}</h1>
      <p><strong>Email:</strong> {curriculo.email}</p>
      <p><strong>Cargo:</strong> {curriculo.cargo}</p>

      <div className="mt-6 space-x-4">
        <button onClick={() => navigate(`/criar-curriculo`)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button>
        <button onClick={handleExcluir} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Excluir</button>
      </div>
    </div>
  );
};

export default VisualizarCurriculo;
