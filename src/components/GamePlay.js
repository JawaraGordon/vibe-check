import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import sqlstring from 'sqlstring';
import AudioWaveform from './features/AudioWaveform.js';
import Dimensions from '../assets/audio/Dimensions.mp3';
import Vibes from '../assets/audio/VIBES.mp3';
import NeonDreams from '../assets/audio/Neon Dreams.mp3';
import DownUnder from '../assets/audio/Down Under.mp3';

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

const sanitizeInputs = (input) => {
  // Added typechecking to prevent undefined type errors
  if (typeof input !== 'string') {
    return input;
  }
  const trimmedInput = input.trim();
  const onlyStrings = trimmedInput.replace(/[^a-zA-Z ]/g, '').toLowerCase();
  const sanitizedHTML = DOMPurify.sanitize(onlyStrings);
  const sanitizedSQL = sqlstring.escape(sanitizedHTML);
  return sanitizedSQL.slice(1, -1);
};

// Added default func to prevent testing type  errors
const GamePlay = ({ setSongTopScore, resetGame, onGameReset, onGameScoreChange = () => {} }) => {
  const [playerOneInput, setPlayerOneInput] = useState('');
  const [playerTwoInput, setPlayerTwoInput] = useState('');
  const [playerOneInputs, setPlayerOneInputs] = useState([]);
  const [playerTwoInputs, setPlayerTwoInputs] = useState([]);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [lastScoredWordPlayerOne, setLastScoredWordPlayerOne] = useState('');
  const [lastScoredWordPlayerTwo, setLastScoredWordPlayerTwo] = useState('');
  const [songsVibeArray, setSongsVibeArray] = useState([]);

  const [gameSong, setGameSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  let gameScore = playerOneScore + playerTwoScore;
  const dimensionsSong = Dimensions;
  const vibesSong = Vibes;
  const neonDreamsSong = NeonDreams;
  const downUnderSong = DownUnder;
  const gameSongs = {
    dimensionsSong,
    vibesSong,
    neonDreamsSong,
    downUnderSong
  };

  //   Handle resetting audio at game restart
  useEffect(() => {
    console.log('RESET GAME');
    setGameSong('');
    setIsPlaying(false);
  }, [resetGame]);

  // Fetch songVibeArray descriptions using a switch statement
  useEffect(() => {
    const fetchSongVibeArray = async () => {
      try {
        const response = await fetch('../data/song-archive.json');
        if (!response.ok) {
          throw new Error('Server error: Please try again.');
        }
        const data = await response.json();

        console.log('Vibe Array', data);

        // Log the names of each song
        data.forEach((song) => {
          console.log('SONG URL', song.url);
        });

        data.forEach((song) => {
          console.log('SONG topscore', song.topscore);
        });

        // TODO create logic to take the average player intesity number and choose a song from the dataset that matches

        const randomNum = Math.floor(Math.random() * 4) + 1;

        switch (randomNum) {
          case 1:
            setGameSong(gameSongs.dimensionsSong);
            console.log('Switch case 1:', gameSongs.dimensionsSong);
            setSongsVibeArray(data[0].description);
            setSongTopScore(data[0].topscore)
            break;
          case 2:
            setGameSong(gameSongs.vibesSong);
            console.log('Switch case 1:', gameSongs.vibesSong);
            setSongsVibeArray(data[1].description);
            setSongTopScore(data[1].topscore)
            break;
          case 3:
            setGameSong(gameSongs.neonDreamsSong);
            console.log('Switch case 1:', gameSongs.neonDreamsSong);
            setSongsVibeArray(data[2].description);
            setSongTopScore(data[2].topscore)
            break;
          case 4:
            setGameSong(gameSongs.downUnderSong);
            console.log('Switch case 1:', gameSongs.downUnderSong);
            setSongsVibeArray(data[3].description);
            setSongTopScore(data[3].topscore)
            break;
          default:
            console.log('No song available.');
        }
      } catch (error) {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      }
    };

    fetchSongVibeArray();
  }, []);

  const handleGameEnd = () => {
    setGameSong('');
    setIsPlaying(false);
    navigate('/results');
  };

  // Handling and debouncing player inputs
  useEffect(() => {
    let gameScore = playerOneScore + playerTwoScore;
    onGameScoreChange(gameScore);
  }, [playerOneScore, playerTwoScore]);
  const debouncedPlayerOneInput = useDebounce(playerOneInput, 1000);
  const debouncedPlayerTwoInput = useDebounce(playerTwoInput, 1000);

  useEffect(() => {
    // console.log('debouncedPlayerOneInput:', debouncedPlayerOneInput);
    // console.log('playerOneInputs:', playerOneInputs);
    // console.log('playerTwoInputs:', playerTwoInputs);
    if (
      debouncedPlayerOneInput &&
      !playerOneInputs.includes(debouncedPlayerOneInput) &&
      !playerTwoInputs.includes(debouncedPlayerOneInput)
    ) {
      setPlayerOneInputs((prevInputs) => [
        ...prevInputs,
        debouncedPlayerOneInput
      ]);
      setPlayerOneInput('');
    }
  }, [debouncedPlayerOneInput, playerOneInputs, playerTwoInputs]);

  useEffect(() => {
    // console.log('debouncedPlayerTwoInput:', debouncedPlayerTwoInput);
    // console.log('playerTwoInputs:', playerTwoInputs);
    // console.log('playerOneInputs:', playerOneInputs);
    if (
      debouncedPlayerTwoInput &&
      !playerTwoInputs.includes(debouncedPlayerTwoInput) &&
      !playerOneInputs.includes(debouncedPlayerTwoInput)
    ) {
      setPlayerTwoInputs((prevInputs) => [
        ...prevInputs,
        debouncedPlayerTwoInput
      ]);
      setPlayerTwoInput('');
    }
  }, [debouncedPlayerTwoInput, playerTwoInputs, playerOneInputs]);

  useEffect(() => {
    const isSongInVibeArray = (word) => songsVibeArray.includes(word);
    const isWordNew = (word, wordArray) =>
      wordArray.lastIndexOf(word) === wordArray.length - 1;

    const lastWordPlayerOne = playerOneInputs[playerOneInputs.length - 1];
    const lastWordPlayerTwo = playerTwoInputs[playerTwoInputs.length - 1];

    if (
      lastWordPlayerOne !== lastScoredWordPlayerOne &&
      isSongInVibeArray(lastWordPlayerOne) &&
      isWordNew(lastWordPlayerOne, playerOneInputs)
    ) {
      setPlayerOneScore((prevScore) => prevScore + 1);
      setLastScoredWordPlayerOne(lastWordPlayerOne);
    }

    if (
      lastWordPlayerTwo !== lastScoredWordPlayerTwo &&
      isSongInVibeArray(lastWordPlayerTwo) &&
      isWordNew(lastWordPlayerTwo, playerTwoInputs)
    ) {
      setPlayerTwoScore((prevScore) => prevScore + 1);
      setLastScoredWordPlayerTwo(lastWordPlayerTwo);
    }
  }, [playerOneInputs, playerTwoInputs]);

  useEffect(() => {
    // This effect runs when `isPlaying` or `gameSong` changes.
    // If `isPlaying` is false or `gameSong` is reset, it ensures audio is stopped/cleared.
    const audioElement = document.getElementById('audioElementId');
    if (!isPlaying || !gameSong) {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    }
  }, [isPlaying]);


  // Had to put this logic inside of a side effect with a timer to fix an event bubbling / async error loading the song too quickly
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if gameSong has a value and set isPlaying
      if (gameSong && gameSong.length > 0) {
        console.log('This is the gameSong', gameSong);
        setIsPlaying(true);
      } else {
        console.log('RESET GAME - Clearing gameSong');
        setGameSong('');
        setIsPlaying(false);
      }
    }, 1000);

    // Clear timer when component unmounts or when gameSong changes
    return () => clearTimeout(timer);
  }, [gameSong]);

  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
      <h1 className="text-white text-4xl font-bold leading-none mb-8">
        Game Play
      </h1>
      <div className="flex flex-col justify-center items-center w-full px-28">
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-8 mb-8 rounded-lg">
          <div className="flex flex-col justify-center items-center">
            <div className="text-3xl font-bold ">{gameScore}</div>
          </div>

          {gameSong && (
            <AudioWaveform
              src={gameSong}
              play={isPlaying}
              onTimeUpdate={handleGameEnd}
              id="audioElementId"
            />
          )}
        </div>
        <div className="flex justify-between space-x-48">
          <div className="bg-purple-600 p-8 rounded-lg">
            <p className="mt-2 text-white">
              {playerOneInputs[playerOneInputs.length - 1]}
            </p>
            <label
              htmlFor="playerOneInput"
              className="block text-lg font-medium text-gray-700"
            >
              Player One
            </label>
            <input
              id="playerOneInput"
              type="text"
              value={playerOneInput}
              onChange={(e) =>
                setPlayerOneInput(sanitizeInputs(e.target.value))
              }
              maxLength={20}
              className="mt-1 block w-full"
            />
          </div>
          <div className="bg-blue-600 p-8 rounded-lg">
            <p className="mt-2 text-white">
              {playerTwoInputs[playerTwoInputs.length - 1]}
            </p>
            <label
              htmlFor="playerTwoInput"
              className="block text-lg font-medium text-gray-700"
            >
              Player Two
            </label>
            <input
              id="playerTwoInput"
              type="text"
              value={playerTwoInput}
              onChange={(e) =>
                setPlayerTwoInput(sanitizeInputs(e.target.value))
              }
              maxLength={20}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
