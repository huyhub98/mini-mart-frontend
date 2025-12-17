import React from 'react';

const banners = [
  {
    title: 'Sale',
    subtitle: '24h Delivery',
    description: 'Up to 50%',
    action: 'Shop now',
    color: 'linear-gradient(135deg, #ffe259 0%, #ffa751 100%)',
  },
  {
    title: 'Sale',
    subtitle: '30 days return',
    description: 'Get Extra 20% cash back and exchange within 30 days',
    action: 'Shop now',
    color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  },
];

const highlightCards = [
  {
    title: 'Mega Sale',
    subtitle: 'First order only',
    highlight: 'Buy 1 Get 1',
    color: '#00b894',
  },
  {
    title: 'Mega Sale',
    subtitle: 'SUPER HOT DISCOUNT',
    highlight: 'Buy 1 Get 1',
    timer: 'Ends in 0ct : 46 days : 16 : 1 minute',
    color: '#ffd349',
  },
];

const BannerGrid = () => (
  <section className="banner-grid">
    <div className="hero-list">
      <div className="secondary">
        <div className="pill">Dream</div>
        <div className="pill">Abala</div>
      </div>
      <div className="banner-row">
        {banners.map((banner) => (
          <div key={banner.title + banner.subtitle} className="banner-card" style={{ background: banner.color }}>
            <div className="banner-title">
              <span>{banner.title}</span>
              <span className="emphasis">Sale</span>
            </div>
            <p className="banner-subtitle">{banner.subtitle}</p>
            <p className="banner-description">{banner.description}</p>
            <button className="banner-action">{banner.action}</button>
          </div>
        ))}
      </div>
    </div>
    <div className="highlight-column">
      <div className="highlight-card">
        <p className="title">Hamer Trial offer</p>
        <p className="promo">Buy 1 Free 1</p>
        <ul>
          <li>Hamer</li>
          <li>Homatholo</li>
          <li>W-30</li>
        </ul>
        <button className="highlight-action">Shop now</button>
      </div>
      {highlightCards.map((card) => (
        <div key={card.subtitle} className="highlight-card" style={{ backgroundColor: card.color }}>
          <p className="title">{card.title}</p>
          <p className="subtitle">{card.subtitle}</p>
          <p className="promo">{card.highlight}</p>
          {card.timer && <p className="timer">{card.timer}</p>}
          <button className="highlight-action">Shop now</button>
        </div>
      ))}
    </div>
  </section>
);

export default BannerGrid;
