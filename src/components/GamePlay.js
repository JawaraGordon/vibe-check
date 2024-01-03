import { useState, useEffect } from 'react';
import AudioWaveform from './features/AudioWaveform.js';
import TestSong from '../assets/audio/Dimensions.mp3';


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const GamePlay = () => {
  const [playerOneInput, setPlayerOneInput] = useState('');
  const [playerTwoInput, setPlayerTwoInput] = useState('');
  const [playerOneInputs, setPlayerOneInputs] = useState([]);
  const [playerTwoInputs, setPlayerTwoInputs] = useState([]);

  const debouncedPlayerOneInput = useDebounce(playerOneInput, 500);
  const debouncedPlayerTwoInput = useDebounce(playerTwoInput, 500);

  useEffect(() => {
    if (debouncedPlayerOneInput) {
      setPlayerOneInputs((prevInputs) => {
        const newInputs = [...prevInputs, debouncedPlayerOneInput];
        console.log('playerOneInputs', newInputs);
        return newInputs;
      });
      setPlayerOneInput(''); 
    }
  }, [debouncedPlayerOneInput]);

  useEffect(() => {
    if (debouncedPlayerTwoInput) {
      setPlayerTwoInputs((prevInputs) => {
        const newInputs = [...prevInputs, debouncedPlayerTwoInput];
        console.log('playerTwoInputs', newInputs);
        return newInputs;
      });
      setPlayerTwoInput(''); 
    }
  }, [debouncedPlayerTwoInput]);

  return (
<div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
  <h1 className="text-white text-4xl font-bold leading-none mb-8">
    Game Play
  </h1>
  <div className="flex flex-col justify-center items-center w-full px-28">
    <div className="bg-white p-8 mb-8">
      <h2>Song Waveform</h2>
      <AudioWaveform src={TestSong} />
    </div>
    <div className="flex justify-between space-x-48">
      <div className="bg-purple-600 p-8">
        <label htmlFor="playerOneInput" className="block text-lg font-medium text-gray-700">Player 1 Input</label>
        <input id="playerOneInput" type="text" value={playerOneInput} onChange={(e) => setPlayerOneInput(e.target.value)} className="mt-1 block w-full" />
      </div>
      <div className="bg-blue-600 p-8">
        <label htmlFor="playerTwoInput" className="block text-lg font-medium text-gray-700">Player 2 Input</label>
        <input id="playerTwoInput" type="text" value={playerTwoInput} onChange={(e) => setPlayerTwoInput(e.target.value)} className="mt-1 block w-full" />
      </div>
    </div>
  </div>
</div>

  );
};

export default GamePlay;