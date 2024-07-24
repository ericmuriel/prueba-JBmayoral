// src/utils/Button/Button.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  test('renders the button with correct text', () => {
    render(<Button onClick={jest.fn()}>AÑADIR</Button>);
    const buttonElement = screen.getByText(/añadir/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
