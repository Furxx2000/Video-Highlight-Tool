'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import Resizer from './Resizer';
import {
  INITIAL_PANEL_WIDTH,
  RESIZER_MIN_WIDTH,
  RESIZER_MAX_WIDTH,
} from '../lib/constans';

interface WorkspaceProps {
  editor: React.ReactNode;
  preview: React.ReactNode;
}

const Workspace = ({ editor, preview }: WorkspaceProps) => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(INITIAL_PANEL_WIDTH);
  const isResizing = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const clampedWidth = Math.max(
      RESIZER_MIN_WIDTH,
      Math.min(newWidth, RESIZER_MAX_WIDTH)
    );
    setLeftPanelWidth(clampedWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.classList.remove('no-select');
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.classList.add('no-select');
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className='flex flex-col lg:flex-row flex-1 min-h-0'
    >
      {/* --- 左側面板 (Editor Slot) --- */}
      <div
        className='w-full lg:w-auto h-1/2 lg:h-full overflow-hidden flex-shrink-0'
        style={
          isDesktop ? { width: `calc(${leftPanelWidth}% - 5px)` } : undefined
        }
      >
        {editor}
      </div>

      {/* --- 分隔線 --- */}
      <Resizer onMouseDown={handleMouseDown} />

      {/* --- 右側面板 (Preview Slot) --- */}
      <div className='w-full lg:w-auto h-1/2 lg:h-full overflow-hidden flex-1 min-w-0'>
        {preview}
      </div>
    </div>
  );
};

export default Workspace;
