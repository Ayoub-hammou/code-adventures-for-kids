import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/bubble-sort")({ component: BubbleSortPage });

const T = {
  title: { en: "Bubble Sort", fr: "Tri à Bulles", nl: "Bellensort" },
  concept: {
    en: "Algorithms & Loops",
    fr: "Algorithmes & Boucles",
    nl: "Algoritmen & Lussen",
  },
  intro: {
    en: "Bubble Sort is one of the simplest sorting algorithms! It compares pairs of numbers and swaps them if they're in the wrong order. Watch the bars 'bubble' to their correct positions!",
    fr: "Le Tri à Bulles est l'un des plus simples algorithmes de tri ! Il compare des paires de nombres et les échange s'ils sont dans le mauvais ordre. Regarde les barres 'monter' à leur position !",
    nl: "Bellensort is een van de eenvoudigste sorteeralgoritmen! Het vergelijkt paren getallen en verwisselt deze als ze in de verkeerde volgorde staan. Kijk hoe de balken naar hun juiste positie 'bubbelen'!",
  },
  unsorted: { en: "Unsorted", fr: "Non trié", nl: "Ongesorteerd" },
  sorting: { en: "Sorting...", fr: "Tri en cours...", nl: "Sorteren..." },
  sorted: { en: "✓ Sorted!", fr: "✓ Trié !", nl: "✓ Gesorteerd!" },
  comparing: { en: "Comparing", fr: "Comparison", nl: "Vergelijken" },
  swapping: { en: "Swapping", fr: "Échange", nl: "Verwisselen" },
  steps: { en: "Steps:", fr: "Étapes :", nl: "Stappen:" },
  comparisons: { en: "Comparisons:", fr: "Comparaisons :", nl: "Vergelijkingen:" },
  swaps: { en: "Swaps:", fr: "Échanges :", nl: "Verwisselingen:" },
  speed: { en: "Speed:", fr: "Vitesse :", nl: "Snelheid:" },
  slow: { en: "Slow", fr: "Lent", nl: "Langzaam" },
  fast: { en: "Fast", fr: "Rapide", nl: "Snel" },
  start: { en: "▶ Start Sort", fr: "▶ Commencer le tri", nl: "▶ Start Sorteren" },
  reset: { en: "↺ Reset", fr: "↺ Réinitialiser", nl: "↺ Reset" },
  code: {
    en: `function bubbleSort(arr):
  n = length(arr)
  # 🔄 OUTER LOOP: passes through array
  for i in 0..n-1:
    # 🔄 INNER LOOP: compare pairs
    for j in 0..n-i-2:
      # CONDITION: if wrong order
      if arr[j] > arr[j+1]:
        # SWAP the elements
        temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
  return arr`,
    fr: `fonction triBulles(arr):
  n = longueur(arr)
  # 🔄 BOUCLE EXTERNE : passages dans le tableau
  pour i de 0 à n-1:
    # 🔄 BOUCLE INTERNE : compare les paires
    pour j de 0 à n-i-2:
      # CONDITION : si mauvais ordre
      si arr[j] > arr[j+1]:
        # ÉCHANGE les éléments
        temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
  retourner arr`,
    nl: `functie bellensort(arr):
  n = lengte(arr)
  # 🔄 BUITENLUS : passages door array
  voor i in 0..n-1:
    # 🔄 BINNENLUS : vergelijk paren
    voor j in 0..n-i-2:
      # VOORWAARDE : als verkeerde volgorde
      als arr[j] > arr[j+1]:
        # VERWISSELING van elementen
        temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
  geef arr terug`,
  },
};

const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

interface BarState {
  value: number;
  state: "normal" | "comparing" | "swapped" | "sorted";
  originalIndex: number;
}

function BubbleSortPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as Parameters<typeof pick>[1]) as string;

  const [bars, setBars] = useState<BarState[]>(
    generateRandomArray(12).map((v, idx) => ({ value: v, state: "normal", originalIndex: idx })),
  );
  const [sorting, setSorting] = useState(false);
  const [steps, setSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [swappingIndices, setSwappingIndices] = useState<[number, number] | null>(null);
  const sortingRef = useRef(false);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function bubbleSort() {
    setSorting(true);
    sortingRef.current = true;
    let arr = bars.map((b) => b.value);
    let stepCount = 0;
    let compCount = 0;
    let swapCount = 0;
    const n = arr.length;

    for (let i = 0; i < n - 1 && sortingRef.current; i++) {
      for (let j = 0; j < n - i - 1 && sortingRef.current; j++) {
        stepCount++;
        setSteps(stepCount);

        // PHASE 1: Show comparison (highlight both bars)
        const comparingBars = arr.map((val, idx) => ({
          value: val,
          state: (idx === j || idx === j + 1
            ? "comparing"
            : idx >= n - i
              ? ("sorted" as BarState["state"])
              : "normal") as BarState["state"],
          originalIndex: idx,
        }));
        setBars(comparingBars);

        compCount++;
        setComparisons(compCount);

        // Wait for user to see the comparison
        await delay(1000 - speed * 9.9);

        // PHASE 2: Check if swap is needed
        if (arr[j] > arr[j + 1]) {
          // Mark the indices that will swap
          setSwappingIndices([j, j + 1]);

          // Perform the swap in the array
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapCount++;
          setSwaps(swapCount);

          // Update bars with swap animation
          const swappedBars = arr.map((val, idx) => ({
            value: val,
            state:
              idx === j || idx === j + 1
                ? ("swapped" as BarState["state"])
                : idx >= n - i
                  ? ("sorted" as BarState["state"])
                  : ("normal" as BarState["state"]),
            originalIndex: idx,
          }));
          setBars(swappedBars);

          // Wait for swap animation to complete
          await delay(1000 - speed * 9.9);
          setSwappingIndices(null);
        } else {
          // No swap needed - show bars as normal
          const noSwapBars = arr.map((val, idx) => ({
            value: val,
            state:
              idx >= n - i
                ? ("sorted" as BarState["state"])
                : ("normal" as BarState["state"]),
            originalIndex: idx,
          }));
          setBars(noSwapBars);

          // Brief pause so user sees the "no swap" decision
          await delay(200);
        }
      }

      // Mark sorted bars
      const sortedBars = arr.map((val, idx) => ({
        value: val,
        state: (idx >= n - i - 1 ? "sorted" : "normal") as BarState["state"],
        originalIndex: idx,
      }));
      setBars(sortedBars);
    }

    // Final state - all sorted
    const finalBars = arr.map((val, idx) => ({
      value: val,
      state: "sorted" as const,
      originalIndex: idx,
    }));
    setBars(finalBars);

    setSorting(false);
    sortingRef.current = false;
  }

  function reset() {
    sortingRef.current = false;
    setSorting(false);
    setBars(generateRandomArray(12).map((v, idx) => ({ value: v, state: "normal", originalIndex: idx })));
    setSteps(0);
    setComparisons(0);
    setSwaps(0);
  }

  const getColorForBar = (state: string) => {
    switch (state) {
      case "comparing":
        return "var(--fun-yellow)";
      case "swapped":
        return "var(--fun-orange)";
      case "sorted":
        return "var(--fun-green)";
      default:
        return "var(--primary)";
    }
  };

  const maxValue = Math.max(...bars.map((b) => b.value));

  return (
    <GameLayout
      title={t("title")}
      emoji="🔢"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="space-y-6">
        {/* Status */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            {!sorting && bars.every((b) => b.state === "sorted")
              ? t("sorted")
              : sorting
                ? t("sorting")
                : t("unsorted")}
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-secondary rounded-xl p-6 min-h-96 flex items-end justify-center gap-1">
          {bars.map((bar, idx) => {
            let translateX = 0;
            if (swappingIndices && swappingIndices[0] === idx && swappingIndices[1] === idx + 1) {
              // Bar at position j moving right
              translateX = (100 / bars.length) + 4; // width + gap
            } else if (swappingIndices && swappingIndices[1] === idx && swappingIndices[0] === idx - 1) {
              // Bar at position j+1 moving left
              translateX = -(100 / bars.length) - 4; // -(width + gap)
            }

            return (
              <div
                key={idx}
                className="rounded-md transition-all"
                style={{
                  height: `${(bar.value / maxValue) * 300}px`,
                  width: `${100 / bars.length}%`,
                  backgroundColor: getColorForBar(bar.state),
                  opacity: bar.state === "normal" ? 0.7 : 1,
                  transform: `translateX(${translateX}%)`,
                  transitionDuration: swappingIndices ? "300ms" : "0ms",
                }}
                title={`${bar.value}`}
              />
            );
          })}
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
            <div className="text-xs text-muted-foreground">{t("swaps")}</div>
            <div className="text-2xl font-bold">{swaps}</div>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">{t("speed")}</div>
            <div className="text-xl font-bold">{Math.round((speed / 100) * 100)}%</div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary opacity-70" />
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--fun-yellow)]" />
            <span className="text-muted-foreground">{t("comparing")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--fun-orange)]" />
            <span className="text-muted-foreground">{t("swapping")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--fun-green)]" />
            <span className="text-muted-foreground">{t("sorted")}</span>
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
            disabled={sorting}
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={bubbleSort}
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
              ? "Notice how many comparisons and swaps happen. Try different arrays. Can you predict how many steps are needed for 20 items?"
              : lang === "fr"
                ? "Remarque combien de comparaisons et d'échanges se produisent. Essaie des tableaux différents. Peux-tu prédire combien d'étapes sont nécessaires pour 20 éléments ?"
                : "Merk op hoeveel vergelijkingen en verwisselingen plaatsvinden. Probeer verschillende arrays. Kun je voorspellen hoeveel stappen nodig zijn voor 20 items?"}
          </div>
        </div>
      </div>
    </GameLayout>
  );
}










