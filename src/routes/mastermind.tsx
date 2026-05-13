import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/mastermind")({ component: MastermindPage });

const COLORS = [
  { name: "red", value: "var(--fun-red)" },
  { name: "yellow", value: "var(--fun-yellow)" },
  { name: "green", value: "var(--fun-green)" },
  { name: "blue", value: "var(--fun-blue)" },
  { name: "pink", value: "var(--fun-pink)" },
  { name: "purple", value: "var(--primary)" },
];
const CODE_LEN = 4;
const MAX_TRIES = 10;

function makeSecret() {
  return Array.from({ length: CODE_LEN }, () => Math.floor(Math.random() * COLORS.length));
}

function score(guess: number[], secret: number[]) {
  let exact = 0;
  let partial = 0;
  const sUsed = Array(CODE_LEN).fill(false);
  const gUsed = Array(CODE_LEN).fill(false);
  // 🔄 Pass 1: exact matches
  for (let i = 0; i < CODE_LEN; i++) {
    if (guess[i] === secret[i]) {
      exact++;
      sUsed[i] = true;
      gUsed[i] = true;
    }
  }
  // 🔄 Pass 2: color exists elsewhere
  for (let i = 0; i < CODE_LEN; i++) {
    if (gUsed[i]) continue;
    for (let j = 0; j < CODE_LEN; j++) {
      if (!sUsed[j] && guess[i] === secret[j]) {
        partial++;
        sUsed[j] = true;
        break;
      }
    }
  }
  return { exact, partial };
}

function MastermindPage() {
  const [secret, setSecret] = useState<number[]>(makeSecret);
  const [current, setCurrent] = useState<(number | null)[]>(Array(CODE_LEN).fill(null));
  const [guesses, setGuesses] = useState<{ guess: number[]; exact: number; partial: number }[]>([]);
  const [activeSlot, setActiveSlot] = useState(0);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  function pick(colorIdx: number) {
    if (status !== "playing") return;
    const next = current.slice();
    next[activeSlot] = colorIdx;
    setCurrent(next);
    const nextEmpty = next.findIndex((v) => v === null);
    setActiveSlot(nextEmpty === -1 ? activeSlot : nextEmpty);
  }

  function submit() {
    if (current.some((v) => v === null) || status !== "playing") return;
    const guess = current as number[];
    const result = score(guess, secret);
    const newGuesses = [...guesses, { guess, ...result }];
    setGuesses(newGuesses);
    setCurrent(Array(CODE_LEN).fill(null));
    setActiveSlot(0);
    if (result.exact === CODE_LEN) setStatus("won");
    else if (newGuesses.length >= MAX_TRIES) setStatus("lost");
  }

  function reset() {
    setSecret(makeSecret());
    setCurrent(Array(CODE_LEN).fill(null));
    setGuesses([]);
    setActiveSlot(0);
    setStatus("playing");
  }

  return (
    <GameLayout
      title="Mastermind"
      emoji="🎨"
      concept="Variables, Loops & Conditions"
      intro="Crack the secret 4-color code in 10 tries. ⚫ = right color, right place. ⚪ = right color, wrong place."
      code={`secret = [random colors x 4]

while tries < 10:
  guess = ask_player()
  exact = 0
  partial = 0

  # 🔄 LOOP through positions
  for i in 0..4:
    if guess[i] == secret[i]:
      exact = exact + 1
    else if guess[i] in secret:
      partial = partial + 1

  if exact == 4:
    print("You won!")`}
    >
      <div className="space-y-2 mb-5">
        {Array.from({ length: MAX_TRIES }).map((_, row) => {
          const g = guesses[row];
          const isCurrent = row === guesses.length && status === "playing";
          const pegs = isCurrent ? current : g?.guess.map((x) => x as number | null) ?? Array(CODE_LEN).fill(null);
          return (
            <div key={row} className="flex items-center gap-3">
              <span className="w-6 text-xs text-muted-foreground font-mono">{String(row + 1).padStart(2, "0")}</span>
              <div className="flex gap-2 flex-1">
                {pegs.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => isCurrent && setActiveSlot(i)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      isCurrent && i === activeSlot ? "border-primary ring-2 ring-primary" : "border-border"
                    }`}
                    style={{ backgroundColor: p !== null ? COLORS[p].value : "var(--muted)" }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-0.5 w-12">
                {g
                  ? [
                      ...Array(g.exact).fill("exact"),
                      ...Array(g.partial).fill("partial"),
                      ...Array(CODE_LEN - g.exact - g.partial).fill("none"),
                    ].map((kind, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 rounded-full border ${
                          kind === "exact"
                            ? "bg-foreground border-foreground"
                            : kind === "partial"
                            ? "bg-background border-foreground"
                            : "bg-muted border-border"
                        }`}
                      />
                    ))
                  : null}
              </div>
            </div>
          );
        })}
      </div>

      {status === "playing" ? (
        <>
          <div className="flex justify-center gap-2 mb-3">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => pick(i)}
                className="w-10 h-10 rounded-full border-2 border-border hover:scale-110 transition"
                style={{ backgroundColor: c.value }}
                aria-label={c.name}
              />
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={submit}
              disabled={current.some((v) => v === null)}
              className="rounded-xl bg-primary text-primary-foreground px-6 py-2 font-bold disabled:opacity-40 hover:scale-105 transition"
            >
              Check guess →
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div
            className={`rounded-xl p-5 mb-4 border-2 ${
              status === "won"
                ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]"
                : "border-[var(--fun-red)] bg-[color-mix(in_oklab,var(--fun-red)_15%,transparent)]"
            }`}
          >
            <div className="text-3xl mb-1">{status === "won" ? "🎉 You cracked it!" : "💥 Out of tries!"}</div>
            <div className="text-sm text-muted-foreground mb-3">The secret was:</div>
            <div className="flex justify-center gap-2">
              {secret.map((s, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-border"
                  style={{ backgroundColor: COLORS[s].value }}
                />
              ))}
            </div>
          </div>
          <button onClick={reset} className="rounded-xl bg-primary text-primary-foreground px-5 py-2 font-bold hover:scale-105 transition">
            ↺ Play again
          </button>
        </div>
      )}
    </GameLayout>
  );
}
