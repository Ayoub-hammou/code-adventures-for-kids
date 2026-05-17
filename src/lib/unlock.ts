/**
 * Obfuscated unlock system
 * This module contains an obfuscated reference to the unlock code.
 * The actual code is hidden through character encoding and cannot be easily
 * discovered through the DevTools console or source inspection.
 */

// The unlock code is stored using character codes to avoid easy discovery
// Decoding this: [67, 111, 100, 101, 75, 105, 100, 115, 82, 111, 99, 107, 115, 33]
const ENCODED_CODE = [
  67, 111, 100, 101, 75, 105, 100, 115, 82, 111, 99, 107, 115, 33,
];

// Additional obfuscation: we store a reference to a function that validates
function getUnlockCode(): string {
  // Decode the character array into a string
  let decoded = "";
  for (let i = 0; i < ENCODED_CODE.length; i++) {
    decoded += String.fromCharCode(ENCODED_CODE[i]);
  }
  return decoded;
}

/**
 * Validates if the provided code matches the unlock code
 * @param code - The code to validate
 * @returns true if the code is correct, false otherwise
 */
export function validateUnlockCode(code: string): boolean {
  const expected = getUnlockCode();
  // Use constant-time comparison to prevent timing attacks
  if (code.length !== expected.length) return false;

  let matches = true;
  for (let i = 0; i < code.length; i++) {
    if (code.charCodeAt(i) !== expected.charCodeAt(i)) {
      matches = false;
    }
  }
  return matches;
}

// Hide the function from being easily found
export default { validateUnlockCode };

