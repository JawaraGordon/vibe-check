import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Main from './components/Main';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import GameResults from './components/GameResults';
import GameLoad from './components/GameLoad';

function App() {
  const [gameScore, setGameScore] = useState(0);
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [resetGame, setResetGame] = useState('');
  const [songTopScore, setSongTopScore] = useState(0);
  const [playerOneIntensity, setPlayerOneIntensity] = useState(0);
  const [playerTwoIntensity, setPlayerTwoIntensity] = useState(0);
  const [gameIntensity, setGameIntensity] = useState(2);

  // Handle gameIntensity
  useEffect(() => {
    const calculatedIntensity = Math.floor(
      (parseInt(playerOneIntensity) + parseInt(playerTwoIntensity)) / 2
    );
    setGameIntensity(calculatedIntensity);
  }, [playerOneIntensity, playerTwoIntensity]);

  const handleGameReset = () => {
    setResetGame(true);
  };

  const handleGameScore = (score) => {
    setGameScore(score);
  };

  const handlePlayerReady = (playerNumber, isReady) => {
    if (playerNumber === 1) {
      setPlayerOneReady(isReady);
    } else if (playerNumber === 2) {
      setPlayerTwoReady(isReady);
    }
  };

  const resetPlayerButtons = () => {
    setPlayerOneReady(false);
    setPlayerTwoReady(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/setup"
          element={
            <GameSetup
            onPlayerReady={handlePlayerReady}
              playerOneReady={playerOneReady}
              playerTwoReady={playerTwoReady}
              gameIntensity={gameIntensity}
              setGameIntensity={setGameIntensity}
              playerOneIntensity={playerOneIntensity}
              setPlayerOneIntensity={setPlayerOneIntensity}
              playerTwoIntensity={playerTwoIntensity}
              setPlayerTwoIntensity={setPlayerTwoIntensity}
            />
          }
        />
        <Route path="/load" element={<GameLoad />} />
        <Route
          path="/play"
          element={
            <GamePlay
              onGameScoreChange={handleGameScore}
              onGameReset={handleGameReset}
              resetGame={resetGame}
              setSongTopScore={setSongTopScore}
              gameIntensity={gameIntensity}
            />
          }
        />
        <Route
          path="/results"
          element={
            <GameResults
              gameScore={gameScore}
              resetGame={resetGame}
              onReset={resetPlayerButtons}
              onGameRestart={handleGameReset}
              songTopScore={songTopScore}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
