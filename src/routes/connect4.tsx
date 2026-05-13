import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/connect4")({ component: ConnectPage });

const ROWS = 6;
const COLS = 7;
type Cell = 0 | 1 | 2;

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0) as Cell[]);
}

function checkWin(board: Cell[][], player: Cell): boolean {
  // 🔄 LOOPS over every starting cell, in 4 directions
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;
      for (const [dr, dc] of dirs) {
        let count = 0;
        for (let k = 0; k < 4; k++) {
          const rr = r + dr * k;
          const cc = c + dc * k;
          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) break;
          if (board[rr][cc] !== player) break;
          count++;
        }
        if (count === 4) return true;
      }
    }
  }
  return false;
}

function ConnectPage() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [player, setPlayer] = useState<Cell>(1);
  const [winner, setWinner] = useState<Cell | null>(null);
  const [draw, setDraw] = useState(false);

  function drop(col: number) {
    if (winner || draw) return;
    // Loop from bottom up to find first empty row
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === 0) {
        const next = board.map((row) => row.slice()) as Cell[][];
        next[r][col] = player;
        setBoard(next);
        if (checkWin(next, player)) {
          setWinner(player);
        } else if (next.flat().every((c) => c !== 0)) {
          setDraw(true);
        } else {
          setPlayer(player === 1 ? 2 : 1);
        }
        return;
      }
    }
  }

  function reset() {
    setBoard(emptyBoard());
    setPlayer(1);
    setWinner(null);
    setDraw(false);
  }

  const colorFor = (c: Cell) =>
    c === 1 ? "var(--fun-red)" : c === 2 ? "var(--fun-yellow)" : "transparent";

  return (
    <GameLayout
      title="4 in a Row"
      emoji="🔴"
      concept="Loops & Conditions"
      intro="Drop a disc into a column. First to align FOUR in a row, column, or diagonal wins!"
      code={`function checkWin(board, player):
  # 🔄 try every cell as a start
  for r in 0..rows:
    for c in 0..cols:
      # 🔄 try 4 directions
      for dir in directions:
        count = 0
        # 🔄 check next 4 cells
        for k in 0..4:
          if cell == player:
            count = count + 1
        if count == 4:
          return true
  return false`}
    >
      <div className="text-center mb-4">
        {winner ? (
          <div className="text-2xl font-bold">
            🏆 Player <span style={{ color: colorFor(winner) }}>{winner === 1 ? "Red" : "Yellow"}</span> wins!
          </div>
        ) : draw ? (
          <div className="text-2xl font-bold">🤝 It's a draw!</div>
        ) : (
          <div className="text-lg font-semibold">
            Turn:{" "}
            <span
              className="inline-block w-6 h-6 rounded-full align-middle border-2 border-foreground"
              style={{ backgroundColor: colorFor(player) }}
            />{" "}
            {player === 1 ? "Red" : "Yellow"}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-[var(--fun-blue)] p-3 inline-block mx-auto">
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {Array.from({ length: COLS }).map((_, c) => (
            <button
              key={`btn-${c}`}
              onClick={() => drop(c)}
              className="text-xl hover:bg-white/20 rounded-md py-1 transition"
              aria-label={`Drop in column ${c + 1}`}
            >
              ⬇
            </button>
          ))}
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => drop(c)}
                className="aspect-square rounded-full bg-background/90 cursor-pointer flex items-center justify-center"
              >
                {cell !== 0 && (
                  <div
                    className="w-[85%] h-[85%] rounded-full shadow-inner"
                    style={{ backgroundColor: colorFor(cell), boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.2)" }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="mt-5 text-center">
        <button onClick={reset} className="rounded-xl bg-primary text-primary-foreground px-5 py-2 font-bold hover:scale-105 transition">
          ↺ New game
        </button>
      </div>
    </GameLayout>
  );
}
