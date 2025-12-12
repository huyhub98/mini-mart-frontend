import React from 'react';
import Header from './components/Header.jsx';
import CategoryList from './components/CategoryList.jsx';
import BannerGrid from './components/BannerGrid.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import './App.css';

const App = () => (
  <div className="page">
    <Header />
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
  </div>
);

export default App;
