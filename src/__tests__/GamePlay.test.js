import { render, screen, fireEvent } from '@testing-library/react';
import GamePlay from '../components/GamePlay';

beforeEach(() => {
  render(<GamePlay />);
});

test('renders GamePlay component with two input divs and a Song Waveform div with an audio element', () => {
  const playerOneInputDiv = screen.getByText(/Player One/i).closest('div');
  expect(playerOneInputDiv).toBeInTheDocument();
  expect(
    playerOneInputDiv.querySelector('input[type="text"]')
  ).toBeInTheDocument();

  expect(playerOneInputDiv.querySelector('p')).toBeInTheDocument();

  const playerTwoInputDiv = screen.getByText(/Player Two/i).closest('div');
  expect(playerTwoInputDiv).toBeInTheDocument();
  expect(
    playerTwoInputDiv.querySelector('input[type="text"]')
  ).toBeInTheDocument();

  expect(playerTwoInputDiv.querySelector('p')).toBeInTheDocument();

  const songWaveformDiv = screen.getByText(/Song Waveform/i).closest('div');
  expect(songWaveformDiv).toBeInTheDocument();
  expect(songWaveformDiv.querySelector('audio')).toBeInTheDocument();
});

test('calls onChange event handler when the user types into player 1 input', () => {
  const playerOneInput = screen.getByLabelText(/Player One/i);
  fireEvent.change(playerOneInput, { target: { value: 'new input' } });

  expect(playerOneInput.value).toBe('new input');
});

test('calls onChange event handler when the user types into player 2 input', () => {
  const playerTwoInput = screen.getByLabelText(/Player Two/i);
  fireEvent.change(playerTwoInput, { target: { value: 'new input' } });

  expect(playerTwoInput.value).toBe('new input');
});
