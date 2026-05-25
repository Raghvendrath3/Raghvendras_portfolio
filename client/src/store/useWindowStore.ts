import { create } from 'zustand';
import type { WindowStore, WindowState } from '../types';
import { WINDOW_CONFIGS } from '../constants';

const initialWindows = (): Record<string, WindowState> => {
  const windows: Record<string, WindowState> = {};
  Object.keys(WINDOW_CONFIGS).forEach((key) => {
    const config = WINDOW_CONFIGS[key]!;
    windows[key] = {
      id: config.id,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: config.defaultLeft, y: config.defaultTop },
      size: { width: config.defaultWidth, height: config.defaultHeight }
    };
  });
  return windows;
};

let globalTopZIndex = 100;

export const useWindowStore = create<WindowStore>((set) => ({
  windows: initialWindows(),
  activeWindowId: null,

  openWindow: (id) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    globalTopZIndex += 1;
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isOpen: true,
          isMinimized: false,
          zIndex: globalTopZIndex
        }
      },
      activeWindowId: id
    };
  }),

  closeWindow: (id) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isOpen: false,
          isMinimized: false,
          isMaximized: false
        }
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    };
  }),

  minimizeWindow: (id) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMinimized: true
        }
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    };
  }),

  maximizeWindow: (id) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMaximized: !win.isMaximized,
          isMinimized: false
        }
      },
      activeWindowId: id
    };
  }),

  bringToFront: (id) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    globalTopZIndex += 1;
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMinimized: false,
          zIndex: globalTopZIndex
        }
      },
      activeWindowId: id
    };
  }),

  updatePosition: (id, position) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          position
        }
      }
    };
  }),

  updateSize: (id, size) => set((state) => {
    const win = state.windows[id];
    if (!win) return {};
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          size
        }
      }
    };
  })
}));
