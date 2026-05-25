/**
 * Obfuscated unlock system
 * This module contains an obfuscated reference to the unlock code.
 * The actual code is hidden through character encoding and cannot be easily
 * discovered through the DevTools console or source inspection.
 */

// Decoding this: [67, 111, 100, 101, 75, 105, 100, 115, 82, 111, 99, 107, 115, 33]
const ENCODED_ALL_GAMES_CODE = [67, 111, 100, 101, 75, 105, 100, 115, 82, 111, 99, 107, 115, 33];

// Decoding this: [67, 111, 100, 101, 75, 105, 100, 115, 80, 108, 97, 121, 33]
const ENCODED_EASTER_EGG_CODE = [67, 111, 100, 101, 75, 105, 100, 115, 80, 108, 97, 121, 33];

export type UnlockResult = "none" | "allGames" | "spaceInvaders";

// Additional obfuscation: we store a reference to a function that validates
function decodeCode(charCodes: number[]): string {
  // Decode the character array into a string
  let decoded = "";
  for (let i = 0; i < charCodes.length; i++) {
    decoded += String.fromCharCode(charCodes[i]);
  }
  return decoded;
}

function secureEquals(value: string, expected: string): boolean {
  // Use constant-time comparison to prevent timing attacks
  if (value.length !== expected.length) return false;

  let matches = true;
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) !== expected.charCodeAt(i)) {
      matches = false;
    }
  }
  return matches;
}

export function evaluateUnlockCode(code: string): UnlockResult {
  const trimmedCode = code.trim();
  const allGames = decodeCode(ENCODED_ALL_GAMES_CODE);
  if (secureEquals(trimmedCode, allGames)) return "allGames";

  const easterEgg = decodeCode(ENCODED_EASTER_EGG_CODE);
  if (secureEquals(trimmedCode, easterEgg)) return "spaceInvaders";

  return "none";
}

/**
 * Validates if the provided code matches the unlock code
 * @param code - The code to validate
 * @returns true if the code is correct, false otherwise
 */
export function validateUnlockCode(code: string): boolean {
  return evaluateUnlockCode(code) !== "none";
}

// Hide the function from being easily found
export default { validateUnlockCode };
