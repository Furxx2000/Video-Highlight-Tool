'use client';

import { usePlayer } from '@/app/contexts/PlayerContext';
import { SkipBackIcon } from '../Icons';

const SkipBackButton = () => {
  const { onSkipBack } = usePlayer();

  return (
    <button
      onClick={onSkipBack}
      className='hover:opacity-80 transition-opacity cursor-pointer text-gray-600 dark:text-gray-300'
      aria-label='Skip to previous segment'
    >
      <SkipBackIcon />
    </button>
  );
};

export default SkipBackButton;
