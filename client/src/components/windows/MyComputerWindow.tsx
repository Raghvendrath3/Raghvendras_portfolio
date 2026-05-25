import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';

export const MyComputerWindow: React.FC = () => {
  const { openWindow, bringToFront } = useWindowStore();

  const items = [
    { id: 'projects', label: 'Projects (C:)', icon: '💾' },
    { id: 'skills', label: 'Skills (D:)', icon: '🖨️' },
    { id: 'about', label: 'About Me', icon: '📁' },
    { id: 'contact', label: 'Network', icon: '📡' },
    { id: 'notepad', label: 'Notepad', icon: '📝' },
    { id: 'paint', label: 'MS Paint', icon: '🎨' },
    { id: 'minesweeper', label: 'Minesweeper', icon: '💣' },
    { id: 'resume', label: 'Resume.docx', icon: '📄' }
  ];

  const handleItemDoubleClick = (id: string) => {
    openWindow(id);
    bringToFront(id);
  };

  return (
    <div className="p-3 text-[11px] font-win text-win-black select-none">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
        {items.map((item) => (
          <div
            key={item.id}
            onDoubleClick={() => handleItemDoubleClick(item.id)}
            className="p-2 cursor-pointer border border-transparent hover:bg-win-blue/10 hover:border-win-blue/20 flex flex-col items-center gap-1 select-none"
          >
            <div className="text-[28px] select-none">{item.icon}</div>
            <div className="text-[10px] break-words select-none leading-tight">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
