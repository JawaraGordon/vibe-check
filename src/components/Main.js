import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
// import Header from '../components/common/Header';
import Modal from './utils/HelpModal';
import VibeLogo from '../../src/assets/images/vibe-check-logo.png';
import Silence from '../../src/assets/audio/silence-30-seconds.mp3';

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const gameInstructions = `Game Start & Setup:

Start your neon-drenched, musical journey by pressing "Start". Set the game's intensity using the slider to influence song tempo and vibe.

Gameplay:

Collaboratively type words matching the song's vibe to score points. Avoid repeating words or using your teammate's words. You have 60 seconds to match or beat the top score for the chosen song!

Game Results & Intensity Selection:

Check your scores and see if you've matched the right vibes. Decide to start a new round or quit. Refine your game experience by adjusting the intensity for the next round based on your previous gameplay.`;

  const audioElement = document.createElement('audio');

  audioElement.id = 'initGameAudioPlayer';

  // Mocking the audio source
  audioElement.src = { Silence };
  document.body.appendChild(audioElement);
  // console.log('initGameAudioPlayer', audioElement);

  if (audioElement) {
    audioElement.load();
  }

  const handleStartClick = () => {
    const audioToRemove = document.getElementById('initGameAudioPlayer');
    if (audioToRemove) {
      audioToRemove.pause();
      audioToRemove.remove();
    }

    navigate('/setup');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
        <div className="mb-8 z-10">
          <img src={VibeLogo} alt="Vibe Logo" />
        </div>
        <div className="flex flex-row justify-evenly items-center w-full max-w-xs">
          <Button label="Start" onClick={handleStartClick} />
          <Button label="Help" onClick={toggleModal} />
        </div>
      </div>
      {showModal && <Modal text={gameInstructions} onClose={toggleModal} />}

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Main;
