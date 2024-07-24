// src/components/SearchBar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { GenericContext } from '../../context/GenericContext';
import { handleSortOrderChange, useMediaQuery } from '../../utils/Utils';
import { GenericContextValue, Product } from '../../context/type';

// Mock the handleSortOrderChange and handleChange functions
jest.mock('../../utils/Utils', () => ({
  handleSortOrderChange: jest.fn(),
  handleChange: jest.fn(),
  useMediaQuery: jest.fn()
}));
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
  
describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search bar and interacts correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <GenericContext.Provider value={mockContextValue}>
        <SearchBar />
      </GenericContext.Provider>
    );

    // Verify the search input is rendered
    const searchInput = screen.getByPlaceholderText('Buscar...');
    expect(searchInput).toBeInTheDocument();

    // Verify the sort order select is rendered
    const sortOrderSelect = screen.getByRole('combobox');
    expect(sortOrderSelect).toBeInTheDocument();

    // Verify the column buttons are rendered
    const columnButtons = screen.getAllByRole('button');
    expect(columnButtons.length).toBe(2);

    // Simulate changing the search term
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockContextValue.setSearchTerm).toHaveBeenCalledWith('test');

    // Simulate changing the sort order
    fireEvent.change(sortOrderSelect, { target: { value: 'asc' } });
    expect(handleSortOrderChange).toHaveBeenCalled();

    // Simulate clicking the column buttons
    fireEvent.click(columnButtons[0]);
    expect(mockContextValue.setColumns).toHaveBeenCalledWith(2);

    fireEvent.click(columnButtons[1]);
    expect(mockContextValue.setColumns).toHaveBeenCalledWith(4);
  });

  test('renders the mobile search bar', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <GenericContext.Provider value={mockContextValue}>
        <SearchBar />
      </GenericContext.Provider>
    );

    // Verify the search input is rendered for mobile
    const searchInputMobile = screen.getByPlaceholderText('Buscar...');
    expect(searchInputMobile).toBeInTheDocument();

    // Verify the sort order select is rendered for mobile
    const sortOrderSelectMobile = screen.getByRole('combobox');
    expect(sortOrderSelectMobile).toBeInTheDocument();

    // Verify the column buttons are rendered for mobile
    const columnButtonsMobile = screen.getAllByRole('button');
    expect(columnButtonsMobile.length).toBe(2);

    // Simulate changing the search term for mobile
    fireEvent.change(searchInputMobile, { target: { value: 'test' } });
    expect(mockContextValue.setSearchTerm).toHaveBeenCalledWith('test');

    // Simulate changing the sort order for mobile
    fireEvent.change(sortOrderSelectMobile, { target: { value: 'asc' } });
    expect(handleSortOrderChange).toHaveBeenCalled();

    // Simulate clicking the column buttons for mobile
    fireEvent.click(columnButtonsMobile[0]);
    expect(mockContextValue.setColumns).toHaveBeenCalledWith(2);

    fireEvent.click(columnButtonsMobile[1]);
    expect(mockContextValue.setColumns).toHaveBeenCalledWith(4);
  });
});
