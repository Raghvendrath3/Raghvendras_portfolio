import { useState, useRef, useCallback } from 'react';

type Tool = 'pen' | 'eraser' | 'line' | 'fill';

export const usePaint = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  const isDrawing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const snapshotData = useRef<ImageData | null>(null);

  const getContext = useCallback(() => {
    if (!canvasRef.current) return null;
    return canvasRef.current.getContext('2d');
  }, [canvasRef]);

  const drawLine = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number, ctx: CanvasRenderingContext2D, strokeColor: string) => {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    },
    [tool, brushSize]
  );

  const floodFill = useCallback(
    (startX: number, startY: number, fillColor: string, ctx: CanvasRenderingContext2D) => {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const data = imageData.data;

      // Get the target color
      const pixelIndex = (Math.floor(startY) * ctx.canvas.width + Math.floor(startX)) * 4;
      const targetR = data[pixelIndex];
      const targetG = data[pixelIndex + 1];
      const targetB = data[pixelIndex + 2];
      const targetA = data[pixelIndex + 3];

      // Parse fill color
      const fillColorHex = fillColor.startsWith('#') ? fillColor : '#000000';
      const fillR = parseInt(fillColorHex.slice(1, 3), 16);
      const fillG = parseInt(fillColorHex.slice(3, 5), 16);
      const fillB = parseInt(fillColorHex.slice(5, 7), 16);

      // Check if target color matches fill color
      if (targetR === fillR && targetG === fillG && targetB === fillB && targetA === 255) {
        return; // Already the fill color
      }

      const stack: [number, number][] = [[Math.floor(startX), Math.floor(startY)]];
      const visited = new Set<string>();

      while (stack.length > 0) {
        const [x, y] = stack.pop()!;
        const key = `${x},${y}`;

        if (visited.has(key) || x < 0 || x >= ctx.canvas.width || y < 0 || y >= ctx.canvas.height) {
          continue;
        }

        visited.add(key);

        const idx = (y * ctx.canvas.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (r === targetR && g === targetG && b === targetB && a === targetA) {
          // Fill this pixel
          data[idx] = fillR;
          data[idx + 1] = fillG;
          data[idx + 2] = fillB;
          data[idx + 3] = 255;

          // Add neighbors
          stack.push([x + 1, y]);
          stack.push([x - 1, y]);
          stack.push([x, y + 1]);
          stack.push([x, y - 1]);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const ctx = getContext();
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      isDrawing.current = true;
      startX.current = x;
      startY.current = y;
      lastX.current = x;
      lastY.current = y;

      if (tool === 'pen' || tool === 'eraser') {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else if (tool === 'line') {
        snapshotData.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } else if (tool === 'fill') {
        floodFill(x, y, color, ctx);
      }
    },
    [tool, color, getContext, floodFill, canvasRef]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current) return;

      const canvas = canvasRef.current;
      const ctx = getContext();
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tool === 'pen' || tool === 'eraser') {
        const strokeColor = tool === 'eraser' ? '#ffffff' : color;
        drawLine(lastX.current, lastY.current, x, y, ctx, strokeColor);
        lastX.current = x;
        lastY.current = y;
      } else if (tool === 'line' && snapshotData.current) {
        // Restore snapshot and draw preview line
        ctx.putImageData(snapshotData.current, 0, 0);
        drawLine(startX.current, startY.current, x, y, ctx, color);
      }
    },
    [tool, color, getContext, drawLine, canvasRef]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current) return;

      const canvas = canvasRef.current;
      const ctx = getContext();
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tool === 'line' && snapshotData.current) {
        // Draw final line
        drawLine(startX.current, startY.current, x, y, ctx, color);
        snapshotData.current = null;
      }

      isDrawing.current = false;
    },
    [tool, color, getContext, drawLine, canvasRef]
  );

  return {
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};
