import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.scss";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Erreur lors de la connexion");
			}

			const userData = await response.json();
			localStorage.setItem("user", JSON.stringify(userData));
			navigate("/");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className="container-login">
			<h1>Connexion</h1>
			<p className="p-login">
				Connectez-vous pour commander, suivre vos arbres plantés et gérer votre
				espace personnel !
			</p>
			<form onSubmit={handleLogin}>
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

				<button type="submit">Se connecter</button>
			</form>

			{error && <p className="error-message">{error}</p>}
		</div>
	);
}
