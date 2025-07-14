import { useState } from "react";
import "../style/register.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [lastname, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
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
		if (!firstName.trim()) {
			setError("Le prénom est requis.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("L'adresse email est invalide.");
			return;
		}

		if (password.length < 6) {
			setError("Le mot de passe doit contenir au moins 6 caractères.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}

		// --- ENVOI AU BACKEND ---
		try {
			const response = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `${firstName} ${lastname}`,
					firstName,
					email,
					password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Erreur backend :", errorData);

				if (errorData.errors) {
					const messages = errorData.errors.map(
						(err: any) => `• ${err.path.join(".")} : ${err.message}`,
					);
					throw new Error(messages.join("\n"));
				}

				throw new Error(errorData.message || "Une erreur est survenue.");
			}

			setSuccess(true);
			setLastName("");
			setFirstName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");

			setTimeout(() => {
				navigate("/login"); //Redirection sur la page connexion après succès
			}, 1000);
		} catch (err: any) {
			setError(err.message);
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
						value={lastname}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>

				<label>
					Prénom
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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

			{success && <p className="success-message">Compte créé avec succès ✅</p>}
			{error && (
				<div className="error-message">
					{error.split("\n").map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</div>
			)}
		</div>
	);
}
