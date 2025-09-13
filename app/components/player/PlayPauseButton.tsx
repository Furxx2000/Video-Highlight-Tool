'use client';

import { usePlayer } from '@/app/contexts/PlayerContext';
import { PlayButtonIcon, PauseButtonIcon } from '../Icons';

const PlayPauseButton = () => {
  const { isPlaying, onTogglePlay } = usePlayer();

  return (
    <button
      onClick={onTogglePlay}
      className='hover:opacity-80 transition-opacity cursor-pointer text-gray-800 dark:text-white'
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? <PauseButtonIcon /> : <PlayButtonIcon />}
    </button>
  );
};

export default PlayPauseButton;
