interface SubtitleOverlayProps {
  subtitle: string;
}

const SubtitleOverlay = ({ subtitle }: SubtitleOverlayProps) => {
  return (
    <div
      className='absolute bottom-4 md:bottom-6 w-full px-4 text-center pointer-events-none transition-opacity duration-300 ease-in-out'
      style={{ opacity: subtitle ? 1 : 0 }}
    >
      {subtitle && (
        <p className='py-2 px-4 bg-black/60 text-white text-base md:text-lg rounded-lg inline-block'>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SubtitleOverlay;
