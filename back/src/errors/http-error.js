export class HttpError extends Error {
	constructor(statusCode, message) {
		super(message); // Appelle le constructeur de la classe `Error` parente
		this.statusCode = statusCode; // Ajoute la propriété `statusCode`
		this.name = "HttpError"; // Donne un nom spécifique à cette classe d'erreur
	}
}