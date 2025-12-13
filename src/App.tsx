import React, { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BannerGrid from './components/BannerGrid';
import CategoryList from './components/CategoryList';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import { AuthGate, RoleGate } from './features/auth/AuthGate';
import { useAuth } from './features/auth/AuthProvider';
import api from './shared/api/http';

interface ApiProfile {
  username?: string;
  email?: string;
  [key: string]: unknown;
}

const HomePage: React.FC<{ onPingProfile: () => void; profile: ApiProfile | null; apiError: string | null }> = ({
  onPingProfile,
  profile,
  apiError,
}) => (
  <div className="layout">
    <aside className="sidebar">
      <div className="category-header">
        <span className="icon" aria-hidden="true">☰</span>
        <span>Category List</span>
      </div>
      <CategoryList />
    </aside>
    <section className="content">
      <BannerGrid />
      <ProductGrid />
      <div className="card api-card">
        <div className="card-header">
          <h3>Backend connectivity</h3>
          <button className="primary" onClick={onPingProfile}>
            Refresh /api/me
          </button>
        </div>
        {profile && <pre className="api-output">{JSON.stringify(profile, null, 2)}</pre>}
        {apiError && <div className="error">{apiError}</div>}
      </div>
    </section>
  </div>
);

const ProductsPage: React.FC = () => (
  <div className="card">Browse our full catalog of fresh produce, pantry staples, and household essentials.</div>
);

const ProductDetailPage: React.FC = () => (
  <div className="card">Product details will appear here. Choose an item from the catalog.</div>
);

const CartPage: React.FC = () => <div className="card">Your cart is ready for checkout.</div>;

const CheckoutPage: React.FC = () => <div className="card">Secure checkout powered by Keycloak-protected API.</div>;

const ContactPage: React.FC = () => (
  <div className="card">Reach us anytime at support@mini-mart.local or visit our flagship store downtown.</div>
);

const AccountPage: React.FC<{ profile: ApiProfile | null; apiError: string | null; onRefresh: () => void }> = ({
  profile,
  apiError,
  onRefresh,
}) => (
  <div className="card">
    <div className="card-header">
      <h3>Your account</h3>
      <button className="primary" onClick={onRefresh}>
        Refresh profile
      </button>
    </div>
    {profile && <pre className="api-output">{JSON.stringify(profile, null, 2)}</pre>}
    {apiError && <div className="error">{apiError}</div>}
  </div>
);

const AdminPage: React.FC = () => (
  <div className="card">Admin dashboard (UI gated by role, backend enforces authorization).</div>
);

const NotFoundPage: React.FC = () => <div className="card">Page not found.</div>;

const App: React.FC = () => {
  const { isAuthenticated, user, roles, login, logout } = useAuth();
  const [profile, setProfile] = useState<ApiProfile | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const location = useLocation();

  const username = useMemo(() => {
    const parsedUser = user as { preferred_username?: string; email?: string } | null;
    return parsedUser?.preferred_username ?? parsedUser?.email ?? 'guest';
  }, [user]);

  const fetchProfile = async () => {
    if (!isAuthenticated) {
      setApiError('Please login to call /api/me');
      setProfile(null);
      return;
    }
    try {
      const response = await api.get('/api/me');
      setProfile(response.data);
      setApiError(null);
    } catch (error) {
      setApiError('Failed to reach backend /api/me');
      setProfile(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      void fetchProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated]);

  const isAdmin = roles.includes('admin');

  return (
    <div className="page">
      <Header
        onLogin={login}
        onLogout={logout}
        isAuthenticated={isAuthenticated}
        username={username}
        isAdmin={isAdmin}
        currentPath={location.pathname}
      />
      <main>
        <nav className="tabs">
          <Link to="/" className={`tab ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/products" className={`tab ${location.pathname.startsWith('/products') ? 'active' : ''}`}>
            Products
          </Link>
          <Link to="/cart" className={`tab ${location.pathname === '/cart' ? 'active' : ''}`}>
            Cart
          </Link>
          <Link to="/checkout" className={`tab ${location.pathname === '/checkout' ? 'active' : ''}`}>
            Checkout
          </Link>
          <Link to="/account" className={`tab ${location.pathname === '/account' ? 'active' : ''}`}>
            Account
          </Link>
          <Link to="/admin" className={`tab ${location.pathname === '/admin' ? 'active' : ''}`}>
            Admin
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage onPingProfile={fetchProfile} profile={profile} apiError={apiError} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/checkout"
            element={
              <AuthGate>
                <CheckoutPage />
              </AuthGate>
            }
          />
          <Route
            path="/account"
            element={
              <AuthGate>
                <AccountPage profile={profile} apiError={apiError} onRefresh={fetchProfile} />
              </AuthGate>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGate>
                <RoleGate allowedRoles={['admin']}>
                  <AdminPage />
                </RoleGate>
              </AuthGate>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
