import React from 'react';
import { render, screen } from '@testing-library/react';
import TestComponent from '../components/TestComponent';

test('renders learn react link', () => {
  render(<TestComponent />);
  const linkElement = screen.getByText(/thinking in react/i);
  expect(linkElement).toBeInTheDocument();

  expect(linkElement).toHaveAttribute('href', 'https://react.dev/learn/thinking-in-react');
});