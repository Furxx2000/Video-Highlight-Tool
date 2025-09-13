import React, { RefObject } from 'react';
import Timeline from './Timeline';
import PlayPauseButton from './player/PlayPauseButton';
import SkipBackButton from './player/SkipBackButton';
import SkipForwardButton from './player/SkipForwardButton';
import TimeDisplay from './player/TimeDisplay';
import SubtitleOverlay from './player/SubtitleOverlay';
import VideoPlayer from './player/VideoPlayer';
import { usePlayer } from '../contexts/PlayerContext';

interface PreviewPanelProps {
  videoUrl: string | null;
}

const PreviewPanel = ({ videoUrl }: PreviewPanelProps) => {
  const { videoRef, subtitle, onLoadedMetadata, onTimeUpdate } = usePlayer();

  return (
    <div className='bg-slate-100 dark:bg-black p-4 md:p-6 flex flex-col h-full'>
      <h2 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>
        Preview
      </h2>
      <div className='flex-grow flex flex-col justify-center'>
        <div className='relative w-full aspect-video bg-gray-950 rounded-lg flex items-center justify-center'>
          {/* 影片播放器 */}
          <VideoPlayer
            ref={videoRef}
            videoUrl={videoUrl}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
          />

          {/* 字幕 */}
          <SubtitleOverlay subtitle={subtitle} />
        </div>

        {/* 自訂控制列 */}
        <div className='mt-4'>
          <Timeline />
          <div className='flex items-center justify-between text-white mt-3 px-2'>
            <div className='flex items-center gap-4'>
              <SkipBackButton />
              <PlayPauseButton />
              <SkipForwardButton />
            </div>
            <TimeDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PreviewPanel);
