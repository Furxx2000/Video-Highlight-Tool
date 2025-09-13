import { AlertIcon } from './Icons';

interface AlertProps {
  message: string;
}

export default function Alert({ message }: AlertProps) {
  if (!message) return null;

  return (
    <div
      className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
      role='alert'
    >
      <AlertIcon />
      <span className='sr-only'>Info</span>
      <div className='ms-3 font-medium'>{message}</div>
    </div>
  );
}
