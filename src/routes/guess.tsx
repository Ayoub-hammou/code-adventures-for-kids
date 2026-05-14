import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, FormEvent } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/guess")({ component: GuessPage });

const T = {
  title: { en: "Guess the Number", fr: "Devine le Nombre", nl: "Raad het Getal" },
  concept: { en: "Variables & Conditions (and a missing safety net!)", fr: "Variables & Conditions (sans filet de sécurité !)", nl: "Variabelen & Condities (zonder vangnet!)" },
  intro: {
    en: "I'm thinking of a number between 1 and 100. Try to guess it! Then try typing a word like 'banana' to see what happens...",
    fr: "Je pense à un nombre entre 1 et 100. Devine-le ! Puis essaie d'écrire un mot comme « banane » pour voir ce qui se passe...",
    nl: "Ik denk aan een getal tussen 1 en 100. Raad het! Probeer dan een woord zoals 'banaan' te typen...",
  },
  placeholder: { en: "Type a guess (1–100)", fr: "Tape un nombre (1–100)", nl: "Typ een gok (1–100)" },
  guessBtn: { en: "Guess!", fr: "Devine !", nl: "Raden!" },
  tries: { en: "Tries", fr: "Essais", nl: "Pogingen" },
  newGame: { en: "↺ New game", fr: "↺ Nouvelle partie", nl: "↺ Nieuw spel" },
  none: { en: "No guesses yet. Type a number!", fr: "Aucun essai. Tape un nombre !", nl: "Nog geen pogingen. Typ een getal!" },
  higher: { en: "📈 Higher!", fr: "📈 Plus haut !", nl: "📈 Hoger!" },
  lower: { en: "📉 Lower!", fr: "📉 Plus bas !", nl: "📉 Lager!" },
  win: { en: (n: number) => `🎉 You got it in ${n} tries!`, fr: (n: number) => `🎉 Trouvé en ${n} essais !`, nl: (n: number) => `🎉 Gevonden in ${n} pogingen!` },
  boom: {
    en: "💥 BOOM ! 💥\n\nThe program just crashed because it expected a NUMBER but got text.\n\nLesson: this is why we need ERROR HANDLING!",
    fr: "💥 BOUM ! 💥\n\nLe programme vient de planter parce qu'il attendait un NOMBRE mais a reçu du texte.\n\nLeçon : voilà pourquoi il faut GÉRER LES ERREURS !",
    nl: "💥 BOEM ! 💥\n\nHet programma is gecrasht omdat het een GETAL verwachtte maar tekst kreeg.\n\nLes: daarom hebben we FOUTAFHANDELING nodig!",
  },
  challenge: { en: "🧪 Teacher's challenge", fr: "🧪 Défi du prof", nl: "🧪 Uitdaging van de leerkracht" },
  challengeText: {
    en: "Try typing letters instead of a number. What happens? Now ask the class: how would YOU protect the program?",
    fr: "Essaie de taper des lettres au lieu d'un nombre. Que se passe-t-il ? Demande à la classe : comment TU protégerais le programme ?",
    nl: "Typ letters in plaats van een getal. Wat gebeurt er? Vraag de klas: hoe zou JIJ het programma beschermen?",
  },
  code: {
    en: `secret = random(1, 100)
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
# isn't even a number?`,
    fr: `secret = aleatoire(1, 100)
essais = 0

tant que non trouve:
  essai = lire_entree()
  essais = essais + 1

  si essai == secret:
    afficher("Gagné !")
  sinon si essai < secret:
    afficher("Plus haut !")
  sinon:
    afficher("Plus bas !")

# 🐛 Manque : et si l'essai
# n'est pas un nombre ?`,
    nl: `geheim = willekeurig(1, 100)
pogingen = 0

zolang niet gevonden:
  gok = lees_invoer()
  pogingen = pogingen + 1

  als gok == geheim:
    print("Gewonnen!")
  anders als gok < geheim:
    print("Hoger!")
  anders:
    print("Lager!")

# 🐛 Mist: wat als gok
# geen getal is?`,
  },
};

function GuessPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T) => pick(lang, T[k] as any);
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
    const guess = parseInt(raw);
    if (isNaN(guess)) {
      // eslint-disable-next-line no-alert
      alert(t("boom"));
      return;
    }
    const next = tries + 1;
    setTries(next);
    let hint = "";
    if (guess === secret) {
      hint = (T.win as any)[lang]?.(next) ?? T.win.en(next);
      setDone(true);
    } else if (guess < secret) hint = t("higher");
    else hint = t("lower");
    setHistory((h) => [{ guess, hint }, ...h]);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <GameLayout title={t("title")} emoji="🎯" concept={t("concept")} intro={t("intro")} code={t("code")}>
      <form onSubmit={onSubmit} className="flex gap-2 mb-6">
        <input
          ref={inputRef}
          type="text"
          placeholder={t("placeholder")}
          disabled={done}
          className="flex-1 rounded-xl border-2 border-border bg-input px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary"
          autoFocus
        />
        <button type="submit" disabled={done} className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold hover:scale-105 transition disabled:opacity-50">
          {t("guessBtn")}
        </button>
      </form>

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">{t("tries")}: <span className="font-bold text-foreground">{tries}</span></div>
        <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">{t("newGame")}</button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((h, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-2">
            <span className="font-mono font-bold">{h.guess}</span>
            <span>{h.hint}</span>
          </li>
        ))}
        {history.length === 0 && <li className="text-center text-muted-foreground py-8">{t("none")}</li>}
      </ul>

      <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_8%,transparent)]">
        <div className="font-bold text-sm mb-1">{t("challenge")}</div>
        <div className="text-sm text-muted-foreground">{t("challengeText")}</div>
      </div>
    </GameLayout>
  );
}
