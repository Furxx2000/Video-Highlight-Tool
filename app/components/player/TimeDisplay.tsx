import { usePlayer } from '@/app/contexts/PlayerContext';
import { formatTime } from '@/app/lib/utils';

const TimeDisplay = () => {
  const { currentTime, duration } = usePlayer();
  return (
    <div className='font-mono text-sm text-gray-600 dark:text-gray-300'>
      <span>{formatTime(currentTime)}</span>
      <span className='text-gray-400 dark:text-gray-500'> / </span>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default TimeDisplay;
