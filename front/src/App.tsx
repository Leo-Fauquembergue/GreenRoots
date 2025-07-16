import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import TreeDetails from "./pages/TreeDetails";
import CookieBanner from "./pages/CookieBanner";
import Contact from "./pages/Contact";
import LegalMentions from "./pages/LegalMentions";
import OrderHistory from "./pages/OrderHistory";
import OrderDetailPage from "./pages/OrderDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/catalog/:id" element={<TreeDetails />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/legal-mentions" element={<LegalMentions />} />
					<Route path="/orders" element={<OrderHistory />} /> 
					<Route path="/orders/:orderId" element={<OrderDetailPage />} />
					<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				</Routes>
			</main>
			<Footer />
			<CookieBanner />
		</div>
	);
}

export default App;
