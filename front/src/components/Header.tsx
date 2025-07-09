import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoGreenRoots.png";
import "../style/header.scss";

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
          <Link to="/cart">Panier</Link>
          <Link to="/profile">Profil</Link>
        </nav>
      </div>
    </header>
  );
}
