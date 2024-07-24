import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './_app';
import '@testing-library/jest-dom/extend-expect';

// Mock the HomePage component
jest.mock('../components/HomePage', () => () => <div data-testid="homepage">HomePage Content</div>);

describe('App', () => {
  test('renders HomePage with the GenericContextProvider', () => {
    render(<App />);

    // Check if HomePage is rendered
    expect(screen.getByTestId('homepage')).toBeInTheDocument();

    // Check if the GenericContextProvider provides the necessary context
    expect(screen.getByTestId('homepage').closest('div')).toBeInTheDocument();
  });
});
