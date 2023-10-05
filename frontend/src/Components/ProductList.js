import React from 'react';
import Product from './Product';
import '../Css/ProductList.css'

const ProductList = ({ products, onProductClick }) => {
  return (
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.name} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>

  );
};

export default ProductList;