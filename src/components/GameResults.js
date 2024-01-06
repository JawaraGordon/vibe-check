import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import vibesYesImg from '../assets/images/vibes-yes.png';
import vibesNoImg from '../assets/images/vibes-no.png';

const GameResults = ({ songTopScore, gameScore, onReset, onGameRestart }) => {
  const navigate = useNavigate();

  const resultImageSrc =
    gameScore > songTopScore ? `${ vibesYesImg }` : `${ vibesNoImg }`;

  const handlePlayAgain = () => {
    onGameRestart();
    onReset();

    navigate('/setup');
  };

  const handleQuit = () => {
    onGameRestart();
    onReset();

    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
        {/* <h1 className="text-white text-4xl font-bold leading-none mb-8">
          Game Results
        </h1> */}
        <div className="flex flex-col justify-center items-center w-full px-28">
          <div className="bg-transparent rounded-lg">
            {/* <h2>Game Results</h2> */}
            <img src={resultImageSrc} alt="Game Results" />
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg text-white p-16 my-12">
            <h2>{gameScore}</h2>
          </div>
          <div className="flex justify-evenly space-x-16 mt-4 ">
            <Button
              label="Play Again"
              onClick={handlePlayAgain}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            />
            <Button
              label="Quit"
              onClick={handleQuit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameResults;
