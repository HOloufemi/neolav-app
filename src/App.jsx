import React from 'react';
import './index.css';

function App() {
  return (
    <div className="neolav-site">
      
      {/* 1. SECTION HERO */}
      <section className="hero-section">
        <div className="container-50-50">
          <div className="hero-left">
            <div className="hero-badge">✨ Service laverie à domicile — Cotonou</div>
            <h1>Votre linge, notre signature de <span>perfection.</span></h1>
            <p className="hero-description">
              Collecte à domicile • Lavage professionnel • Livraison en 24h/48h partout à Cotonou. 
              Zéro effort, linge impeccable.
            </p>
            <div className="hero-buttons">
              <a href="https://wa.me" target="_blank" rel="noreferrer" className="btn-primary">🛒 Commander sur WhatsApp</a>
              <a href="#contact" className="btn-secondary">📅 Prendre un RDV</a>
            </div>
            <div className="hero-reassurance">
              <div className="reassurance-item">
                <span className="reassurance-val">24h</span>
                <span className="reassurance-lbl">Délai de livraison</span>
              </div>
              <div className="reassurance-item">
                <span className="reassurance-val">800F</span>
                <span className="reassurance-lbl">Par kilogramme</span>
              </div>
              <div className="reassurance-item">
                <span className="reassurance-val">100%</span>
                <span className="reassurance-lbl">Livraison gratuite</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img src="https://unsplash.com" alt="NEOLAV Service Pressing" />
          </div>
        </div>
      </section>

      {/* 2. BANDEAU DE REASSURANCE */}
      <section className="stats-band">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>+5000</h3>
            <p>Commandes Livrées</p>
          </div>
          <div className="stat-card">
            <h3>4.9/5</h3>
            <p>Avis Google</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Textiles Protégés</p>
          </div>
          <div className="stat-card">
            <h3>Cotonou</h3>
            <p>Zone de couverture</p>
          </div>
        </div>
      </section>

      {/* 3. SECTION NOS SERVICES */}
      <section className="section">
        <div className="section-title">
          <h2>Nos Services</h2>
          <p>Des prestations de pressing haut de gamme adaptées à votre quotidien et à votre budget.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🧺</div>
            <h3>Lavage & Séchage</h3>
            <p>Nettoyage optimal de vos vêtements du quotidien avec des produits de qualité.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">✨</div>
            <h3>Repassage & Pliage</h3>
            <p>Un repassage minutieux professionnel pour un linge prêt à ranger, sans aucun pli.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">👔</div>
            <h3>Pressing à sec</h3>
            <p>Soin expert pour vos costumes, robes de luxe et textiles délicats.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h3>Tapis & Draps</h3>
            <p>Prise en charge complète de vos linges de maison de grands volumes.</p>
          </div>
        </div>
      </section>

      {/* 4. SECTION COMMENT ÇA MARCHE */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="section-title">
          <h2>Comment ça marche ?</h2>
          <p>Profitez d'un linge propre et frais sans quitter votre domicile à Cotonou.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">01</div>
            <h3>Vous réservez</h3>
            <p>Choisissez votre formule et planifiez l'heure de collecte sur notre plateforme.</p>
          </div>
          <div className="step-card">
            <div className="step-num">02</div>
            <h3>Nous collectons</h3>
            <p>Notre agent passe récupérer votre linge directement chez vous ou à votre bureau.</p>
          </div>
          <div className="step-card">
            <div className="step-num">03</div>
            <h3>Vous êtes livré</h3>
            <p>Sous 24h à 48h, nous vous rapportons votre linge propre, repassé et emballé.</p>
          </div>
        </div>
      </section>

      {/* 5. INSTALLATIONS & AVIS */}
      <section className="section gallery-section">
        <div className="section-title">
          <h2>La Perfection NEOLAV</h2>
          <p>Découvrez notre univers de soin et la satisfaction de nos clients à Cotonou.</p>
        </div>
        <div className="gallery-layout">
          <div className="gallery-main-img">
            <img src="https://unsplash.com" alt="Notre Atelier" style={{ width: '100%', borderRadius: '16px', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="review-box">
            <div className="review-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Un gain de temps incroyable ! Le linge sent extrêmement bon et la livraison à Fidjrossè a été super rapide."</p>
              <strong style={{ display: 'block', marginTop: '10px', fontSize: '14px' }}>— Marc A., Client</strong>
            </div>
            <div className="review-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Mes costumes de travail sont impeccables, le repassage est digne d'un grand hôtel. Service très professionnel."</p>
              <strong style={{ display: 'block', marginTop: '10px', fontSize: '14px' }}>— Sessi V., Cotonou</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HORAIRES & LOCALISATION */}
      <section id="contact" className="section">
        <div className="section-title">
          <h2>Horaires & Localisation</h2>
          <p>Besoin de nous rendre visite ou de nous contacter directement ? Voici toutes nos informations.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>⏰ Horaires d'ouverture</h3>
            <p style={{ marginTop: '15px', color: '#64748b' }}>Lundi au Samedi : 07h30 — 20h00</p>
            <p style={{ color: '#64748b' }}>Dimanche : Fermé</p>
          </div>
          <div className="contact-card">
            <h3>📍 Notre Atelier</h3>
            <p style={{ marginTop: '15px', color: '#64748b' }}>Quartier PK10, Face Station-Service, Cotonou, Bénin</p>
            <a href="https://google.com" target="_blank" rel="noreferrer" className="btn-maps">🗺️ Ouvrir dans Google Maps →</a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
