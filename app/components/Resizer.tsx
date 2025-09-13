'use client';

interface ResizerProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const Resizer = ({ onMouseDown }: ResizerProps) => {
  return (
    <div
      className='resizer'
      onMouseDown={onMouseDown}
      role='separator'
      aria-orientation='vertical'
    >
      <div className='resizer-handle'></div>
    </div>
  );
};

export default Resizer;
