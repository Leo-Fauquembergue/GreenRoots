import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';
import logo from "../assets/logoGreenRoots.png";
import "../style/header.scss";
import { ShoppingCart } from "lucide-react";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, setUser } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    navigate('/');
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Fermer le menu si on redimensionne ou navigue
	useEffect(() => {
		const handleResize = () => setMenuOpen(false);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<header className={`main-header ${scrolled ? "scrolled" : ""}`}>
			<div className="container">
				<Link to="/" className="logo-container">
					<img src={logo} alt="Logo GreenRoots" className="logo" />
					<span className="title">GreenRoots</span>
				</Link>

				<button
					type="button"
					className={`burger ${menuOpen ? "open" : ""}`}
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label="Menu"
				>
					<span className="burger-line" />
					<span className="burger-line" />
					<span className="burger-line" />
				</button>

				<nav className={`nav-links ${menuOpen ? "open" : ""}`}>
					<Link to="/">Accueil</Link>
					<Link to="/catalog">Catalogue</Link>
					{user ? (
            <>
              <Link to="/profile">Profil</Link>
              <button type="button" onClick={handleLogout} className="logout-button">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">S'inscrire</Link>
            </>
          )}
					<Link to="/cart" className="cart-link">
						<ShoppingCart size={24} />
						{cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
					</Link>
					<Link to="/contact">Contact</Link>
				</nav>
			</div>
		</header>
	);
}
