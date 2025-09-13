'use client';

import { usePlayer } from '@/app/contexts/PlayerContext';
import { SkipForwardIcon } from '../Icons';

const SkipForwardButton = () => {
  const { onSkipForward } = usePlayer();
  return (
    <button
      onClick={onSkipForward}
      className='hover:opacity-80 transition-opacity cursor-pointer text-gray-600 dark:text-gray-300'
      aria-label='Skip to next segment'
    >
      <SkipForwardIcon />
    </button>
  );
};

export default SkipForwardButton;
