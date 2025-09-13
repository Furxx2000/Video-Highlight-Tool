import React from 'react';

export const CheckSquare = ({ checked }: { checked: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`w-5 h-5 ${checked ? 'text-blue-500' : 'text-gray-500'}`}
  >
    {checked && (
      <rect width='18' height='18' x='3' y='3' rx='2' fill='currentColor' />
    )}
    <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
    {checked && <path d='m9 12 2 2 4-4' stroke='white' strokeWidth='2.5' />}
  </svg>
);

export const PlayIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='w-16 h-16 text-white/50'
  >
    <polygon points='5 3 19 12 5 21 5 3'></polygon>
  </svg>
);

export const UploadIcon = () => (
  <svg
    className='w-12 h-12 mb-4 text-gray-400'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 20 16'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
    />
  </svg>
);

export const AlertIcon = () => (
  <svg
    className='w-5 h-5'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
  </svg>
);

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || 'w-5 h-5'}
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 14 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M13 5H1m0 0 4 4M1 5l4-4'
    />
  </svg>
);

export const PlayButtonIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || 'w-9 h-9'}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
      clipRule='evenodd'
    ></path>
  </svg>
);

export const PauseButtonIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || 'w-9 h-9'}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'
      clipRule='evenodd'
    ></path>
  </svg>
);

export const SkipBackIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || 'w-7 h-7'}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M8.445 14.832A1 1 0 0010 14.006V5.994a1 1 0 00-1.555-.832L4 8.694V7a1 1 0 00-2 0v6a1 1 0 002 0v-1.694l4.445 3.532z'></path>
  </svg>
);

export const SkipForwardIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || 'w-7 h-7'}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M11.555 5.168A1 1 0 0010 5.994v8.012a1 1 0 001.555.832L16 11.306V13a1 1 0 002 0V7a1 1 0 00-2 0v1.694l-4.445-3.532z'></path>
  </svg>
);

export const ErrorIcon = () => (
  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
      clipRule='evenodd'
    />
  </svg>
);

export const SuccessIcon = () => (
  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
      clipRule='evenodd'
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    className='w-3 h-3'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 14 14'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
    />
  </svg>
);

export const InfoIcon = () => (
  <svg
    className='w-4 h-4'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
  </svg>
);
