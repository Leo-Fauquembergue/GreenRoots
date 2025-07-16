import { useState } from "react";
import "../style/register.scss";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(false);
		setError("");

		// --- VALIDATION FRONT ---
		if (!name.trim()) {
			setError("Le nom est requis.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("L'adresse email est invalide.");
			return;
		}

		if (password.length < 8) {
			setError("Le mot de passe doit contenir au moins 8 caractères.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}

		// --- ENVOI AU BACKEND ---
		try {
			// --- ENVOI AU BACKEND AVEC `api` ---
			// C'est plus propre et cohérent.
			await api.post("/auth/register", { name, email, password });

			setSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 2000);

		} catch (err: any) {
			// La gestion d'erreur d'axios est un peu plus directe
			setError(err.response?.data?.message || "Une erreur est survenue.");
		}
	};

	return (
		<div className="register-container">
			<h2>Créer un compte</h2>

			<form onSubmit={handleSubmit} className="register-form">
				<label>
					Nom
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>

				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>

				<label>
					Mot de passe
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				<label>
					Confirmer le mot de passe
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>

				<button type="submit">S'inscrire</button>
			</form>

			{success && <p className="success-message">Compte créé avec succès ! ✅ Vous allez être redirigé.</p>}
			{error && <p className="error-message">{error}</p>}
		</div>
	);
}
