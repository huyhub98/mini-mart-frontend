import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CategoryList from './components/CategoryList.jsx';
import BannerGrid from './components/BannerGrid.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import LoginModal from './components/LoginModal.jsx';
import './App.css';

const AppLegacy = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="page">
      <Header onLogin={() => setShowLogin(true)} />
      <main className="layout">
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
        </section>
      </main>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default App;
