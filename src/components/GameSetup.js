const GameSetup = () => {
  return (
<div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
  <h1 className="text-white text-4xl font-bold leading-none mb-8">
    Game Setup
  </h1>
  <div className="flex justify-center w-full px-28">
    <div className="flex justify-between space-x-48">
      <div className="bg-white p-8">
        <h2>Player 1 Intensity</h2>
        <input type="range" min="1" max="100" />
      </div>
      <div className="bg-white p-8">
        <h2>Player 2 Intensity</h2>
        <input type="range" min="1" max="100" />
      </div>
    </div>
  </div>
    <div className="bg-white p-8 mt-28">
        <h2>Game Intensity</h2>
        <input type="range" min="1" max="100" value={'gameIntensity'} readOnly />
        {/* TODO: create conditional logic and state for Game Intensity slider that will replace value={'gameIntensity'} string with a summed variable */}
      </div>
</div>
  );
};

export default GameSetup;
