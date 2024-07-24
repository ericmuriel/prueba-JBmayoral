import React, { useContext } from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { GenericContext } from '../../context/GenericContext';
import { Product } from '../../context/type';

const ProductGrid: React.FC<{ products?: Product[] }> = ({ products }) => {
  const { columns } = useContext(GenericContext);

  if (products === undefined) {
    return <div className={styles.loaderContainer}>No hay productos disponibles</div>;
  } else if (products.length === 0) {
    return <div className={styles.loaderContainer}>Cargando...</div>;
  }

  return (
    <div className={`${styles.productGrid} ${columns >= 3 ? `${styles.maxColumns}` : `${styles.minColumns}`}`}>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
