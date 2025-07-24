import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL, // On utilise la variable d'environnement ici !
	withCredentials: true, // On configure UNE SEULE FOIS pour toutes les requêtes.
});

export default api;
