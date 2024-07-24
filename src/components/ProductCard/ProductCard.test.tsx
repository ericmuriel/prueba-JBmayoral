import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { GenericContext } from '../../context/GenericContext';
import '@testing-library/jest-dom/extend-expect';

// Mock the ShortenText and Button components
jest.mock('../../utils/Utils', () => ({
  ShortenText: ({ text }: { text: string }) => <h3 data-testid="shorten-text">{text}</h3>
}));

jest.mock('../../utils/Button/Button', () => (props: any) => (
  <button data-testid="button" onClick={props.onClick}>{props.children}</button>
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

const mockProduct = {
  title: 'Product 1',
  price: 10,
  image: 'image1.jpg'
};

describe('ProductCard', () => {
  test('renders product card with correct details', () => {
    render(
      <GenericContext.Provider value={mockContextValue}>
        <ProductCard {...mockProduct} />
      </GenericContext.Provider>
    );

    expect(screen.getByTestId('shorten-text')).toHaveTextContent(mockProduct.title);
    expect(screen.getByText(/10 €/i)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.image);
  });

  test('renders with correct styles based on columns value', () => {
    const { container } = render(
      <GenericContext.Provider value={{ ...mockContextValue, columns: 4 }}>
        <ProductCard {...mockProduct} />
      </GenericContext.Provider>
    );

    const img = screen.getByAltText(mockProduct.title);
    expect(img).toHaveClass('totalColumns');
    expect(img).not.toHaveClass('columns');
  });

  test('renders button and handles click event', () => {
    render(
      <GenericContext.Provider value={mockContextValue}>
        <ProductCard {...mockProduct} />
      </GenericContext.Provider>
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('AÑADIR');

  });
});
