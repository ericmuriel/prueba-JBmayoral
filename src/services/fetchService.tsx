import { Product } from '../context/type';

export const fetchProduct = async (endpoint: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://fakestoreapi.com${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const loadProducts = async (endpoint: string, setData: (data: Product[]) => void) => {
  try {
    const data = await fetchProduct(endpoint);
    setData(data);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};
