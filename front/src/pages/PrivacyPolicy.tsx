import React from 'react';
import '../style/legal-page.scss'; // On réutilise le même fichier de style pour la cohérence

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container-legal-page legal-page">
      <div className="legal-content">
        <h1>Politique de Confidentialité</h1>
        
        <section>
          <h2>Introduction</h2>
          <p>
            La présente politique de confidentialité a pour but de vous informer sur la manière dont l'Association GreenRoots (ci-après "nous") collecte, utilise et protège les données personnelles que vous nous fournissez lorsque vous utilisez notre site web <a href="https://www.greenroots.com">https://www.greenroots.com</a>. Nous nous engageons à protéger votre vie privée et à garantir que vos données personnelles sont traitées de manière transparente et sécurisée, conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section>
          <h2>1. Quelles données collectons-nous ?</h2>
          <p>Nous collectons les types de données suivants :</p>
          <ul>
            <li>
              <strong>Données d'identification :</strong> Lorsque vous créez un compte, nous collectons votre nom complet et votre adresse e-mail.
            </li>
            <li>
              <strong>Données d'authentification :</strong> Nous collectons votre mot de passe, qui est immédiatement haché et stocké de manière sécurisée. Nous n'avons jamais accès à votre mot de passe en clair.
            </li>
            <li>
              <strong>Données de transaction :</strong> Lorsque vous passez une commande, nous enregistrons les détails de cette commande (arbres achetés, date, statut) et la lions à votre compte.
            </li>
            <li>
              <strong>Données de navigation :</strong> Nous utilisons des cookies de session techniques pour maintenir votre connexion active lorsque vous naviguez sur le site. Ces cookies sont essentiels au fonctionnement du panier et de votre espace personnel.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. Pourquoi collectons-nous ces données ? (Finalités)</h2>
          <p>Vos données sont collectées pour des objectifs précis et légitimes :</p>
          <ul>
            <li>
              <strong>Pour fournir nos services :</strong> Gérer votre compte, traiter vos commandes, vous permettre de suivre vos arbres plantés et de personnaliser vos informations.
            </li>
            <li>
              <strong>Pour sécuriser votre compte :</strong> L'email et le mot de passe haché permettent de vous authentifier de manière sécurisée.
            </li>
            <li>
              <strong>Pour communiquer avec vous :</strong> Nous pouvons utiliser votre adresse e-mail pour vous envoyer des confirmations de commande ou des informations importantes relatives à votre compte.
            </li>
            <li>
              <strong>Pour le fonctionnement technique du site :</strong> Les cookies de session sont indispensables pour une expérience de navigation fluide et connectée.
            </li>
          </ul>
          <p>Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers.</p>
        </section>

        <section>
          <h2>3. Combien de temps conservons-nous vos données ?</h2>
          <p><strong>Données de votre compte (nom, email, historique des commandes) :</strong></p>
          <p>
            Ces données sont conservées tant que votre compte est actif. Conformément aux recommandations de la CNIL, si votre compte reste inactif pendant une période de 3 ans, nous nous réservons le droit de le supprimer, ainsi que les données associées.
          </p>
          <p><strong>Données des cookies de session :</strong></p>
          <p>
            Nos cookies de session sont configurés pour expirer après 7 jours, ou lorsque vous vous déconnectez.
          </p>
        </section>

        <section>
          <h2>4. Quels sont vos droits sur vos données ?</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Le droit d'accès, de rectification et de suppression de vos données.</li>
            <li>Le droit de limiter le traitement de vos données.</li>
            <li>Le droit de vous opposer au traitement de vos données.</li>
            <li>Le droit à la portabilité de vos données.</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter par écrit, en joignant une preuve de votre identité, à l'adresse suivante :
          </p>
          <div className="info-block">
            <p>Association GreenRoots – DPO, Alex Foret</p>
            <p>23 rue des forêts 75011 Paris</p>
            <p>Email : contact@greenroots-fictif.fr</p>
          </div>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL.
          </p>
        </section>

        <section>
          <h2>5. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles. Les mots de passe sont hachés avec l'algorithme Argon2, et les communications avec notre serveur sont protégées. Cependant, aucune méthode de transmission sur Internet n'est sûre à 100%, mais nous nous engageons à faire de notre mieux pour garantir la sécurité de vos informations.
          </p>
        </section>
        
        <h2>Consentement</h2>
        <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;