import { Contact } from "../models/associations.js";

export const submitContactForm = async (req, res, next) => {
	try {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res.status(400).json({ message: "Tous les champs sont requis." });
		}

		const contact = await Contact.create({ name, email, message });

		res.status(201).json({ message: "Message envoyé avec succès", contact });
	} catch (err) {
		next(err); // gestion via errorHandler
	}
};
