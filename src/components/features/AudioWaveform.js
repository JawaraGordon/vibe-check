import { useEffect, useState, useRef, useCallback } from 'react';

const AudioWaveform = ({ src, play, onTimeUpdate }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const nodesConnectedRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Monitor song length and update after 60 seconds

  useEffect(() => {
    const audioElement = audioRef.current;

    const onTimeUpdateInternal = () => {
      if (audioElement.currentTime >= 60) {
        // This notifies the GamePlay component with song length data
        onTimeUpdate();
        // Cancel animation or canvas will throw an error
        cancelAnimationFrame(animationFrameIdRef.current);
        return;
      }
      requestAnimationFrame(onTimeUpdateInternal);
    };

    requestAnimationFrame(onTimeUpdateInternal);

    return () => {
      cancelAnimationFrame(onTimeUpdateInternal);
    };
    // Cancel canvas animation on unmount
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [onTimeUpdate]);

  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audioElement.currentTime);
      requestAnimationFrame(updateCurrentTime);
    };

    if (audioElement) {
      requestAnimationFrame(updateCurrentTime);
    }

    return () => {
      cancelAnimationFrame(updateCurrentTime);
    };
  }, []);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Exit if canvas doesn't exist
    }
    const canvasContext = canvas.getContext('2d');
    const analyserNode = analyserRef.current;

    if (!canvasContext || !analyserNode) {
      console.log('Canvas context or analyser node not available');
      return;
    }

    const audioElement = audioRef.current;
    if (!audioElement || audioElement.paused || audioElement.ended) {
      console.log('No audio');
      return;
    }

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteTimeDomainData(dataArray);

    // Clear the canvas
    canvasContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Set up the canvas for the waveform
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(147, 51, 233)';
    canvasContext.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.lineTo(canvas.width, canvas.height / 2);
    canvasContext.stroke();

    animationFrameIdRef.current = requestAnimationFrame(drawWaveform);
  }, []);

  const startAudio = () => {
    console.log('startAudio called');
    const audioContext =
      audioContextRef.current ||
      new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    console.log('AudioContext state:', audioContext.state);

    const analyser = analyserRef.current || audioContext.createAnalyser();
    analyserRef.current = analyser;
    console.log('Analyser node created:', analyser);

    const audioElement = audioRef.current;
    const sourceNode =
      sourceNodeRef.current ||
      audioContext.createMediaElementSource(audioElement);
    sourceNodeRef.current = sourceNode;

    if (!nodesConnectedRef.current) {
      sourceNode.connect(analyser);
      analyser.connect(audioContext.destination);
      nodesConnectedRef.current = true;
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  const stopAudio = useCallback(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // reset audio to start
      cancelAnimationFrame(animationFrameIdRef.current);
    }
  }, []);

  // Start or stop the audio based on the value of play
  useEffect(() => {
    const audioElement = audioRef.current;
    if (play) {
      audioElement.play();
    } else {
      stopAudio();
    }
  }, [play, stopAudio]);

  useEffect(() => {
    const audioElement = audioRef.current;
    console.log('useEffect called');

    const onPlay = () => {
      startAudio();
      animationFrameIdRef.current = requestAnimationFrame(drawWaveform);
    };

    const onPauseOrStop = () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };

    audioElement.addEventListener('play', onPlay);
    audioElement.addEventListener('pause', onPauseOrStop);
    audioElement.addEventListener('ended', onPauseOrStop);

    return () => {
      audioElement.removeEventListener('play', onPlay);
      audioElement.removeEventListener('pause', onPauseOrStop);
      audioElement.removeEventListener('ended', onPauseOrStop);
      if (nodesConnectedRef.current) {
        sourceNodeRef.current.disconnect();
        analyserRef.current.disconnect();
        nodesConnectedRef.current = false;
      }
    };

    // Cleanup the canvas animation
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current); // Also cancel here to ensure cleanup
    };

  }, [src]);

  return (
    <>
      <div>{formatTime(currentTime)}</div>
      <button onClick={startAudio}></button>
      <div className="pb-8">
        <audio ref={audioRef} controls src={src} style={{ display: 'none' }} />
      </div>
      <canvas ref={canvasRef} />
    </>
  );
};

export default AudioWaveform;
