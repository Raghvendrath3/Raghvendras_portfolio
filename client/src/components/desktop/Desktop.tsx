import React, { useState, useEffect } from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { DESKTOP_ICONS } from '../../constants';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { ContextMenu } from './ContextMenu';
import { BootScreen } from './BootScreen';
import { Win98Window } from '../ui/Win98Window';

import { AboutWindow } from '../windows/AboutWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { MyComputerWindow } from '../windows/MyComputerWindow';
import { ErrorDialog } from '../windows/ErrorDialog';
import { ContactFormWindow } from '../windows/ContactFormWindow';
import { NotepadApp } from '../apps/NotepadApp';
import { MinesweeperApp } from '../apps/MinesweeperApp';
import { PaintApp } from '../apps/PaintApp';

export const Desktop: React.FC = () => {
  const { openWindow } = useWindowStore();

  const [isBooting, setIsBooting] = useState(true);
  const [isShutDown, setIsShutDown] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; x: number; y: number }>({
    isOpen: false,
    x: 0,
    y: 0
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const handleGlobalClick = () => {
      setSelectedIconId(null);
      setIsStartMenuOpen(false);
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    openWindow('about');
    openWindow('projects');
  };

  const triggerShutDown = () => {
    if (confirm('Shut down Windows 98?')) {
      setIsShutDown(true);
    }
  };

  if (isShutDown) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center font-monospace text-xl p-4 select-none z-[999999]">
        <div className="text-center max-w-md">
          It is now safe to turn off your computer.
        </div>
      </div>
    );
  }

  return (
    <>
      {isBooting && <BootScreen onComplete={handleBootComplete} />}

      <div
        id="desktop"
        onContextMenu={handleContextMenu}
        className="w-screen h-[calc(100vh-28px)] relative overflow-hidden select-none bg-win-bg"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px),
            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)
          `
        }}
      >
        {/* Desktop Icons */}
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            x={icon.x}
            y={icon.y}
            icon={icon.id === 'mycomputer' ? '🖥️' : icon.id === 'about' ? '👤' : icon.id === 'projects' ? '📁' : icon.id === 'skills' ? '⚙️' : icon.id === 'contact' ? '📧' : icon.id === 'resume' ? '📄' : icon.id === 'notepad' ? '📝' : icon.id === 'minesweeper' ? '💣' : '🎨'}
            isSelected={selectedIconId === icon.id}
            onSelect={(e) => {
              e.stopPropagation();
              setSelectedIconId(icon.id);
            }}
          />
        ))}

        {/* Dynamic Windows */}
        
        {/* About Window */}
        <Win98Window id="about" title="About Me — Raghvendra Singh" icon="👤">
          <AboutWindow />
        </Win98Window>

        {/* Projects Window */}
        <Win98Window id="projects" title="Projects — (2 objects)" icon="📁">
          <ProjectsWindow />
        </Win98Window>

        {/* Skills Window */}
        <Win98Window id="skills" title="Tech Stack — System Properties" icon="⚙️">
          <SkillsWindow />
        </Win98Window>

        {/* Contact Window */}
        <Win98Window id="contact" title="Contact — Send Message" icon="📧">
          <ContactWindow />
        </Win98Window>

        {/* Resume Window */}
        <Win98Window id="resume" title="Raghvendra_Singh_Resume.docx" icon="📄" hideResize>
          <ResumeWindow />
        </Win98Window>

        {/* Notepad App */}
        <Win98Window id="notepad" title="Untitled — Notepad" icon="📝">
          <NotepadApp />
        </Win98Window>

        {/* Minesweeper App */}
        <Win98Window id="minesweeper" title="Minesweeper" icon="💣" hideResize>
          <MinesweeperApp />
        </Win98Window>

        {/* Paint App */}
        <Win98Window id="paint" title="Untitled — Paint" icon="🎨" hideResize>
          <PaintApp />
        </Win98Window>

        {/* My Computer Window */}
        <Win98Window id="mycomputer" title="My Computer" icon="🖥️">
          <MyComputerWindow />
        </Win98Window>

        {/* Error Easter Egg Window */}
        <Win98Window id="error" title="Display Properties" icon="⚠️" hideResize>
          <ErrorDialog />
        </Win98Window>

        {/* Contact Form Window (Phase 6) */}
        <Win98Window id="contact-form" title="Send Message" icon="✉️" hideResize>
          <ContactFormWindow />
        </Win98Window>

        {/* Mobile Viewport Check fallback */}
        {isMobile && (
          <div className="fixed top-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-800 text-[10px] p-2 z-[9999] shadow-md max-w-[200px]">
            This portfolio is best experienced on a desktop browser.
          </div>
        )}
      </div>

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onShutDown={triggerShutDown}
      />

      {/* Right Click Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        x={contextMenu.x}
        y={contextMenu.y}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Taskbar */}
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={(e) => {
          e.stopPropagation();
          setIsStartMenuOpen(!isStartMenuOpen);
        }}
      />
    </>
  );
};
