import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Timer = forwardRef((props, ref) => {
  const SEC_IN_MS = 10;
  const MIN_IN_SEC = 60*SEC_IN_MS;
  const HR_IN_MIN = 60*MIN_IN_SEC;

  const [isRunning, setIsRunning] = useState(false);
  const initialTime = 0.2*MIN_IN_SEC;
  const [currentTime, setCurrentTime] = useState(initialTime);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const toggleTimer = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const updateTimer = () => {
    setCurrentTime(currentTime - 1);
    if (currentTime-1 === 0) {
      pauseTimer();
    } 
  };

  const resetTimer = () => {
    setCurrentTime(initialTime);
  };

  useInterval(updateTimer, isRunning ? 100 : null); // 1000 ms = 1 s

  const handleTimerClick = () => {
    toggleTimer();
  };

  const formatTime = (time) => {
    const hours    = Math.floor( time / HR_IN_MIN );
    time = time - hours*HR_IN_MIN
    const minutes  = Math.floor( time / MIN_IN_SEC );
    time = time - minutes*MIN_IN_SEC
    const seconds  = Math.floor( time /  SEC_IN_MS );
    time = time - seconds*SEC_IN_MS
    const millisec  =  time ;


    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millisec.toString().padStart(1, '0')}`;
    //
  };
  useImperativeHandle(ref, () => ({
    startTimer,
    resetTimer,
    pauseTimer,
  }));

  return (
    <div className="">
      <div id="timer" onClick={toggleTimer} >{formatTime(currentTime)}</div>
    </div>
  );
});

export default Timer;
