import React from 'react';

const categories = [
  'Dairy',
  'Intensify wellness',
  'Lose weight',
  'Gain weight',
  'Food & Drink',
  'Mom & Baby',
  'Beauty',
];

const CategoryListLegacy = () => (
  <ul className="category-list">
    {categories.map((category) => (
      <li key={category}>
        <button type="button" className="category-item" aria-label={category}>
          {category}
        </button>
      </li>
    ))}
  </ul>
);

export default CategoryList;
