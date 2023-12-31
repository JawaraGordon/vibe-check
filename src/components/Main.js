import Button from '../components/common/Button';
import Scoreboard from '../components/common/Scoreboard';

const Main = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
    <Scoreboard/>
        <h1 className="text-white text-4xl font-bold leading-none mb-8">
          Vibe Check
        </h1>
        <div className="flex flex-row justify-evenly items-center w-full max-w-xs">
          <Button label="Start" onClick={() => {}} />
          <Button label="Exit" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};

export default Main;
