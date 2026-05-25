import React, { memo } from 'react';
import { Win98Window } from '../ui/Win98Window';
import { Win98Button } from '../ui/Win98Button';
import { useMinesweeper } from '../../hooks/useMinesweeper';
import { useWindowStore } from '../../store/useWindowStore';

// Memoized cell component to prevent unnecessary re-renders
const MinesweeperCell = memo(
  ({
    revealed,
    flagged,
    value,
    onClick,
    onFlag,
    onChord
  }: {
    revealed: boolean;
    flagged: boolean;
    value: number;
    onClick: () => void;
    onFlag: (e: React.MouseEvent) => void;
    onChord: () => void;
  }) => {
    const getCellColor = (val: number): string => {
      const colors: Record<number, string> = {
        1: '#0000FF',
        2: '#007B00',
        3: '#FF0000',
        4: '#00007B',
        5: '#7B0000',
        6: '#007B7B',
        7: '#000000',
        8: '#7B7B7B'
      };
      return colors[val] || '#000000';
    };

    if (!revealed) {
      return (
        <button
          className="w-[22px] h-[22px] border-2 border-t-white border-l-white border-r-border-dark border-b-border-dark bg-win-gray hover:bg-slate-300 flex items-center justify-center text-[11px] font-win cursor-pointer active:border-t-border-dark active:border-l-border-dark active:border-r-white active:border-b-white"
          onClick={onClick}
          onContextMenu={onFlag}
          onDoubleClick={onChord}
        >
          {flagged && '>'}
        </button>
      );
    }

    if (value === -1) {
      // Mine
      return (
        <div className="w-[22px] h-[22px] border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-win-gray flex items-center justify-center text-[11px] font-win">
          *
        </div>
      );
    }

    if (value === 0) {
      // Empty
      return (
        <div className="w-[22px] h-[22px] border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white" />
      );
    }

    // Number
    return (
      <div
        className="w-[22px] h-[22px] border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white flex items-center justify-center text-[11px] font-bold font-win"
        style={{ color: getCellColor(value) }}
      >
        {value}
      </div>
    );
  }
);

MinesweeperCell.displayName = 'MinesweeperCell';

export const MinesweeperApp: React.FC = () => {
  const minesweeperWindow = useWindowStore((state) => state.windows['minesweeper']);
  if (!minesweeperWindow?.isOpen) return null;

  const {
    board,
    revealed,
    flagged,
    gameOver,
    won,
    seconds,
    mineCountDisplay,
    handleCellClick,
    handleCellFlag,
    handleChord,
    resetGame,
    rows,
    cols
  } = useMinesweeper();

  const getFaceCharacter = () => {
    if (gameOver) return 'xX';
    if (won) return '8D';
    return 'B)';
  };

  return (
    <Win98Window
      id="minesweeper"
      title="Minesweeper"
      showMenubar={false}
      statusbarContent={['Minesweeper']}
    >
      <div className="p-3 bg-win-gray flex flex-col gap-3 h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 select-none">
          {/* Mine counter */}
          <div
            className="px-2 py-1 text-[12px] font-mono font-bold"
            style={{
              background: '#000',
              color: '#FF0000',
              minWidth: '40px'
            }}
          >
            {String(mineCountDisplay).padStart(3, '0')}
          </div>

          {/* Reset face button */}
          <Win98Button onClick={resetGame} className="select-none px-2 py-1">
            {getFaceCharacter()}
          </Win98Button>

          {/* Timer */}
          <div
            className="px-2 py-1 text-[12px] font-mono font-bold"
            style={{
              background: '#000',
              color: '#FF0000',
              minWidth: '40px'
            }}
          >
            {String(seconds).padStart(3, '0')}
          </div>
        </div>

        {/* Grid */}
        <div
          className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white p-2 bg-win-gray flex justify-center flex-1 overflow-auto"
          style={{ alignItems: 'flex-start' }}
        >
          <div className="flex flex-col gap-0 select-none">
            {Array(rows)
              .fill(null)
              .map((_, r) => (
                <div key={r} className="flex gap-0">
                  {Array(cols)
                    .fill(null)
                    .map((_, c) => (
                      <MinesweeperCell
                        key={`${r}-${c}`}
                        revealed={revealed[r]?.[c] ?? false}
                        flagged={flagged[r]?.[c] ?? false}
                        value={board[r]?.[c] ?? 0}
                        onClick={() => handleCellClick(r, c)}
                        onFlag={(e) => {
                          e.preventDefault();
                          handleCellFlag(r, c);
                        }}
                        onChord={() => handleChord(r, c)}
                      />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Win98Window>
  );
};
