import { render, fireEvent } from '@testing-library/react';
import Main from '../components/Main';

test('renders Main component with "Vibe Check"', () => {
  const { getByText } = render(<Main />);
  const h1Element = getByText(/Vibe Check/i);
  expect(h1Element).toBeInTheDocument();
});

test('should have a button that can be clicked', () => {
  const { getByRole } = render(<Main />);
  const button = getByRole('button');

  fireEvent.click(button);

});