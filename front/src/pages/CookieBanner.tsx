import { useState } from "react";
import { Cookie } from "lucide-react";
import "../style/style.scss";

export default function CookieBanner() {
	const [isVisible, setIsVisible] = useState(true);

	const handleAccept = () => {
		setIsVisible(false);
	};

	const handleDecline = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<>
			{/* Overlay flouté et semi-transparent */}
			<div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"></div>

			{/* Bannière centrée */}
			<div className="fixed inset-0 flex items-center justify-center z-50 p-6">
				<div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 text-gray-900 flex flex-col md:flex-row items-center gap-6">
					<div className="flex-shrink-0">
						<Cookie size={48} className="text-gray-900" />
					</div>
					<div className="flex-1 text-center md:text-left">
						<p className="text-lg leading-relaxed">
							Nous utilisons des cookies pour améliorer votre expérience sur
							notre site web et vous offrir des contenus personnalisés. En
							continuant à utiliser notre site, vous acceptez notre{" "}
							<a
								href="/privacy-policy"
								className="underline text-green-600 font-semibold"
							>
								Politique de Confidentialité
							</a>{" "}
							et notre utilisation des cookies conformément au RGPD.
						</p>
					</div>
					<div className="flex gap-4 mt-4 md:mt-0">
						<button
							type="button"
							onClick={handleDecline}
							className="px-6 py-3 rounded-full border border-gray-700 text-gray-700 font-semibold hover:bg-gray-200 transition"
						>
							Refuser
						</button>
						<button
							type="button"
							onClick={handleAccept}
							className="px-6 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition"
						>
							Accepter
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
