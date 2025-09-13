'use client';

import { forwardRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string | null;
  onLoadedMetadata: () => void;
  onTimeUpdate: () => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, onLoadedMetadata, onTimeUpdate }, ref) => {
    if (!videoUrl) {
      return (
        <div className='flex items-center justify-center w-full h-full text-center text-gray-500 dark:text-gray-400'>
          <p>Upload a video to see the preview</p>
        </div>
      );
    }

    return (
      <video
        ref={ref}
        key={videoUrl}
        src={videoUrl}
        className='w-full h-full rounded-lg'
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      />
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
