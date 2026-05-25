import React from 'react';

interface StatusbarProps {
  panels: string[];
}

export const Statusbar: React.FC<StatusbarProps> = ({ panels }) => {
  return (
    <div className="win-statusbar flex gap-2 border-t border-border-dark p-[2px] bg-win-gray flex-shrink-0 text-[11px] font-win text-win-black">
      {panels.map((panel, idx) => (
        <div
          key={idx}
          className="statusbar-panel px-[6px] py-[1px] border border-t-border-dark border-l-border-dark border-r-white border-b-white leading-normal truncate"
          style={{ minWidth: idx === 0 ? '80px' : '50px' }}
        >
          {panel}
        </div>
      ))}
    </div>
  );
};
