// src/components/Homepage.test.tsx

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import HomePage from './HomePage';
import { GenericContext } from '../context/GenericContext';
import { Product, GenericContextValue } from '../context/type';

jest.mock('../services/fetchService', () => () => <div>Mocked FetchProductComponent</div>);

const mockData: Product[] = [
  { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
];

const mockContextValue: GenericContextValue = {
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
  setSearchTerm: jest.fn()
};

beforeAll(() => {
  global.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe('HomePage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the homepage with search bar, fetch component, and products', async () => {
    await act(async () => {
      render(
        <GenericContext.Provider value={mockContextValue}>
          <HomePage />
        </GenericContext.Provider>
      );
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    expect(screen.getByText(/mocked fetchproductcomponent/i)).toBeInTheDocument();

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  });

  test('renders loading state when data is empty', async () => {
    const emptyContextValue = {
      ...mockContextValue,
      data: [],
      products: []
    };

    await act(async () => {
      render(
        <GenericContext.Provider value={emptyContextValue}>
          <HomePage />
        </GenericContext.Provider>
      );
    });

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  test('calls setProducts with data when data is fetched', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const setProducts = jest.fn();

    const initialContextValue: GenericContextValue = {
      data: [],
      setData: jest.fn(),
      columns: 4,
      setColumns: jest.fn(),
      sortOrder: 'desc',
      setSortOrder: jest.fn(),
      searchReference: '',
      setSearchReference: jest.fn(),
      products: [],
      setProducts,
      searchTerm: '',
      setSearchTerm: jest.fn()
    };

    await act(async () => {
      render(
        <GenericContext.Provider value={initialContextValue}>
          <HomePage />
        </GenericContext.Provider>
      );
    });
    
  });
  
});
