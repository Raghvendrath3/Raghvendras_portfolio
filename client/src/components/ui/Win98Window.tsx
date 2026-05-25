import React, { useRef } from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { useDrag } from '../../hooks/useDrag';
import { useResize } from '../../hooks/useResize';
import { Titlebar } from './Titlebar';

interface Win98WindowProps {
  id: string;
  title: string;
  icon?: string;
  children?: React.ReactNode;
  showMenubar?: boolean;
  menubarContent?: React.ReactNode;
  statusbarContent?: string[];
  hideResize?: boolean;
}

export const Win98Window: React.FC<Win98WindowProps> = ({
  id,
  title,
  icon,
  children,
  showMenubar,
  menubarContent,
  statusbarContent,
  hideResize = false
}) => {
  const { windows, bringToFront } = useWindowStore();
  const winState = windows[id];

  const windowRef = useRef<HTMLDivElement | null>(null);
  const titlebarRef = useRef<HTMLDivElement | null>(null);
  const resizeRef = useRef<HTMLDivElement | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Call hooks
  useDrag(id, windowRef, titlebarRef);
  if (!hideResize) {
    useResize(id, windowRef, resizeRef);
  }

  if (!winState || !winState.isOpen) return null;

  const isMinimized = winState.isMinimized;
  const isMaximized = winState.isMaximized;

  // Mobile viewport layout
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 bg-win-gray z-[1000] flex flex-col font-win text-win-black"
        style={{ zIndex: winState.zIndex }}
        onClick={() => bringToFront(id)}
      >
        <div ref={titlebarRef}>
          <Titlebar id={id} title={title} icon={icon} />
        </div>
        {showMenubar && menubarContent}
        <div className="flex-1 overflow-auto bg-white border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white m-1 relative">
          {children}
        </div>
        {statusbarContent && (
          <div className="win-statusbar flex gap-2 border-t border-border-dark p-[2px] bg-win-gray flex-shrink-0 text-[11px]">
            {statusbarContent.map((panel, idx) => (
              <div
                key={idx}
                className="statusbar-panel px-[6px] py-[1px] border border-t-border-dark border-l-border-dark border-r-white border-b-white leading-normal truncate"
                style={{ minWidth: idx === 0 ? '80px' : '50px' }}
              >
                {panel}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {!isMinimized && (
        <div
          ref={windowRef}
          className="absolute bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker shadow-[2px_2px_0px_#000] flex flex-col font-win text-win-black select-none"
          style={{
            zIndex: winState.zIndex,
            left: isMaximized ? 0 : `${winState.position.x}px`,
            top: isMaximized ? 0 : `${winState.position.y}px`,
            width: isMaximized ? '100vw' : `${winState.size.width}px`,
            height: isMaximized ? 'calc(100vh - 28px)' : `${winState.size.height}px`,
            position: 'absolute',
            opacity: 0,
            animation: `fadeIn 0.12s ease-out forwards`
          }}
          onClick={() => bringToFront(id)}
        >
          {/* Titlebar */}
          <div ref={titlebarRef}>
            <Titlebar id={id} title={title} icon={icon} />
          </div>

          {/* Menubar */}
          {showMenubar && menubarContent}

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-white border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white m-1 relative">
            {children}
          </div>

          {/* Statusbar */}
          {statusbarContent && (
            <div className="win-statusbar flex gap-2 border-t border-border-dark p-[2px] bg-win-gray flex-shrink-0 text-[11px]">
              {statusbarContent.map((panel, idx) => (
                <div
                  key={idx}
                  className="statusbar-panel px-[6px] py-[1px] border border-t-border-dark border-l-border-dark border-r-white border-b-white leading-normal truncate"
                  style={{ minWidth: idx === 0 ? '80px' : '50px' }}
                >
                  {panel}
                </div>
              ))}
            </div>
          )}

          {/* Resize Handle */}
          {!hideResize && !isMaximized && (
            <div
              ref={resizeRef}
              className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-50 select-none"
              style={{
                background: 'linear-gradient(135deg, transparent 40%, var(--border-dark) 40%, var(--border-dark) 50%, transparent 50%, transparent 65%, var(--border-dark) 65%, var(--border-dark) 75%, transparent 75%)'
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
