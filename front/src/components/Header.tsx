import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoGreenRoots.png";
import "../style/header.scss";
import cartIcon from "../assets/ajouter-un-panier.png";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

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
					<Link to="/Login">Connexion</Link>
					<Link to="/Register">S'inscrire</Link>
					<Link to="/cart" className="flex items-center gap-2">
						<img src={cartIcon} alt="Panier" className="w-6 h-6" />
						<span>Panier</span>
					</Link>
				</nav>
			</div>
		</header>
	);
}
