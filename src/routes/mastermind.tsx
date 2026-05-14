import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/mastermind")({ component: MastermindPage });

const COLORS = [
  { name: "red", value: "var(--fun-red)" },
  { name: "yellow", value: "var(--fun-yellow)" },
  { name: "green", value: "var(--fun-green)" },
  { name: "blue", value: "var(--fun-blue)" },
  { name: "pink", value: "var(--fun-pink)" },
  { name: "purple", value: "var(--primary)" },
];
const CODE_LEN = 4, MAX_TRIES = 10;

const makeSecret = () => Array.from({ length: CODE_LEN }, () => Math.floor(Math.random() * COLORS.length));

function score(guess: number[], secret: number[]) {
  let exact = 0, partial = 0;
  const sUsed = Array(CODE_LEN).fill(false), gUsed = Array(CODE_LEN).fill(false);
  for (let i = 0; i < CODE_LEN; i++) if (guess[i] === secret[i]) { exact++; sUsed[i] = true; gUsed[i] = true; }
  for (let i = 0; i < CODE_LEN; i++) {
    if (gUsed[i]) continue;
    for (let j = 0; j < CODE_LEN; j++) {
      if (!sUsed[j] && guess[i] === secret[j]) { partial++; sUsed[j] = true; break; }
    }
  }
  return { exact, partial };
}

const T = {
  title: { en: "Mastermind", fr: "Mastermind", nl: "Mastermind" },
  concept: { en: "Variables, Loops & Conditions", fr: "Variables, Boucles & Conditions", nl: "Variabelen, Lussen & Condities" },
  intro: {
    en: "Crack the secret 4-color code in 10 tries. ⚫ = right color, right place. ⚪ = right color, wrong place.",
    fr: "Trouve le code secret de 4 couleurs en 10 essais. ⚫ = bonne couleur, bonne place. ⚪ = bonne couleur, mauvaise place.",
    nl: "Kraak de geheime 4-kleurcode in 10 pogingen. ⚫ = juiste kleur, juiste plaats. ⚪ = juiste kleur, foute plaats.",
  },
  check: { en: "Check guess →", fr: "Vérifier →", nl: "Controleer →" },
  won: { en: "🎉 You cracked it!", fr: "🎉 Trouvé !", nl: "🎉 Gekraakt!" },
  lost: { en: "💥 Out of tries!", fr: "💥 Plus d'essais !", nl: "💥 Geen pogingen meer!" },
  secret: { en: "The secret was:", fr: "Le code était :", nl: "De code was:" },
  again: { en: "↺ Play again", fr: "↺ Rejouer", nl: "↺ Opnieuw" },
  code: {
    en: `secret = [random colors x 4]\n\nwhile tries < 10:\n  guess = ask_player()\n  exact = 0\n  partial = 0\n\n  # 🔄 LOOP through positions\n  for i in 0..4:\n    if guess[i] == secret[i]:\n      exact = exact + 1\n    else if guess[i] in secret:\n      partial = partial + 1\n\n  if exact == 4:\n    print("You won!")`,
    fr: `secret = [4 couleurs aleatoires]\n\ntant que essais < 10:\n  essai = demander()\n  exact = 0\n  partiel = 0\n\n  # 🔄 BOUCLE sur les positions\n  pour i de 0 à 4:\n    si essai[i] == secret[i]:\n      exact = exact + 1\n    sinon si essai[i] dans secret:\n      partiel = partiel + 1\n\n  si exact == 4:\n    afficher("Gagné !")`,
    nl: `geheim = [4 willekeurige kleuren]\n\nzolang pogingen < 10:\n  gok = vraag_speler()\n  exact = 0\n  deels = 0\n\n  # 🔄 LUS over de posities\n  voor i in 0..4:\n    als gok[i] == geheim[i]:\n      exact = exact + 1\n    anders als gok[i] in geheim:\n      deels = deels + 1\n\n  als exact == 4:\n    print("Gewonnen!")`,
  },
};

function MastermindPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as any) as string;
  const [secret, setSecret] = useState<number[]>(makeSecret);
  const [current, setCurrent] = useState<(number | null)[]>(Array(CODE_LEN).fill(null));
  const [guesses, setGuesses] = useState<{ guess: number[]; exact: number; partial: number }[]>([]);
  const [activeSlot, setActiveSlot] = useState(0);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  function pickColor(idx: number) {
    if (status !== "playing") return;
    const next = current.slice();
    next[activeSlot] = idx;
    setCurrent(next);
    const ne = next.findIndex((v) => v === null);
    setActiveSlot(ne === -1 ? activeSlot : ne);
  }

  function submit() {
    if (current.some((v) => v === null) || status !== "playing") return;
    const guess = current as number[];
    const result = score(guess, secret);
    const ng = [...guesses, { guess, ...result }];
    setGuesses(ng); setCurrent(Array(CODE_LEN).fill(null)); setActiveSlot(0);
    if (result.exact === CODE_LEN) setStatus("won");
    else if (ng.length >= MAX_TRIES) setStatus("lost");
  }

  function reset() {
    setSecret(makeSecret()); setCurrent(Array(CODE_LEN).fill(null));
    setGuesses([]); setActiveSlot(0); setStatus("playing");
  }

  return (
    <GameLayout title={t("title")} emoji="🎨" concept={t("concept")} intro={t("intro")} code={t("code")}>
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
                  <button key={i} onClick={() => isCurrent && setActiveSlot(i)}
                    className={`w-10 h-10 rounded-full border-2 ${isCurrent && i === activeSlot ? "border-primary ring-2 ring-primary" : "border-border"}`}
                    style={{ backgroundColor: p !== null ? COLORS[p].value : "var(--muted)" }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-0.5 w-12">
                {g ? [
                  ...Array(g.exact).fill("exact"),
                  ...Array(g.partial).fill("partial"),
                  ...Array(CODE_LEN - g.exact - g.partial).fill("none"),
                ].map((kind, i) => (
                  <span key={i} className={`w-4 h-4 rounded-full border ${
                    kind === "exact" ? "bg-foreground border-foreground"
                    : kind === "partial" ? "bg-background border-foreground"
                    : "bg-muted border-border"}`} />
                )) : null}
              </div>
            </div>
          );
        })}
      </div>

      {status === "playing" ? (
        <>
          <div className="flex justify-center gap-2 mb-3">
            {COLORS.map((c, i) => (
              <button key={c.name} onClick={() => pickColor(i)}
                className="w-10 h-10 rounded-full border-2 border-border hover:scale-110 transition"
                style={{ backgroundColor: c.value }} aria-label={c.name} />
            ))}
          </div>
          <div className="text-center">
            <button onClick={submit} disabled={current.some((v) => v === null)}
              className="rounded-xl bg-primary text-primary-foreground px-6 py-2 font-bold disabled:opacity-40 hover:scale-105 transition">
              {t("check")}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className={`rounded-xl p-5 mb-4 border-2 ${status === "won" ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]" : "border-[var(--fun-red)] bg-[color-mix(in_oklab,var(--fun-red)_15%,transparent)]"}`}>
            <div className="text-3xl mb-1">{status === "won" ? t("won") : t("lost")}</div>
            <div className="text-sm text-muted-foreground mb-3">{t("secret")}</div>
            <div className="flex justify-center gap-2">
              {secret.map((s, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-border" style={{ backgroundColor: COLORS[s].value }} />
              ))}
            </div>
          </div>
          <button onClick={reset} className="rounded-xl bg-primary text-primary-foreground px-5 py-2 font-bold hover:scale-105 transition">{t("again")}</button>
        </div>
      )}
    </GameLayout>
  );
}
