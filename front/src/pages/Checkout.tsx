import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toastRef } from "../App"; // On importe la référence au Toast
import "../style/style.scss";

const Checkout: React.FC = () => {
	const { cart, checkout, cartItemCount } = useCart();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [cardName, setCardName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvc, setCvc] = useState("");

	// Si le panier est vide en arrivant sur la page, on redirige l'utilisateur.
	// C'est une sécurité pour éviter d'accéder à cette page sans raison.
	if (!cart || cartItemCount === 0) {
		return <Navigate to="/cart" replace />;
	}

	const handlePayment = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError(null); // Réinitialiser l'erreur à chaque soumission

		// --- VALIDATION SIMPLE ---
		if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
			setFormError("Le numéro de carte doit contenir 16 chiffres.");
			return;
		}
		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
			setFormError("La date d'expiration doit être au format MM/AA.");
			return;
		}
		if (!/^\d{3}$/.test(cvc)) {
			setFormError("Le CVC doit contenir 3 chiffres.");
			return;
		}
		// --- FIN DE LA VALIDATION ---

		setIsProcessing(true);

		// Simule un délai de traitement de paiement de 2 secondes
		await new Promise((resolve) => setTimeout(resolve, 2000));

		try {
			const data = await checkout();

			// --- CORRECTION : Utilisation du Toast et redirection ---
			// On affiche un message de succès personnalisé
			toastRef.current?.showToast("Commande passée avec succès !", "success");

			// On redirige vers la page de profil/historique des commandes.
			// C'est ici que l'utilisateur verra sa nouvelle commande "completed".
			navigate(`/orders`);
		} catch (error: any) {
			// En cas d'échec, on affiche un message d'erreur personnalisé
			const errorMessage =
				error.response?.data?.message ||
				"Le paiement a échoué. Veuillez réessayer.";
			toastRef.current?.showToast(errorMessage, "error");
			setIsProcessing(false); // On réactive le bouton de paiement
		}
	};

	// Calcul du prix total
	const totalPrice = cart.plantedTrees.reduce(
		(sum, item) => sum + parseFloat(item.catalogTree.price),
		0,
	);

	return (
		<div className="mt-40 mb-10 checkout-page">
			<div className="max-w-4xl mx-auto">
				<h1 className="page-title">Finalisation de la commande</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Colonne de gauche : Formulaire de paiement factice */}
					<div className="rounded-lg shadow-lg gr-form">
						<h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
							Informations de paiement
						</h2>
						<form onSubmit={handlePayment}>
							{/* On lie les inputs aux états React */}
							<div className="input-group">
								<label htmlFor="cardName">Nom sur la carte</label>
								<input
									id="cardName"
									type="text"
									placeholder="Alex Foret"
									value={cardName}
									onChange={(e) => setCardName(e.target.value)}
									required
								/>
							</div>
							<div className="input-group">
								<label htmlFor="cardNumber">Numéro de carte</label>
								<input
									id="cardNumber"
									type="text"
									placeholder="0000 0000 0000 0000"
									value={cardNumber}
									onChange={(e) => setCardNumber(e.target.value)}
									required
								/>
							</div>
							<div className="flex gap-4">
								<div className="input-group flex-1">
									<label htmlFor="expiryDate">Date d'expiration</label>
									<input
										id="expiryDate"
										type="text"
										placeholder="MM/AA"
										value={expiryDate}
										onChange={(e) => setExpiryDate(e.target.value)}
										required
									/>
								</div>
								<div className="input-group flex-1">
									<label htmlFor="cvc">CVC</label>
									<input
										id="cvc"
										type="text"
										placeholder="123"
										value={cvc}
										onChange={(e) => setCvc(e.target.value)}
										required
									/>
								</div>
							</div>

							{/* Affichage de l'erreur de formulaire */}
							{formError && <p className="form-error">{formError}</p>}

							<button
								type="submit"
								className="btn-dark p-3 w-full mt-4"
								disabled={isProcessing}
							>
								{isProcessing ? (
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
								) : (
									<span className="flex items-center justify-center gap-2">
										<Lock size={16} /> Payer {totalPrice.toFixed(2)} €
									</span>
								)}
							</button>
						</form>
					</div>

					{/* Colonne de droite : Récapitulatif de la commande */}
					<div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
						<h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
							Récapitulatif de votre panier
						</h2>
						<ul className="list-none p-0 m-0">
							{cart.plantedTrees.map((item) => (
								<li
									key={item.plantedTreeId}
									className="flex justify-between py-3 border-b border-dashed border-gray-300 last:border-b-0"
								>
									<span>{item.catalogTree.commonName}</span>
									<strong>
										{parseFloat(item.catalogTree.price).toFixed(2)} €
									</strong>
								</li>
							))}
						</ul>
						<div className="flex justify-between text-xl font-bold mt-6 pt-6 border-t-2 text-[color:var(--color-dark)] border-[color:var(--color-dark)]">
							<span>Total à payer</span>
							<strong>{totalPrice.toFixed(2)} €</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
