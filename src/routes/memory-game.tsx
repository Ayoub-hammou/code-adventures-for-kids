import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/memory-game")({
  component: MemoryGamePage,
});

const T = {
  title: {
    en: "Memory Game",
    fr: "Jeu de Mémoire",
    nl: "Geheugenspel",
  },
  concept: {
    en: "Memory & Pattern Recognition",
    fr: "Mémoire & Reconnaissance de Motifs",
    nl: "Geheugen & Patroonherkenning",
  },
  intro: {
    en: "Match pairs of images! Remember where each image is. The faster you find matches, the better your memory!",
    fr: "Trouve les paires d'images ! Souviens-toi de où se trouve chaque image. Plus vite tu trouves les paires, mieux c'est !",
    nl: "Vind beelden die bij elkaar horen! Onthoud waar elk beeld is. Hoe sneller je paren vindt, hoe beter!",
  },
  easy: { en: "Easy", fr: "Facile", nl: "Gemakkelijk" },
  normal: { en: "Normal", fr: "Normal", nl: "Normaal" },
  hard: { en: "Hard", fr: "Difficile", nl: "Moeilijk" },
  newGame: { en: "New Game", fr: "Nouveau jeu", nl: "Nieuw spel" },
  levelSelect: { en: "Select Level", fr: "Choisis le niveau", nl: "Kies niveau" },
  matched: { en: "Matched!", fr: "Trouvé !", nl: "Gevonden!" },
  pairs: { en: "Pairs found", fr: "Paires trouvées", nl: "Paren gevonden" },
  moves: { en: "Moves", fr: "Mouvements", nl: "Zetten" },
  won: { en: "🎉 You won!", fr: "🎉 Tu as gagné !", nl: "🎉 Je hebt gewonnen!" },
  code: {
    en: `# Memory Game - Pattern Recognition & Memory
images = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

def play_memory():
  pairs = create_pairs(images)  # Create matching pairs
  cards = shuffle(pairs)        # Randomize positions
  flipped = []
  
  while not_all_matched:
    # Player flips 2 cards
    card1, card2 = wait_for_clicks(2)
    flipped.append(card1, card2)
    
    # Check if they match
    if cards[card1] == cards[card2]:
      matches += 1
      print("✅ Match found!")
    else:
      flip_back()  # Remember for next time!
    
    moves += 1
  
  return score(matches, moves)`,
    fr: `# Jeu de Mémoire - Récognition & Mémoire
images = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

def jouer_memoire():
  paires = creer_paires(images)  # Créer les paires
  cartes = melanger(paires)      # Aléatoire
  trouvees = []
  
  tant que pas_tout_trouve:
    # Joueur retourne 2 cartes
    carte1, carte2 = attendre_clics(2)
    
    # Vérifier si elles correspondent
    if cartes[carte1] == cartes[carte2]:
      trouvees.append(carte1, carte2)
      afficher("✅ Paire trouvée!")
    else:
      retourner()  # À retenir pour la suite!
    
    mouvements += 1`,
    nl: `# Geheugenspel - Herkenning & Geheugen
afbeeldingen = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

def speel_geheugen():
  paren = maak_paren(afbeeldingen)  # Maak paren
  kaarten = schudden(paren)         # Willekeurig
  gevonden = []
  
  terwijl niet_alles_gevonden:
    # Speler keert 2 kaarten om
    kaart1, kaart2 = wacht_op_kliks(2)
    
    # Controleren of ze passen
    if kaarten[kaart1] == kaarten[kaart2]:
      gevonden.append(kaart1, kaart2)
      print("✅ Paar gevonden!")
    else:
      omdraaien()  # Onthouden voor volgende keer!
    
    zetten += 1`,
  },
};

// Image emojis for pairs
const IMAGE_PAIRS = {
  easy: [
    "🐶", "🐱", "🐭", "🐹", "🐰",
  ],
  normal: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
  ],
  hard: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮",
  ],
};

