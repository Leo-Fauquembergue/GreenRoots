import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminCatalog from "./admin/AdminCatalog";
import { Home, ShoppingCart, Users, TreePine } from "lucide-react";

type AdminTab = "orders" | "users" | "catalog";

export default function AdminPage() {
	const { user } = useAuth();
	const [tab, setTab] = useState<AdminTab>("orders");

	if (!user) {
		return <div>Chargement des informations utilisateur...</div>;
	}

	return (
		// Layout principal en flexbox
		<div className="flex min-h-screen bg-gray-100 font-sans">
			{/* Barre latérale de navigation */}
			<aside className="w-64 bg-[#152416] text-white p-6 flex flex-col">
				<h2 className="text-2xl font-bold mb-8 text-center greenroots">
					GreenRoots
				</h2>
				<nav className="flex flex-col gap-2">
					<button
						type="button"
						onClick={() => setTab("orders")}
						className={`flex items-center gap-3 p-3 rounded-md transition-colors text-left ${tab === "orders" ? "bg-[#85af61] text-[#152416] font-semibold" : "hover:bg-white/10"}`}
					>
						<ShoppingCart size={20} /> Commandes
					</button>
					<button
						type="button"
						onClick={() => setTab("users")}
						className={`flex items-center gap-3 p-3 rounded-md transition-colors text-left ${tab === "users" ? "bg-[#85af61] text-[#152416] font-semibold" : "hover:bg-white/10"}`}
					>
						<Users size={20} /> Utilisateurs
					</button>
					<button
						type="button"
						onClick={() => setTab("catalog")}
						className={`flex items-center gap-3 p-3 rounded-md transition-colors text-left ${tab === "catalog" ? "bg-[#85af61] text-[#152416] font-semibold" : "hover:bg-white/10"}`}
					>
						<TreePine size={20} /> Catalogue
					</button>
				</nav>
				<Link
					to="/"
					className="mt-auto flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
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
					<p className="text-sm text-gray-600">
						Connecté en tant que <strong>{user.name}</strong>
					</p>
				</header>
				<main className="p-6 overflow-y-auto">
					{tab === "orders" && <AdminOrders />}
					{tab === "users" && <AdminUsers />}
					{tab === "catalog" && <AdminCatalog />}
				</main>
			</div>
		</div>
	);
}
