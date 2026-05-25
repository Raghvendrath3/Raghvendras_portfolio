import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Win98Button } from '../ui/Win98Button';

export const ResumeWindow: React.FC = () => {
  const { openWindow, closeWindow } = useWindowStore();

  const handleDownload = () => {
    // Download the PDF file from public folder
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
      {/* Document SVG Icon - 32x32 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="mb-3 select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="2" width="24" height="28" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="8" x2="24" y2="8" />
        <line x1="8" y1="14" x2="24" y2="14" />
        <line x1="8" y1="20" x2="24" y2="20" />
        <line x1="8" y1="26" x2="16" y2="26" />
      </svg>
      <div className="font-bold text-[11px] mb-1 select-none">Raghvendra_Singh_Resume.docx</div>
      <div className="text-[10px] text-gray-600 mb-6 select-none">
        Full-Stack Developer Resume
      </div>
      <div className="flex gap-2 select-none">
        <Win98Button onClick={handleDownload} defaultBtn className="min-w-[100px] select-none">
          Open
        </Win98Button>
        <Win98Button onClick={handleContactInstead} className="min-w-[100px] select-none">
          Contact Instead
        </Win98Button>
      </div>
    </div>
  );
};
