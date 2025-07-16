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
				</Routes>
			</main>
			<Footer />
			<CookieBanner />
		</div>
	);
}

export default App;
