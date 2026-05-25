import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, isOpen, onClose }) => {
  const { openWindow } = useWindowStore();

  if (!isOpen) return null;

  const menuWidth = 160;
  const menuHeight = 150;
  const clampedX = Math.min(x, window.innerWidth - menuWidth);
  const clampedY = Math.min(y, window.innerHeight - menuHeight);

  const handleItemClick = (windowId: string) => {
    openWindow(windowId);
    onClose();
  };

  return (
    <div
      id="ctx-menu"
      className="fixed bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker shadow-[2px_2px_0px_#000] z-[99998] min-w-[160px] font-win text-win-black py-[2px]"
      style={{
        left: `${clampedX}px`,
        top: `${clampedY}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="px-5 py-1 text-xs cursor-default text-gray-500 select-none"
        onClick={onClose}
      >
        Arrange Icons
      </div>
      <div
        className="px-5 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
        onClick={() => handleItemClick('about')}
      >
        Open About Me
      </div>
      <div className="h-[2px] border-t border-border-dark border-b border-white my-[2px]" />
      <div
        className="px-5 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
        onClick={() => handleItemClick('paint')}
      >
        Open MS Paint
      </div>
      <div
        className="px-5 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
        onClick={() => handleItemClick('notepad')}
      >
        Open Notepad
      </div>
      <div className="h-[2px] border-t border-border-dark border-b border-white my-[2px]" />
      <div
        className="px-5 py-1 text-xs cursor-pointer hover:bg-win-blue hover:text-white select-none"
        onClick={() => handleItemClick('display-properties')}
      >
        Display Properties
      </div>
    </div>
  );
};
