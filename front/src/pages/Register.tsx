import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/style.scss";

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
		<div className="gr-container">
			<h2 className="text-center mb-6 text-dark text-2xl">Créer un compte</h2>
			<div className="gr-form">
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="input-group">
						<label htmlFor="signUpName">Nom</label>
						<input
							id="signUpName"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className="input-group">
						<label htmlFor="signUpMail">Email</label>
						<input
							id="signUpMail"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="input-group">
						<label htmlFor="signUpPass">Mot de passe</label>
						<input
							id="signUpPass"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="input-group">
						<label htmlFor="signUpPassConfirm">Confirmer le mot de passe</label>
						<input
							id="signUpPassConfirm"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					{success && (
						<p className="form-success">
							Compte créé avec succès ! ✅ Vous allez être redirigé.
						</p>
					)}
					{error && <p className="form-error">{error}</p>}

					<button className="btn-dark p-3" type="submit">
						S'inscrire
					</button>
				</form>
			</div>
		</div>
	);
}
