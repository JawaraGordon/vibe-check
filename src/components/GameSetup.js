import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

const GameSetup = ({ onPlayerReady, playerOneReady, playerTwoReady }) => {
  const navigate = useNavigate();

  const togglePlayerReady = (playerNumber) => {
    if (playerNumber === 1) {
      onPlayerReady(1, !playerOneReady);
    } else if (playerNumber === 2) {
      onPlayerReady(2, !playerTwoReady);
    }
  };
  const handleQuit = () => {
    navigate('/');
  };

  // Starts countdown when both players are ready
  useEffect(() => {
    let timeoutId;
    let countdownId;
    if (playerOneReady && playerTwoReady) {
      let countdown = 3;
      countdownId = setInterval(() => {
        console.log(`Navigating in ${countdown} seconds...`);
        countdown--;
      }, 1000);
      timeoutId = setTimeout(() => {
        clearInterval(countdownId);
        navigate('/play');
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(countdownId);
    };
  }, [playerOneReady, playerTwoReady, navigate]);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
        <h1 className="text-white text-4xl font-bold leading-none mb-8">
          Game Setup
        </h1>
        <div className="flex justify-center w-full px-28">
          <div className="flex justify-between space-x-48">
            <div className="bg-white p-8">
              <h2>Player 1 Intensity</h2>
              <input type="range" min="1" max="100" />
              <Button
                label={playerOneReady ? 'Ready' : 'Confirm'}
                onClick={() => togglePlayerReady(1)}
              />
            </div>
            <div className="bg-white p-8">
              <h2>Player 2 Intensity</h2>
              <input type="range" min="1" max="100" />
              <Button
                label={playerTwoReady ? 'Ready' : 'Confirm'}
                onClick={() => togglePlayerReady(2)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 mt-28">
          <h2>Game Intensity</h2>
          <input
            type="range"
            min="1"
            max="100"
            value={'gameIntensity'}
            readOnly
          />
          <Button label="Quit" onClick={handleQuit} />
          {/* TODO: create conditional logic and state for Game Intensity slider that will replace value={'gameIntensity'} string with a summed variable */}
        </div>
      </div>
    </>
  );
};

export default GameSetup;
