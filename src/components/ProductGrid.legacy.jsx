import React from 'react';

const products = [
  {
    name: 'Runing shoes men sneakers 2021 breathable air mesh outdoor light',
    price: '$3.80',
    colors: 2,
  },
  {
    name: 'Outdoor camping lantern portable LED light',
    price: '$5.20',
    colors: 4,
  },
  {
    name: 'Vacuum insulated travel mug 500ml',
    price: '$12.40',
    colors: 6,
  },
  {
    name: 'Premium protein powder vanilla 1kg',
    price: '$15.50',
    colors: 3,
  },
];

const ProductGridLegacy = () => (
  <section className="products">
    <div className="products-header">
      <div className="tab active">New</div>
      <div className="tab">Trending</div>
      <div className="tab">Best Selling</div>
      <div className="tab">Popular</div>
      <div className="tab">Deals</div>
    </div>
    <div className="product-cards">
      {products.map((product) => (
        <article className="product-card" key={product.name}>
          <div className="product-image" aria-hidden="true"></div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-meta">
            <span className="price">{product.price}</span>
            <span className="colors">{product.colors} Colors</span>
          </div>
          <button className="add-cart">Add to cart</button>
        </article>
      ))}
    </div>
  </section>
);

export default ProductGrid;
