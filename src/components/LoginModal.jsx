import React, { useState } from 'react';

const backendAuthBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8998';
const keycloakBase = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace with POST `${backendAuthBase}/auth/login` when wiring to Spring Boot backend
    console.info('Submitting credentials to backend:', {
      endpoint: `${backendAuthBase}/auth/login`,
      username,
      password: '[REDACTED]',
    });
  };

  const handleForgotPassword = () => {
    // Wire to `${backendAuthBase}/auth/forgot-password` endpoint
    console.info('Redirecting to backend forgot password URL:', `${backendAuthBase}/auth/forgot-password`);
  };

  const handleRegister = () => {
    // Wire to `${backendAuthBase}/auth/register` endpoint
    console.info('Redirecting to backend registration URL:', `${backendAuthBase}/auth/register`);
  };

  const handleKeycloakRegister = () => {
    // Wire to Keycloak registration/SSO: `${keycloakBase}/realms/service/protocol/openid-connect/auth`
    console.info('Redirecting to Keycloak SSO registration URL:', `${keycloakBase}/realms/service/protocol/openid-connect/auth`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="login-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="login-title">Welcome back</h2>
          <button className="close" aria-label="Close login" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="modal-subtitle">Sign in to manage your cart and orders</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Username</span>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <button type="submit" className="primary-action">Login</button>
        </form>
        <div className="modal-links">
          <button className="text-link" type="button" onClick={handleForgotPassword}>
            Forgot password?
          </button>
          <button className="text-link" type="button" onClick={handleRegister}>
            Register new user
          </button>
        </div>
        <div className="sso-panel">
          <div className="sso-text">
            <div className="sso-title">Register or login with SSO (Keycloak)</div>
            <p className="sso-desc">
              Update <code>VITE_KEYCLOAK_URL</code> to point at your Keycloak realm or edit the URL below when wiring to the backend.
            </p>
          </div>
          <button className="sso-button" type="button" onClick={handleKeycloakRegister}>
            Continue with Keycloak
          </button>
          <div className="sso-hint">
            Current SSO endpoint target: {`${keycloakBase}/realms/service/protocol/openid-connect/auth`}
          </div>
        </div>
        <div className="backend-hint">
          Backend auth base URL: {backendAuthBase}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
