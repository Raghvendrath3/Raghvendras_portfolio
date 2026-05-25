import { useRef, useEffect } from 'react';
import { useWindowStore } from '../store/useWindowStore';

export const useDrag = (
  id: string,
  windowRef: React.RefObject<HTMLDivElement | null>,
  titlebarRef: React.RefObject<HTMLDivElement | null>
) => {
  const { windows, updatePosition, bringToFront, maximizeWindow } = useWindowStore();
  const winState = windows[id];

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
  });

  useEffect(() => {
    const titlebar = titlebarRef.current;
    const windowEl = windowRef.current;
    if (!titlebar || !windowEl) return;

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.win-controls')) return;

      bringToFront(id);

      if (winState?.isMaximized) {
        maximizeWindow(id);
      }

      dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: windowEl.offsetLeft,
        startTop: windowEl.offsetTop,
      };

      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      let newLeft = dragRef.current.startLeft + deltaX;
      let newTop = dragRef.current.startTop + deltaY;

      // Viewport and bottom taskbar (28px) constraints
      const maxLeft = window.innerWidth - 50;
      const maxTop = window.innerHeight - 28 - 20;

      newLeft = Math.max(-50, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      windowEl.style.left = `${newLeft}px`;
      windowEl.style.top = `${newTop}px`;
    };

    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        updatePosition(id, {
          x: windowEl.offsetLeft,
          y: windowEl.offsetTop,
        });
      }
    };

    titlebar.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      titlebar.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [id, winState?.isMaximized, bringToFront, maximizeWindow, updatePosition, windowRef, titlebarRef]);
};
