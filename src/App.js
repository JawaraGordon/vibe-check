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

  const handleGameScore = (gameScore) => {
    setGameScore(gameScore);
  };

  return (
    <>
      <Main />
      <GameSetup />
      <GameLoad />
      <GamePlay onGameScoreChange={handleGameScore}/>
      <GameResults gameScore={gameScore}/>
    </>
  );
}

export default App;
