// src/components/Homepage.tsx

import React, { useContext, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { GenericContext } from '../context/GenericContext';
import FetchProductComponent from '../services/fetchService';

const HomePage: React.FC = () => {
  const { data, products, setProducts } = useContext(GenericContext);

  useEffect(() => {
    if (data && data.length > 0) {
      setProducts(data);
    }
  }, [data, setProducts]);

  return (
    <div className="container">
      <SearchBar />
      <FetchProductComponent endpoint='/products' />
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default HomePage;
