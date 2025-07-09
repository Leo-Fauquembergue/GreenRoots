import "../style/home.scss";

export default function Home() {
  return (
    <div className="home-container">
      {/* Section principale */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Plantez un arbre !<br />
            Respirez demain !
          </h1>
          <p>
            Chez Greenroots, nous croyons qu'un petit geste peut avoir un grand impact. Planter un arbre, virgule, c'est bien plus qu'un acte symbolique. C'est lutter contre le réchauffement climatique en capturant le CO2, c'est restaurer la biodiversité en créant des habitats pour la faune, c'est préserver les sols et les ressources en eau, c'est soutenir les communautés locales grâce à des projets de reforestation durable.
          </p>
          <button>En savoir plus</button>
        </div>
      </section>

      {/* Section cartes */}
      <section className="cards-section">
        <div className="card">
          <img src="/path1.jpg" alt="Arbre nature" />
          <h3>Accès à la nature</h3>
          <p>
            Avec GreenRoots, accédez à une base de données complète d’arbres à planter, avec tous les détails nécessaires.
          </p>
        </div>
        <div className="card">
          <img src="/path2.jpg" alt="Arbre tropical" />
          <h3>Essences rares</h3>
          <p>
            Découvrez des essences rares, locales ou exotiques, adaptées à votre région et à vos envies de reforestation.
          </p>
        </div>
        <div className="card">
          <img src="/path3.jpg" alt="Arbre urbain" />
          <h3>Projets urbains</h3>
          <p>
            Impliquez-vous dans des projets urbains ou ruraux pour contribuer à une planète plus verte dès aujourd’hui.
          </p>
        </div>
      </section>
    </div>
  );
}
