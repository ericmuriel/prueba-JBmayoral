import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FetchProductComponent from './fetchService';
import { GenericContext } from '../context/GenericContext';
import { Product } from '../context/type';
import '@testing-library/jest-dom/extend-expect';

const mockSetData = jest.fn();

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

test('fetches and sets products', async () => {
  const mockProducts: Product[] = [
    { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
    { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    })
  ) as jest.Mock;

  render(<FetchProductComponent endpoint="/products" />, { wrapper: Wrapper });

  await waitFor(() => expect(mockSetData).toHaveBeenCalledWith(mockProducts));
});
