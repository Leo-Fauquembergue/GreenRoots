import React from 'react';
import { Route, Routes } from "react-router-dom";

// --- Layouts ---
// Le Layout pour le site public (Header/Footer)
import Layout from "./components/Layout";
// Le garde du corps pour les routes protégées
import ProtectedRoute from "./components/ProtectedRoute";
// Le Layout pour la section administration (Sidebar/Header Admin)
import AdminLayout from "./components/AdminLayout";

// --- Composants Globaux ---
import Toast, { type ToastHandles } from './components/Toast';
import ConfirmationModal, { type ConfirmationModalHandles } from './components/ConfirmationModal';
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
import OrderDetailPage from "./pages/OrderDetail";
import UserPlantedTreesPage from './pages/UserPlantedTrees';
import TreeTrackingPage from './pages/TreeTracking';
import Contact from "./pages/Contact";
import LegalMentions from "./pages/LegalMentions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// --- Pages d'Administration ---
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCatalog from './pages/admin/AdminCatalog';
import AdminTreeTracking from './pages/admin/AdminTreeTracking';

// On crée des références globales pour pouvoir appeler ces composants de n'importe où
export const toastRef = React.createRef<ToastHandles>();
export const confirmModalRef = React.createRef<ConfirmationModalHandles>();

function App() {
	return (
    <>
      <Routes>
        {/* --- SECTION 1 : ROUTES DU SITE PUBLIC ET DE L'ESPACE UTILISATEUR --- */}
        {/* Toutes ces routes utilisent le Layout principal qui contient le Header et le Footer publics */}
        <Route path="/" element={<Layout />}>
          {/* Routes publiques accessibles à tous */}
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<TreeDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal-mentions" element={<LegalMentions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Routes protégées qui nécessitent une simple connexion mais utilisent le même Layout public */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} /> 
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="planted-trees/user" element={<UserPlantedTreesPage />} />
            <Route path="planted-trees/:treeId/tracking" element={<TreeTrackingPage />} />
          </Route>
        </Route>

        {/* --- SECTION 2 : ROUTES DE L'ADMINISTRATION --- */}
        {/* D'abord, on protège toute la section /admin. Seuls les admins peuvent passer. */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          {/* Ensuite, on applique le Layout spécifique à l'administration. */}
          <Route element={<AdminLayout />}>
            {/* Les pages s'afficheront dans l'Outlet du AdminLayout */}
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="catalog" element={<AdminCatalog />} />
            {/* La page de suivi est aussi une enfant du layout admin */}
            <Route path="tracking/:treeId" element={<AdminTreeTracking />} />
          </Route>
        </Route>
      </Routes>

      {/* Les composants globaux qui s'affichent par-dessus toutes les pages (modals, toasts, bannières) */}
      <CookieBanner />
      <Toast ref={toastRef} />
			<ConfirmationModal ref={confirmModalRef} />
    </>
	);
}

export default App;