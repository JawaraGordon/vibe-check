import { render, fireEvent, screen } from '@testing-library/react';
import GameSetup from '../components/GameSetup';

test('renders GameSetup component with "Game Setup"', () => {
  const { getByText } = render(<GameSetup />);
  const h1Element = getByText(/Game Setup/i);
  expect(h1Element).toBeInTheDocument();
});