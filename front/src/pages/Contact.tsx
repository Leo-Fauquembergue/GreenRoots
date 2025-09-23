import { useState } from "react";
import "../style/style.scss";
import { Mail, MapPin, Phone } from "lucide-react";
import api from "../services/api";

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
			// Axios gère automatiquement la sérialisation en JSON et les headers.
			// Vous n'appelez que l'endpoint, car la baseURL est déjà configurée.
			await api.post("/contact", { name, email, message });

			setSuccess("Votre message a bien été envoyé !");
			setName("");
			setEmail("");
			setMessage("");
		} catch (err: any) {
			// Axios renvoie les erreurs dans err.response.data
			setError(err.response?.data?.message || "Erreur lors de l'envoi.");
		}
	};

	return (
		<div className="page-contact">
			{/* Bloc haut : infos + carte */}
			<div className="mt-40 text-center text-lg">
				<h2 className="text-center mb-6 page-title">Contactez-nous</h2>

				<div className="flex justify-center items-center gap-2 p-email">
					<Mail className="inline-block w-5 h-5 text-green-600" />
					<span>Email : contact@greenroots-fictif.fr</span>
				</div>

				<div className="flex justify-center items-center gap-2 p-telephone mt-2">
					<Phone className="inline-block w-5 h-5 text-green-600" />
					<span>Téléphone : +33 1 23 45 67 89</span>
				</div>

				<div className="flex justify-center items-center gap-2 p-adresse mt-2">
					<MapPin className="inline-block w-5 h-5 text-green-600" />
					<span>Adresse : 23 Rue des Forêts, 75011 Paris</span>
				</div>

				<h3 className="mt-6 mb-2 text-lg font-semibold">Où nous trouver :</h3>

				<div className="flex justify-center mt-4">
					<div className="bg-white rounded-xl shadow-lg transition hover:shadow-2xl w-4/5 md:w-2/3 lg:w-2/5">
						<iframe
							className="w-full h-80 rounded-lg"
							title="Parc Monceau"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5247.747477241557!2d2.306380077041797!3d48.879683471335085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fbe98f714c3%3A0xe62425fddeddc402!2sParc%20Monceau!5e0!3m2!1sfr!2sfr!4v1752669649917!5m2!1sfr!2sfr"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</div>

			{/* Bloc bas : formulaire */}
			<div className="gr-container" style={{ marginTop: "2rem" }}>
				<h2 className="text-center text-2xl mb-4">Formulaire de contact</h2>
				<p className="text-center mb-8">
					Une question, un retour, une idée ? Écrivez-nous !
				</p>

				<div className="gr-form">
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="input-group">
							<label htmlFor="contactName">Nom</label>
							<input
								id="contactName"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="input-group">
							<label htmlFor="contactMail">Email</label>
							<input
								id="contactMail"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="input-group">
							<label htmlFor="contactMessage">Message</label>
							<textarea
								id="contactMessage"
								className="p-3 border border-gray-300 rounded-md text-base mt-2"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								rows={5}
							/>
						</div>

						{success && (
							<p className="form-success text-green-600">{success}</p>
						)}
						{error && <p className="form-error text-red-600">{error}</p>}

						<button
							type="submit"
							className="btn-dark p-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
						>
							Envoyer
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
