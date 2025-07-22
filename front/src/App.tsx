import React from 'react';
import { Route, Routes } from "react-router-dom";

// --- Layouts ---
// Le Layout public contient le Header et le Footer du site.
import Layout from "./components/Layout";
// Le ProtectedRoute agit comme un garde pour les routes protégées.
import ProtectedRoute from "./components/ProtectedRoute";

// --- Composants Globaux ---
import Toast, { type ToastHandles } from './components/Toast';
import ConfirmationModal, { type ConfirmationModalHandles } from './components/ConfirmationModal';
import CookieBanner from "./pages/CookieBanner";

// --- Pages ---
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
import UserPlantedTrees from './pages/UserPlantedTrees';
import TreeTracking from './pages/TreeTracking';
import Contact from "./pages/Contact";
import LegalMentions from "./pages/LegalMentions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminPage from './pages/Admin';
import EnSavoirPlusPage from './pages/AboutUsPage';

// On crée une référence globale pour les composants Toast et Modal.
export const toastRef = React.createRef<ToastHandles>();
export const confirmModalRef = React.createRef<ConfirmationModalHandles>();

function App() {
	return (
    <>
      <Routes>
        {/* --- SECTION 1 : ROUTES PUBLIQUES --- */}
        {/* Ces routes sont accessibles à tout le monde. */}
        {/* Elles utilisent le Layout principal (Header/Footer). */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<TreeDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal-mentions" element={<LegalMentions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/en-savoir-plus" element={<EnSavoirPlusPage />} />
        </Route>

        {/* --- SECTION 2 : ROUTES PROTÉGÉES POUR UTILISATEURS CONNECTÉS --- */}
        {/* L'utilisateur doit être connecté pour accéder à ces routes. */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} /> 
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="planted-trees" element={<UserPlantedTrees />} />
            <Route path="planted-trees/:treeId/tracking" element={<TreeTracking/>} />
          </Route>
        </Route>
        
        {/* --- SECTION 3 : ROUTES PROTÉGÉES POUR ADMINISTRATEURS --- */}
        {/* L'utilisateur doit être connecté ET avoir le rôle 'admin'. */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          {/* Cette route n'utilise pas le Layout public car elle a sa propre mise en page. */}
          <Route path="/admin" element={<AdminPage />} />
        </Route>

      </Routes>

      {/* Les composants globaux s'affichent par-dessus toutes les pages */}
      <CookieBanner />
      <Toast ref={toastRef} />
			<ConfirmationModal ref={confirmModalRef} />
    </>
	);
}

export default App;