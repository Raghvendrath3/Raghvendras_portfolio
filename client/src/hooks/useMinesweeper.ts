import { useState, useCallback, useEffect } from 'react';

const ROWS = 9;
const COLS = 9;
const MINE_COUNT = 10;

export const useMinesweeper = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [flagged, setFlagged] = useState<boolean[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // Initialize empty board
  const initializeBoard = useCallback(() => {
    const newBoard = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(0));
    const newRevealed = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(false));
    const newFlagged = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(false));

    setBoard(newBoard);
    setRevealed(newRevealed);
    setFlagged(newFlagged);
    setGameOver(false);
    setWon(false);
    setFirstClick(true);
    setSeconds(0);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  // Mine placement with first-click safety
  const placeMines = useCallback((safeRow: number, safeCol: number) => {
    const newBoard = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(0));
    let minesPlaced = 0;

    while (minesPlaced < MINE_COUNT) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);

      // Skip if already a mine or in safe zone
      if (
        newBoard[r]![c] === -1 ||
        (Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1)
      ) {
        continue;
      }

      newBoard[r]![c] = -1;
      minesPlaced++;
    }

    // Calculate adjacent mine counts
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (newBoard[r]![c] !== -1) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                if (newBoard[nr]![nc] === -1) count++;
              }
            }
          }
          newBoard[r]![c] = count;
        }
      }
    }

    return newBoard;
  }, []);

  // Iterative flood fill reveal
  const floodFill = useCallback(
    (startRow: number, startCol: number, newRevealed: boolean[][]) => {
      const stack: [number, number][] = [[startRow, startCol]];
      const visited = new Set<string>();

      while (stack.length > 0) {
        const [r, c] = stack.pop()!;
        const key = `${r},${c}`;

        if (visited.has(key) || r < 0 || r >= ROWS || c < 0 || c >= COLS) {
          continue;
        }

        visited.add(key);
        newRevealed[r]![c] = true;

        // If cell has 0 adjacent mines, add neighbors
        if (board[r] && board[r]![c] === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (
                nr >= 0 &&
                nr < ROWS &&
                nc >= 0 &&
                nc < COLS &&
                !newRevealed[nr]![nc]
              ) {
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    },
    [board]
  );

  // Handle cell click
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gameOver || won || flagged[row]![col]) return;

      let newBoard = board;
      let newRevealed = revealed.map((r) => [...r]);

      // Place mines on first click
      if (firstClick) {
        newBoard = placeMines(row, col);
        setBoard(newBoard);
        setFirstClick(false);
      }

      // Reveal cell
      if (newBoard[row]![col] === -1) {
        // Hit a mine - game over
        newRevealed[row]![col] = true;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (newBoard[r]![c] === -1) {
              newRevealed[r]![c] = true;
            }
          }
        }
        setGameOver(true);
      } else {
        // Safe cell
        if (newBoard[row]![col] === 0) {
          floodFill(row, col, newRevealed);
        } else {
          newRevealed[row]![col] = true;
        }

        // Check win condition
        let allNonMinesRevealed = true;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (newBoard[r]![c] !== -1 && !newRevealed[r]![c]) {
              allNonMinesRevealed = false;
              break;
            }
          }
          if (!allNonMinesRevealed) break;
        }

        if (allNonMinesRevealed) {
          setWon(true);
        }
      }

      setRevealed(newRevealed);
    },
    [board, revealed, flagged, gameOver, won, firstClick, placeMines, floodFill]
  );

  // Handle flag toggle
  const handleCellFlag = useCallback(
    (row: number, col: number) => {
      if (gameOver || won || revealed[row]![col]) return;

      const newFlagged = flagged.map((r) => [...r]);
      newFlagged[row]![col] = !newFlagged[row]![col];
      setFlagged(newFlagged);
    },
    [flagged, revealed, gameOver, won]
  );

  // Handle chord (double-click on numbered cell)
  const handleChord = useCallback(
    (row: number, col: number) => {
      if (gameOver || won || !revealed[row]![col]) return;
      const boardRow = board[row];
      if (!boardRow || !boardRow[col]) return;
      if (boardRow[col]! <= 0) return;

      const targetCount = boardRow[col];
      let flaggedCount = 0;
      const cellsToReveal: [number, number][] = [];

      // Count adjacent flagged cells and collect non-revealed cells
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            if (flagged[nr]![nc]) flaggedCount++;
            if (!revealed[nr]![nc] && !flagged[nr]![nc]) {
              cellsToReveal.push([nr, nc]);
            }
          }
        }
      }

      // Only chord if flagged count matches
      if (flaggedCount === targetCount) {
        let newRevealed = revealed.map((r) => [...r]);
        let hasMine = false;

        for (const [r, c] of cellsToReveal) {
          if (board[r]![c] === -1) {
            hasMine = true;
          } else if (board[r]![c] === 0) {
            floodFill(r, c, newRevealed);
          } else {
            newRevealed[r]![c] = true;
          }
        }

        if (hasMine) {
          // Reveal all mines
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              if (board[r]![c] === -1) {
                newRevealed[r]![c] = true;
              }
            }
          }
          setGameOver(true);
        } else {
          // Check win
          let allNonMinesRevealed = true;
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              if (board[r]![c] !== -1 && !newRevealed[r]![c]) {
                allNonMinesRevealed = false;
                break;
              }
            }
            if (!allNonMinesRevealed) break;
          }

          if (allNonMinesRevealed) {
            setWon(true);
          }
        }

        setRevealed(newRevealed);
      }
    },
    [board, revealed, flagged, gameOver, won, floodFill]
  );

  // Timer
  useEffect(() => {
    if (firstClick || gameOver || won) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [firstClick, gameOver, won]);

  const resetGame = useCallback(() => {
    initializeBoard();
  }, [initializeBoard]);

  // Count flagged mines
  const flaggedCount = flagged.reduce(
    (acc, row) => acc + row.filter((f) => f).length,
    0
  );
  const mineCountDisplay = MINE_COUNT - flaggedCount;

  return {
    board,
    revealed,
    flagged,
    gameOver,
    won,
    firstClick,
    seconds,
    mineCountDisplay,
    handleCellClick,
    handleCellFlag,
    handleChord,
    resetGame,
    rows: ROWS,
    cols: COLS
  };
};
