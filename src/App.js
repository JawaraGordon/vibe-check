import './App.css';
import './index.css';
import Main from './components/Main';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import GameResults from './components/GameResults';
import GameLoad from './components/GameLoad';

function App() {
  return (
    <>
      <Main />
      <GameSetup />
      <GamePlay />
      <GameLoad />
      <GameResults />
    </>
  );
}

export default App;
