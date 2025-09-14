import { CloseIcon, InfoIcon } from '../Icons';

interface DemoNoteProps {
  onDismiss: () => void;
}

const DemoNote = ({ onDismiss }: DemoNoteProps) => {
  return (
    <div
      className='flex items-center p-3 mb-2 text-sm bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg'
      role='alert'
    >
      <div className='text-blue-500 dark:text-blue-400 flex-shrink-0'>
        <InfoIcon />
      </div>
      <div className='ms-3 flex-grow'>
        <span className='font-medium'>Demo Note:</span> This is a sample
        transcript and may not match your uploaded video's content or length.
      </div>
      <button
        type='button'
        className='ms-2 -mx-1.5 -my-1.5 p-1.5 text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-200 rounded-full dark:text-gray-500 dark:hover:text-white dark:hover:bg-slate-700 cursor-pointer'
        onClick={onDismiss}
        aria-label='Close'
      >
        <span className='sr-only'>Close</span>
        <CloseIcon />
      </button>
    </div>
  );
};

export default DemoNote;
