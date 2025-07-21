import React, { useEffect, useState, FormEvent } from "react";

interface Tree {
  id: number;
  nom: string;
  description: string;
  stock: number;
}

export default function CatalogManagement(): JSX.Element {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    fetch("/api/catalogtrees", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement du catalogue.");
        }
        return res.json();
      })
      .then((data) => setTrees(data))
      .catch((err) =>
        console.error("Erreur chargement catalogue :", err.message)
      );
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/catalogtrees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nom: name, description, stock }),
    });

    const data = await response.json();

    if (response.ok) {
      setTrees([...trees, data]);
      setName("");
      setDescription("");
      setStock(0);
    } else {
      alert(data.message || "Une erreur est survenue lors de l'ajout.");
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(`/api/catalogtrees/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setTrees(trees.filter((tree) => tree.id !== id));
    } else {
      alert("Erreur lors de la suppression de l'arbre.");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🌳 Gestion du catalogue</h2>

      <form onSubmit={handleAdd} className="mb-6 space-y-4">
        <div className="flex flex-col gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
            required
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stock"
            required
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Ajouter
        </button>
      </form>

      <ul className="space-y-4">
        {trees.map((tree) => (
          <li
            key={tree.id}
            className="flex justify-between items-center border border-gray-200 rounded-md p-4 bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{tree.nom}</p>
              <p className="text-sm text-gray-600">{tree.description}</p>
              <p className="text-sm text-gray-500">Stock : {tree.stock}</p>
            </div>
            <button
              onClick={() => handleDelete(tree.id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
