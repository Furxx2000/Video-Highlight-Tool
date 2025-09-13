import { InfoIcon } from '../Icons';

const DemoNote = () => {
  return (
    <div
      className='flex items-center p-3 mb-2 text-sm bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg'
      role='alert'
    >
      <div className='text-blue-500 dark:text-blue-400 flex-shrink-0'>
        <InfoIcon />
      </div>
      <div className='ms-3'>
        <span className='font-medium'>Demo Note:</span> This is a sample
        transcript and may not match your uploaded video's content or length.
      </div>
    </div>
  );
};

export default DemoNote;
