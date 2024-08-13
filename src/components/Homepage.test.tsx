// src/components/HomePage.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './HomePage';
import { GenericContext } from '../context/GenericContext';
import { GenericContextValue, Product } from '../context/type'; // Fixed the import path

jest.mock('../services/fetchService', () => ({
  loadProducts: jest.fn(),
}));

export const mockData: Product[] = [
  { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
];

export const createMockContextValue = (overrides = {}): GenericContextValue => ({
  data: mockData,
  setData: jest.fn(),
  columns: 4,
  setColumns: jest.fn(),
  sortOrder: 'desc',
  setSortOrder: jest.fn(),
  searchReference: '',
  setSearchReference: jest.fn(),
  products: mockData,
  setProducts: jest.fn(),
  searchTerm: '',
  setSearchTerm: jest.fn(),
  ...overrides
});

describe('HomePage Component', () => {
  const renderHomePage = (contextValues) => {
    render(
      <GenericContext.Provider value={contextValues}>
        <HomePage />
      </GenericContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading text while products are being fetched', async () => {
    renderHomePage(createMockContextValue({ data: [], products: [] }));

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should display product grid when products are loaded', async () => {
    renderHomePage(createMockContextValue({ data: mockData, products: mockData }));

    await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument());
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  });

  it('should display no results text when no products are available', async () => {
    renderHomePage(createMockContextValue({ data: [], products: [] }));

    await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument());
    expect(screen.getByText('No hay resultados')).toBeInTheDocument();
  });
});
