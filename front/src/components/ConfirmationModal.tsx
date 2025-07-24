import {
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
	useCallback,
} from "react";
import { AlertTriangle } from "lucide-react";
import "../style/modal.scss";

export interface ConfirmationModalHandles {
	show: (title: string, message: string, onConfirm: () => void) => void;
}

const ConfirmationModal = forwardRef<ConfirmationModalHandles>((props, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [onConfirmCallback, setOnConfirmCallback] = useState<
		(() => void) | null
	>(null);

	// --- LOGIQUE DE FERMETURE ---
	const handleCancel = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleConfirm = () => {
		if (onConfirmCallback) {
			onConfirmCallback();
		}
		handleCancel(); // Ferme le modal après confirmation
	};

	// --- GESTION DU CLAVIER (Touche Échap) ---
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCancel();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		// Fonction de nettoyage pour retirer l'écouteur d'événement
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, handleCancel]); // On dépend de isOpen et handleCancel

	// Exposition de la méthode `show` à la ref
	useImperativeHandle(ref, () => ({
		show(title, message, onConfirm) {
			setTitle(title);
			setMessage(message);
			setOnConfirmCallback(() => onConfirm);
			setIsOpen(true);
		},
	}));

	if (!isOpen) return null;

	return (
		<div
			className="modal-overlay"
			onClick={handleCancel}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") handleCancel();
			}}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabIndex={-1}
		>
			<div
				className="modal-content"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="document"
			>
				<div className="modal-header">
					<AlertTriangle className="text-red-500" size={24} />
					<h3 id="modal-title">{title}</h3>
				</div>
				<p className="modal-body">{message}</p>
				<div className="modal-footer">
					<button
						type="button"
						onClick={handleCancel}
						className="modal-button is-cancel"
					>
						Annuler
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						className="modal-button is-danger"
					>
						Confirmer
					</button>
				</div>
			</div>
		</div>
	);
});

export default ConfirmationModal;
