import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShutDown: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onShutDown }) => {
  const { openWindow } = useWindowStore();

  if (!isOpen) return null;

  const handleItemClick = (id: string) => {
    openWindow(id);
    onClose();
  };

  return (
    <div
      id="start-menu"
      className="fixed bottom-[28px] left-0 w-[200px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker shadow-[2px_2px_0px_#000] z-[99999] flex font-win text-win-black backdrop-filter-none"
      style={{ backgroundColor: '#c0c0c0' }}
    >
      {/* Rotated Windows 98 Sidebar */}
      <div
        className="w-[24px] bg-win-blue text-white font-bold text-[14px] flex items-end justify-center pb-2 select-none tracking-widest"
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          backgroundColor: '#000080'
        }}
      >
        Windows 98
      </div>

      {/* Start Menu Items */}
      <div className="flex-1 py-1">
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('about')}
        >
          <span className="w-[16px]">▶</span>
          <span>About Me</span>
        </div>
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('projects')}
        >
          <span className="w-[16px]">▶</span>
          <span>Projects</span>
        </div>
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('skills')}
        >
          <span className="w-[16px]">▶</span>
          <span>Tech Stack</span>
        </div>
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('contact')}
        >
          <span className="w-[16px]">▶</span>
          <span>Contact</span>
        </div>
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('resume')}
        >
          <span className="w-[16px]">▶</span>
          <span>Resume</span>
        </div>
        
        <div className="h-[2px] border-t border-border-dark border-b border-white my-1 mx-1" />

        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('notepad')}
        >
          <span className="w-[16px]">▶</span>
          <span>Notepad</span>
        </div>
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('paint')}
        >
          <span className="w-[16px]">▶</span>
          <span>MS Paint</span>
        </div>
        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={() => handleItemClick('minesweeper')}
        >
          <span className="w-[16px]">▶</span>
          <span>Minesweeper</span>
        </div>

        <div className="h-[2px] border-t border-border-dark border-b border-white my-1 mx-1" />

        <div
          className="flex items-center gap-[10px] px-2 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
          onClick={onShutDown}
        >
          <span className="w-[16px]">▶</span>
          <span>Shut Down...</span>
        </div>
      </div>
    </div>
  );
};
