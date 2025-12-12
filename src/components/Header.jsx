import React from 'react';
import ssoIcon from '../assets/sso-icon.svg';

const Header = () => {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">Mini-Mart</div>
        <div className="tagline">#1 Grocery Essentials</div>
      </div>
      <div className="search">
        <input type="text" placeholder="What are you looking for?" aria-label="Search products" />
        <button aria-label="Search">
          <span className="icon" aria-hidden="true">⌕</span>
        </button>
      </div>
      <div className="nav-links">
        <button className="nav-button">Promotions</button>
        <button className="nav-button">Stores</button>
        <button className="nav-button">Contact</button>
      </div>
      <div className="actions">
        <button className="cart" aria-label="View cart">
          <span className="icon" aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="badge">0</span>
        </button>
        <button className="login" aria-label="Login with SSO">
          <img src={ssoIcon} alt="SSO" />
          <span>Login</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
