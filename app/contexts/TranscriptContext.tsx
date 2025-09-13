'use client';

import { createContext, useContext } from 'react';
import { TranscriptData } from '@/app/lib/data';

export interface TranscriptContextType {
  transcript: TranscriptData | null;
  selectedIds: Set<string>;
  activeSentenceId: string | null;
  onSentenceSelect: (id: string) => void;
  onTimestampClick: (time: number) => void;
}

export const TranscriptContext = createContext<TranscriptContextType | null>(
  null
);

export const useTranscript = () => {
  const context = useContext(TranscriptContext);
  if (context === null) {
    throw new Error('useTranscript must be used within a TranscriptProvider');
  }
  return context;
};
