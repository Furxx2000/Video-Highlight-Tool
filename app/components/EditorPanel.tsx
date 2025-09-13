'use client';

import React from 'react';
import TranscriptSection from './editor/TranscriptSection';
import DemoNote from './editor/DemoNote';
import { useTranscript } from '../contexts/TranscriptContext';

const EditorPanel = () => {
  const { transcript } = useTranscript();

  if (!transcript) {
    return (
      <div className='bg-gray-50 dark:bg-neutral-800 p-6 flex flex-col h-full items-center justify-center'>
        <p className='text-gray-500 dark:text-gray-400'>
          No transcript data available.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 dark:bg-slate-900 p-6 flex flex-col h-full text-gray-900 dark:text-gray-200'>
      <h2 className='text-2xl font-bold mb-2'>Transcript</h2>

      <DemoNote />

      <div className='flex-grow overflow-y-auto pr-2'>
        {transcript.sections.map((section) => (
          <TranscriptSection key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(EditorPanel);
