import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/setup" element={
          <GameSetup 
            onPlayerReady={handlePlayerReady}
            playerOneReady={playerOneReady}
            playerTwoReady={playerTwoReady}
          />
        }/>
        <Route path="/load" element={<GameLoad />} />
        <Route
          path="/play"
          element={<GamePlay onGameScoreChange={handleGameScore} />}
        />
        <Route
          path="/results"
          element={<GameResults gameScore={gameScore} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
