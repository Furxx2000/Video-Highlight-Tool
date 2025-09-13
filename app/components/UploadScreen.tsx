// app/components/UploadScreen.tsx
'use client';

import { useRef } from 'react';
import { UploadIcon } from './Icons';
import { Toast } from '@/app/lib/toastManager';

interface UploadScreenProps {
  onVideoUpload: (file: File) => void;
}

export default function UploadScreen({ onVideoUpload }: UploadScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    if (files.length > 1) {
      Toast.error('Please upload only one file at a time.');
      // 清空 input 的值，以便使用者可以立即重新選擇同一個檔案
      event.target.value = '';
      return;
    }

    const file = files[0];

    if (!file.type.startsWith('video/')) {
      Toast.error('Invalid file type. Please upload a video file.');
      event.target.value = '';
      return;
    }

    onVideoUpload(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className='flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-900'>
      <div className='w-full max-w-lg mx-auto text-center p-8'>
        <div className='flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-2xl'>
          <div className='flex justify-center'>
            <UploadIcon />
          </div>

          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Upload your video
          </h1>
          <p className='text-gray-500 dark:text-gray-400 mb-6'>
            Select a video file to start creating highlights.
          </p>

          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='video/*'
            className='hidden'
            multiple={false}
          />

          <button
            onClick={handleButtonClick}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer'
          >
            Choose File
          </button>
        </div>
      </div>
    </main>
  );
}
