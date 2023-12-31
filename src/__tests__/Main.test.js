import React from 'react';
import { render } from '@testing-library/react';
import Main from '../components/Main';

test('renders Main component with "Vibe Check"', () => {
    
    const { getByText } = render(<Main />);

    
    const h1Element = getByText(/Vibe Check/i);
    expect(h1Element).toBeInTheDocument();
});
