import { Link } from "react-router-dom";
import logo from "../assets/logoGreenRoots.png"

export default function Header() {
  return (
    <header className="bg-white-700 text-black p-4">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo GreenRoots" className="h-40 w-auto" />
          <span className="text-xl font-bold">GreenRoots</span>
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="transition transform hover:scale-110">Accueil</Link>
          <Link to="/catalog" className="transition transform hover:scale-110">Catalogue</Link>
          <Link to="/cart" className="transition transform hover:scale-110">Panier</Link>
          <Link to="/profile" className="transition transform hover:scale-110">Profil</Link>
        </nav>
      </div>
    </header>
  );
}
