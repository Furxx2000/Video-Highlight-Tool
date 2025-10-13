'use client';

import { useEffect } from 'react';
import { CloseIcon, ErrorIcon, SuccessIcon } from './Icons';
import { TOAST_DURATION } from '../lib/constants';

export interface ToastProps {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info';
  duration?: number;
  onDismiss: (id: string) => void;
}

const Toast = ({
  id,
  message,
  type = 'info',
  duration = TOAST_DURATION,
  onDismiss,
}: ToastProps) => {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  // --- 根據 type 決定樣式和圖示 ---
  const styleConfig = {
    error: {
      Icon: ErrorIcon,
      iconColor: 'text-red-500 dark:text-red-400',
    },
    success: {
      Icon: SuccessIcon,
      iconColor: 'text-green-500 dark:text-green-400',
    },
    info: {
      // 預設樣式
      Icon: ErrorIcon, // 可以換成 InfoIcon
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
  };

  const { Icon, iconColor } = styleConfig[type];

  return (
    <div
      className='animate-toast flex items-center w-full max-w-sm p-4 text-gray-700 bg-white border border-gray-200 rounded-xl shadow-lg dark:text-gray-300 dark:bg-neutral-800 dark:border-neutral-700'
      role='alert'
    >
      <div className={`flex-shrink-0 ${iconColor}`}>
        <Icon />
      </div>
      <p className='ms-3 text-sm font-medium'>{message}</p>
      <button
        type='button'
        className='ms-auto -mx-1.5 -my-1.5 p-1.5 text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-100 rounded-full dark:text-gray-500 dark:hover:text-white dark:hover:bg-neutral-700 cursor-pointer'
        onClick={() => onDismiss(id)}
        aria-label='Close'
      >
        <span className='sr-only'>Close</span>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Toast;
