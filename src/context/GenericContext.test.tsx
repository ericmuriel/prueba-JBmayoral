import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GenericContextProvider, { GenericContext } from './GenericContext';

const TestComponent = () => {
  const context = useContext(GenericContext);
  return (
    <div>
      <div data-testid="columns">{context.columns}</div>
      <div data-testid="sortOrder">{context.sortOrder}</div>
      <div data-testid="searchTerm">{context.searchTerm}</div>
      <button onClick={() => context.setColumns(3)}>Set Columns</button>
      <button onClick={() => context.setSortOrder('asc')}>Set Sort Order</button>
      <button onClick={() => context.setSearchTerm('test')}>Set Search Term</button>
    </div>
  );
};

describe('GenericContextProvider', () => {
  test('provides initial values', () => {
    render(
      <GenericContextProvider>
        <TestComponent />
      </GenericContextProvider>
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('4');
    expect(screen.getByTestId('sortOrder')).toHaveTextContent('desc');
    expect(screen.getByTestId('searchTerm')).toHaveTextContent('');
  });

  test('allows updating context values', () => {
    render(
      <GenericContextProvider>
        <TestComponent />
      </GenericContextProvider>
    );

    act(() => {
      screen.getByText('Set Columns').click();
      screen.getByText('Set Sort Order').click();
      screen.getByText('Set Search Term').click();
    });

    expect(screen.getByTestId('columns')).toHaveTextContent('3');
    expect(screen.getByTestId('sortOrder')).toHaveTextContent('asc');
    expect(screen.getByTestId('searchTerm')).toHaveTextContent('test');
  });
});
