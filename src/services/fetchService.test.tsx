import { render, waitFor } from '@testing-library/react';
import { GenericContext } from '../context/GenericContext';
import { Product } from '../context/type';
import { fetchProduct } from '../services/fetchService';
import '@testing-library/jest-dom/extend-expect';

// Mock de setData
const mockSetData = jest.fn();

// Contexto de prueba
const mockContextValue = {
  data: [],
  setData: mockSetData,
  columns: 4,
  setColumns: jest.fn(),
  sortOrder: 'desc',
  setSortOrder: jest.fn(),
  searchReference: '',
  setSearchReference: jest.fn(),
  products: [],
  setProducts: jest.fn(),
  searchTerm: '',
  setSearchTerm: jest.fn()
};

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <GenericContext.Provider value={mockContextValue}>
    {children}
  </GenericContext.Provider>
);

describe('fetchProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and sets products', async () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
    ];

    // Mock de fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    ) as jest.Mock;

    // Ejecutar la función directamente
    await fetchProduct('/products').then(data => {
      mockSetData(data);
    });

    // Verificar que setData haya sido llamado con los productos mock
    await waitFor(() => expect(mockSetData).toHaveBeenCalledWith(mockProducts));
  });
});
