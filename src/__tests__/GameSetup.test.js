import { render, screen, fireEvent } from '@testing-library/react';
import GameSetup from '../components/GameSetup';

test('renders GameSetup component with "Game Setup", "Player 1" and "Player 2"', () => {
  render(<GameSetup />);
  const h1Element = screen.getByText(/Game Setup/i);
  expect(h1Element).toBeInTheDocument();

  const player1Element = screen.getAllByText(/Player 1/i)[0];
  expect(player1Element).toBeInTheDocument();

  const player2Element = screen.getAllByText(/Player 2/i)[0];
  expect(player2Element).toBeInTheDocument();
});

test('renders input sliders in the inner divs', () => {
  render(<GameSetup />);
  const player1Div = screen.getByText(/Player 1 Intensity/i).closest('div');
  const player2Div = screen.getByText(/Player 2 Intensity/i).closest('div');
  
  [player1Div, player2Div].forEach((div) => {
    const inputSlider = div.querySelector('input[type="range"]');
    expect(inputSlider).toBeInTheDocument();

    fireEvent.change(inputSlider, { target: { value: '50' } });

    expect(inputSlider.value).toBe('50');
  });
});