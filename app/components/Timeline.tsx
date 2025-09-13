import { useRef } from 'react';
import { usePlayer } from '../contexts/PlayerContext';

const Timeline = () => {
  const { duration, currentTime, sortedSegments, onSeek } = usePlayer();
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || duration === 0) return;

    // 計算點擊位置的百分比
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));

    // 將百分比轉換為時間
    const seekTime = clickPercent * duration;

    // 呼叫父元件的 onSeek 函式
    onSeek(seekTime);
  };

  if (duration === 0) {
    return (
      <div className='relative w-full h-2 bg-gray-600 rounded-full cursor-pointer'></div>
    );
  }

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div
      ref={timelineRef}
      onClick={handleTimelineClick}
      className='relative w-full h-2 bg-slate-300 dark:bg-gray-600 rounded-full cursor-pointer group'
    >
      {/* 高亮的精華片段 */}
      {sortedSegments.map((segment, index) => {
        const left = (segment.start / duration) * 100;
        const width = ((segment.end - segment.start) / duration) * 100;
        return (
          <div
            key={index}
            className='absolute h-full bg-blue-500 rounded-full'
            style={{ left: `${left}%`, width: `${width}%` }}
          ></div>
        );
      })}

      {/* 播放頭 (Playhead) */}
      <div
        className='playhead-container absolute top-1/2 -translate-y-1/2'
        style={{ left: `${progressPercent}%` }}
      >
        <div
          className='playhead-dot w-4 h-4 bg-red-500 rounded-full shadow-md transform -translate-x-1/2 
                     transition-transform duration-150 ease-in-out
                     group-hover:scale-110'
        />
      </div>
    </div>
  );
};

export default Timeline;
