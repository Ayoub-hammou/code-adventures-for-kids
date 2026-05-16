import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/simon")({ component: SimonPage });

const PADS = [
  { id: 0, color: "var(--fun-green)" },
  { id: 1, color: "var(--fun-red)" },
  { id: 2, color: "var(--fun-yellow)" },
  { id: 3, color: "var(--fun-blue)" },
];

const T = {
  title: { en: "Simon Says", fr: "Jacques a dit", nl: "Simon Zegt" },
  concept: { en: "Variables & Loops", fr: "Variables & Boucles", nl: "Variabelen & Lussen" },
  intro: {
    en: "Watch the sequence, then repeat it. Each round adds one more color. How long can you remember?",
    fr: "Regarde la séquence, puis répète-la. Chaque tour ajoute une couleur. Tu peux te souvenir de combien ?",
    nl: "Bekijk de reeks, herhaal hem. Elke ronde komt er een kleur bij. Hoe ver kom je?",
  },
  start: { en: "▶ Start", fr: "▶ Démarrer", nl: "▶ Start" },
  level: { en: "Level", fr: "Niveau", nl: "Level" },
  best: { en: "Best", fr: "Record", nl: "Record" },
  watch: { en: "Watch…", fr: "Regarde…", nl: "Kijk…" },
  yourTurn: { en: "Your turn!", fr: "À toi !", nl: "Jouw beurt!" },
  oops: {
    en: "💥 Oops! Wrong color.",
    fr: "💥 Oups ! Mauvaise couleur.",
    nl: "💥 Oeps! Foute kleur.",
  },
  again: { en: "Try again", fr: "Réessayer", nl: "Opnieuw" },
  code: {
    en: `sequence = []\nlevel = 0\n\nwhile playing:\n  # add a random color (VARIABLE)\n  sequence.append(random_color())\n  level = level + 1\n\n  # 🔄 LOOP: show the sequence\n  for color in sequence:\n    flash(color)\n\n  # 🔄 LOOP: read player input\n  for i in 0..length(sequence):\n    input = wait_for_press()\n    if input != sequence[i]:\n      print("Game over!")\n      stop`,
    fr: `sequence = []\nniveau = 0\n\ntant que en_jeu:\n  # ajoute une couleur (VARIABLE)\n  sequence.ajouter(couleur_aleatoire())\n  niveau = niveau + 1\n\n  # 🔄 BOUCLE : montre la séquence\n  pour couleur dans sequence:\n    afficher(couleur)\n\n  # 🔄 BOUCLE : lis le joueur\n  pour i de 0 à longueur(sequence):\n    saisie = attendre_clic()\n    si saisie != sequence[i]:\n      afficher("Perdu !")\n      arreter`,
    nl: `reeks = []\nlevel = 0\n\nzolang spelen:\n  # voeg willekeurige kleur toe (VARIABELE)\n  reeks.voegtoe(willekeurige_kleur())\n  level = level + 1\n\n  # 🔄 LUS: toon de reeks\n  voor kleur in reeks:\n    flits(kleur)\n\n  # 🔄 LUS: lees speler\n  voor i in 0..lengte(reeks):\n    input = wacht_op_klik()\n    als input != reeks[i]:\n      print("Game over!")\n      stop`,
  },
};

function SimonPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as any) as string;
  const [seq, setSeq] = useState<number[]>([]);
  const [userIdx, setUserIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "show" | "input" | "lost">("idle");
  const [active, setActive] = useState<number | null>(null);
  const [best, setBest] = useState(0);
  const timer = useRef<number[]>([]);

  function clearTimers() {
    timer.current.forEach((id) => window.clearTimeout(id));
    timer.current = [];
  }
  useEffect(() => () => clearTimers(), []);

  function start() {
    clearTimers();
    const first = [Math.floor(Math.random() * 4)];
    setSeq(first);
    setUserIdx(0);
    showSequence(first);
  }

  function showSequence(s: number[]) {
    setPhase("show");
    setActive(null);
    s.forEach((id, i) => {
      timer.current.push(window.setTimeout(() => setActive(id), 600 * (i + 1)));
      timer.current.push(window.setTimeout(() => setActive(null), 600 * (i + 1) + 350));
    });
    timer.current.push(
      window.setTimeout(
        () => {
          setPhase("input");
          setUserIdx(0);
        },
        600 * (s.length + 1),
      ),
    );
  }

  function press(id: number) {
    if (phase !== "input") return;
    if (id !== seq[userIdx]) {
      setPhase("lost");
      setBest((b) => Math.max(b, seq.length - 1));
      return;
    }
    const ni = userIdx + 1;
    if (ni === seq.length) {
      const next = [...seq, Math.floor(Math.random() * 4)];
      setSeq(next);
      timer.current.push(window.setTimeout(() => showSequence(next), 600));
    } else setUserIdx(ni);
    setActive(id);
    timer.current.push(window.setTimeout(() => setActive(null), 200));
  }

  return (
    <GameLayout
      title={t("title")}
      emoji="🧠"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          <span className="font-bold">{t("level")}:</span> {Math.max(seq.length, 0)}
          <span className="mx-3">•</span>
          <span className="font-bold">{t("best")}:</span> {best}
        </div>
        {phase !== "idle" && (
          <div
            className="rounded-xl px-4 py-3 font-bold text-lg min-w-fit text-center"
            style={{
              backgroundColor:
                phase === "input"
                  ? "var(--fun-green)"
                  : phase === "show"
                    ? "var(--fun-blue)"
                    : phase === "lost"
                      ? "var(--fun-red)"
                      : "var(--muted)",
              color:
                phase === "input" || phase === "show" || phase === "lost"
                  ? "white"
                  : "var(--foreground)",
            }}
          >
            {phase === "show" && t("watch")}
            {phase === "input" && t("yourTurn")}
            {phase === "lost" && t("oops")}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {PADS.map((p) => (
          <button
            key={p.id}
            onClick={() => press(p.id)}
            disabled={phase !== "input"}
            className="aspect-square rounded-2xl border-4 border-border transition-all"
            style={{
              backgroundColor: p.color,
              opacity: active === p.id ? 1 : 0.55,
              transform: active === p.id ? "scale(0.96)" : "scale(1)",
              boxShadow: active === p.id ? "0 0 24px var(--foreground)" : undefined,
            }}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={start}
          disabled={phase !== "idle" && phase !== "lost"}
          className="rounded-xl bg-primary text-primary-foreground px-6 py-2 font-bold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {phase === "lost" ? t("again") : t("start")}
        </button>
      </div>
    </GameLayout>
  );
}
