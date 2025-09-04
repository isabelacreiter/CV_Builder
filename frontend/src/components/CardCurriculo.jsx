import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function CardCurriculo({ c }) {
  return (
    <div className="card flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <FaUser className="text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{c.nome}</h3>
            <p className="text-sm text-gray-500">{c.titulo || "—"}</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400">Criado: {new Date(c.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mt-4 flex gap-2">
        {/* botão Abrir — leva à ViewPage */}
        <Link to={`/curriculo/${c.id}`} className="btn-primary text-sm flex-1 text-center">
          Abrir
        </Link>
        <Link to={`/criar-curriculo?id=${c.id}`} className="btn-sec text-sm">
          Editar
        </Link>
      </div>
    </div>
  );
}
