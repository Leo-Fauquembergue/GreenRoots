import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import api from "../services/api";
import logo from "../assets/logoGreenRoots.png";
import "../style/header.scss"; // On importe notre fichier de style
import { ShoppingCart, UserRound, LogOut, Menu, X, ShieldCheck } from "lucide-react";

export default function Header() {
	// --- États du composant ---
	const [scrolled, setScrolled] = useState(false); // Pour savoir si l'utilisateur a scrollé
	const [menuOpen, setMenuOpen] = useState(false); // Pour savoir si le menu mobile est ouvert

	// --- Hooks pour la navigation et l'état global ---
	const { user, setUser } = useAuth();
	const { cartItemCount } = useCart();
	const navigate = useNavigate();
	const location = useLocation(); // Pour détecter les changements de page

	// --- Fonctions de gestion d'événements ---
	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
		} catch (error) {
			console.error("Erreur lors de la déconnexion:", error);
		} finally {
			setUser(null);
			setMenuOpen(false); // On s'assure de fermer le menu en se déconnectant
			navigate("/");
		}
	};

	// --- Effets de bord (Hooks useEffect) ---

	// Effet pour détecter le scroll et changer le style du header
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll); // Nettoyage
	}, []);

	// Effet pour fermer le menu mobile quand l'utilisateur navigue vers une autre page
	useEffect(() => {
		setMenuOpen(false);
	}, [location]); // Se déclenche à chaque changement d'URL

	// Effet pour bloquer le scroll du corps de la page quand le menu mobile est ouvert
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "auto";
		return () => { document.body.style.overflow = "auto"; }; // Nettoyage
	}, [menuOpen]);

	// --- Rendu du composant (JSX) ---
	return (
		<header className={`main-header ${scrolled ? "scrolled" : ""}`}>
			<div className="container">
				<Link to="/" className="logo-container">
					<img src={logo} alt="Logo GreenRoots" className="logo" />
					<span className="title greenroots">GreenRoots</span>
				</Link>

				{/* --- Liens de Navigation Desktop --- */}
				{/* `hidden lg:flex` : Caché par défaut, devient flex (visible) sur les écrans larges (lg = 1024px et plus) */}
				<nav className="nav-links hidden lg:flex">
					<Link to="/">Accueil</Link>
					<Link to="/catalog">Catalogue</Link>
					<Link to="/contact">Contact</Link>
					<div className="separator" />
					{user ? (
						<>
							{user.role === "admin" && (
								<Link to="/admin" className="admin-link">
									<ShieldCheck size={20} />
									<span>Admin</span>
								</Link>
							)}
							<Link to="/profile" className="profile-link">
								<UserRound size={20} />
								<span>Bonjour, {user.name.split(" ")[0]}</span>
							</Link>
							<button type="button" onClick={handleLogout} className="logout-button">
								<LogOut size={20} />
								<span>Déconnexion</span>
							</button>
						</>
					) : (
						<>
							<Link to="/login" className="btn-light px-4 py-2">Connexion</Link>
							<Link to="/register" className="btn-dark px-4 py-2">S'inscrire</Link>
						</>
					)}
					<Link to="/cart" className="cart-link">
						<ShoppingCart size={24} />
						{cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
					</Link>
				</nav>

				{/* --- Section Mobile (Burger et Panier) --- */}
				{/* `lg:hidden` : Visible par défaut, devient caché sur les écrans larges */}
				<div className="flex items-center gap-4 lg:hidden">
					<Link to="/cart" className="cart-link-mobile">
						<ShoppingCart size={28} />
						{cartItemCount > 0 && <span className="cart-badge-mobile">{cartItemCount}</span>}
					</Link>
					<button
						type="button"
						className="burger-icon"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Menu"
					>
						{menuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
					</button>
				</div>
			</div>

			{/* --- Panneau de Navigation Mobile (qui glisse depuis la droite) --- */}
			{/* `lg:hidden` : On s'assure qu'il est aussi caché sur les grands écrans */}
			<div className={`mobile-nav-panel ${menuOpen ? "open" : ""} lg:hidden`}>
				<nav className="mobile-nav-links">
					<Link to="/">Accueil</Link>
					<Link to="/catalog">Catalogue</Link>
					<Link to="/contact">Contact</Link>
					<div className="w-3/4 border-t border-gray-400 my-4" />
					{user ? (
						<>
							{user.role === "admin" && (
								<Link to="/admin" className="mobile-admin-link"><ShieldCheck /> Panel Admin</Link>
							)}
							<Link to="/profile">Mon Profil</Link>
							<button type="button" onClick={handleLogout} className="mobile-logout-button">
								<LogOut /> Déconnexion
							</button>
						</>
					) : (
						<div className="flex flex-col gap-4 w-full items-center">
							<Link to="/login" className="btn-light w-3/4 text-center py-3">Connexion</Link>
							<Link to="/register" className="btn-dark w-3/4 text-center py-3">S'inscrire</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}