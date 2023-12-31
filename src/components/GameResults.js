import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
// import Header from '../components/common/Header';
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
      {/* <Header /> */}
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
       
        <div className="flex flex-col justify-center items-center w-full px-28">
          <div className="bg-transparent rounded-lg">
         
            <img src={resultImageSrc} alt="Game Results" />
          </div>
          <div className="flex justify-evenly items-center w-full">
  <div className="bg-transparent rounded-lg text-8xl text-white font-bold p-16 my-12">
    <h2 className="game-clock-flex" >{songTopScore}</h2>
  </div>
  <div className="bg-transparent rounded-lg text-6xl text-white font-bold p-16 my-12">
    <h2 className="game-clock-flex-secondary">{gameScore}</h2>
  </div>
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
