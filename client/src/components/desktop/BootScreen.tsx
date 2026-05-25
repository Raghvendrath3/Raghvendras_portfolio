import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Starting Windows 98...');
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const messages = [
      'Starting Windows 98...',
      'Loading system files...',
      'Initializing desktop...',
      'Welcome.'
    ];

    let currentProgress = 0;
    const duration = 2500; // 2.5 seconds
    const intervalTime = 50;
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        
        // Trigger fade out
        setTimeout(() => {
          setFadeOut(true);
          // Wait for transition to complete, then remove from DOM
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 500); // matches transition duration
        }, 300);
      }
      setProgress(currentProgress);

      // Cycle messages
      const msgIndex = Math.min(
        messages.length - 1,
        Math.floor((currentProgress / 100) * messages.length)
      );
      const newMsg = messages[msgIndex];
      if (newMsg) {
        setMessage(newMsg);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#000080] flex flex-col items-center justify-center z-[999999] text-white font-monospace transition-opacity duration-500 ease-out select-none ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-[48px] mb-4 select-none">🖥️</div>
      <div className="text-[20px] font-bold mb-1 select-none">Windows 98</div>
      <div className="text-[12px] text-gray-400 mb-8 select-none">Raghvendra Singh — Developer Edition</div>
      
      <div className="w-[300px] h-[20px] bg-black border-2 border-white p-[2px] select-none">
        <div
          className="h-full bg-win-blue transition-[width] duration-75 ease-out select-none"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 text-[11px] text-gray-400 select-none h-4">
        {message}
      </div>
    </div>
  );
};
