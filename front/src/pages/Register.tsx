import { useState } from "react"
import "../style/register.scss"


export default function Register() {

	const [lastname, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	}

	return (
		<div className="register-container">
			<h2>Céer un compte</h2>
			<form onSubmit={handleSubmit} className="register-form">
				<label>Nom
					<input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
				</label>
				<label>Prénom
					<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
				</label>
				<label>Email
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
				</label>
				<label>Mot de passe
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
				</label>
				<button type="submit">S'inscrire</button>
			</form>
		</div>
	);
}