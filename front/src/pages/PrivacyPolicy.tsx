import React from "react";
import "../style/style.scss";

const PrivacyPolicy: React.FC = () => {
	return (
		<div className="gr-container costum-max text-gray-700 font-sans leading-7">
			<div className=" legal-container max-w-3xl mx-auto p-8">
				<h1 className="page-title mb-16">Politique de Confidentialité</h1>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						Introduction
					</h2>
					<p className="mb-4">
						La présente politique de confidentialité a pour but de vous informer
						sur la manière dont l'Association GreenRoots (ci-après "nous")
						collecte, utilise et protège les données personnelles que vous nous
						fournissez lorsque vous utilisez notre site web
						<a
							href="https://www.greenroots.com"
							className="color-pistachio font-medium hover:underline"
						>
							{" "}
							https://www.greenroots.com
						</a>
						. Nous nous engageons à protéger votre vie privée et à garantir que
						vos données personnelles sont traitées de manière transparente et
						sécurisée, conformément au Règlement Général sur la Protection des
						Données (RGPD).
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						1. Quelles données collectons-nous ?
					</h2>
					<p className="mb-4">
						Nous collectons les types de données suivants :
					</p>
					<ul className="list-disc pl-8 mb-4 space-y-2">
						<li>
							<strong className="text-gray-900 font-semibold">
								Données d'identification :
							</strong>{" "}
							Lorsque vous créez un compte, nous collectons votre nom complet et
							votre adresse e-mail.
						</li>
						<li>
							<strong className="text-gray-900 font-semibold">
								Données d'authentification :
							</strong>{" "}
							Nous collectons votre mot de passe, qui est immédiatement haché et
							stocké de manière sécurisée. Nous n'avons jamais accès à votre mot
							de passe en clair.
						</li>
						<li>
							<strong className="text-gray-900 font-semibold">
								Données de transaction :
							</strong>{" "}
							Lorsque vous passez une commande, nous enregistrons les détails de
							cette commande (arbres achetés, date, statut) et la lions à votre
							compte.
						</li>
						<li>
							<strong className="text-gray-900 font-semibold">
								Données de navigation :
							</strong>{" "}
							Nous utilisons des cookies de session techniques pour maintenir
							votre connexion active lorsque vous naviguez sur le site. Ces
							cookies sont essentiels au fonctionnement du panier et de votre
							espace personnel.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						2. Pourquoi collectons-nous ces données ? (Finalités)
					</h2>
					<p className="mb-4">
						Vos données sont collectées pour des objectifs précis et légitimes :
					</p>
					<ul className="list-disc pl-8 mb-4 space-y-2">
						<li>
							<strong className="text-gray-900 font-semibold">
								Pour fournir nos services :
							</strong>{" "}
							Gérer votre compte, traiter vos commandes, vous permettre de
							suivre vos arbres plantés et de personnaliser vos informations.
						</li>
						<li>
							<strong className="text-gray-900 font-semibold">
								Pour sécuriser votre compte :
							</strong>{" "}
							L'email et le mot de passe haché permettent de vous authentifier
							de manière sécurisée.
						</li>
						<li>
							<strong className="text-gray-900 font-semibold">
								Pour communiquer avec vous :
							</strong>{" "}
							Nous pouvons utiliser votre adresse e-mail pour vous envoyer des
							confirmations de commande ou des informations importantes
							relatives à votre compte.
						</li>
						<li>
							<strong className="text-gray-900 font-semibold">
								Pour le fonctionnement technique du site :
							</strong>{" "}
							Les cookies de session sont indispensables pour une expérience de
							navigation fluide et connectée.
						</li>
					</ul>
					<p className="mb-4">
						Nous ne vendons, n'échangeons et ne transférons pas vos informations
						personnelles identifiables à des tiers.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						3. Combien de temps conservons-nous vos données ?
					</h2>
					<p className="mb-2">
						<strong className="text-gray-900 font-semibold">
							Données de votre compte (nom, email, historique des commandes) :
						</strong>
					</p>
					<p className="mb-4">
						Ces données sont conservées tant que votre compte est actif.
						Conformément aux recommandations de la CNIL, si votre compte reste
						inactif pendant une période de 3 ans, nous nous réservons le droit
						de le supprimer, ainsi que les données associées.
					</p>
					<p className="mb-2">
						<strong className="text-gray-900 font-semibold">
							Données des cookies de session :
						</strong>
					</p>
					<p className="mb-4">
						Nos cookies de session sont configurés pour expirer après 7 jours,
						ou lorsque vous vous déconnectez.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						4. Quels sont vos droits sur vos données ?
					</h2>
					<p className="mb-4">
						Conformément au RGPD, vous disposez des droits suivants :
					</p>
					<ul className="list-disc pl-8 mb-4 space-y-2">
						<li>
							Le droit d'accès, de rectification et de suppression de vos
							données.
						</li>
						<li>Le droit de limiter le traitement de vos données.</li>
						<li>Le droit de vous opposer au traitement de vos données.</li>
						<li>Le droit à la portabilité de vos données.</li>
					</ul>
					<p className="mb-4">
						Pour exercer ces droits, vous pouvez nous contacter par écrit, en
						joignant une preuve de votre identité, à l'adresse suivante :
					</p>
					<div className="bg-gray-50 border-l-4 border-gray-200 p-6 rounded mt-6 mb-6">
						<p className="my-1">Association GreenRoots – DPO, Alex Foret</p>
						<p className="my-1">23 rue des forêts 75011 Paris</p>
						<p className="my-1">Email : contact@greenroots-fictif.fr</p>
					</div>
					<p className="mb-4">
						Si vous estimez que vos droits ne sont pas respectés, vous pouvez
						déposer une réclamation auprès de la CNIL.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						5. Sécurité des données
					</h2>
					<p className="mb-4">
						Nous mettons en œuvre des mesures de sécurité techniques et
						organisationnelles pour protéger vos données personnelles. Les mots
						de passe sont hachés avec l'algorithme Argon2, et les communications
						avec notre serveur sont protégées. Cependant, aucune méthode de
						transmission sur Internet n'est sûre à 100%, mais nous nous
						engageons à faire de notre mieux pour garantir la sécurité de vos
						informations.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-100">
						Consentement
					</h2>
					<p className="mb-4">
						En utilisant notre site, vous consentez à notre politique de
						confidentialité.
					</p>
				</section>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
