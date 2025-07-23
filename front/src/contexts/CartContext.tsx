import { createContext, useState, useContext, type ReactNode, useEffect, useCallback } from 'react';
import api from '../services/api';
import type { CartData, CartContextType } from '../hooks/types';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartData | null>(null);

  // On enveloppe fetchCart dans useCallback.
  // Elle ne sera recréée que si `user` change.
  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error("Erreur de chargement du panier", error);
      setCart(null);
    }
  }, [user]); // La dépendance de fetchCart est `user`.

  // Maintenant, on peut ajouter `fetchCart` aux dépendances en toute sécurité.
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (catalogTreeId: number) => {
    const response = await api.post('/cart/items', { catalogTreeId });
    setCart(response.data); // On met à jour le panier avec la réponse de l'API
  };

  const deleteFromCart = async (plantedTreeId: number) => {
    await api.delete(`/cart/items/${plantedTreeId}`);
    await fetchCart(); // On rafraîchit le panier
  };

  const checkout = async () => {
    const response = await api.post('/cart/checkout');
    fetchCart(); // Le panier sera vide après le checkout
    return response.data;
  };

  const cartItemCount = cart?.plantedTrees?.length || 0;

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, deleteFromCart, checkout, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};