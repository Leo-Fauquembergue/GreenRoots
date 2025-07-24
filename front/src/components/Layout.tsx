import type React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Le composant Layout définit la structure commune de toutes les pages du site public.
// Il inclut le Header, le Footer, et un <Outlet /> qui sert de placeholder pour le contenu de la page spécifique rendue par le routeur.
const Layout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1">
				{/* React Router injectera le composant de la route enfant ici */}
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
