import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { WINDOW_CONFIGS } from '../../constants';
import { useClock } from '../../hooks/useClock';

interface TaskbarProps {
  onStartClick: (e: React.MouseEvent) => void;
  isStartMenuOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({ onStartClick, isStartMenuOpen }) => {
  const { windows, activeWindowId, minimizeWindow, bringToFront } = useWindowStore();
  const time = useClock();

  const openWindows = Object.values(windows).filter((win) => win.isOpen);

  const handleWindowClick = (id: string) => {
    const win = windows[id];
    if (!win) return;
    if (activeWindowId === id && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  return (
    <div
      id="taskbar"
      className="fixed bottom-0 left-0 right-0 h-[28px] bg-win-gray border-t-2 border-t-white flex items-center gap-[2px] px-1 py-[2px] z-[9999] font-win text-win-black select-none"
    >
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`flex items-center gap-1 px-[6px] py-[2px] h-[22px] bg-win-gray border-2 cursor-pointer font-bold text-xs select-none ${
          isStartMenuOpen
            ? 'border-t-border-darker border-l-border-darker border-r-white border-b-white'
            : 'border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white'
        }`}
      >
        <span className="text-[14px]">❖</span>
        <span>Start</span>
      </button>

      <div className="w-[2px] h-[22px] border-l border-border-dark border-r border-white mx-1" />

      {/* Taskbar Buttons */}
      <div className="flex-1 flex gap-1 overflow-hidden h-[22px]">
        {openWindows.map((win) => {
          const config = WINDOW_CONFIGS[win.id];
          if (!config) return null;
          const isActive = activeWindowId === win.id && !win.isMinimized;

          return (
            <button
              key={win.id}
              onClick={() => handleWindowClick(win.id)}
              className={`flex items-center gap-1 px-2 py-[2px] h-[22px] min-w-[80px] max-w-[160px] truncate text-left text-xs bg-win-gray border-2 cursor-pointer select-none leading-none ${
                isActive
                  ? 'border-t-border-darker border-l-border-darker border-r-white border-b-white bg-slate-200'
                  : 'border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white'
              }`}
            >
              <span>{config.icon}</span>
              <span className="truncate">{config.label.split(' — ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Clock Panel */}
      <div
        id="clock"
        className="px-2 py-[2px] border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white h-[22px] flex items-center justify-center text-xs whitespace-nowrap bg-win-gray select-none"
      >
        {time}
      </div>
    </div>
  );
};
