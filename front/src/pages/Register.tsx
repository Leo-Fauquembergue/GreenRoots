import { useState } from "react";
import "../style/register.scss";

export default function Register() {
	const [lastname, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(false);
		setError('');

		try {
			const response = await fetch("http://localhost:3000/api/auth/register", {

				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					lastname,
					firstName,
					email,
					password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Une erreur est survenue.");
			}

			setSuccess(true);
			setLastName('');
			setFirstName('');
			setEmail('');
			setPassword('');
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

				<button type="submit">S'inscrire</button>
			</form>

			{success && <p className="success-message">Compte créé avec succès ✅</p>}
			{error && <p className="error-message">{error}</p>}
		</div>
	);
}
