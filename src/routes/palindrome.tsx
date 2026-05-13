import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/palindrome")({ component: PalindromePage });

function isPalindrome(text: string) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  // The classic loop way (so kids see the loop in action!)
  for (let i = 0, j = clean.length - 1; i < j; i++, j--) {
    if (clean[i] !== clean[j]) return { ok: false, clean };
  }
  return { ok: true, clean };
}

const examples = ["racecar", "A man a plan a canal Panama", "hello", "Was it a car or a cat I saw?", "kayak"];

function PalindromePage() {
  const [text, setText] = useState("racecar");
  const result = text.trim() ? isPalindrome(text) : null;

  return (
    <GameLayout
      title="Palindrome Checker"
      emoji="🔁"
      concept="Loops & Conditions"
      intro="A palindrome reads the same forwards and backwards. Type a phrase and watch the loop check letter by letter!"
      code={`function isPalindrome(text):
  clean = lowercase(text)
  clean = remove spaces & punctuation

  i = 0
  j = length(clean) - 1

  # 🔄 LOOP from both ends
  while i < j:
    if clean[i] != clean[j]:
      return false
    i = i + 1
    j = j - 1

  return true`}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-lg focus:outline-none focus:border-primary mb-4"
        placeholder="Type a word or phrase..."
      />

      {result && (
        <div
          className={`rounded-xl p-5 text-center mb-4 border-2 ${
            result.ok
              ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]"
              : "border-[var(--fun-red)] bg-[color-mix(in_oklab,var(--fun-red)_15%,transparent)]"
          }`}
        >
          <div className="text-4xl mb-2">{result.ok ? "✅" : "❌"}</div>
          <div className="text-xl font-bold">
            {result.ok ? "Yes, it's a palindrome!" : "Nope, not a palindrome."}
          </div>
          <div className="mt-2 font-mono text-sm text-muted-foreground">
            cleaned → "{result.clean}"
          </div>
        </div>
      )}

      {result && result.clean && (
        <div className="mb-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Loop visualizer</div>
          <div className="flex flex-wrap gap-1 justify-center font-mono text-xl">
            {result.clean.split("").map((ch, i) => {
              const len = result.clean.length;
              const mirror = len - 1 - i;
              const matches = result.clean[i] === result.clean[mirror];
              return (
                <span
                  key={i}
                  className={`w-9 h-9 flex items-center justify-center rounded-md border-2 ${
                    matches ? "border-[var(--fun-green)]" : "border-[var(--fun-red)]"
                  }`}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Try these</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setText(ex)}
              className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
}
