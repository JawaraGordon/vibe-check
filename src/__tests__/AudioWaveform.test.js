import { render, screen, fireEvent } from '@testing-library/react';
import AudioWaveform from '../components/features/AudioWaveform';

describe('AudioWaveform', () => {
  test('useEffect is called on page load', () => {
    const logSpy = jest.spyOn(console, 'log');
    render(<AudioWaveform />);
    expect(logSpy).toHaveBeenCalledWith('useEffect called');
  });


});