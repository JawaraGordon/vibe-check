import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';

const GameResults = ({ gameScore, onReset }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    onReset();
    navigate('/setup');
  };

  const handleQuit = () => {
    onReset();
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
        <h1 className="text-white text-4xl font-bold leading-none mb-8">
          Game Results
        </h1>
        <div className="flex flex-col justify-center items-center w-full px-28">
          <div className="bg-white p-8 mb-8">
            <h2>Game Results</h2>
            {/* TODO: create image element that shows game results */}
            <img src="http://" alt="Game Results"></img>
          </div>
          <div className="flex justify-between space-x-48">
            <div className="bg-purple-600 p-8">
              <h2>Player 1 Score</h2>
            </div>
            <div className="bg-blue-600 p-8">
              <h2>Player 2 Score</h2>
            </div>
          </div>
          <div className="bg-white p-8 mt-8">
            <h2>{gameScore}</h2>
          </div>
          <div className="flex justify-evenly space-x-16 mt-4 ">
            <Button
              label="Play Again"
              onClick={handlePlayAgain}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            ></Button>
            <Button
              label="Quit"
              onClick={handleQuit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameResults;
