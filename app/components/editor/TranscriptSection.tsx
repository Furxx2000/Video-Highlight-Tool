'use client';

import { Section } from '@/app/lib/data';
import TranscriptSentence from './TranscriptSentence';
import { useEffect, useRef, createRef } from 'react';
import { useTranscript } from '@/app/contexts/TranscriptContext';

interface TranscriptSectionProps {
  section: Section;
}

export default function TranscriptSection({ section }: TranscriptSectionProps) {
  const { activeSentenceId } = useTranscript();

  const sentenceRefs = useRef<
    Record<string, React.RefObject<HTMLDivElement | null>>
  >({});
  section.sentences.forEach((sentence) => {
    if (!sentenceRefs.current[sentence.id]) {
      sentenceRefs.current[sentence.id] = createRef<HTMLDivElement>();
    }
  });

  useEffect(() => {
    if (activeSentenceId && sentenceRefs.current[activeSentenceId]) {
      const activeElement = sentenceRefs.current[activeSentenceId].current;
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [activeSentenceId]);

  return (
    <div className='mb-6'>
      <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sticky top-0 bg-gray-50 dark:bg-slate-900 py-2'>
        {section.title}
      </h3>
      <div className='space-y-2'>
        {section.sentences.map((sentence) => (
          <TranscriptSentence
            key={sentence.id}
            ref={sentenceRefs.current[sentence.id]}
            sentence={sentence}
          />
        ))}
      </div>
    </div>
  );
}
