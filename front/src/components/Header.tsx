// src/components/Header.js

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';
import logo from "../assets/logoGreenRoots.png";
import "../style/header.scss";
import { ShoppingCart, UserRound, LogOut, Menu, X } from "lucide-react"; 

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, setUser } = useAuth();
    const { cartItemCount } = useCart();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    setMenuOpen(false); // Fermer le menu après déconnexion
    navigate('/');
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
    
    // Ferme le menu au changement de route et bloque/débloque le scroll du body
	useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Nettoyage au cas où le composant se démonte
        return () => {
            document.body.style.overflow = 'auto';
        };
	}, [menuOpen]);

	useEffect(() => {
        // Ferme le menu lors de la navigation
        setMenuOpen(false);
	}, [useNavigate()]);

	return (
		<header className={`main-header ${scrolled ? "scrolled" : ""}`}>
			<div className="w-full m-0 flex items-center justify-between pl-0">
				{/* --- Logo et Titre (stylé par SCSS) --- */}
				<Link to="/" className="flex items-center no-underline text-white transition-colors duration-300 ease-in-out">
					<img src={logo} alt="Logo GreenRoots" className=" logo h-28 mr-4" />
					<span className="title font-[Dancing_Script] text-5xl font-bold transition-shadow duration-300 ease-in-out" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>GreenRoots</span>
				</Link>

				{/* --- Liens de Navigation Desktop (stylé par SCSS, caché sur mobile par Tailwind) --- */}
				<nav className="nav-links">
					<Link to="/">Accueil</Link>
					<Link to="/catalog">Catalogue</Link>
                    <Link to="/contact">Contact</Link>
					
                {user ? (
                    <>
                    <Link to="/profile" className="gap-2 flex">
                        <UserRound  strokeWidth={3} size={24} />
                        <span>Bonjour, {user.name.split(" ")[0]}</span>
                    </Link>
                    <Link>
                        <button type="button" onClick={handleLogout} className="gap-2 flex">
                            <LogOut  strokeWidth={3} size={24} />
                            <span >Déconnexion</span>
                        </button>
                    </Link>
                    <Link to="/cart" className="relative rounded-full hover:bg-gray-100 transition-colors">
                        <ShoppingCart />
                        {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                        )}
                    </Link>
                    </>
                    ) : (
                    <>
                    <Link to="/login">Connexion</Link>
                    <Link to="/register" className="register-link">S'inscrire</Link>
                    </>
                    )}
                       
				</nav>

                {/* --- Burger et Panier pour Mobile (Structuré par Tailwind) --- */}
                <div className="flex items-center gap-2 md:hidden">
                    
                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <ShoppingCart  strokeWidth={3} size={24} />
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
                        className="p-2 z-[101]" // z-index pour être au-dessus du panneau
                    >
                        {/* L'icône change dynamiquement */}
                        {menuOpen ? <X size={30} className="text-white" /> : <Menu size={30} />}
                    </button>
                </div>
			</div>

            {/* --- Panneau de Navigation Mobile (le menu qui coulisse) --- */}
			<div className={`fixed top-0 left-0 w-full h-full bg-lime-900/60 backdrop-blur-sm text-white transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden z-[100]`}>
				<nav className="flex flex-col items-center justify-center h-full gap-8">
                    <Link to="/" className="text-3xl font-semibold">Accueil</Link>
                    <Link to="/catalog" className="text-3xl font-semibold  ">Catalogue</Link>
                    <Link to="/contact" className="text-3xl font-semibold ">Contact</Link>
                    <div className="w-3/4 border-t border-gray-600 my-4" />
                    {user ? (
                        <>
                        <Link to="/profile" className="text-3xl font-semibold ">Mon Profil</Link>
                        <button type="button" onClick={handleLogout} className="flex items-center gap-3 text-2xl font-semibold text-red-500 ">
                            <LogOut />
                            Déconnexion
                        </button>
                        </>
                    ) : (
                        <>
                        <Link to="/login" className="text-3xl font-semibold btn-light p-3">Connexion</Link>
                        <Link to="/register" className="text-3xl font-semibold bg-green-600 p-3 btn-dark">S'inscrire</Link>
                        </>
                    )}
                </nav>
			</div>
		</header>
	);
}