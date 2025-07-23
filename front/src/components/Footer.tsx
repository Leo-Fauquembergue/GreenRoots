import React from "react";
import { Phone, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logoGreenRoots.png"; //à changer:dynamique
import "../style/style.scss";

export default function Footer() {
	return (
		<footer className="text-white px-6 py-8">
			<div className="max-w-6xl mx-auto">
				
				{/* Section principale avec logo, slogan et contact */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-6">
					
					{/* Colonne 1 : Logo et nom */}
					<Link
						to="/"
						className="flex items-center space-x-3 justify-center md:justify-start"
					>
						<img src={logo} alt="Logo GreenRoots" className="logo h-12 mr-3" />
						<h2 className="text-2xl greenroots font-bold text-white">
							GreenRoots
						</h2>
					</Link>

					{/* Colonne 2 : Slogan */}
					<div className="text-center">
						<p>Planter des arbres, sauver notre planète !</p>
					</div>

					{/* Colonne 3 : Informations de contact */}
					<div className="flex flex-col space-y-2 items-center md:items-end">
						<div className="flex items-center space-x-2">
							<Phone className="w-4 h-4 footer-icon" />
							<span>+33 1 23 45 67 89</span>
						</div>
						<div className="flex items-center space-x-2">
							<Mail className="w-4 h-4 footer-icon" />
							<span>contact@greenroots-fictif.fr</span>
						</div>
						<div className="flex items-center space-x-2">
							<Instagram className="w-4 h-4 footer-icon" />
							<span>@greenroots</span>
						</div>
					</div>
				</div>

				{/* Ligne de séparation et liens légaux */}
				<div className="border-t border-white border-opacity-20 pt-6 mt-8">
          <div className="text-center text-sm text-gray-300">
            <span>© 2025 GreenRoots - Tous droits réservés</span>
            <span className="mx-2">|</span>
            <Link to="/legal-mentions" className="hover:underline">
              Mentions Légales
            </Link>
						<span className="mx-2">|</span>
						<Link to="/privacy-policy" className="hover:underline">
							Politique de Confidentialité
						</Link>

						<span className="mx-2">|</span>
						<Link to="/en-savoir-plus" className="hover:underline">
							À propos de Nous
						</Link>
          </div>
				</div>

			</div> 
		</footer> 
	);
}