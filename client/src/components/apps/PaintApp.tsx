import React, { useRef, useEffect, useState } from 'react';
import { Win98Window } from '../ui/Win98Window';
import { Win98Button } from '../ui/Win98Button';
import { usePaint } from '../../hooks/usePaint';

const PALETTE_COLORS = [
  // Row 1
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#C0C0C0', '#FFFFFF',
  // Row 2
  '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FF8040', '#804000', '#004000', '#004080'
];

const BRUSH_SIZES = [1, 3, 5, 8];

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tool, setTool, color, setColor, brushSize, setBrushSize, handleMouseDown, handleMouseMove, handleMouseUp } = usePaint(canvasRef);
  const [isActiveColor, setIsActiveColor] = useState<string | null>(null);

  // Initialize canvas with white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <Win98Window
      id="paint"
      title="Paint"
      showMenubar={false}
      statusbarContent={[`Tool: ${tool}`, `Color: ${color}`, `Size: ${brushSize}`]}
    >
      <div className="flex flex-col h-full bg-win-gray select-none">
        {/* Toolbar */}
        <div className="p-2 border-b border-win-gray flex gap-2 bg-win-gray flex-wrap">
          {(['pen', 'eraser', 'line', 'fill'] as const).map((t) => (
            <Win98Button
              key={t}
              onClick={() => setTool(t)}
              className={`capitalize ${tool === t ? 'active' : ''}`}
            >
              {t === 'pen' && 'Pen'}
              {t === 'eraser' && 'Eraser'}
              {t === 'line' && 'Line'}
              {t === 'fill' && 'Fill'}
            </Win98Button>
          ))}
        </div>

        {/* Color section and Canvas area */}
        <div className="flex flex-1 gap-2 p-2 overflow-auto">
          {/* Left side: color and brush size */}
          <div className="flex flex-col gap-2">
            {/* Current color preview */}
            <div
              className="w-[20px] h-[20px] border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white flex-shrink-0"
              style={{ backgroundColor: color }}
            />

            {/* Color palette */}
            <div className="flex flex-col gap-1">
              {/* Row 1 */}
              <div className="flex gap-1">
                {PALETTE_COLORS.slice(0, 10).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setColor(c);
                      setIsActiveColor(c);
                    }}
                    className={`w-[14px] h-[14px] cursor-pointer border ${
                      isActiveColor === c
                        ? 'border-t-border-dark border-l-border-dark border-r-white border-b-white'
                        : 'border-t-white border-l-white border-r-border-dark border-b-border-dark'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {/* Row 2 */}
              <div className="flex gap-1">
                {PALETTE_COLORS.slice(10, 20).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setColor(c);
                      setIsActiveColor(c);
                    }}
                    className={`w-[14px] h-[14px] cursor-pointer border ${
                      isActiveColor === c
                        ? 'border-t-border-dark border-l-border-dark border-r-white border-b-white'
                        : 'border-t-white border-l-white border-r-border-dark border-b-border-dark'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Brush size selector */}
            <div className="flex flex-col gap-1">
              {BRUSH_SIZES.map((size) => (
                <Win98Button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`text-[10px] w-[40px] ${brushSize === size ? 'active' : ''}`}
                >
                  {size}
                </Win98Button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white cursor-crosshair flex-1"
          />
        </div>
      </div>
    </Win98Window>
  );
};
