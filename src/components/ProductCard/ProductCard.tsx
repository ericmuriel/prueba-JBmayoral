import React, { useContext } from 'react';
import styles from './ProductCard.module.css';
import { GenericContext } from '../../context/GenericContext';
import { ShortenText } from '../../utils/Utils';
import Button from '../../utils/Button/Button';

interface ProductProps {
  title: string,
  price: number,
  image: string,
}

const ProductCard: React.FC<ProductProps> = ({
  image,
  title,
  price,
}) => {
  const { columns } = useContext(GenericContext);
  const handleClick = () => {
    alert('Añadido al carrito');
  };
  return (
    <div className={styles.productCard}>
      <div className={styles.imgContainer}>
        <img className={`${columns  >= 2 ? styles.totalColumns : styles.columns}`} src={image} alt={title} />
      </div>
      <div className={styles.productInfo}>
        <ShortenText text={title} />
        <div className={styles.pricing}>
          <span>{price} €</span>
        </div>
        <div className={styles.masColores}>
          <span>Más colores</span>
        </div>
        <Button onClick={handleClick}>
          AÑADIR
      </Button>
      </div>
    </div>
  );
};

export default ProductCard;
