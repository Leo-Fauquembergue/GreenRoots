import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/logoGreenRoots.png";  //à changer:dynamique
import "../style/footer.scss";

export default function Footer() {
	return (
		<footer className="footer-bg text-white px-6 py-8">
			<div className=" max-w-6xl mx-auto">
				{/* Section principale */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
				{/* Logo et nom */}
				<Link to="/" className="flex items-center space-x-3 justify-center md:justify-start">
					<img src={logo} alt="Logo GreenRoots" className="logo" />
					<h2 className="text-2xl greenroots font-bold text-white">GreenRoots</h2>
				</Link>
				
				{/* Slogan */}
				<div className="text-center">
					<p>Planter des arbres, sauver notre planète</p>
				</div>
				
				{/* Informations de contact */}
				<div className="flex flex-col space-y-2 items-center md:items-end">
					<div className="flex items-center space-x-2">
					<Phone className="w-4 h-4 footer-icon" />
					<span>56789990</span>
					</div>
					<div className="flex items-center space-x-2">
					<Mail className="w-4 h-4 footer-icon" />
					<span>contact@greenroots.fr</span>
					</div>
					<div className="flex items-center space-x-2">
					<Instagram className="w-4 h-4 footer-icon" />
					<span>greenroots</span>
					</div>
				</div>
				</div>
				
				{/* Ligne de séparation */}
				<div className="border-t opacity-50 pt-4">
				<div className="text-center">
					<p className="text-sm">© 2025 GreenRoots - Tous droits réservés</p>
				</div>
				</div>
			</div>
		</footer>
	);
}

