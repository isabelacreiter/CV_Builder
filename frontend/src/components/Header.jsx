import { Link, NavLink } from "react-router-dom";
import { FaFileAlt, FaPlusCircle, FaListUl } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FaFileAlt className="text-indigo-600 text-2xl" />
          <span className="font-semibold text-xl">CV Builder</span>
        </Link>
        <nav className="flex gap-4 text-sm">
        </nav>
      </div>
    </header>
  );
}
