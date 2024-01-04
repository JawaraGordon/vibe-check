import { useState, useEffect } from 'react';
import AudioWaveform from './features/AudioWaveform.js';
import TestSong from '../assets/audio/Dimensions.mp3';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const songVibeArray = [
    "chill",
    "downtempo",
    "wavy",
    "relaxing",
    "soothing",
    "mellow",
    "serene",
    "ambient",
    "atmospheric",
    "smooth",
    "tranquil",
    "laid-back",
    "groovy",
    "ethereal",
    "dreamy",
    "soft",
    "jazzy",
    "melodic",
    "harmonic",
    "rhythmic",
    "synthy",
    "deep",
    "lo-fi",
    "vibey",
    "spacey",
    "minimal",
    "sultry",
    "moody",
    "flowing",
    "lush",
    "meditative",
    "introspective",
    "gentle",
    "subdued",
    "funky",
    "beat-driven",
    "soulful",
    "downbeat",
    "syncopated",
    "electronic",
    "echoing",
    "reverberating",
    "hypnotic",
    "subtle",
    "dynamic",
    "velvety",
    "warm",
    "cool",
    "breezy",
    "airy",
    "whimsical",
    "nostalgic",
    "contemplative",
    "pensive",
    "steady",
    "slow-paced",
    "mystical",
    "enigmatic",
    "nebulous",
    "muted",
    "faded",
    "blurry",
    "shadowy",
    "hazy",
    "misty",
    "saturated",
    "desaturated",
    "monochromatic",
    "colorful",
    "bright",
    "dark",
    "vivid",
    "pastel",
    "neon",
    "gloomy",
    "glowing",
    "shimmering",
    "sparkling",
    "twinkling",
    "glistening",
    "reflective",
    "glittering",
    "sleek",
    "polished",
    "refined",
    "classy",
    "stylish",
    "tasteful",
    "trendy",
    "hip",
    "cool",
    "in-vogue",
    "fashionable",
    "retro",
    "vintage",
    "timeless",
    "classic",
    "ageless",
    "evergreen",
    "modern",
    "contemporary",
    "futuristic",
    "ahead-of-time",
    "progressive",
    "innovative",
    "cutting-edge",
    "avant-garde",
    "experimental",
    "unconventional",
    "unique",
    "distinctive",
    "idiosyncratic",
    "individualistic",
    "quirky",
    "eccentric",
    "unorthodox",
    "offbeat",
    "outlandish",
    "exotic",
    "foreign",
    "alien",
    "otherworldly",
    "supernatural",
    "celestial",
    "cosmic",
    "interstellar",
    "galactic",
    "astral",
    "stellar",
    "planetary",
    "solar",
    "lunar",
    "starlit",
    "moonlit",
    "radiant",
    "luminous",
    "lustrous",
    "incandescent",
    "candescent",
    "fiery",
    "glowing",
    "ablaze",
    "flickering",
    "flaming",
    "burning",
    "scorching",
    "sizzling",
    "hot",
    "warm",
    "toasty",
    "snug",
    "cozy",
    "comfortable",
    "welcoming",
    "homey",
    "domestic",
    "familiar",
    "friendly",
    "inviting",
    "alluring",
    "appealing",
    "charming",
    "captivating",
    "enchanting",
    "bewitching",
    "mesmerizing",
    "spellbinding",
    "entrancing",
    "seductive",
    "irresistible",
    "all-consuming",
    "engrossing",
    "absorbing",
    "compelling",
    "fascinating",
    "riveting",
    "gripping",
    "enthralling",
    "intoxicating",
    "addictive",
    "habit-forming",
    "unforgettable",
    "memorable",
    "noteworthy",
    "remarkable",
    "impressive",
    "striking",
    "sensational",
    "phenomenal",
    "extraordinary",
    "incredible",
    "unbelievable",
    "astonishing",
    "amazing",
    "wondrous",
    "marvelous",
    "spectacular",
    "magnificent",
    "grand",
    "majestic"
  ];

