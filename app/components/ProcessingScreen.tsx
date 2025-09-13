const ProcessingScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-white'>
      <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      <p className='text-xl mt-4'>AI is processing your video...</p>
    </div>
  );
};

export default ProcessingScreen;
