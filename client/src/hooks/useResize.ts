import { useRef, useEffect } from 'react';
import { useWindowStore } from '../store/useWindowStore';

export const useResize = (
  id: string,
  windowRef: React.RefObject<HTMLDivElement | null>,
  resizeRef: React.RefObject<HTMLDivElement | null>
) => {
  const { updateSize } = useWindowStore();

  const resizeStateRef = useRef({
    isResizing: false,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  useEffect(() => {
    const handleEl = resizeRef.current;
    const windowEl = windowRef.current;
    if (!handleEl || !windowEl) return;

    const handleMouseDown = (e: MouseEvent) => {
      resizeStateRef.current = {
        isResizing: true,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: windowEl.offsetWidth,
        startHeight: windowEl.offsetHeight,
      };
      e.preventDefault();
      e.stopPropagation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStateRef.current.isResizing) return;

      const deltaX = e.clientX - resizeStateRef.current.startX;
      const deltaY = e.clientY - resizeStateRef.current.startY;

      // Minimum bounds: width >= 200px, height >= 100px
      const newWidth = Math.max(200, resizeStateRef.current.startWidth + deltaX);
      const newHeight = Math.max(100, resizeStateRef.current.startHeight + deltaY);

      windowEl.style.width = `${newWidth}px`;
      windowEl.style.height = `${newHeight}px`;
    };

    const handleMouseUp = () => {
      if (resizeStateRef.current.isResizing) {
        resizeStateRef.current.isResizing = false;
        updateSize(id, {
          width: windowEl.offsetWidth,
          height: windowEl.offsetHeight,
        });
      }
    };

    handleEl.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      handleEl.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [id, updateSize, windowRef, resizeRef]);
};
