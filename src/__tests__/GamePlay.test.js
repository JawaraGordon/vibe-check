import { render, screen } from '@testing-library/react';
import GamePlay from '../components/GamePlay';

test('renders GamePlay component with two input divs and a Song Waveform div with an audio element', () => {
  render(<GamePlay />);
  
  const player1InputDiv = screen.getByText(/Player 1 Input/i).closest('div');
  expect(player1InputDiv).toBeInTheDocument();
  expect(player1InputDiv.querySelector('input[type="text"]')).toBeInTheDocument();

  const player2InputDiv = screen.getByText(/Player 2 Input/i).closest('div');
  expect(player2InputDiv).toBeInTheDocument();
  expect(player2InputDiv.querySelector('input[type="text"]')).toBeInTheDocument();

  const songWaveformDiv = screen.getByText(/Song Waveform/i).closest('div');
  expect(songWaveformDiv).toBeInTheDocument();
  expect(songWaveformDiv.querySelector('audio')).toBeInTheDocument();
});