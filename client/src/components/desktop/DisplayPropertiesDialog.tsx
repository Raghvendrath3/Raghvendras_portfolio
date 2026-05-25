import React from 'react';
import { Win98Window } from '../ui/Win98Window';
import { Win98Button } from '../ui/Win98Button';
import { useWallpaper, WALLPAPER_OPTIONS } from '../../hooks/useWallpaper';
import { useWindowStore } from '../../store/useWindowStore';

export const DisplayPropertiesDialog: React.FC = () => {
  const { currentWallpaper, changeWallpaper } = useWallpaper();
  const { closeWindow } = useWindowStore();

  return (
    <Win98Window
      id="display-properties"
      title="Display Properties"
      showMenubar={false}
      statusbarContent={['Display']}
      hideResize
    >
      <div className="p-4 bg-win-gray flex flex-col gap-4 h-full select-none">
        {/* Tabs placeholder - just showing content */}
        <div className="flex gap-0">
          <div className="px-4 py-2 bg-win-blue text-white text-sm font-win font-bold border-b-2 border-b-win-blue">
            Background
          </div>
        </div>

        {/* Wallpaper Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-win font-bold">Select a wallpaper:</label>
          <div className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white p-2 max-h-[150px] overflow-y-auto">
            <div className="space-y-1">
              {WALLPAPER_OPTIONS.map((wallpaper) => (
                <div
                  key={wallpaper.id}
                  onClick={() => changeWallpaper(wallpaper.id)}
                  className={`px-2 py-1 text-[11px] cursor-pointer font-win ${
                    currentWallpaper.id === wallpaper.id
                      ? 'bg-win-blue text-white'
                      : 'hover:bg-slate-200'
                  }`}
                >
                  {wallpaper.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-win font-bold">Preview:</label>
          <div
            className="w-full h-[100px] border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white"
            style={{ background: currentWallpaper.gradient }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-border-dark">
          <Win98Button
            onClick={() => closeWindow('display-properties')}
            defaultBtn
            className="select-none"
          >
            OK
          </Win98Button>
          <Win98Button
            onClick={() => closeWindow('display-properties')}
            className="select-none"
          >
            Cancel
          </Win98Button>
        </div>
      </div>
    </Win98Window>
  );
};
