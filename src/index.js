import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Injection automatique du design dans le site
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://googleapis.com');

  :root {
    --primary-blue: #0f4c81;
    --royal-blue: #1e3a8a;
    --light-blue: #eff6ff;
    --text-dark: #1e293b;
    --text-muted: #64748b;
    --white: #ffffff;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  body {
    background-color: var(--white);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  .hero-section {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%);
    padding: 80px 5% 120px 5%;
    min-height: 85vh;
    display: flex;
    align-items: center;
  }

  .container-50-50 {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
  }

  .hero-left { color: var(--white); }

  .hero-badge {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 20px;
  }

  .hero-left h1 {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .hero-left h1 span { color: #60a5fa; }

  .hero-description {
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 35px;
    line-height: 1.6;
  }

  .hero-buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .btn-primary {
    background-color: var(--white);
    color: #1e3a8a;
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  .btn-secondary {
    border: 2px solid rgba(255, 255, 255, 0.4);
    color: var(--white);
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--white);
  }

  .hero-reassurance { display: flex; gap: 30px; }
  .reassurance-item { display: flex; flex-direction: column; }
  .reassurance-val { font-size: 28px; font-weight: 800; color: #60a5fa; }
  .reassurance-lbl { font-size: 13px; opacity: 0.8; }

  .hero-right img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    object-fit: cover;
  }

  .stats-band {
    background: var(--light-blue);
    padding: 40px 5%;
    margin-top: -40px;
    position: relative;
    z-index: 10;
    border-radius: 24px 24px 0 0;
  }

  .stats-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .stat-card {
    background: var(--white);
    padding: 25px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    border: 1px solid rgba(0,0,0,0.05);
  }

  .stat-card h3 { font-size: 32px; color: #1d4ed8; margin-bottom: 5px; }

  .section { padding: 100px 5%; }
  .section-title { text-align: center; max-width: 600px; margin: 0 auto 60px auto; }
  .section-title h2 { font-size: 36px; color: var(--royal-blue); margin-bottom: 15px; }

  .services-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }

  .service-card {
    background: var(--white);
    padding: 35px 25px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s ease;
  }

  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(15, 76, 129, 0.08);
  }

  .service-icon {
    width: 50px;
    height: 50px;
    background: var(--light-blue);
    color: #1d4ed8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .steps-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  .step-card { text-align: center; }
  .step-num { font-size: 72px; font-weight: 800; color: rgba(29, 78, 216, 0.08); margin-bottom: -20px; }

  .gallery-section { background: #f8fafc; }
  .gallery-layout {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 30px;
  }

  .review-box { display: flex; flex-direction: column; gap: 20px; }
  .review-card { background: var(--white); padding: 30px; border-radius: 16px; }
  .stars { color: #f59e0b; margin-bottom: 10px; }

  .contact-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .contact-card {
    background: var(--white);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
    border: 1px solid rgba(0,0,0,0.05);
  }

  .btn-maps { display: inline-block; margin-top: 20px; color: #1d4ed8; font-weight: 700; text-decoration: none; }

  @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) {
    .container-50-50, .stats-grid, .steps-grid, .gallery-layout, .contact-grid { grid-template-columns: 1fr; }
    .services-grid { grid-template-columns: 1fr; }
    .hero-section { padding-top: 40px; text-align: center; }
    .hero-buttons, .hero-reassurance { justify-content: center; }
    .hero-left h1 { font-size: 32px; }
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
