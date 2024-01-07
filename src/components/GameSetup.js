import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import CountdownModal from '../components/utils/CountdownModal';
import SongIntensity from '../../src/assets/images/game-setup.png';

const GameSetup = ({
  onPlayerReady,
  playerOneReady,
  playerTwoReady,
  gameIntensity, 
  setPlayerOneIntensity,
  setPlayerTwoIntensity,
  playerOneIntensity, 
  playerTwoIntensity  
}) => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  

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
  // useEffect(() => {
  //   let timeoutId;
  //   let countdownId;
  //   if (playerOneReady && playerTwoReady) {
  //     let countdown = 3;
  //     countdownId = setInterval(() => {
  //       console.log(`Navigating in ${countdown} seconds...`);
  //       countdown--;
  //     }, 1000);
  //     timeoutId = setTimeout(() => {
  //       clearInterval(countdownId);
  //       navigate('/play');
  //     }, 3000);
  //   }

  //   return () => {
  //     clearTimeout(timeoutId);
  //     clearInterval(countdownId);
  //   };
  // }, [playerOneReady, playerTwoReady, navigate]);

  useEffect(() => {
    let timeoutId;
    if (playerOneReady && playerTwoReady) {
      setShowModal(true); // Show the modal
      let countdownValue = 3;
      setCountdown(countdownValue);

      const countdownId = setInterval(() => {
        countdownValue--;
        setCountdown(countdownValue);
      }, 1000);

      timeoutId = setTimeout(() => {
        clearInterval(countdownId);
        setShowModal(false); 
        navigate('/play');
      }, 3000);
    }

    return () => {
      // clearTimeout(timeoutId);
      // clearInterval(countdownId);
    };
  }, [playerOneReady, playerTwoReady, navigate]);

  return (
    <>
     {showModal && <CountdownModal countdown={countdown} />}
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
        <div className="mb-8">
          <img src={SongIntensity} alt="Song Intensity Logo" />
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly items-center w-full px-28">
          <div className="bg-purple-600 p-8 rounded-lg text-white flex flex-col items-center mb-8 md:mb-0">
            <h2>Player 1 Intensity</h2>
            <input
              className="mb-4"
              type="range"
              min="1"
              max="4"
              value={playerOneIntensity}
              onChange={(e) => setPlayerOneIntensity(e.target.value)}
            />
            <Button
              label={playerOneReady ? 'Ready' : 'Confirm'}
              onClick={() => togglePlayerReady(1)}
            />
          </div>
          <div className="bg-blue-600 p-8 rounded-lg text-white flex flex-col items-center">
            <h2>Player 2 Intensity</h2>
            <input
              className="mb-4"
              type="range"
              min="1"
              max="4"
              value={playerTwoIntensity}
              onChange={(e) => setPlayerTwoIntensity(e.target.value)}
            />
            <Button
              label={playerTwoReady ? 'Ready' : 'Confirm'}
              onClick={() => togglePlayerReady(2)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-8 text-white rounded-lg mt-8 flex flex-col items-center">
          <h2>Game Intensity</h2>
          <input
            className="mb-4"
            type="range"
            min="1"
            max="4"
            value={gameIntensity}
            readOnly
          />
          <Button label="Main Menu" onClick={handleQuit} />
        </div>
      </div>
    </>
  );
};

export default GameSetup;
