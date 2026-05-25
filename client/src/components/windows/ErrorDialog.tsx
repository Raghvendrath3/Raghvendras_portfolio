import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Win98Button } from '../ui/Win98Button';

export const ErrorDialog: React.FC = () => {
  const { closeWindow } = useWindowStore();

  const handleClose = () => {
    closeWindow('error');
  };

  return (
    <div className="flex flex-col bg-win-gray font-win text-win-black select-none">
      {/* Upper Content area */}
      <div className="flex gap-4 p-4 items-start select-none">
        <div className="text-[32px] select-none flex-shrink-0">⚠️</div>
        <div className="text-[11px] leading-relaxed select-text">
          <strong className="select-text">Warning: Awesome portfolio detected.</strong>
          <br />
          <br />
          This system has identified an unusually creative developer. Symptoms include:
          <br />
          • Building Windows 98 in React & TypeScript
          <br />
          • Documenting "Known limitations" on project cards
          <br />
          • Defending every layer and architectural decision
          <br />
          <br />
          Recommend: Hire immediately.
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-2 p-3 bg-win-gray border-t border-gray-300 select-none">
        <Win98Button onClick={handleClose} defaultBtn className="min-w-[75px] select-none">
          OK
        </Win98Button>
        <Win98Button onClick={handleClose} className="min-w-[75px] select-none">
          Cancel
        </Win98Button>
      </div>
    </div>
  );
};
