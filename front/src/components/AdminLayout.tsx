import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
	Home,
	ShoppingCart,
	Users,
	TreePine,
	LayoutDashboard,
} from "lucide-react";

// Classe de base pour les liens de la sidebar
const sidebarLinkClasses =
	"flex items-center gap-3 p-3 rounded-md transition-colors text-left";

// Classe pour le lien actif
const activeLinkClasses = "bg-[#85af61] text-[#152416] font-semibold";

// Classe pour le lien inactif
const inactiveLinkClasses = "text-gray-300 hover:bg-white/10 hover:text-white";

const AdminLayout: React.FC = () => {
	const { user } = useAuth();

	return (
		<div className="flex min-h-screen font-sans bg-gray-100">
			{/* Barre latérale de navigation */}
			<aside className="w-64 bg-[#152416] text-white p-6 flex flex-col flex-shrink-0">
				<h2 className="text-2xl font-bold mb-8 text-center greenroots">
					GreenRoots
				</h2>
				<nav className="flex flex-col gap-2">
					<NavLink
						to="/admin"
						end // 'end' est important pour que le lien ne reste pas actif sur les sous-pages
						className={({ isActive }) =>
							`${sidebarLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
						}
					>
						<LayoutDashboard size={18} /> Tableau de bord
					</NavLink>
					<NavLink
						to="/admin/orders"
						className={({ isActive }) =>
							`${sidebarLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
						}
					>
						<ShoppingCart size={18} /> Commandes
					</NavLink>
					<NavLink
						to="/admin/users"
						className={({ isActive }) =>
							`${sidebarLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
						}
					>
						<Users size={18} /> Utilisateurs
					</NavLink>
					<NavLink
						to="/admin/catalog"
						className={({ isActive }) =>
							`${sidebarLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
						}
					>
						<TreePine size={18} /> Catalogue
					</NavLink>
				</nav>
				<Link
					to="/"
					className={`${sidebarLinkClasses} ${inactiveLinkClasses} mt-auto`}
				>
					<Home size={18} /> Retour au site
				</Link>
			</aside>

			{/* Contenu principal */}
			<div className="flex-1 flex flex-col">
				<header className="bg-white p-4 shadow-md flex justify-between items-center">
					<h1 className="text-xl font-bold text-gray-800">
						Panel d'Administration
					</h1>
					{user && (
						<p className="text-sm text-gray-600">
							Connecté en tant que <strong>{user.name}</strong>
						</p>
					)}
				</header>
				<main className="p-6 overflow-y-auto">
					{/* Les pages de gestion (AdminOrders, etc.) s'affichent ici */}
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
