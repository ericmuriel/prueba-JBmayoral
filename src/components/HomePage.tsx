import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { GenericContext } from '../context/GenericContext';
import { loadProducts } from '../services/fetchService';

const HomePage: React.FC = () => {
  const { data, products, setProducts, setData } = useContext(GenericContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await loadProducts('/products', setData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setData]);

  useEffect(() => {
    if (data && data.length > 0) {
      setProducts(data);
    }
  }, [data, setProducts]);

  return (
    <div className="container">
      <SearchBar />
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>Cargando...</div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div style={{ textAlign: 'center' }}>No hay resultados</div>
      )}
    </div>
  );
};

export default HomePage;
