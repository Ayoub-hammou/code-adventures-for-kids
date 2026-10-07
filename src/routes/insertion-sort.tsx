import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/insertion-sort")({ component: InsertionSortPage });

const T = {
  title: { en: "Insertion Sort", fr: "Tri par Insertion", nl: "Invoegsortering" },
  concept: {
    en: "Algorithms & Loops",
    fr: "Algorithmes & Boucles",
    nl: "Algoritmen & Lussen",
  },
  intro: {
    en: "Insertion Sort works like sorting playing cards! You build a sorted hand one card at a time. Take each card and insert it into the correct position in your sorted hand. Simple, intuitive, and elegant!",
    fr: "Le Tri par Insertion fonctionne comme trier des cartes à jouer ! Tu construis une main triée une carte à la fois. Prends chaque carte et insère-la à la bonne position. Simple, intuitif et élégant !",
    nl: "Invoegsortering werkt als het sorteren van speelkaarten! Je bouwt een gesorteerde hand één kaart tegelijk op. Pak elke kaart en voeg deze in op de juiste positie. Eenvoudig, intuïtief en elegant!",
  },
  unsorted: { en: "Unsorted", fr: "Non trié", nl: "Ongesorteerd" },
  sorting: { en: "Sorting...", fr: "Tri en cours...", nl: "Sorteren..." },
  sorted: { en: "✓ Sorted!", fr: "✓ Trié !", nl: "✓ Gesorteerd!" },
  comparing: { en: "Comparing", fr: "Comparaison", nl: "Vergelijken" },
  inserting: { en: "Inserting", fr: "Insertion", nl: "Invoegen" },
  sorted_hand: { en: "Sorted", fr: "Trié", nl: "Gesorteerd" },
  cardToInsert: { en: "📍 Card to Insert:", fr: "📍 Carte à Insérer :", nl: "📍 Kaart in te voegen:" },
  willInsertAt: { en: "Card will insert here at position", fr: "La carte s'insèrera ici à la position", nl: "Kaart wordt hier ingevoegd op positie" },
  unsortedLegend: { en: "Unsorted", fr: "Non trié", nl: "Ongesorteerd" },
  keyLegend: { en: "Key (to insert)", fr: "Clé (à insérer)", nl: "Sleutel (in te voegen)" },
  comparingLegend: { en: "Comparing", fr: "Comparaison", nl: "Vergelijken" },
  insertingLegend: { en: "Inserting", fr: "Insertion", nl: "Invoegen" },
  sortedLegend: { en: "Sorted", fr: "Trié", nl: "Gesorteerd" },
  steps: { en: "Steps:", fr: "Étapes :", nl: "Stappen:" },
  comparisons: { en: "Comparisons:", fr: "Comparaisons :", nl: "Vergelijkingen:" },
  shifts: { en: "Shifts:", fr: "Décalages :", nl: "Verschuivingen:" },
  speed: { en: "Speed:", fr: "Vitesse :", nl: "Snelheid:" },
  slow: { en: "Slow", fr: "Lent", nl: "Langzaam" },
  fast: { en: "Fast", fr: "Rapide", nl: "Snel" },
  start: { en: "▶ Start Sort", fr: "▶ Commencer le tri", nl: "▶ Start Sorteren" },
  reset: { en: "↺ Reset", fr: "↺ Réinitialiser", nl: "↺ Reset" },
  code: {
    en: `function insertionSort(arr):
  # 🔄 LOOP: process each card
  for i in 1..length(arr)-1:
    key = arr[i]  # Take the current card
    j = i - 1
    
    # 🔄 LOOP: find correct position
    while j >= 0 AND arr[j] > key:
      arr[j+1] = arr[j]  # Shift right
      j = j - 1
    
    # Insert the card
    arr[j+1] = key
  
  return arr`,
    fr: `fonction triInsertion(arr):
  # 🔄 BOUCLE : traite chaque carte
  pour i de 1 à longueur(arr)-1:
    clé = arr[i]  # Prendre la carte actuelle
    j = i - 1
    
    # 🔄 BOUCLE : trouve la bonne position
    tant que j >= 0 ET arr[j] > clé:
      arr[j+1] = arr[j]  # Décaler à droite
      j = j - 1
    
    # Insère la carte
    arr[j+1] = clé
  
  retourner arr`,
    nl: `functie invoegsortering(arr):
  # 🔄 LUS : verwerk elke kaart
  voor i van 1 tot lengte(arr)-1:
    sleutel = arr[i]  # Neem de huidige kaart
    j = i - 1
    
    # 🔄 LUS : vind juiste positie
    zolang j >= 0 EN arr[j] > sleutel:
      arr[j+1] = arr[j]  # Verschuif rechts
      j = j - 1
    
    # Voeg de kaart in
    arr[j+1] = sleutel
  
  geef arr terug`,
  },
};

