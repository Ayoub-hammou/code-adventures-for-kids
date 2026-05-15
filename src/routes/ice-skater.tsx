import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/ice-skater")({ component: IceSkaterPage });

type Level = "easy" | "normal" | "hard";
type Direction = "up" | "down" | "left" | "right";

interface GameState {
  playerX: number;
  playerY: number;
  direction: Direction | null;
  won: boolean;
  gameStarted: boolean;
  moves: string[];
}

const GRID_SIZE = 10;
const CELL_SIZE = 40;

const generateLevel = (
  level: Level,
): { obstacles: Set<string>; exit: { x: number; y: number } } => {
  const obstacles = new Set<string>();
  let exit: { x: number; y: number };

  if (level === "easy") {
    // Easy: 10x10 grid with custom designed maze
    // Start at (0,0), End at (9,9)
    obstacles.add("2,0");
    obstacles.add("3,0");
    obstacles.add("4,0");
    obstacles.add("5,0");
    obstacles.add("6,0");
    obstacles.add("7,0");
    obstacles.add("8,0");
    obstacles.add("9,0");
    obstacles.add("0,1");
    obstacles.add("2,1");
    obstacles.add("9,1");
    obstacles.add("0,2");
    obstacles.add("2,2");
    obstacles.add("4,2");
    obstacles.add("5,2");
    obstacles.add("6,2");
    obstacles.add("7,2");
    obstacles.add("9,2");
    obstacles.add("0,3");
    obstacles.add("2,3");
    obstacles.add("4,3");
    obstacles.add("7,3");
    obstacles.add("9,3");
    obstacles.add("0,4");
    obstacles.add("2,4");
    obstacles.add("4,4");
    obstacles.add("6,4");
    obstacles.add("7,4");
    obstacles.add("9,4");
    obstacles.add("0,5");
    obstacles.add("4,5");
    obstacles.add("6,5");
    obstacles.add("9,5");
    obstacles.add("0,6");
    obstacles.add("1,6");
    obstacles.add("2,6");
    obstacles.add("4,6");
    obstacles.add("6,6");
    obstacles.add("8,6");
    obstacles.add("9,6");
    obstacles.add("0,7");
    obstacles.add("4,7");
    obstacles.add("8,7");
    obstacles.add("9,7");
    obstacles.add("0,8");
    obstacles.add("2,8");
    obstacles.add("3,8");
    obstacles.add("4,8");
    obstacles.add("5,8");
    obstacles.add("6,8");
    obstacles.add("9,8");
    obstacles.add("0,9");
    obstacles.add("6,9");
    obstacles.add("7,9");
    exit = { x: 9, y: 9 };
  } else if (level === "normal") {
    // Normal: 10x10 grid, 8-10 moves with alternating obstacles
    // Start at (0,0), End at (9,9)
    obstacles.add("2,0");
    obstacles.add("4,0");
    obstacles.add("0,1");
    obstacles.add("2,2");
    obstacles.add("4,2");
    obstacles.add("1,3");
    obstacles.add("3,3");
    obstacles.add("5,3");
    obstacles.add("0,4");
    obstacles.add("2,4");
    obstacles.add("4,4");
    obstacles.add("1,5");
    obstacles.add("3,5");
    obstacles.add("5,5");
    obstacles.add("2,6");
    obstacles.add("4,6");
    obstacles.add("3,7");
    obstacles.add("5,7");
    obstacles.add("4,8");
    obstacles.add("6,8");
    exit = { x: 9, y: 9 };
  } else {
    // Hard: 10x10 grid with custom designed maze
    // Start at (0,0), End at (9,9)
    // 16 obstacles strategically placed
    obstacles.add("3,0");
    obstacles.add("8,0");
    obstacles.add("2,1");
    obstacles.add("6,1");
    obstacles.add("4,2");
    obstacles.add("9,2");
    obstacles.add("0,3");
    obstacles.add("7,3");
    obstacles.add("2,4");
    obstacles.add("5,4");
    obstacles.add("8,5");
    obstacles.add("1,6");
    obstacles.add("4,6");
    obstacles.add("6,7");
    obstacles.add("0,8");
    obstacles.add("3,8");
    obstacles.add("8,8");
    obstacles.add("5,9");
    exit = { x: 9, y: 9 };
  }

  return { obstacles, exit };
};

