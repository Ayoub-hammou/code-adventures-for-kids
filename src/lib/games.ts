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
  "/caesar-cipher",
  "/inventory-master",
  "/luck-master",
  "/pattern-painter",
  "/race-against-time",
  "/ice-skater",
];

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
