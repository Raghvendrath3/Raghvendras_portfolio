import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';

interface TitlebarProps {
  id: string;
  title: string;
  icon?: string;
}

export const Titlebar: React.FC<TitlebarProps> = ({ id, title, icon }) => {
  const { windows, activeWindowId, closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  const isActive = activeWindowId === id;
  const isMaximized = windows[id]?.isMaximized;

  return (
    <div
      className={`h-[22px] flex items-center px-1 py-[2px] gap-1 select-none cursor-grab flex-shrink-0 active:cursor-grabbing ${
        isActive
          ? 'bg-gradient-to-r from-win-blue to-[#1084d0]'
          : 'bg-gradient-to-r from-border-dark to-[#a0a0a0]'
      }`}
    >
      {icon && (
        <span className="text-[12px] pl-1 flex items-center justify-center select-none">
          {icon}
        </span>
      )}
      <span className="text-white font-win font-bold text-[11px] pl-1 truncate flex-1 leading-none select-none">
        {title}
      </span>
      <div className="win-controls flex gap-[2px] pr-[2px]">
        {/* Minimize */}
        <button
          onClick={() => minimizeWindow(id)}
          className="w-[16px] h-[14px] leading-[4px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white flex items-center justify-center font-bold text-[9px] cursor-pointer"
        >
          _
        </button>
        {/* Maximize */}
        <button
          onClick={() => maximizeWindow(id)}
          className="w-[16px] h-[14px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white flex items-center justify-center font-bold text-[9px] cursor-pointer"
        >
          {isMaximized ? '🗗' : '□'}
        </button>
        {/* Close */}
        <button
          onClick={() => closeWindow(id)}
          className="w-[16px] h-[14px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white flex items-center justify-center font-bold text-[9px] cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
