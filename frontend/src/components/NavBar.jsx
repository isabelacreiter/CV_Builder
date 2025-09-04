import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaListUl } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md sticky top-16 z-40">
      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded hover:bg-indigo-50 ${
              isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaHome /> Início
        </NavLink>

        <NavLink
          to="/criar-curriculo"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded hover:bg-indigo-50 ${
              isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaPlusCircle /> Criar Currículo
        </NavLink>

        <NavLink
          to="/visualizar-curriculos"
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded hover:bg-indigo-50 ${
              isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaListUl /> Visualizar Currículos
        </NavLink>
      </div>
    </nav>
  );
}
