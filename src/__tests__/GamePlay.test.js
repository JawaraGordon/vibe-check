import { render, screen, fireEvent } from '@testing-library/react';
import GamePlay from '../components/GamePlay';


beforeEach(() => {
  render(<GamePlay />);
});

test('renders GamePlay component with two input divs and a Song Waveform div with an audio element', () => {
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

test('calls onChange event handler when the user types into player 1 input', () => {
  const playerOneInput = screen.getByLabelText(/Player 1 Input/i);
  fireEvent.change(playerOneInput, { target: { value: 'new input' } });

  expect(playerOneInput.value).toBe('new input');
});

test('calls onChange event handler when the user types into player 2 input', () => {
  const playerTwoInput = screen.getByLabelText(/Player 2 Input/i);
  fireEvent.change(playerTwoInput, { target: { value: 'new input' } });

  expect(playerTwoInput.value).toBe('new input');
});
