import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, FormEvent } from "react";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/guess")({ component: GuessPage });

function GuessPage() {
  const [secret, setSecret] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [tries, setTries] = useState(0);
  const [history, setHistory] = useState<{ guess: number; hint: string }[]>([]);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setSecret(Math.floor(Math.random() * 100) + 1);
    setTries(0);
    setHistory([]);
    setDone(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = inputRef.current?.value ?? "";

    // ⚠️ ON PURPOSE: NO ERROR HANDLING ⚠️
    // We trust the input blindly. If the kid types a word, parseInt gives NaN
    // and the comparisons all fail silently — so we just BOOM!
    const guess = parseInt(raw);
    if (isNaN(guess)) {
      // eslint-disable-next-line no-alert
      alert("💥 BOOM ! 💥\n\nThe program just crashed because it expected a NUMBER but got text.\n\nLesson: this is why we need ERROR HANDLING!");
      return;
    }

    const next = tries + 1;
    setTries(next);
    let hint = "";
    if (guess === secret) {
      hint = `🎉 You got it in ${next} tries!`;
      setDone(true);
    } else if (guess < secret) {
      hint = "📈 Higher!";
    } else {
      hint = "📉 Lower!";
    }
    setHistory((h) => [{ guess, hint }, ...h]);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <GameLayout
      title="Guess the Number"
      emoji="🎯"
      concept="Variables & Conditions (and a missing safety net!)"
      intro="I'm thinking of a number between 1 and 100. Try to guess it! Then try typing a word like 'banana' to see what happens..."
      code={`secret = random(1, 100)
tries = 0

while not found:
  guess = read_input()
  tries = tries + 1

  if guess == secret:
    print("You win!")
  else if guess < secret:
    print("Higher!")
  else:
    print("Lower!")

# 🐛 Missing: what if guess
# isn't even a number?`}
    >
      <form onSubmit={onSubmit} className="flex gap-2 mb-6">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a guess (1–100)"
          disabled={done}
          className="flex-1 rounded-xl border-2 border-border bg-input px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary"
          autoFocus
        />
        <button
          type="submit"
          disabled={done}
          className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold hover:scale-105 transition disabled:opacity-50"
        >
          Guess!
        </button>
      </form>

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">Tries: <span className="font-bold text-foreground">{tries}</span></div>
        <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">↺ New game</button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((h, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-lg bg-secondary px-4 py-2"
          >
            <span className="font-mono font-bold">{h.guess}</span>
            <span>{h.hint}</span>
          </li>
        ))}
        {history.length === 0 && (
          <li className="text-center text-muted-foreground py-8">No guesses yet. Type a number!</li>
        )}
      </ul>

      <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_8%,transparent)]">
        <div className="font-bold text-sm mb-1">🧪 Teacher's challenge</div>
        <div className="text-sm text-muted-foreground">
          Try typing letters instead of a number. What happens? Now ask the class:
          how would <em>you</em> protect the program?
        </div>
      </div>
    </GameLayout>
  );
}
