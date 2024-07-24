import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { ShortenText, handleSortOrderChange, handleSearch, handleChange, useMediaQuery } from './Utils';
import { Product } from 'context/type';
import '@testing-library/jest-dom/extend-expect';

// Mock products for testing
const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
  { id: 3, title: 'Product 3', price: 15, description: 'Description 3', category: 'Category 3', image: 'image3.jpg' }
];

describe('ShortenText', () => {
  test('renders shortened text if it exceeds maxLength', () => {
    render(<ShortenText text="This is a very long product title that needs to be shortened" maxLength={20} />);
    expect(screen.getByText(/this is a very lo\.\.\./i)).toBeInTheDocument();
  });

  test('renders full text if it does not exceed maxLength', () => {
    render(<ShortenText text="Short title" maxLength={20} />);
    expect(screen.getByText('Short title')).toBeInTheDocument();
  });
});

describe('handleSortOrderChange', () => {
  test('sorts products in ascending order', () => {
    const setProducts = jest.fn();
    handleSortOrderChange('asc', mockProducts, setProducts);
    expect(setProducts).toHaveBeenCalledWith([
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
      { id: 3, title: 'Product 3', price: 15, description: 'Description 3', category: 'Category 3', image: 'image3.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' }
    ]);
  });

  test('sorts products in descending order', () => {
    const setProducts = jest.fn();
    handleSortOrderChange('desc', mockProducts, setProducts);
    expect(setProducts).toHaveBeenCalledWith([
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
      { id: 3, title: 'Product 3', price: 15, description: 'Description 3', category: 'Category 3', image: 'image3.jpg' },
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' }
    ]);
  });
});

describe('handleSearch', () => {
  test('filters products based on search reference', () => {
    const setFilteredProducts = jest.fn();
    handleSearch('product 1', mockProducts, setFilteredProducts);
    expect(setFilteredProducts).toHaveBeenCalledWith([
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' }
    ]);
  });
});

describe('handleChange', () => {
  test('sets search reference and filters products', () => {
    const setSearchReference = jest.fn();
    const setFilteredProducts = jest.fn();
    handleChange('product 1', setSearchReference, setFilteredProducts, mockProducts);
    expect(setSearchReference).toHaveBeenCalledWith('product 1');
    expect(setFilteredProducts).toHaveBeenCalledWith([
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' }
    ]);
  });

  test('resets filtered products when search reference is empty', () => {
    const setSearchReference = jest.fn();
    const setFilteredProducts = jest.fn();
    handleChange('', setSearchReference, setFilteredProducts, mockProducts);
    expect(setSearchReference).toHaveBeenCalledWith('');
    expect(setFilteredProducts).toHaveBeenCalledWith(mockProducts);
  });
});

describe('useMediaQuery', () => {
  let originalMatchMedia: any;

  beforeAll(() => {
    originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(max-width: 768px)',
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }))
    });
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  test('returns true when media query matches', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(true);
  });

  test('returns false when media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 769px)'));
    expect(result.current).toBe(false);
  });
});
