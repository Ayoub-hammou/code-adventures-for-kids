export const GAMES_ORDER = [
  "/guess",
  "/palindrome",
  "/adventure",
  "/connect4",
  "/mastermind",
  "/rps",
  "/fizzbuzz",
  "/simon",
  "/calculator",
  "/error-handler",
  "/memory-game",
  "/caesar-cipher",
  "/bubble-sort",
  "/insertion-sort",
  "/inventory-master",
  "/luck-master",
  "/pattern-painter",
  "/race-against-time",
  "/ice-skater",
  "/ai-trainer",
];

// Big ideas concepts (in order)
export const BIG_IDEAS_CONCEPTS = [
  "programming",
  "variables",
  "loops",
  "conditions",
];

// Advanced concepts (in order)
export const ADVANCED_CONCEPTS = [
  "errors",
  "functions",
  "arrays",
  "randomness",
  "timer",
  "encryption",
  "sorting",
  "ai",
];

// All concepts in order (big ideas first, then advanced)
export const ALL_CONCEPTS = [...BIG_IDEAS_CONCEPTS, ...ADVANCED_CONCEPTS];

export function getNextGameUrl(currentPath: string): string | null {
  const currentIndex = GAMES_ORDER.indexOf(currentPath);
  if (currentIndex === -1 || currentIndex === GAMES_ORDER.length - 1) {
    return null; // No next game or current path not in list
  }
  return GAMES_ORDER[currentIndex + 1];
}

export function getGameIndex(path: string): number {
  return GAMES_ORDER.indexOf(path) + 1;
}

export function getTotalGames(): number {
  return GAMES_ORDER.length;
}

export function getNextConceptSlug(currentSlug: string): string | null {
  const currentIndex = ALL_CONCEPTS.indexOf(currentSlug);
  if (currentIndex === -1 || currentIndex === ALL_CONCEPTS.length - 1) {
    return null; // No next concept or current concept not in list
  }
  return ALL_CONCEPTS[currentIndex + 1];
}

export function getConceptIndex(slug: string): number {
  return ALL_CONCEPTS.indexOf(slug) + 1;
}

export function getTotalConcepts(): number {
  return ALL_CONCEPTS.length;
}

