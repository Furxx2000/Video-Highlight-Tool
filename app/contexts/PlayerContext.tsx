'use client';

import { createContext, useContext, RefObject } from 'react';

export interface PlayerContextType {
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  sortedSegments: { id: string; start: number; end: number }[];
  subtitle: string;
  onLoadedMetadata: () => void;
  onTimeUpdate: () => void;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === null) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
