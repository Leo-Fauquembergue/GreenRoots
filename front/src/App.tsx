import React from "react";
import { Route, Routes } from "react-router-dom";

// --- Layouts ---
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

// --- Composants Globaux ---
import Toast, { type ToastHandles } from "./components/Toast";
import ConfirmationModal, {
	type ConfirmationModalHandles,
} from "./components/ConfirmationModal";
import CookieBanner from "./pages/CookieBanner";

// --- Pages Publiques & Utilisateur ---
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import TreeDetails from "./pages/TreeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import UserPlantedTrees from "./pages/UserPlantedTrees";
import TreeTracking from "./pages/TreeTracking";
import Contact from "./pages/Contact";
import LegalMentions from "./pages/LegalMentions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EnSavoirPlusPage from "./pages/AboutUsPage";

// --- Pages d'Administration ---
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCatalog from "./pages/admin/AdminCatalog";
import AdminTreeTracking from "./pages/admin/AdminTreeTracking";

// On crée des références globales
export const toastRef = React.createRef<ToastHandles>();
export const confirmModalRef = React.createRef<ConfirmationModalHandles>();

function App() {
	return (
		<>
			<Routes>
				{/* --- SECTION 1 : ROUTES DU SITE PUBLIC ET DE L'ESPACE UTILISATEUR --- */}
				<Route path="/" element={<Layout />}>
					{/* Routes publiques */}
					<Route index element={<Home />} />
					<Route path="catalog" element={<Catalog />} />
					<Route path="catalog/:id" element={<TreeDetails />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="contact" element={<Contact />} />
					<Route path="legal-mentions" element={<LegalMentions />} />
					<Route path="privacy-policy" element={<PrivacyPolicy />} />
					<Route path="en-savoir-plus" element={<EnSavoirPlusPage />} />

					{/* Routes protégées */}
					<Route element={<ProtectedRoute />}>
						<Route path="cart" element={<Cart />} />
						<Route path="checkout" element={<Checkout />} />
						<Route path="profile" element={<Profile />} />
						<Route path="orders" element={<OrderHistory />} />
						<Route path="orders/:orderId" element={<OrderDetail />} />
						<Route path="planted-trees" element={<UserPlantedTrees />} />
						<Route
							path="planted-trees/:treeId/tracking"
							element={<TreeTracking />}
						/>
					</Route>
				</Route>

				{/* --- SECTION 2 : ROUTES DE L'ADMINISTRATION --- */}
				<Route
					path="/admin"
					element={<ProtectedRoute allowedRoles={["admin"]} />}
				>
					<Route element={<AdminLayout />}>
						<Route index element={<AdminDashboard />} />
						<Route path="users" element={<AdminUsers />} />
						<Route path="orders" element={<AdminOrders />} />
						<Route path="catalog" element={<AdminCatalog />} />
						<Route path="tracking/:treeId" element={<AdminTreeTracking />} />
					</Route>
				</Route>
			</Routes>

			{/* Les composants globaux */}
			<CookieBanner />
			<Toast ref={toastRef} />
			<ConfirmationModal ref={confirmModalRef} />
		</>
	);
}

export default App;
