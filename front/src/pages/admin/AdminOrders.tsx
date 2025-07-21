import { useEffect, useState } from "react";
import api from "../../services/api";
import type { AdminOrder } from "../../hooks/types";
import { toastRef } from "../../App";
import { ShoppingCart } from "lucide-react";

export default function AdminOrders() {
	const [orders, setOrders] = useState<AdminOrder[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const response = await api.get("/orders");
				setOrders(response.data);
			} catch (err: any) {
				toastRef.current?.showToast(
					err.response?.data?.message || "Erreur de chargement",
					"error",
				);
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	if (loading)
		return <p className="text-center p-4">Chargement des commandes...</p>;

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
				<ShoppingCart size={24} />
				Gestion des commandes ({orders.length})
			</h2>
			<div className="space-y-4">
				{orders.map((order) => (
					<details
						key={order.orderId}
						className="border border-gray-200 rounded-lg p-4 bg-gray-50"
					>
						<summary className="font-bold text-lg text-gray-900 cursor-pointer">
							Commande #{order.orderId} -{" "}
							<span className="font-normal text-gray-600">
								{order.user.name}
							</span>
						</summary>
						<div className="mt-4 pl-4 border-l-2 border-gray-200">
							<p className="text-sm text-gray-600">
								<strong>Client :</strong> {order.user.name} ({order.user.email})
							</p>
							<p className="text-sm text-gray-500">
								<strong>Date :</strong>{" "}
								{new Date(order.createdAt).toLocaleDateString("fr-FR")}
							</p>
							<p className="text-sm text-gray-500">
								<strong>Statut :</strong>
								<span
									className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
										order.status === "completed"
											? "bg-green-100 text-green-800"
											: order.status === "cart"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
									}`}
								>
									{order.status}
								</span>
							</p>
							{order.plantedTrees?.length > 0 && (
								<div className="mt-2">
									<h4 className="font-semibold text-gray-700">Arbres :</h4>
									<ul className="mt-1 list-disc list-inside text-sm text-gray-600">
										{order.plantedTrees.map((tree) => (
											<li key={tree.plantedTreeId}>
												{tree.catalogTree.commonName}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</details>
				))}
			</div>
		</div>
	);
}
