import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import "../style/login.scss";

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
			const response = await api.post('/auth/login', { email, password });
			setUser(response.data.user); // Met à jour l'état global
			navigate('/'); // Redirige vers la page d'accueil
		} catch (err: any) {
			setError(err.response?.data?.message || "Erreur de connexion.");
		}
	};

	return (
		<div className="gr-container">
			<h1>Connexion</h1>
			<p className="p-login">
				Connectez-vous pour commander, suivre vos arbres plantés et gérer votre
				espace personnel !
			</p>
			<form onSubmit={handleSubmit}>
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

				<button className="btn-dark p-3" type="submit">Se connecter</button>
			</form>

			{error && <p className="error-message">{error}</p>}
		</div>
	);
}
