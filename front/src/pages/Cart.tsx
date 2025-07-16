import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import "../style/cart.scss";

export default function Cart() {
  const { cart, deleteFromCart, checkout, cartItemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir passer cette commande ?")) return;
    try {
      const data = await checkout();
      alert("Commande passée avec succès !");
      // On redirige vers une future page de confirmation de commande
      navigate(`/profile`); // Rediriger vers la page de profil pour voir les commandes
    } catch (error: any) {
      alert(error.response?.data?.message || "Impossible de passer la commande.");
    }
  };
  
  const totalPrice = cart?.plantedTrees?.reduce((sum, item) => sum + parseFloat(item.catalogTree.price), 0) || 0;

	return (
    <div className="container-cart">
      <h2 className="text-3xl font-bold mb-6">Votre Panier ({cartItemCount} article(s))</h2>
      {cartItemCount === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart?.plantedTrees.map((item) => (
              <li key={item.plantedTreeId} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <img src={item.catalogTree.image} alt={item.catalogTree.commonName} className="w-16 h-16 object-cover rounded"/>
                  <div>
                    <strong className="font-semibold text-xl">{item.catalogTree.commonName}</strong>
                    <p className="text-base text-gray-600">{parseFloat(item.catalogTree.price).toFixed(2)} €</p>
                  </div>
                </div>
                <button type="button" onClick={() => deleteFromCart(item.plantedTreeId)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold">Total : {totalPrice.toFixed(2)} €</h3>
            <button type="button" onClick={handleCheckout} className="btn-dark mt-4 px-8 py-3">
              Finaliser et Payer
            </button>
          </div>
        </>
      )}
    </div>
  );
}