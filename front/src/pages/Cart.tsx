import { useState } from "react";
import "../style/cart.scss";

export default function Cart() {
	const [cart, setCart] = useState([
		{
			commonName: "Nom de l'arbre",
			description: "Description courte de l'arbre.",
			scientificName: "Nom scientifique",
			price: 12.34,
			quantity: 1,
		},
		{
			commonName: "Un autre arbre",
			description: "Une autre description.",
			scientificName: "Autre nom scientifique",
			price: 45.67,
			quantity: 2,
		},
	]);

	const incrementQty = (index) => {
		const newCart = [...cart];
		newCart[index].quantity = (newCart[index].quantity || 1) + 1;
		setCart(newCart);
	};

	const decrementQty = (index) => {
		const newCart = [...cart];
		if ((newCart[index].quantity || 1) > 1) {
			newCart[index].quantity -= 1;
			setCart(newCart);
		}
	};

	const removeProduct = (index) => {
		const newCart = cart.filter((_, i) => i !== index);
		setCart(newCart);
	};

	const total = cart.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

	const handleFinaliser = () => {
		alert("Redirection vers la page paiement (à coder)");
	};

	return (
		<div className="register-container">
			<h2>Finaliser votre commande</h2>
			{cart.length === 0 ? (
				<p>Votre panier est vide.</p>
			) : (
				<>
					<ul className="cart-list">
						{cart.map((product, index) => (
							<li key={index} className="cart-item">
								<div className="cart-item-info">
									<strong>{product.commonName}</strong>
									<p>{product.description}</p>
									<small>{product.scientificName}</small>
								</div>
								<div className="cart-item-qty">
									<button
										type="button"
										onClick={() => decrementQty(index)}
										className="btn-qty"
									>
										-
									</button>
									<span>{product.quantity || 1}</span>
									<button
										type="button"
										onClick={() => incrementQty(index)}
										className="btn-qty"
									>
										+
									</button>
								</div>
								<div className="cart-item-price">
									{(product.price * (product.quantity || 1)).toFixed(2)} €
								</div>
								<div className="cart-item-remove">
									<button
										type="button"
										onClick={() => removeProduct(index)}
										aria-label="Supprimer cet article"
										className="btn-trash"
									>
										🗑️
									</button>
								</div>
							</li>
						))}
					</ul>
					<h3>Total : {total.toFixed(2)} €</h3>
					<button onClick={handleFinaliser} className="btn-submit">
						Finaliser et payer
					</button>
				</>
			)}
		</div>
	);
}
