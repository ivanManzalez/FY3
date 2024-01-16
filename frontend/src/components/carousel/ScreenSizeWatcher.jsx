import React, { useEffect, useState } from 'react';

const ScreenSizeWatcher = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Debounce function to limit the frequency of updates
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach the event listener with debouncing
    const debouncedHandleResize = debounce(handleResize, 10);
    window.addEventListener('resize', debouncedHandleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return screenSize;
};




export default ScreenSizeWatcher;
