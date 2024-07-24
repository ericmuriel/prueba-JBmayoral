import { GenericContext } from "../context/GenericContext";
import { Product } from "../context/type";
import { useContext, useEffect } from "react";

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

interface FetchProductComponentProps {
  endpoint?: string;
}

const FetchProductComponent: React.FC<FetchProductComponentProps> = ({ endpoint = '/products' }) => {
  const { setData } = useContext(GenericContext);

  useEffect(() => {
    fetchProduct(endpoint)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [endpoint, setData]);

  return null;
};

export default FetchProductComponent;
