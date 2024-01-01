import { render, screen } from '@testing-library/react';
import GameLoad from '../components/GameLoad';

test('renders GameLoad component with a div called "Countdown"', () => {
  render(<GameLoad />);
  const countdownElement = screen.getByText(/Countdown/i);
  expect(countdownElement).toBeInTheDocument();
});