import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/fizzbuzz")({ component: FizzBuzzPage });

const T = {
  title: { en: "Fizz Buzz", fr: "Fizz Buzz", nl: "Fizz Buzz" },
  concept: { en: "Loops & Conditions", fr: "Boucles & Conditions", nl: "Lussen & Condities" },
  intro: {
    en: "Loop from 1 to N. If a number is divisible by 3 → 'Fizz'. By 5 → 'Buzz'. By both → 'FizzBuzz'!",
    fr: "Boucle de 1 à N. Si le nombre est divisible par 3 → « Fizz ». Par 5 → « Buzz ». Par les deux → « FizzBuzz » !",
    nl: "Lus van 1 tot N. Deelbaar door 3 → 'Fizz'. Door 5 → 'Buzz'. Door beide → 'FizzBuzz'!",
  },
  upTo: { en: "Count up to:", fr: "Compter jusqu'à :", nl: "Tel tot:" },
  code: {
    en: `n = 30\n# 🔄 LOOP from 1 to n\nfor i in 1..n:\n  # CONDITIONS\n  if i % 3 == 0 and i % 5 == 0:\n    print("FizzBuzz")\n  else if i % 3 == 0:\n    print("Fizz")\n  else if i % 5 == 0:\n    print("Buzz")\n  else:\n    print(i)`,
    fr: `n = 30\n# 🔄 BOUCLE de 1 à n\npour i de 1 à n:\n  # CONDITIONS\n  si i % 3 == 0 et i % 5 == 0:\n    afficher("FizzBuzz")\n  sinon si i % 3 == 0:\n    afficher("Fizz")\n  sinon si i % 5 == 0:\n    afficher("Buzz")\n  sinon:\n    afficher(i)`,
    nl: `n = 30\n# 🔄 LUS van 1 tot n\nvoor i in 1..n:\n  # CONDITIES\n  als i % 3 == 0 en i % 5 == 0:\n    print("FizzBuzz")\n  anders als i % 3 == 0:\n    print("Fizz")\n  anders als i % 5 == 0:\n    print("Buzz")\n  anders:\n    print(i)`,
  },
};

function fizzbuzz(n: number) {
  const r: { v: string; kind: "n" | "f" | "b" | "fb" }[] = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) r.push({ v: "FizzBuzz", kind: "fb" });
    else if (i % 3 === 0) r.push({ v: "Fizz", kind: "f" });
    else if (i % 5 === 0) r.push({ v: "Buzz", kind: "b" });
    else r.push({ v: String(i), kind: "n" });
  }
  return r;
}

function FizzBuzzPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as any) as string;
  const [n, setN] = useState(30);
  const items = fizzbuzz(n);

  const colorFor = (k: string) =>
    k === "fb"
      ? "var(--primary)"
      : k === "f"
        ? "var(--fun-pink)"
        : k === "b"
          ? "var(--fun-blue)"
          : "var(--secondary)";

  return (
    <GameLayout
      title={t("title")}
      emoji="🔢"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="flex items-center gap-3 mb-5">
        <label className="text-sm font-bold">{t("upTo")}</label>
        <input
          type="range"
          min={10}
          max={100}
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="flex-1"
        />
        <span className="font-mono font-bold w-10 text-right">{n}</span>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold text-center px-1 border-2 border-border"
            style={{
              backgroundColor: colorFor(it.kind),
              color: it.kind === "n" ? undefined : "var(--background)",
            }}
          >
            {it.v}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-5 text-xs">
        <Legend color="var(--fun-pink)" label="Fizz (×3)" />
        <Legend color="var(--fun-blue)" label="Buzz (×5)" />
        <Legend color="var(--primary)" label="FizzBuzz (×15)" />
      </div>
    </GameLayout>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
