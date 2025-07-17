import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
// Plus besoin de api ici si la déconnexion est partie
import logo from "../assets/logoGreenRoots.png";
// Supprimez l'importation du fichier SCSS
// import "../style/header.scss";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const { user } = useAuth();
  const { cartItemCount } = useCart();
  
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Ferme le menu lors du changement de route (via Link)
	useEffect(() => {
    setMenuOpen(false);
  }, [useNavigate()]);

	const headerClasses = scrolled
    ? "bg-white shadow-md text-gray-800"
    : "bg-transparent text-white";
  
  const textShadowClass = scrolled ? "" : "drop-shadow-md";

	return (
		<header className={`fixed top-0 left-0 w-full px-4 sm:px-8 py-2 z-50 transition-all duration-300 ${headerClasses}`}>
			<div className="container mx-auto flex items-center justify-between">
				{/* --- Logo et Titre --- */}
				<Link to="/" className="flex items-center gap-3">
					<img src={logo} alt="Logo GreenRoots" className="h-16 sm:h-20" />
					<span className={`font-dancing text-4xl sm:text-5xl font-bold ${textShadowClass}`}>
						GreenRoots
					</span>
				</Link>

				{/* --- Liens de Navigation (Desktop) --- */}
				<nav className="hidden md:flex items-center gap-4">
					<Link to="/" className={`font-semibold text-lg hover:text-green-500 transition-colors ${textShadowClass}`}>Accueil</Link>
					<Link to="/catalog" className={`font-semibold text-lg hover:text-green-500 transition-colors ${textShadowClass}`}>Catalogue</Link>
					<Link to="/contact" className={`font-semibold text-lg hover:text-green-500 transition-colors ${textShadowClass}`}>Contact</Link>
					
          {user ? (
            <>
              <Link to="/profile" className={`flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition-colors ${scrolled ? 'border-gray-300' : 'border-white/50'}`}>
								<UserRound size={20} />
								<span className="font-semibold">
                  {user.name.split(" ")[0]}
                </span>
							</Link>
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
								<ShoppingCart size={24} />
								{cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
							</Link>
            </>
          ) : (
            <>
              <Link to="/login" className={`font-semibold text-lg hover:text-green-500 transition-colors ${textShadowClass}`}>Connexion</Link>
              <Link to="/register" className="bg-green-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                S'inscrire
              </Link>
            </>
          )}
				</nav>

				{/* --- Menu Burger (Mobile) --- */}
				<div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative p-2 md:hidden">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="p-2 z-[101]"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
			</div>

			{/* --- Panneau de Navigation Mobile --- */}
			<div className={`fixed top-0 left-0 w-full h-full bg-gray-900/95 backdrop-blur-sm text-white transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
				<nav className="flex flex-col items-center justify-center h-full gap-8">
          <Link to="/" className="text-3xl font-semibold">Accueil</Link>
          <Link to="/catalog" className="text-3xl font-semibold">Catalogue</Link>
          <Link to="/contact" className="text-3xl font-semibold">Contact</Link>
          <div className="w-3/4 border-t border-gray-600 my-4" />
          {user ? (
            <>
              <Link to="/profile" className="text-3xl font-semibold">Mon Profil</Link>
              {/* Le bouton déconnexion est maintenant sur la page profil */}
            </>
          ) : (
            <>
              <Link to="/login" className="text-3xl font-semibold">Connexion</Link>
              <Link to="/register" className="text-3xl font-semibold bg-green-600 px-6 py-3 rounded-full">S'inscrire</Link>
            </>
          )}
        </nav>
			</div>
		</header>
	);
}