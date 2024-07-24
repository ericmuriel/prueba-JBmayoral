import { Product } from "context/type";
import { useEffect, useState } from "react";


interface ShortenTextProps {
  text: string;
  maxLength?: number;
}

export const ShortenText: React.FC<ShortenTextProps> = ({ text, maxLength = 30 }) => {
  const shorten = (str: string, maxLen: number) => {
    return str.length > maxLen ? str.slice(0, maxLen - 3) + '...' : str;
  };

  return (
    <h3>
      {shorten(text, maxLength)}
    </h3>
  );
};  

export const handleSortOrderChange = (
  selectedSortOrder: string,
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
): void => {
  if (!selectedSortOrder || !products || !setProducts) {
    return;
  }
  const sortedProducts = [...products].sort((a, b) =>
    selectedSortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );
  setProducts(sortedProducts);
};

export const handleSearch = (
  searchReference: string,
  data: Product[],
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>
): void => {
  const foundProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchReference.toLowerCase())
  );
  setFilteredProducts([...foundProducts]);
};

export const handleChange = (
  value: string,
  setSearchReference: React.Dispatch<React.SetStateAction<string>>,
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  data: Product[]
): void => {
  setSearchReference(value);
  if (value.trim() === "") {
    setFilteredProducts(data);
  } else {
    handleSearch(value, data, setFilteredProducts);
  }
};

  export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const mediaQueryList = window.matchMedia(query);
          const updateMatches = () => setMatches(mediaQueryList.matches);
          mediaQueryList.addEventListener('change', updateMatches);
          setMatches(mediaQueryList.matches);
          return () => {
          mediaQueryList.removeEventListener('change', updateMatches);
        };
      }
    }, [query]);
  
    return matches;
  };