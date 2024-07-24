import React, { useContext, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { GenericContext } from '../../context/GenericContext';
import { handleSortOrderChange, handleChange, useMediaQuery } from '../../utils/Utils';

const SearchBar: React.FC = () => {
  const { setColumns, data, searchTerm, setSearchTerm, products, setProducts, sortOrder, setSortOrder } = useContext(GenericContext);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    handleChange(searchTerm, setSearchTerm, setProducts, data);
  }, [searchTerm, data]);

  useEffect(() => {
    handleSortOrderChange(sortOrder, products, setProducts);
  }, [sortOrder]);

  const handleSortOrderChangeLocal = (selectedSortOrder: string) => {
    setSortOrder(selectedSortOrder);
  };

  const searchBarMobile = () => {
    return (
      <div className={styles.searchBarMobile}>
        <div className={styles.quantityControlsMobile}>
          <button onClick={() => setColumns(2)}>- </button>
          <button onClick={() => setColumns(4)}> +</button>
        </div>
        <div className={styles.inputMobile}>
          <input
            type="text"
            value={searchTerm}
            placeholder='Buscar...'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="form-control custom-search-input-mobile"
          />
        </div>
        <div className={styles.filterMobile}>
          <select
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortOrderChangeLocal(e.target.value)}
            className="form-select customSelect-mobile"
          >
            <option value="desc">Precio Descendente</option>
            <option value="asc">Precio Ascendente</option>
          </select>
        </div>
        <hr className={styles.divider} />
      </div>
    );
  };

  return (
    <div>
      {isMobile ? searchBarMobile() : (
        <>
          <div className={styles.searchBar}>
            <div className={styles.input}>
              <input
                type="text"
                value={searchTerm}
                placeholder='Buscar...'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="form-control custom-search-input"
              />
            </div>
            <div className={styles.filter}>
              <select
                value={sortOrder}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortOrderChangeLocal(e.target.value)}
                className="form-select customSelect"
              >
                <option value="desc">Precio Descendente</option>
                <option value="asc">Precio Ascendente</option>
              </select>
            </div>
            <div className={styles.quantityControls}>
              <button onClick={() => setColumns(2)}>- </button>
              <button onClick={() => setColumns(4)}> +</button>
            </div>
          </div>
          <hr className={styles.divider} />
        </>
      )}
    </div>
  );
};

export default SearchBar;
