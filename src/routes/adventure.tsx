import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/adventure")({ component: AdventurePage });

type Choice = { text: string; to: string; effect?: Partial<Stats> };
type Scene = { id: string; text: string; choices: Choice[]; ending?: "good" | "bad" | "neutral" };
type Stats = { courage: number; gold: number; hasKey: boolean; hasSword: boolean };

const scenes: Record<string, Scene> = {
  start: {
    id: "start",
    text: "You wake up in a misty forest. A path forks left toward a dark cave 🕳️ and right toward a sleepy village 🏘️.",
    choices: [
      { text: "Enter the cave", to: "cave", effect: { courage: 1 } },
      { text: "Visit the village", to: "village" },
    ],
  },
  cave: {
    id: "cave",
    text: "Inside the cave a glowing key floats above a sleeping dragon 🐉. Your heart pounds.",
    choices: [
      { text: "Sneak and grab the key", to: "gotKey", effect: { hasKey: true, courage: 2 } },
      { text: "Run away!", to: "village" },
    ],
  },
  gotKey: {
    id: "gotKey",
    text: "You snatch the key! The dragon stirs… but you slip out into the sunlight, key in hand. ✨",
    choices: [{ text: "Head to the village", to: "village" }],
  },
  village: {
    id: "village",
    text: "In the village a blacksmith offers you a sword for 10 gold. A locked treasure chest sits in the square.",
    choices: [
      { text: "Buy the sword (-10 gold)", to: "sword", effect: { hasSword: true, gold: -10 } },
      { text: "Try to open the chest", to: "chest" },
      { text: "Walk to the castle", to: "castle" },
    ],
  },
  sword: {
    id: "sword",
    text: "You strap on a shining sword. You feel braver. ⚔️",
    choices: [
      { text: "Open the chest", to: "chest" },
      { text: "March to the castle", to: "castle" },
    ],
  },
  chest: {
    id: "chest",
    text: "The chest is locked tight. You'll need a key…",
    choices: [{ text: "Continue", to: "castle" }],
  },
  castle: {
    id: "castle",
    text: "A monster guards the castle gate! Your fate depends on what you carry…",
    choices: [{ text: "Face it!", to: "ending" }],
  },
  ending: { id: "ending", text: "", choices: [] },
};

const initial: Stats = { courage: 0, gold: 20, hasKey: false, hasSword: false };

function AdventurePage() {
  const [sceneId, setSceneId] = useState("start");
  const [stats, setStats] = useState<Stats>(initial);
  const [log, setLog] = useState<string[]>([]);

  const scene = scenes[sceneId];

  function choose(c: Choice) {
    if (c.effect) {
      setStats((s) => ({
        courage: s.courage + (c.effect!.courage ?? 0),
        gold: s.gold + (c.effect!.gold ?? 0),
        hasKey: c.effect!.hasKey ?? s.hasKey,
        hasSword: c.effect!.hasSword ?? s.hasSword,
      }));
    }
    setLog((l) => [...l, `→ ${c.text}`]);
    setSceneId(c.to);
  }

  function reset() {
    setSceneId("start");
    setStats(initial);
    setLog([]);
  }

  // Compute ending using CONDITIONS based on VARIABLES
  let endingText = "";
  let endingTone = "";
  if (sceneId === "ending") {
    if (stats.hasSword && stats.courage >= 2) {
      endingText = "⚔️ With sword raised and courage burning, you defeat the monster and become a legend!";
      endingTone = "var(--fun-green)";
    } else if (stats.hasKey) {
      endingText = "🗝️ You sneak past with the magic key, unlock a secret door, and escape with treasure!";
      endingTone = "var(--fun-yellow)";
    } else {
      endingText = "💀 Without sword or key, the monster sends you running. You live… to play again.";
      endingTone = "var(--fun-red)";
    }
  }

  return (
    <GameLayout
      title="Choose Your Adventure"
      emoji="🗺️"
      concept="Variables & Conditions"
      intro="Every choice changes a VARIABLE (your stats). At the end, CONDITIONS decide your fate!"
      code={`courage = 0
gold = 20
hasKey = false
hasSword = false

# Each choice updates variables

# At the end, CONDITIONS decide:
if hasSword and courage >= 2:
  ending = "Hero!"
else if hasKey:
  ending = "Sneaky escape"
else:
  ending = "Game over"`}
    >
      <div className="grid grid-cols-4 gap-2 mb-5 text-center text-sm">
        <Stat label="💪 Courage" value={stats.courage} />
        <Stat label="🪙 Gold" value={stats.gold} />
        <Stat label="🗝️ Key" value={stats.hasKey ? "yes" : "no"} />
        <Stat label="⚔️ Sword" value={stats.hasSword ? "yes" : "no"} />
      </div>

      {sceneId !== "ending" ? (
        <>
          <div className="rounded-xl bg-secondary p-5 mb-4 text-lg leading-relaxed">{scene.text}</div>
          <div className="grid gap-2">
            {scene.choices.map((c) => (
              <button
                key={c.to + c.text}
                onClick={() => choose(c)}
                className="text-left rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-secondary px-4 py-3 font-semibold transition"
              >
                {c.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div
          className="rounded-xl p-6 text-center text-lg font-semibold border-2"
          style={{ borderColor: endingTone, backgroundColor: `color-mix(in oklab, ${endingTone} 15%, transparent)` }}
        >
          {endingText}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-muted-foreground font-mono">
          {log.slice(-3).join("  ")}
        </div>
        <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">↺ Restart</button>
      </div>
    </GameLayout>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border-2 border-border bg-card p-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-bold font-mono">{value}</div>
    </div>
  );
}