const T = {
  title: { en: "Ice Skater", fr: "Patineur sur Glace", nl: "IJsschaatser" },
  concept: { en: "Loops & Logic", fr: "Boucles & Logique", nl: "Lussen & Logica" },
  intro: {
    en: "Help the skater escape the ice rink! You control their direction, and they LOOP until they hit an obstacle. Navigate around the blocks to reach the exit!",
    fr: "Aide le patineur à s'échapper de la patinoire ! Tu contrôles sa direction, et il BOUCLE jusqu'à heurter un obstacle. Navigue autour des blocs pour atteindre la sortie !",
    nl: "Help de schaatser de ijsbaan af! Je bestuurt hun richting, en ze LOPEN door tot ze een obstakel raken. Navigeer rond de blokken om de uitgang te bereiken!",
  },
  easyLevel: { en: "Easy", fr: "Facile", nl: "Makkelijk" },
  normalLevel: { en: "Normal", fr: "Normal", nl: "Normaal" },
  hardLevel: { en: "Hard", fr: "Difficile", nl: "Moeilijk" },
  selectLevel: { en: "Select Level", fr: "Choisis le Niveau", nl: "Kies Niveau" },
  up: { en: "↑ Up", fr: "↑ Haut", nl: "↑ Omhoog" },
  down: { en: "↓ Down", fr: "↓ Bas", nl: "↓ Omlaag" },
  left: { en: "← Left", fr: "← Gauche", nl: "← Links" },
  right: { en: "→ Right", fr: "→ Droite", nl: "→ Rechts" },
  reset: { en: "↺ Reset", fr: "↺ Réinitialiser", nl: "↺ Reset" },
  won: { en: "🎉 Escaped!", fr: "🎉 Échappé !", nl: "🎉 Ontsnapt!" },
  position: { en: "Position", fr: "Position", nl: "Positie" },
  moves: { en: "Moves", fr: "Mouvements", nl: "Zetten" },
  code: {
    en: `# Set initial position
x = 0
y = 0

# Define a function to slide in a direction
function slide(direction):
  while NOT at_obstacle(x, y, direction):
    move(x, y, direction)

# Loop until you reach the exit
while NOT at_exit(x, y):
  direction = ask_player("Up/Down/Left/Right?")
  slide(direction)

print("Escaped!")`,
    fr: `# Définir la position initiale
x = 0
y = 0

# Définir une fonction pour glisser
fonction glisser(direction):
  tant que PAS obstacle(x, y, direction):
    bouger(x, y, direction)

# Boucler jusqu'à atteindre la sortie
tant que PAS sortie(x, y):
  direction = demander("Haut/Bas/Gauche/Droite?")
  glisser(direction)

afficher("Échappé !")`,
    nl: `# Initiële positie instellen
x = 0
y = 0

# Definieer functie om te glijden
functie glijden(richting):
  zolang GEEN obstakel(x, y, richting):
    verplaats(x, y, richting)

# Loop tot je de uitgang bereikt
zolang GEEN uitgang(x, y):
  richting = vraag("Omhoog/Omlaag/Links/Rechts?")
  glijden(richting)

druk_af("Ontsnapt!")`,
  },
};

function IceSkaterPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string =>
    pick(lang, T[k] as { en: string; fr?: string; nl?: string }) as string;

  const [level, setLevel] = useState<Level | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    playerX: 0,
    playerY: 0,
    direction: null,
    won: false,
    gameStarted: false,
    moves: [],
  });

  const levelData = level
    ? generateLevel(level)
    : { obstacles: new Set<string>(), exit: { x: 6, y: 6 } };
  const { obstacles, exit } = levelData;

  const touchStartRef = useRef({ x: 0, y: 0 });

  const movePlayer = (direction: Direction) => {
    if (gameState.won || !level) return;

    let newX = gameState.playerX;
    let newY = gameState.playerY;
    const newMoves = [...gameState.moves];

    const slideDir = direction;
    newMoves.push(direction);

    while (true) {
      let nextX = newX;
      let nextY = newY;

      if (slideDir === "up") nextY--;
      else if (slideDir === "down") nextY++;
      else if (slideDir === "left") nextX--;
      else if (slideDir === "right") nextX++;

      if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) {
        break;
      }

      if (obstacles.has(`${nextX},${nextY}`)) {
        break;
      }

      newX = nextX;
      newY = nextY;
    }

    const won = newX === exit.x && newY === exit.y;

    setGameState({
      playerX: newX,
      playerY: newY,
      direction: slideDir,
      won,
      gameStarted: true,
      moves: newMoves,
    });
  };

  const startGame = (selectedLevel: Level) => {
    setLevel(selectedLevel);
    setGameState({
      playerX: 0,
      playerY: 0,
      direction: null,
      won: false,
      gameStarted: true,
      moves: [],
    });
  };

  const resetGame = () => {
    if (level) {
      setGameState({
        playerX: 0,
        playerY: 0,
        direction: null,
        won: false,
        gameStarted: true,
        moves: [],
      });
    }
  };

  const backToLevelSelect = () => {
    setLevel(null);
    setGameState({
      playerX: 0,
      playerY: 0,
      direction: null,
      won: false,
      gameStarted: false,
      moves: [],
    });
  };

  // Keyboard controls
  useEffect(() => {
    if (!gameState.gameStarted || gameState.won) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        movePlayer("up");
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        movePlayer("down");
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        movePlayer("left");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        movePlayer("right");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState]);

  // Touch/swipe controls
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!gameState.gameStarted || gameState.won) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;
    const threshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > threshold) {
        movePlayer("right");
      } else if (deltaX < -threshold) {
        movePlayer("left");
      }
    } else {
      // Vertical swipe
      if (deltaY > threshold) {
        movePlayer("down");
      } else if (deltaY < -threshold) {
        movePlayer("up");
      }
    }
  };

  return (
    <GameLayout
      title={t("title")}
      emoji="⛸️"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
      codeKey={level ?? "select"}
    >
      {!level ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-6">{t("selectLevel")}</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => startGame("easy")}
              className="rounded-2xl border-2 border-border bg-green-50 dark:bg-green-950 p-6 hover:border-green-500 hover:bg-green-100 dark:hover:bg-green-900 transition font-bold text-lg"
            >
              {t("easyLevel")}
            </button>
            <button
              onClick={() => startGame("normal")}
              className="rounded-2xl border-2 border-border bg-yellow-50 dark:bg-yellow-950 p-6 hover:border-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition font-bold text-lg"
            >
              {t("normalLevel")}
            </button>
            <button
              onClick={() => startGame("hard")}
              className="rounded-2xl border-2 border-border bg-red-50 dark:bg-red-950 p-6 hover:border-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition font-bold text-lg"
            >
              {t("hardLevel")}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="rounded-xl bg-secondary p-3 text-center">
                <div className="text-xs text-muted-foreground">
                  {t("position")}
                </div>
                <div className="font-mono font-bold">
                  ({gameState.playerX}, {gameState.playerY})
                </div>
              </div>
              <div className="rounded-xl bg-secondary p-3 text-center">
                <div className="text-xs text-muted-foreground">{t("moves")}</div>
                <div className="font-mono font-bold">
                  {gameState.moves.length}
                </div>
              </div>
            </div>
            <button
              onClick={backToLevelSelect}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {t("selectLevel")}
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <div
              className="relative bg-blue-100 dark:bg-blue-950 border-4 border-blue-400 rounded-lg touch-none"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {Array.from({ length: GRID_SIZE - 1 }).map((_, i) => (
                <div
                  key={`v${i}`}
                  className="absolute bg-blue-200 dark:bg-blue-900"
                  style={{
                    top: 0,
                    left: (i + 1) * CELL_SIZE,
                    width: 1,
                    height: "100%",
                  }}
                />
              ))}
              {Array.from({ length: GRID_SIZE - 1 }).map((_, i) => (
                <div
                  key={`h${i}`}
                  className="absolute bg-blue-200 dark:bg-blue-900"
                  style={{
                    top: (i + 1) * CELL_SIZE,
                    left: 0,
                    width: "100%",
                    height: 1,
                  }}
                />
              ))}

              {Array.from(obstacles).map((obs) => {
                const [x, y] = obs.split(",").map(Number);
                return (
                  <div
                    key={`obs-${obs}`}
                    className="absolute bg-gray-400 dark:bg-gray-600 rounded"
                    style={{
                      left: x * CELL_SIZE + 2,
                      top: y * CELL_SIZE + 2,
                      width: CELL_SIZE - 4,
                      height: CELL_SIZE - 4,
                    }}
                  />
                );
              })}

              <div
                className="absolute bg-green-400 dark:bg-green-600 rounded flex items-center justify-center font-bold text-lg"
                style={{
                  left: exit.x * CELL_SIZE + 2,
                  top: exit.y * CELL_SIZE + 2,
                  width: CELL_SIZE - 4,
                  height: CELL_SIZE - 4,
                }}
              >
                ✓
              </div>

              <div
                className="absolute bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center font-bold text-white transition-all"
                style={{
                  left: gameState.playerX * CELL_SIZE + 4,
                  top: gameState.playerY * CELL_SIZE + 4,
                  width: CELL_SIZE - 8,
                  height: CELL_SIZE - 8,
                }}
              >
                ⛸️
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground mb-4">
            💡 Use arrow keys, WASD, or swipe to move
          </div>

          {gameState.won && (
            <div className="rounded-xl bg-green-50 dark:bg-green-950 border-2 border-green-400 p-4 text-center mb-6">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {t("won")}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 w-fit mx-auto mb-6">
            <div />
            <button
              onClick={() => movePlayer("up")}
              disabled={gameState.won}
              className="rounded-xl border-2 border-border bg-card p-4 hover:border-primary disabled:opacity-50 transition font-bold text-lg"
            >
              {t("up")}
            </button>
            <div />
            <button
              onClick={() => movePlayer("left")}
              disabled={gameState.won}
              className="rounded-xl border-2 border-border bg-card p-4 hover:border-primary disabled:opacity-50 transition font-bold text-lg"
            >
              {t("left")}
            </button>
            <button
              onClick={() => movePlayer("down")}
              disabled={gameState.won}
              className="rounded-xl border-2 border-border bg-card p-4 hover:border-primary disabled:opacity-50 transition font-bold text-lg"
            >
              {t("down")}
            </button>
            <button
              onClick={() => movePlayer("right")}
              disabled={gameState.won}
              className="rounded-xl border-2 border-border bg-card p-4 hover:border-primary disabled:opacity-50 transition font-bold text-lg"
            >
              {t("right")}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={resetGame}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {t("reset")}
            </button>
          </div>
        </div>
      )}
    </GameLayout>
  );
}













