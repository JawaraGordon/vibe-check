import { render, fireEvent, screen } from '@testing-library/react';
import Main from '../components/Main';

test('renders Main component with "Vibe Check"', () => {
  const { getByText } = render(<Main />);
  const h1Element = getByText(/Vibe Check/i);
  expect(h1Element).toBeInTheDocument();
});

test('should have a button that can be clicked', () => {
    const { getAllByRole } = render(<Main />);
    const buttons = getAllByRole('button');
    
   
    fireEvent.click(buttons[0]);
    
    
    fireEvent.click(buttons[1]);
  });



test('renders Scoreboard component in Main', () => {
    render(<Main />);
    const scoreboardElement = screen.getByText(/Scoreboard/i);
    expect(scoreboardElement).toBeInTheDocument();
  });