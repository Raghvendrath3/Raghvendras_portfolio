import { useState, useEffect } from 'react';

export const WALLPAPER_OPTIONS = [
  { id: 'blue-gradient', name: 'Blue Gradient', gradient: 'linear-gradient(to bottom, #008080, #000080)' },
  { id: 'teal', name: 'Teal', gradient: 'linear-gradient(to bottom, #20b2aa, #008080)' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(to bottom, #4a90e2, #1a4d7a)' },
  { id: 'forest', name: 'Forest', gradient: 'linear-gradient(to bottom, #2d5016, #1a3d0a)' },
  { id: 'sunset', name: 'Sunset', gradient: 'linear-gradient(to bottom, #ff6b35, #f7931e)' },
  { id: 'purple', name: 'Purple', gradient: 'linear-gradient(to bottom, #6a4c93, #1f1f2e)' },
];

export const useWallpaper = () => {
  const [currentWallpaper, setCurrentWallpaper] = useState(WALLPAPER_OPTIONS[0]);

  useEffect(() => {
    // Load saved wallpaper preference from localStorage
    const saved = localStorage.getItem('win98-wallpaper');
    if (saved) {
      const found = WALLPAPER_OPTIONS.find(w => w.id === saved);
      if (found) setCurrentWallpaper(found);
    }
  }, []);

  const changeWallpaper = (id: string) => {
    const wallpaper = WALLPAPER_OPTIONS.find(w => w.id === id);
    if (wallpaper) {
      setCurrentWallpaper(wallpaper);
      localStorage.setItem('win98-wallpaper', id);
    }
  };

  return {
    currentWallpaper,
    changeWallpaper,
    wallpapers: WALLPAPER_OPTIONS,
  };
};
