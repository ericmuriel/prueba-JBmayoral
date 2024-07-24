// src/components/ProductGrid.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import { GenericContext } from '../../context/GenericContext';
import { Product } from '../../context/type';
import '@testing-library/jest-dom/extend-expect';

// Mock the ProductCard component
jest.mock('../../components/ProductCard/ProductCard', () => (props: Product) => (
  <div data-testid="product-card">
    <div>{props.title}</div>
    <div>{props.price}</div>
  </div>
));

const mockContextValue = {
  columns: 4,
  data: [],
  setData: jest.fn(),
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

const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
];

describe('ProductGrid', () => {
  test('renders loading message when products are empty', () => {
    render(
      <GenericContext.Provider value={mockContextValue}>
        <ProductGrid products={[]} />
      </GenericContext.Provider>
    );

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  test('renders no products message when products are undefined', () => {
    render(
      <GenericContext.Provider value={mockContextValue}>
        <ProductGrid products={undefined as unknown as Product[]} />
      </GenericContext.Provider>
    );

    expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument();
  });

  test('renders product cards correctly', () => {
    render(
      <GenericContext.Provider value={mockContextValue}>
        <ProductGrid products={mockProducts} />
      </GenericContext.Provider>
    );

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(mockProducts.length);
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/product 2/i)).toBeInTheDocument();
  });

  test('applies the correct styles based on columns value', () => {
    const { container } = render(
      <GenericContext.Provider value={{ ...mockContextValue, columns: 4 }}>
        <ProductGrid products={mockProducts} />
      </GenericContext.Provider>
    );

    // Verify that the correct class is applied to the grid div
    expect(container.firstChild).toHaveClass('productGrid');
    expect(container.firstChild).toHaveClass('maxColumns');
  });
});
