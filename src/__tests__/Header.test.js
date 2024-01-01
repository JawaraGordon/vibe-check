import { render, screen } from '@testing-library/react';
import Header from '../components/common/Header';

test('renders Scoreboard component in Header', () => {
  render(<Header />);
  const scoreboardElement = screen.getByText(/Scoreboard/i);
  expect(scoreboardElement).toBeInTheDocument();
});