interface Card {
  id: string;
  pairId: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGamePage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T) => pick(lang, T[k]);

  const [level, setLevel] = useState<"easy" | "normal" | "hard" | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  // Timer
  useEffect(() => {
    if (!level || matched.length === cards.length) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [level, matched, cards]);

  // Initialize game
  useEffect(() => {
    if (level) {
      initializeGame();
    }
  }, [level]);

  function initializeGame() {
    if (!level) return;
    const emojis = IMAGE_PAIRS[level];
    const gameCards: Card[] = [];

    emojis.forEach((emoji, index) => {
      // Create two cards for each emoji
      gameCards.push({
        id: `${index}_1`,
        pairId: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `${index}_2`,
        pairId: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    gameCards.sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
  }

  function handleCardClick(cardId: string) {
    if (matched.includes(cardId)) return;
    if (flipped.includes(cardId)) return;
    if (flipped.length >= 2) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = cards.find((c) => c.id === newFlipped[0]);
      const card2 = cards.find((c) => c.id === newFlipped[1]);

      if (card1 && card2 && card1.pairId === card2.pairId) {
        // Match!
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        // No match - flip back after delay
        setTimeout(() => setFlipped([]), 1000);
      }

      setMoves(moves + 1);
    }
  }

  const isWon = matched.length === cards.length && cards.length > 0;

  const getGridCols = () => {
    if (!level) return "grid-cols-3";
    if (level === "easy") return "grid-cols-5";
    if (level === "normal") return "grid-cols-4";
    return "grid-cols-4"; // Hard: 6 rows x 4 cols = 24 cards
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!level) {
    return (
      <GameLayout
        title={t("title")}
        emoji="🃏"
        concept={t("concept")}
        intro={t("intro")}
      >
        <div className="space-y-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-lg font-bold mb-4">
              {lang === "fr" ? "Choisis la difficulté" : lang === "nl" ? "Kies moeilijkheidsniveau" : "Choose difficulty"}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setLevel("easy")}
              className="w-full p-4 rounded-xl border-2 border-green-500 bg-green-50 hover:bg-green-100 font-bold text-lg transition active:scale-95"
            >
              {t("easy")} - 5 {lang === "fr" ? "paires" : lang === "nl" ? "paren" : "pairs"} 🟢
            </button>
            <button
              onClick={() => setLevel("normal")}
              className="w-full p-4 rounded-xl border-2 border-yellow-500 bg-yellow-50 hover:bg-yellow-100 font-bold text-lg transition active:scale-95"
            >
              {t("normal")} - 8 {lang === "fr" ? "paires" : lang === "nl" ? "paren" : "pairs"} 🟡
            </button>
            <button
              onClick={() => setLevel("hard")}
              className="w-full p-4 rounded-xl border-2 border-red-500 bg-red-50 hover:bg-red-100 font-bold text-lg transition active:scale-95"
            >
              {t("hard")} - 12 {lang === "fr" ? "paires" : lang === "nl" ? "paren" : "pairs"} 🔴
            </button>
          </div>

          {/* Remove how it works section */}
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      title={t("title")}
      emoji="🃏"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="space-y-4">
        {/* Stats */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-between items-center flex-col sm:flex-row">
          <div className="text-sm sm:text-base font-bold">
            {t("pairs")}: {matched.length / 2}/{cards.length / 2}
          </div>
          <div className="text-sm sm:text-base font-bold text-yellow-600">
            ⚡ {t("moves")}: {moves}
          </div>
          <div className="text-sm sm:text-base font-bold text-blue-600">
            ⏱️ {formatTime(time)}
          </div>
          <button
            onClick={() => setLevel(null)}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-purple-500 text-white text-xs sm:text-sm font-bold hover:scale-105 transition active:scale-95"
          >
            {t("newGame")}
          </button>
        </div>

        {/* Win message */}
        {isWon && (
          <div className="bg-purple-200 border-2 border-purple-500 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-900">{t("won")}</div>
            <div className="text-xs sm:text-sm text-purple-800 mt-1">
              {moves} {lang === "fr" ? "mouvements" : lang === "nl" ? "zetten" : "moves"} • {formatTime(time)}
            </div>
          </div>
        )}

        {/* Game grid */}
        <div className={`grid ${getGridCols()} gap-2 sm:gap-3 md:gap-4 justify-center mx-auto max-w-fit`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={matched.includes(card.id) || isWon}
              className={`aspect-square rounded-lg font-bold text-4xl sm:text-5xl md:text-6xl transition-all flex items-center justify-center scale-100 p-2 min-h-16 sm:min-h-20 md:min-h-24 ${
                matched.includes(card.id)
                  ? "bg-green-200 cursor-default"
                  : flipped.includes(card.id)
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110 cursor-pointer"
              } ${isWon && !matched.includes(card.id) ? "opacity-50 cursor-default" : ""}`}
            >
              {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : "?"}
            </button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
}















