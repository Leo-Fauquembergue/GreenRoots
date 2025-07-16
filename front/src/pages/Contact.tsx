import { useState } from "react";
import "../style/contact.scss";

export default function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await fetch("http://localhost:3000/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, message }),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Erreur lors de l'envoi.");
			}

			setSuccess("Votre message a bien été envoyé !");
			setName("");
			setEmail("");
			setMessage("");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className="page-contact">
			{/* Bloc haut : infos + carte */}
			<div className="map-container">
				<h1>Contact</h1>
				<p className="p-email">Email : contact@greenroots.com</p>
				<p className="p-telephone">Téléphone : +33 1 23 45 78 89</p>
				<p className="p-adresse">Adresse : 123 Rue des Forêts, 75000 Paris</p>
				<h3>Où nous trouver</h3>
				<iframe
				title="Parc Monceau"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5247.747477241557!2d2.306380077041797!3d48.879683471335085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fbe98f714c3%3A0xe62425fddeddc402!2sParc%20Monceau!5e0!3m2!1sfr!2sfr!4v1752669649917!5m2!1sfr!2sfr"
				width="600"
				height="450"
				style={{ border: 0 }}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				/>

			</div>

			{/* Bloc bas : formulaire */}
			<div className="contact-container">
				<h2>Formulaire de contact</h2>
				<p>Une question, un retour, une idée ? Écrivez-nous !</p>

				<form onSubmit={handleSubmit} className="contact-form">
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
						Message
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
							rows={5}
						/>
					</label>

					<button type="submit">Envoyer</button>
				</form>

				{success && <p className="success-message">{success}</p>}
				{error && <p className="error-message">{error}</p>}
			</div>
		</div>
	);
}