const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

interface BarState {
  value: number;
  state: "unsorted" | "comparing" | "sorted" | "inserting" | "key";
  originalIndex: number;
}

function InsertionSortPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as Parameters<typeof pick>[1]) as string;

  const [bars, setBars] = useState<BarState[]>(
    generateRandomArray(12).map((v, idx) => ({ value: v, state: "unsorted", originalIndex: idx })),
  );
  const [sorting, setSorting] = useState(false);
  const [steps, setSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [sortedBoundary, setSortedBoundary] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState<number | null>(null);
  const [insertionPosition, setInsertionPosition] = useState<number | null>(null);
  const [movingCard, setMovingCard] = useState<{ fromIndex: number; toIndex: number } | null>(null);
  const sortingRef = useRef(false);
  const speedRef = useRef(speed);

  // Keep speed ref in sync with the state
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const getDynamicDelay = () => {
    return 1000 - speedRef.current * 9.9;
  };

  async function insertionSort() {
    setSorting(true);
    sortingRef.current = true;
    let arr = bars.map((b) => b.value);
    let stepCount = 0;
    let compCount = 0;
    let shiftCount = 0;
    const n = arr.length;

    // Start with first element as "sorted"
    setSortedBoundary(1);

    for (let i = 1; i < n && sortingRef.current; i++) {
      const key = arr[i];
      let j = i - 1;
      stepCount++;
      setSteps(stepCount);

        // PHASE 1: Show the card being picked (key)
        const pickBars = arr.map((val, idx) => ({
          value: val,
          state:
            idx < i
              ? ("sorted" as BarState["state"])
              : idx === i
                ? ("key" as BarState["state"])
                : ("unsorted" as BarState["state"]),
          originalIndex: idx,
        }));
        setBars(pickBars);
        setCurrentKeyIndex(i);

        await delay(getDynamicDelay());

        // PHASE 2: Find correct position (just show comparisons, no shifting yet)
        while (j >= 0 && arr[j] > key && sortingRef.current) {
          compCount++;
          setComparisons(compCount);

          // Show comparison - just highlight the compared card, no shifting
          const comparingBars = arr.map((val, idx) => ({
            value: val,
            state:
              idx < j
                ? ("sorted" as BarState["state"])
                : idx === j
                  ? ("comparing" as BarState["state"])
                  : idx === i
                    ? ("key" as BarState["state"])
                    : idx > i
                      ? ("unsorted" as BarState["state"])
                      : ("sorted" as BarState["state"]),
            originalIndex: idx,
          }));
          setBars(comparingBars);
          setInsertionPosition(j); // Show where insertion will happen

          await delay(getDynamicDelay());

          j--;
        }

        // Remember final insertion position
        setInsertionPosition(j + 1);

        // PHASE 3: Insert the key at its correct position with animation
        if (sortingRef.current) {
          // Shift elements to the right
          for (let idx = i; idx > j + 1; idx--) {
            arr[idx] = arr[idx - 1];
            shiftCount++;
          }
          setShifts(shiftCount);

          // Set up the movement animation from current position (i) to target position (j+1)
          setMovingCard({ fromIndex: i, toIndex: j + 1 });

          // Show animation state with card moving
          const animatingBars = arr.map((val, idx) => ({
            value: val,
            state:
              idx <= j + 1
                ? ("sorted" as BarState["state"])
                : ("unsorted" as BarState["state"]),
            originalIndex: idx,
          }));
          setBars(animatingBars);

          await delay(getDynamicDelay());

          // Final state after insertion
          arr[j + 1] = key;
          setMovingCard(null); // Clear animation
          setInsertionPosition(null); // Clear insertion indicator
          setCurrentKeyIndex(null); // Card is no longer a key card

          const insertBars = arr.map((val, idx) => ({
            value: val,
            state:
              idx <= i
                ? ("sorted" as BarState["state"])
                : ("unsorted" as BarState["state"]),
            originalIndex: idx,
          }));
          setBars(insertBars);
          setSortedBoundary(i + 1);

          await delay(getDynamicDelay() * 0.5);
        }
    }

    // Final state - all sorted
    if (sortingRef.current) {
      const finalBars = arr.map((val, idx) => ({
        value: val,
        state: "sorted" as const,
        originalIndex: idx,
      }));
      setBars(finalBars);
      setSortedBoundary(n);
    }

    setSorting(false);
    sortingRef.current = false;
    setMovingCard(null);
    setCurrentKeyIndex(null);
    setInsertionPosition(null);
  }

  function reset() {
    sortingRef.current = false;
    setSorting(false);
    setBars(generateRandomArray(12).map((v, idx) => ({ value: v, state: "unsorted", originalIndex: idx })));
    setSortedBoundary(0);
    setSteps(0);
    setComparisons(0);
    setShifts(0);
    setMovingCard(null);
    setCurrentKeyIndex(null);
    setInsertionPosition(null);
  }
  const getColorForBar = (state: string) => {
    switch (state) {
      case "sorted":
        return "var(--fun-green)";
      case "comparing":
        return "var(--fun-yellow)";
      case "inserting":
        return "var(--fun-orange)";
      case "unsorted":
        return "var(--primary)";
      default:
        return "var(--primary)";
    }
  };

  const getCardStyle = (state: string, idx: number): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: "90px",
      height: "140px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "12px",
      border: "3px solid",
      fontSize: "48px",
      fontWeight: "900",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      cursor: "default",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      position: "relative",
    };

    // Calculate movement transform if a card is being moved
    let movementTransform = "";
    if (movingCard) {
      if (idx === movingCard.fromIndex) {
        // Card moving upward
        const distance = (movingCard.fromIndex - movingCard.toIndex) * 110;
        movementTransform = `translateY(-${distance}px)`;
      } else if (idx > movingCard.toIndex && idx < movingCard.fromIndex) {
        // Cards shifting down
        movementTransform = "translateY(110px)";
      }
    }

    switch (state) {
      case "key":
        return {
          ...baseStyle,
          borderColor: "#FF0066",
          backgroundColor: "#FFE8F3",
          color: "#FF0066",
          transform: movementTransform ? `${movementTransform} scale(1.15)` : "scale(1.15)",
          boxShadow: "0 0 20px rgba(255, 0, 102, 0.5), 0 8px 20px rgba(255, 0, 102, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        };
      case "sorted":
        return {
          ...baseStyle,
          borderColor: "var(--fun-green)",
          backgroundColor: "#ECFDF5",
          color: "var(--fun-green)",
          transform: movementTransform ? `${movementTransform} scale(1.05) translateY(-10px)` : "scale(1.05) translateY(-10px)",
          boxShadow: "0 12px 24px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        };
      case "comparing":
        return {
          ...baseStyle,
          borderColor: "var(--fun-yellow)",
          backgroundColor: "#FFFBEB",
          color: "var(--fun-yellow)",
          transform: movementTransform ? `${movementTransform} scale(1.1) rotateY(-5deg)` : "scale(1.1) rotateY(-5deg)",
          boxShadow: "0 12px 24px rgba(234, 179, 8, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        };
      case "inserting":
        return {
          ...baseStyle,
          borderColor: "var(--fun-orange)",
          backgroundColor: "#FFF7ED",
          color: "var(--fun-orange)",
          transform: movementTransform ? `${movementTransform} translateY(-15px) scale(1.08)` : "translateY(-15px) scale(1.08)",
          boxShadow: "0 16px 32px rgba(249, 115, 22, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        };
      case "unsorted":
      default:
        return {
          ...baseStyle,
          borderColor: "var(--primary)",
          backgroundColor: "#F5F3FF",
          color: "var(--primary)",
          transform: movementTransform,
        };
    }
  };

  return (
    <GameLayout
      title={t("title")}
      emoji="🎴"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="space-y-6">
        {/* Status and Insertion Indicator */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            {!sorting && bars.every((b) => b.state === "sorted")
              ? t("sorted")
              : sorting
                ? t("sorting")
                : t("unsorted")}
          </div>
          {/* Insertion Position Indicator - Fixed height to prevent layout shift */}
          <div className="h-6">
            {insertionPosition !== null && currentKeyIndex !== null && (
              <div className="text-sm font-bold text-red-600">
                ↓ {t("willInsertAt")} {insertionPosition + 1}
              </div>
            )}
          </div>
        </div>

        {/* Visualization */}
        <div className="space-y-6">

          {/* Main Cards Section */}
          <div className="bg-secondary rounded-xl p-8 min-h-96 flex items-center justify-center gap-4 flex-wrap">
            {bars.map((bar, idx) => (
              <div key={idx} style={getCardStyle(bar.state, idx)} title={`Card: ${bar.value}`}>
                {bar.value}
              </div>
            ))}
          </div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">{t("steps")}</div>
            <div className="text-2xl font-bold">{steps}</div>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">{t("comparisons")}</div>
            <div className="text-2xl font-bold">{comparisons}</div>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">{t("shifts")}</div>
            <div className="text-2xl font-bold">{shifts}</div>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">{t("speed")}</div>
            <div className="text-xl font-bold">{Math.round((speed / 100) * 100)}%</div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "50px",
                height: "75px",
                borderRadius: "8px",
                border: "2px solid var(--primary)",
                backgroundColor: "#F5F3FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "var(--primary)",
              }}
            />
            <span className="text-muted-foreground">{t("unsortedLegend")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "50px",
                height: "75px",
                borderRadius: "8px",
                border: "2px solid #FF0066",
                backgroundColor: "#FFE8F3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#FF0066",
                boxShadow: "0 0 10px rgba(255, 0, 102, 0.5)",
              }}
            />
            <span className="text-muted-foreground">{t("keyLegend")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "50px",
                height: "75px",
                borderRadius: "8px",
                border: "2px solid var(--fun-yellow)",
                backgroundColor: "#FFFBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "var(--fun-yellow)",
                boxShadow: "0 8px 16px rgba(234, 179, 8, 0.3)",
              }}
            />
            <span className="text-muted-foreground">{t("comparingLegend")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "50px",
                height: "75px",
                borderRadius: "8px",
                border: "2px solid var(--fun-orange)",
                backgroundColor: "#FFF7ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "var(--fun-orange)",
                boxShadow: "0 10px 20px rgba(249, 115, 22, 0.3)",
              }}
            />
            <span className="text-muted-foreground">{t("insertingLegend")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "50px",
                height: "75px",
                borderRadius: "8px",
                border: "2px solid var(--fun-green)",
                backgroundColor: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "var(--fun-green)",
                boxShadow: "0 8px 16px rgba(34, 197, 94, 0.3)",
              }}
            />
            <span className="text-muted-foreground">{t("sortedLegend")}</span>
          </div>
        </div>

        {/* Speed Control */}
        <div>
          <label className="flex items-center justify-between mb-2 text-sm font-bold">
            <span>{t("speed")}</span>
            <span className="text-xs text-muted-foreground">
              {t("slow")} — {t("fast")}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={insertionSort}
            disabled={sorting}
            className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("start")}
          </button>
          <button
            onClick={reset}
            disabled={sorting}
            className="rounded-xl border-2 border-primary text-primary px-6 py-3 font-bold hover:bg-primary/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("reset")}
          </button>
        </div>

        {/* Challenge */}
        <div className="rounded-xl border-2 border-dashed border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_8%,transparent)] p-4">
          <div className="font-bold text-sm mb-1">🧪 Teacher&apos;s Challenge</div>
          <div className="text-sm text-muted-foreground">
            {lang === "en"
              ? "Notice how Insertion Sort builds the sorted part one card at a time. Compare it to Bubble Sort - which does more comparisons? Which is faster? Why?"
              : lang === "fr"
                ? "Remarque comment le Tri par Insertion construit la partie triée une carte à la fois. Compare-le au Tri à Bulles - lequel fait plus de comparaisons ? Lequel est plus rapide ? Pourquoi ?"
                : "Merk op hoe Invoegsortering de gesorteerde deel één kaart tegelijk opbouwt. Vergelijk het met Bellensort - welke doet meer vergelijkingen? Welke is sneller? Waarom?"}
          </div>
        </div>
      </div>
    </GameLayout>
  );
}

