import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Win98Button } from '../ui/Win98Button';

export const ResumeWindow: React.FC = () => {
  const { openWindow, closeWindow } = useWindowStore();

  const handleDownload = () => {
    // Triggers actual download from static directory
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Raghvendra_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactInstead = () => {
    closeWindow('resume');
    openWindow('contact');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-[11px] font-win text-win-black select-none h-full bg-slate-50">
      <div className="text-[54px] mb-3 select-none">📄</div>
      <div className="font-bold text-sm mb-1 select-none">Raghvendra_Singh_Resume.pdf</div>
      <div className="text-[10px] text-gray-500 mb-6 select-none">
        Portable Document Format · Full-Stack Developer Resume
      </div>
      <div className="flex gap-2 select-none">
        <Win98Button onClick={handleDownload} defaultBtn className="min-w-[100px] select-none">
          Open (Download)
        </Win98Button>
        <Win98Button onClick={handleContactInstead} className="min-w-[100px] select-none">
          Contact Instead
        </Win98Button>
      </div>
    </div>
  );
};
