'use client';

import { forwardRef } from 'react';
import { Sentence } from '@/app/lib/data';
import { formatTime } from '@/app/lib/utils';
import { useTranscript } from '@/app/contexts/TranscriptContext';

interface TranscriptSentenceProps {
  sentence: Sentence;
}

const TranscriptSentence = forwardRef<HTMLDivElement, TranscriptSentenceProps>(
  ({ sentence }, ref) => {
    const {
      selectedIds,
      activeSentenceId,
      onSentenceSelect,
      onTimestampClick,
    } = useTranscript();

    const isSelected = selectedIds.has(sentence.id);
    const isActive = sentence.id === activeSentenceId;

    const handleTimestampClick = (e: React.MouseEvent) => {
      // 關鍵一步：阻止事件冒泡，防止觸發外層 div 的 onSelect
      e.stopPropagation();
      onTimestampClick(sentence.startTime);
    };

    const baseClasses =
      'flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200';

    let stateClasses = '';

    if (isActive) {
      if (isSelected) {
        stateClasses =
          'bg-indigo-700 dark:bg-indigo-500 text-white shadow-md hover:bg-indigo-800 dark:hover:bg-indigo-400';
      } else {
        stateClasses = 'bg-indigo-50 dark:bg-slate-700';
      }
    } else {
      if (isSelected) {
        stateClasses =
          'bg-indigo-500 dark:bg-indigo-600 text-white shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-500';
      } else {
        stateClasses =
          'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-sm';
      }
    }

    return (
      <div
        ref={ref}
        onClick={() => onSentenceSelect(sentence.id)}
        className={`${baseClasses} ${stateClasses}`}
      >
        <button
          onClick={handleTimestampClick}
          className={`font-mono text-sm font-semibold rounded hover:bg-black/10 dark:hover:bg-white/10 p-1 -m-1 transition-colors cursor-pointer ${
            isSelected
              ? 'text-indigo-200 dark:text-indigo-300'
              : isActive
              ? 'text-indigo-600 dark:text-indigo-300'
              : 'text-blue-600 dark:text-blue-400'
          }`}
        >
          {formatTime(sentence.startTime)}
        </button>
        <p className={`flex-1 ${isSelected ? 'font-medium' : ''}`}>
          {sentence.text}
        </p>
      </div>
    );
  }
);

TranscriptSentence.displayName = 'TranscriptSentence';

export default TranscriptSentence;
