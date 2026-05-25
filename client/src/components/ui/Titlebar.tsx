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
          ? 'bg-win-blue'
          : 'bg-slate-400'
      }`}
      style={{
        backgroundColor: isActive ? '#000080' : '#808080'
      }}
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            minimizeWindow(id);
          }}
          className="w-[16px] h-[14px] leading-[4px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white flex items-center justify-center font-bold text-[9px] cursor-pointer"
          style={{ color: isActive ? '#000000' : '#000000' }}
        >
          _
        </button>
        {/* Maximize */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            maximizeWindow(id);
          }}
          className="w-[16px] h-[14px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white flex items-center justify-center font-bold text-[9px] cursor-pointer"
          style={{ color: isActive ? '#000000' : '#000000' }}
        >
          {isMaximized ? '▬' : '□'}
        </button>
        {/* Close */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeWindow(id);
          }}
          className="w-[16px] h-[14px] bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white flex items-center justify-center font-bold text-[10px] cursor-pointer"
          style={{ color: isActive ? '#000000' : '#000000' }}
        >
          ×
        </button>
      </div>
    </div>
  );
};
