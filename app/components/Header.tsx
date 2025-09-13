'use client';

import { ArrowLeftIcon } from './Icons';

interface HeaderProps {
  onReset: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className='bg-white dark:bg-slate-800 p-3 shadow-sm w-full flex-shrink-0 border-b border-gray-200 dark:border-slate-700'>
      <div className='flex items-center'>
        <button
          onClick={onReset}
          className='flex items-center gap-2 text-sm font-medium 
                     px-3 py-1.5 rounded-md transition-colors
                     text-gray-700 bg-gray-100 hover:bg-gray-200 
                     dark:text-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer'
        >
          <ArrowLeftIcon className='w-4 h-4' />
          Upload New Video
        </button>
      </div>
    </header>
  );
}