const GamePlay = () => {
  const [playerOneInput, setPlayerOneInput] = useState('');
  const [playerTwoInput, setPlayerTwoInput] = useState('');
  const [playerOneInputs, setPlayerOneInputs] = useState([]);
  const [playerTwoInputs, setPlayerTwoInputs] = useState([]);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [lastScoredWordPlayerOne, setLastScoredWordPlayerOne] = useState('');
  const [lastScoredWordPlayerTwo, setLastScoredWordPlayerTwo] = useState('');
  let gameScore = playerOneScore + playerTwoScore

  const debouncedPlayerOneInput = useDebounce(playerOneInput, 1000);
  const debouncedPlayerTwoInput = useDebounce(playerTwoInput, 1000);

  useEffect(() => {
    // console.log('debouncedPlayerOneInput:', debouncedPlayerOneInput);
    // console.log('playerOneInputs:', playerOneInputs);
    // console.log('playerTwoInputs:', playerTwoInputs);
    if (debouncedPlayerOneInput && !playerOneInputs.includes(debouncedPlayerOneInput) && !playerTwoInputs.includes(debouncedPlayerOneInput)) {
      setPlayerOneInputs((prevInputs) => [...prevInputs, debouncedPlayerOneInput]);
      setPlayerOneInput('');
    }
  }, [debouncedPlayerOneInput, playerOneInputs, playerTwoInputs]);
  
  useEffect(() => {
    // console.log('debouncedPlayerTwoInput:', debouncedPlayerTwoInput);
    // console.log('playerTwoInputs:', playerTwoInputs);
    // console.log('playerOneInputs:', playerOneInputs);
    if (debouncedPlayerTwoInput && !playerTwoInputs.includes(debouncedPlayerTwoInput) && !playerOneInputs.includes(debouncedPlayerTwoInput)) {
      setPlayerTwoInputs((prevInputs) => [...prevInputs, debouncedPlayerTwoInput]);
      setPlayerTwoInput('');
    }
  }, [debouncedPlayerTwoInput, playerTwoInputs, playerOneInputs]);

useEffect(() => {
    const isSongInVibeArray = (word) => songVibeArray.includes(word);
    const isWordNew = (word, wordArray) => wordArray.lastIndexOf(word) === wordArray.length - 1;

    const lastWordPlayerOne = playerOneInputs[playerOneInputs.length - 1];
    const lastWordPlayerTwo = playerTwoInputs[playerTwoInputs.length - 1];

    if (lastWordPlayerOne !== lastScoredWordPlayerOne && isSongInVibeArray(lastWordPlayerOne) && isWordNew(lastWordPlayerOne, playerOneInputs)) {
      setPlayerOneScore((prevScore) => prevScore + 1);
      setLastScoredWordPlayerOne(lastWordPlayerOne);
    }

    if (lastWordPlayerTwo !== lastScoredWordPlayerTwo && isSongInVibeArray(lastWordPlayerTwo) && isWordNew(lastWordPlayerTwo, playerTwoInputs)) {
      setPlayerTwoScore((prevScore) => prevScore + 1);
      setLastScoredWordPlayerTwo(lastWordPlayerTwo);
    }
  }, [playerOneInputs, playerTwoInputs]);

  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
      <h1 className="text-white text-4xl font-bold leading-none mb-8">
        Game Play
      </h1>
      <div className="flex flex-col justify-center items-center w-full px-28">
        <div className="bg-white p-8 mb-8">
        <div className="flex flex-col justify-center items-center">
  <div className="text-3xl font-bold">{gameScore}</div>
</div>

          <AudioWaveform src={TestSong} />
        </div>
        <div className="flex justify-between space-x-48">
      <div className="bg-purple-600 p-8">
        <p className="mt-2 text-white">{playerOneInputs[playerOneInputs.length - 1]}</p>
        <label htmlFor="playerOneInput" className="block text-lg font-medium text-gray-700">Player One</label>
        <input id="playerOneInput" type="text" value={playerOneInput} onChange={(e) => setPlayerOneInput(e.target.value)} className="mt-1 block w-full" />
      </div>
      <div className="bg-blue-600 p-8">
        <p className="mt-2 text-white">{playerTwoInputs[playerTwoInputs.length - 1]}</p>
        <label htmlFor="playerTwoInput" className="block text-lg font-medium text-gray-700">Player Two</label>
        <input id="playerTwoInput" type="text" value={playerTwoInput} onChange={(e) => setPlayerTwoInput(e.target.value)} className="mt-1 block w-full" />
      </div>
    </div>
      </div>
    </div>
    
      );
    };
    
    export default GamePlay;
