import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "../style/style.scss";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const { setUser } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const response = await api.post("/auth/login", { email, password });
			const loggedInUser = response.data.user;
			setUser(loggedInUser); // Met à jour l'état global

			// Si l'utilisateur est un admin, on le redirige vers le panel admin.
			// Sinon, on le redirige vers son profil.
			if (loggedInUser.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/profile");
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "Erreur de connexion.");
		}
	};

	return (
		<div className="gr-container">
			<h1 className="page-title">Connexion</h1>
			<p className="mb-4 text-center">
				Connectez-vous pour commander, suivre vos arbres plantés et gérer votre
				espace personnel !
			</p>
			<form className="gr-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="loginMail">Email</label>
					<input
						id="loginMail"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className="input-group">
					<label htmlFor="loginPass">Mot de passe</label>
					<input
						id="loginPass"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p className="form-error">{error}</p>}
				<button className="btn-dark p-3 w-full mt-4" type="submit">
					Se connecter
				</button>
			</form>
		</div>
	);
}
