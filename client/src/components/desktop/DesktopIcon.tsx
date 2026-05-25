import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';

interface DesktopIconProps {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: string;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  x,
  y,
  icon,
  isSelected,
  onSelect
}) => {
  const { openWindow, bringToFront } = useWindowStore();

  const handleDoubleClick = () => {
    openWindow(id);
    bringToFront(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWindow(id);
      bringToFront(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(e);
      }}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      className={`absolute flex flex-col items-center gap-1 w-[72px] p-1 cursor-pointer border border-transparent select-none focus:outline-none ${
        isSelected
          ? 'bg-win-blue border-white border-dotted'
          : 'hover:bg-win-blue/20 hover:border-win-blue/40'
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div className="text-[32px] w-[32px] h-[32px] flex items-center justify-center select-none pixelated">
        {icon}
      </div>
      <span
        className={`text-center text-[11px] leading-tight break-all select-none px-[2px] py-[1px] rounded-sm font-win ${
          isSelected ? 'text-white bg-win-blue' : 'text-white'
        }`}
        style={{
          textShadow: isSelected ? 'none' : '1px 1px 1px #000',
        }}
      >
        {label}
      </span>
    </div>
  );
};
