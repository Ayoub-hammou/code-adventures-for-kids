import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/palindrome")({ component: PalindromePage });

function isPalindrome(text: string) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (let i = 0, j = clean.length - 1; i < j; i++, j--) {
    if (clean[i] !== clean[j]) return { ok: false, clean };
  }
  return { ok: true, clean };
}

const examples = ["racecar", "A man a plan a canal Panama", "hello", "kayak", "Engage le jeu que je le gagne", "lepel"];

const T = {
  title: { en: "Palindrome Checker", fr: "Détecteur de Palindrome", nl: "Palindroom Checker" },
  concept: { en: "Loops & Conditions", fr: "Boucles & Conditions", nl: "Lussen & Condities" },
  intro: {
    en: "A palindrome reads the same forwards and backwards. Type a phrase and watch the loop check letter by letter!",
    fr: "Un palindrome se lit pareil dans les deux sens. Tape une phrase et regarde la boucle vérifier lettre par lettre !",
    nl: "Een palindroom leest hetzelfde van voor en van achter. Typ een zin en zie hoe de lus letter voor letter checkt!",
  },
  placeholder: { en: "Type a word or phrase...", fr: "Tape un mot ou une phrase...", nl: "Typ een woord of zin..." },
  yes: { en: "Yes, it's a palindrome!", fr: "Oui, c'est un palindrome !", nl: "Ja, het is een palindroom!" },
  no: { en: "Nope, not a palindrome.", fr: "Non, pas un palindrome.", nl: "Nee, geen palindroom." },
  cleaned: { en: "cleaned", fr: "nettoyé", nl: "opgeschoond" },
  visualizer: { en: "Loop visualizer", fr: "Visualiseur de boucle", nl: "Lus visualisatie" },
  tryThese: { en: "Try these", fr: "Essaie", nl: "Probeer deze" },
  code: {
    en: `function isPalindrome(text):
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

  return true`,
    fr: `fonction estPalindrome(texte):
  propre = minuscules(texte)
  propre = enlever espaces & ponctuation

  i = 0
  j = longueur(propre) - 1

  # 🔄 BOUCLE depuis les deux bouts
  tant que i < j:
    si propre[i] != propre[j]:
      retourner faux
    i = i + 1
    j = j - 1

  retourner vrai`,
    nl: `functie isPalindroom(tekst):
  schoon = kleineletters(tekst)
  schoon = verwijder spaties & leestekens

  i = 0
  j = lengte(schoon) - 1

  # 🔄 LUS van beide kanten
  zolang i < j:
    als schoon[i] != schoon[j]:
      geef onwaar terug
    i = i + 1
    j = j - 1

  geef waar terug`,
  },
};

function PalindromePage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T) => pick(lang, T[k] as any);
  const [text, setText] = useState("racecar");
  const result = text.trim() ? isPalindrome(text) : null;

  return (
    <GameLayout title={t("title")} emoji="🔁" concept={t("concept")} intro={t("intro")} code={t("code")}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-lg focus:outline-none focus:border-primary mb-4"
        placeholder={t("placeholder")}
      />

      {result && (
        <div className={`rounded-xl p-5 text-center mb-4 border-2 ${result.ok ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]" : "border-[var(--fun-red)] bg-[color-mix(in_oklab,var(--fun-red)_15%,transparent)]"}`}>
          <div className="text-4xl mb-2">{result.ok ? "✅" : "❌"}</div>
          <div className="text-xl font-bold">{result.ok ? t("yes") : t("no")}</div>
          <div className="mt-2 font-mono text-sm text-muted-foreground">{t("cleaned")} → "{result.clean}"</div>
        </div>
      )}

      {result && result.clean && (
        <div className="mb-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("visualizer")}</div>
          <div className="flex flex-wrap gap-1 justify-center font-mono text-xl">
            {result.clean.split("").map((ch, i) => {
              const len = result.clean.length;
              const mirror = len - 1 - i;
              const matches = result.clean[i] === result.clean[mirror];
              return (
                <span key={i} className={`w-9 h-9 flex items-center justify-center rounded-md border-2 ${matches ? "border-[var(--fun-green)]" : "border-[var(--fun-red)]"}`}>
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("tryThese")}</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button key={ex} onClick={() => setText(ex)} className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition">
              {ex}
            </button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
}
