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
  hasKey: boolean;
}

const CELL_SIZE = 40;

const GRID_SIZE_CONFIG: Record<Level, { width: number; height: number }> = {
  easy: { width: 9, height: 4 },
  normal: { width: 7, height: 7 },
  hard: { width: 14, height: 12 },
};

const generateLevel = (
  level: Level,
): {
  obstacles: Set<string>;
  exit: { x: number; y: number };
  start: { x: number; y: number };
  width: number;
  height: number;
  key?: { x: number; y: number };
} => {
  const obstacles = new Set<string>();
  let exit: { x: number; y: number };
  let start: { x: number; y: number };
  let key: { x: number; y: number } | undefined;
  const config = GRID_SIZE_CONFIG[level];

  if (level === "easy") {
    // Easy: 9x4 grid with custom designed maze
    // Start at (0,2), Escape at (8,1)
    obstacles.add("2,0");
    obstacles.add("8,0");
    obstacles.add("6,2");
    obstacles.add("8,2");
    obstacles.add("1,3");
    obstacles.add("4,3");
    obstacles.add("8,3");
    exit = { x: 8, y: 1 };
    start = { x: 0, y: 2 };
  } else if (level === "normal") {
    // Normal: 7x7 grid with key mechanic
    // Start at (0,0), Key at (6,1), Escape at (0,3)
    obstacles.add("3,0");
    obstacles.add("4,0");
    obstacles.add("6,0");
    obstacles.add("0,1");
    obstacles.add("0,2");
    obstacles.add("6,2");
    obstacles.add("2,3");
    obstacles.add("0,5");
    obstacles.add("5,5");
    obstacles.add("0,6");
    exit = { x: 0, y: 3 };
    start = { x: 0, y: 0 };
    key = { x: 6, y: 1 };
  } else {
    // Hard: 14x12 grid with custom designed maze
    // Start at (13,11), Escape at (13,7)
    obstacles.add("8,0");
    obstacles.add("3,1");
    obstacles.add("9,2");
    obstacles.add("1,3");
    obstacles.add("0,4");
    obstacles.add("8,4");
    obstacles.add("13,5");
    obstacles.add("6,6");
    obstacles.add("2,7");
    obstacles.add("13,8");
    obstacles.add("7,9");
    obstacles.add("5,10");
    obstacles.add("9,10");
    exit = { x: 13, y: 7 };
    start = { x: 13, y: 11 };
  }

  return { obstacles, exit, start, width: config.width, height: config.height, key };
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
  
  # On medium level, check if we picked up the key
  if at_key(x, y):
    hasKey = true

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
  
  # Au niveau moyen, vérifier si nous avons récupéré la clé
  si at_clé(x, y):
    avonsClé = vrai

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
  
  # Op middelmatig niveau, controleer of we de sleutel hebben opgepakt
  als at_sleutel(x, y):
    heeftSleutel = waar

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
    hasKey: false,
  });

  const levelData = level
    ? generateLevel(level)
    : {
        obstacles: new Set<string>(),
        exit: { x: 6, y: 6 },
        start: { x: 0, y: 0 },
        width: 10,
        height: 10,
      };
  const { obstacles, exit, width, height, key } = levelData;

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

      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
        break;
      }

      if (obstacles.has(`${nextX},${nextY}`)) {
        break;
      }

      newX = nextX;
      newY = nextY;
    }

    // Check if player picked up the key
    let newHasKey = gameState.hasKey;
    if (key && newX === key.x && newY === key.y) {
      newHasKey = true;
    }

    // Check if player reached exit (only if key is picked up, or no key exists)
    const won = newX === exit.x && newY === exit.y && (!key || newHasKey);

    setGameState({
      playerX: newX,
      playerY: newY,
      direction: slideDir,
      won,
      gameStarted: true,
      moves: newMoves,
      hasKey: newHasKey,
    });
  };

  const startGame = (selectedLevel: Level) => {
    setLevel(selectedLevel);
    const levelData = generateLevel(selectedLevel);
    setGameState({
      playerX: levelData.start.x,
      playerY: levelData.start.y,
      direction: null,
      won: false,
      gameStarted: true,
      moves: [],
      hasKey: false,
    });
  };

  const resetGame = () => {
    if (level) {
      const levelData = generateLevel(level);
      setGameState({
        playerX: levelData.start.x,
        playerY: levelData.start.y,
        direction: null,
        won: false,
        gameStarted: true,
        moves: [],
        hasKey: false,
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
      hasKey: false,
    });
  };

  // Keyboard controls
  useEffect(() => {
    if (!gameState.gameStarted || gameState.won) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        movePlayer("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        movePlayer("down");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        movePlayer("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        movePlayer("right");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      code={level ? t("code") : ""}
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
                <div className="text-xs text-muted-foreground">{t("position")}</div>
                <div className="font-mono font-bold">
                  ({gameState.playerX}, {gameState.playerY})
                </div>
              </div>
              <div className="rounded-xl bg-secondary p-3 text-center">
                <div className="text-xs text-muted-foreground">{t("moves")}</div>
                <div className="font-mono font-bold">{gameState.moves.length}</div>
              </div>
              {key && (
                <div className="rounded-xl bg-secondary p-3 text-center">
                  <div className="text-xs text-muted-foreground">Key</div>
                  <div className="font-bold text-lg">{gameState.hasKey ? "🔑" : "⭕"}</div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={backToLevelSelect}
                className="text-sm font-semibold text-primary hover:underline"
              >
                {t("selectLevel")}
              </button>
              <button
                onClick={resetGame}
                className="text-sm font-semibold text-primary hover:underline"
              >
                {t("reset")}
              </button>
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <div
              className="relative bg-blue-100 dark:bg-blue-950 border-4 border-blue-400 rounded-lg touch-none"
              style={{
                width: width * CELL_SIZE,
                height: height * CELL_SIZE,
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {Array.from({ length: width - 1 }).map((_, i) => (
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
              {Array.from({ length: height - 1 }).map((_, i) => (
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
                    className="absolute flex items-center justify-center text-4xl"
                    style={{
                      left: x * CELL_SIZE + 2,
                      top: y * CELL_SIZE + 2,
                      width: CELL_SIZE - 4,
                      height: CELL_SIZE - 4,
                    }}
                  >
                    🪨
                  </div>
                );
              })}

              {key && !gameState.hasKey && (
                <div
                  className="absolute flex items-center justify-center font-bold text-2xl"
                  style={{
                    left: key.x * CELL_SIZE + 2,
                    top: key.y * CELL_SIZE + 2,
                    width: CELL_SIZE - 4,
                    height: CELL_SIZE - 4,
                  }}
                >
                  🔑
                </div>
              )}

              <div
                className="absolute flex items-center justify-center text-4xl"
                style={{
                  left: exit.x * CELL_SIZE + 2,
                  top: exit.y * CELL_SIZE + 2,
                  width: CELL_SIZE - 4,
                  height: CELL_SIZE - 4,
                }}
              >
                {key && !gameState.hasKey ? "🔒" : "🚪"}
              </div>

              <div
                className="absolute flex items-center justify-center text-3xl transition-all"
                style={{
                  left: gameState.playerX * CELL_SIZE + 4,
                  top: gameState.playerY * CELL_SIZE + 4,
                  width: CELL_SIZE - 8,
                  height: CELL_SIZE - 8,
                }}
              >
                🏂
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground mb-4">
            💡 Use arrow keys or swipe to move
          </div>

          {gameState.won && (
            <div className="rounded-xl bg-green-50 dark:bg-green-950 border-2 border-green-400 p-4 text-center mb-6">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {t("won")}
              </div>
            </div>
          )}
        </div>
      )}
    </GameLayout>
  );
}
