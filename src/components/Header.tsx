import React from 'react';
import { Link } from 'react-router-dom';
import ssoIcon from '../assets/sso-icon.svg';

interface HeaderProps {
  onLogin: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  username: string;
  isAdmin: boolean;
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onLogout, isAuthenticated, username, isAdmin, currentPath }) => {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">Mini-Mart</div>
        <div className="tagline">#1 Grocery Essentials</div>
      </div>
      <div className="search">
        <input type="text" placeholder="What are you looking for?" aria-label="Search products" />
        <button aria-label="Search">
          <span className="icon" aria-hidden="true">⌕
          </span>
        </button>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-button ${currentPath === '/' ? 'active' : ''}`}>
          Promotions
        </Link>
        <Link to="/products" className={`nav-button ${currentPath.startsWith('/products') ? 'active' : ''}`}>
          Products
        </Link>
        <Link to="/contact" className="nav-button">
          Contact
        </Link>
      </div>
      <div className="actions">
        <Link to="/cart" className="cart" aria-label="View cart">
          <span className="icon" aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="badge">0</span>
        </Link>
        {isAuthenticated ? (
          <div className="user-pill">
            <div className="user-meta">
              <span className="welcome">Hello, {username}</span>
              <span className="roles">{isAdmin ? 'admin' : 'customer'}</span>
            </div>
            <button className="login" aria-label="Logout" onClick={onLogout}>
              <img src={ssoIcon} alt="SSO" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button className="login" aria-label="Login with SSO" onClick={onLogin}>
            <img src={ssoIcon} alt="SSO" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
