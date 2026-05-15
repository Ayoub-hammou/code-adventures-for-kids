import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/connect4")({ component: ConnectPage });

const ROWS = 6,
  COLS = 7;
type Cell = 0 | 1 | 2;

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0) as Cell[]);
}

function checkWin(board: Cell[][], player: Cell): boolean {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;
      for (const [dr, dc] of dirs) {
        let count = 0;
        for (let k = 0; k < 4; k++) {
          const rr = r + dr * k,
            cc = c + dc * k;
          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) break;
          if (board[rr][cc] !== player) break;
          count++;
        }
        if (count === 4) return true;
      }
    }
  return false;
}

const T = {
  title: { en: "4 in a Row", fr: "Puissance 4", nl: "Vier op een Rij" },
  concept: { en: "Loops & Conditions", fr: "Boucles & Conditions", nl: "Lussen & Condities" },
  intro: {
    en: "Drop a disc into a column. First to align FOUR in a row, column, or diagonal wins!",
    fr: "Lâche un jeton dans une colonne. Le premier à aligner QUATRE jetons gagne !",
    nl: "Laat een schijf in een kolom vallen. Eerste met VIER op een rij wint!",
  },
  red: { en: "Red", fr: "Rouge", nl: "Rood" },
  yellow: { en: "Yellow", fr: "Jaune", nl: "Geel" },
  wins: { en: "wins!", fr: "gagne !", nl: "wint!" },
  draw: { en: "🤝 It's a draw!", fr: "🤝 Match nul !", nl: "🤝 Gelijkspel!" },
  turn: { en: "Turn:", fr: "Tour :", nl: "Beurt:" },
  newGame: { en: "↺ New game", fr: "↺ Nouvelle partie", nl: "↺ Nieuw spel" },
  code: {
    en: `function checkWin(board, player):\n  # 🔄 try every cell as a start\n  for r in 0..rows:\n    for c in 0..cols:\n      # 🔄 try 4 directions\n      for dir in directions:\n        count = 0\n        # 🔄 check next 4 cells\n        for k in 0..4:\n          if cell == player:\n            count = count + 1\n        if count == 4:\n          return true\n  return false`,
    fr: `fonction verifierVictoire(plateau, joueur):\n  # 🔄 essaie chaque case comme départ\n  pour r de 0 à lignes:\n    pour c de 0 à cols:\n      # 🔄 essaie 4 directions\n      pour dir dans directions:\n        compte = 0\n        # 🔄 vérifie 4 cases\n        pour k de 0 à 4:\n          si case == joueur:\n            compte = compte + 1\n        si compte == 4:\n          retourner vrai\n  retourner faux`,
    nl: `functie checkWinst(bord, speler):\n  # 🔄 probeer elke cel als start\n  voor r in 0..rijen:\n    voor c in 0..kols:\n      # 🔄 probeer 4 richtingen\n      voor dir in richtingen:\n        teller = 0\n        # 🔄 check 4 cellen\n        voor k in 0..4:\n          als cel == speler:\n            teller = teller + 1\n        als teller == 4:\n          geef waar terug\n  geef onwaar terug`,
  },
};

function ConnectPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as any) as string;
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [player, setPlayer] = useState<Cell>(1);
  const [winner, setWinner] = useState<Cell | null>(null);
  const [draw, setDraw] = useState(false);

  function drop(col: number) {
    if (winner || draw) return;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === 0) {
        const next = board.map((row) => row.slice()) as Cell[][];
        next[r][col] = player;
        setBoard(next);
        if (checkWin(next, player)) setWinner(player);
        else if (next.flat().every((c) => c !== 0)) setDraw(true);
        else setPlayer(player === 1 ? 2 : 1);
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
  const playerName = (c: Cell) => (c === 1 ? t("red") : t("yellow"));

  return (
    <GameLayout
      title={t("title")}
      emoji="🔴"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="text-center mb-4">
        {winner ? (
          <div className="text-2xl font-bold">
            🏆 <span style={{ color: colorFor(winner) }}>{playerName(winner)}</span> {t("wins")}
          </div>
        ) : draw ? (
          <div className="text-2xl font-bold">{t("draw")}</div>
        ) : (
          <div className="text-lg font-semibold">
            {t("turn")}{" "}
            <span
              className="inline-block w-6 h-6 rounded-full align-middle border-2 border-foreground"
              style={{ backgroundColor: colorFor(player) }}
            />{" "}
            {playerName(player)}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-[var(--fun-blue)] p-3 inline-block mx-auto">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: COLS }).map((_, c) => (
            <button
              key={`btn-${c}`}
              onClick={() => drop(c)}
              className="text-xl hover:bg-white/20 rounded-md py-1 transition"
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
                    className="w-[85%] h-[85%] rounded-full"
                    style={{
                      backgroundColor: colorFor(cell),
                      boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.2)",
                    }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="mt-5 text-center">
        <button
          onClick={reset}
          className="rounded-xl bg-primary text-primary-foreground px-5 py-2 font-bold hover:scale-105 transition"
        >
          {t("newGame")}
        </button>
      </div>
    </GameLayout>
  );
}
