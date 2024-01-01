import { render, screen } from '@testing-library/react';
import GameResults from '../components/GameResults';

test('renders GameResults component with two score divs and a Game Results div with an image element', () => {
  render(<GameResults />);
  
  const player1ScoreDiv = screen.getByText(/Player 1 Score/i).closest('div');
  expect(player1ScoreDiv).toBeInTheDocument();

  const player2ScoreDiv = screen.getByText(/Player 2 Score/i).closest('div');
  expect(player2ScoreDiv).toBeInTheDocument();

  const gameResultsDiv = screen.getByText(/Game Results/i, { selector: 'h1' }).closest('div');
  expect(gameResultsDiv).toBeInTheDocument();
  expect(gameResultsDiv.querySelector('img')).toBeInTheDocument();
});