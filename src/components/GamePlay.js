import AudioWaveform from './features/AudioWaveform.js';
import TestSong from '../assets/audio/Dimensions.mp3';

const GamePlay = () => {
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
            <h2>Player 1 Input</h2>
            <input type="text" />
          </div>
          <div className="bg-blue-600 p-8">
            <h2>Player 2 Input</h2>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
