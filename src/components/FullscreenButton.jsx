import React, { useState } from 'react';
import fullscreenIcon from '../assets/icons/Fullscreen.svg';

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <button
      className="bg-blue-200 hover:bg-blue-300 text-white font-bold py-2 px-2 rounded-full"
      onClick={toggleFullscreen}
    >
      <img
        src={fullscreenIcon}
        alt={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        className="h-5 w-5"
      />
    </button>
  );
};

export default FullscreenButton;