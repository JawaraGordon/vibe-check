import React, { useEffect, useRef, useCallback } from 'react';

const AudioWaveform = ({ src }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const nodesConnectedRef = useRef(false);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    const analyserNode = analyserRef.current;

    if (!canvasContext || !analyserNode) {
      console.log('Canvas context or analyser node not available');
      return;
    }

    const audioElement = audioRef.current;
    if (!audioElement || audioElement.paused || audioElement.ended) {
      console.log('Audio is not playing');
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
  }, [src]);

  return (
    <>
      <button onClick={startAudio}></button>
      <div className="pb-8">
      <audio ref={audioRef} controls src={src} />
      </div>
      <canvas ref={canvasRef} />
    </>
  );
};

export default AudioWaveform;
