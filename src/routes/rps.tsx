import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/rps")({ component: RPSPage });

type Move = "rock" | "paper" | "scissors";
const MOVES: Move[] = ["rock", "paper", "scissors"];

function decide(p: Move, c: Move): "win" | "lose" | "draw" {
  if (p === c) return "draw";
  if (
    (p === "rock" && c === "scissors") ||
    (p === "paper" && c === "rock") ||
    (p === "scissors" && c === "paper")
  )
    return "win";
  return "lose";
}

const T = {
  title: { en: "Rock Paper Scissors", fr: "Pierre Feuille Ciseaux", nl: "Steen Papier Schaar" },
  concept: {
    en: "Variables & Conditions",
    fr: "Variables & Conditions",
    nl: "Variabelen & Condities",
  },
  intro: {
    en: "Choose your move. The computer picks one too. CONDITIONS decide who wins!",
    fr: "Choisis ton coup. L'ordi en choisit un aussi. Des CONDITIONS décident du vainqueur !",
    nl: "Kies je zet. De computer kiest er ook een. CONDITIES beslissen wie wint!",
  },
  you: { en: "You", fr: "Toi", nl: "Jij" },
  cpu: { en: "Computer", fr: "Ordi", nl: "Computer" },
  win: { en: "🎉 You win!", fr: "🎉 Gagné !", nl: "🎉 Gewonnen!" },
  lose: { en: "😬 You lose.", fr: "😬 Perdu.", nl: "😬 Verloren." },
  draw: { en: "🤝 Draw!", fr: "🤝 Égalité !", nl: "🤝 Gelijk!" },
  reset: { en: "↺ Reset score", fr: "↺ Réinitialiser", nl: "↺ Reset score" },
  code: {
    en: `choices = ["rock","paper","scissors"]\nplayer = ask_player()\ncomputer = random_choice(choices)\n\n# CONDITIONS decide the winner\nif player == computer:\n  result = "draw"\nelse if (player == "rock" and computer == "scissors")\n     or (player == "paper" and computer == "rock")\n     or (player == "scissors" and computer == "paper"):\n  result = "win"\nelse:\n  result = "lose"`,
    fr: `choix = ["pierre","feuille","ciseaux"]\njoueur = demander()\nordi = choix_aleatoire(choix)\n\n# Les CONDITIONS décident\nsi joueur == ordi:\n  resultat = "egalite"\nsinon si (joueur == "pierre" et ordi == "ciseaux")\n     ou (joueur == "feuille" et ordi == "pierre")\n     ou (joueur == "ciseaux" et ordi == "feuille"):\n  resultat = "gagne"\nsinon:\n  resultat = "perdu"`,
    nl: `keuzes = ["steen","papier","schaar"]\nspeler = vraag_speler()\ncomputer = willekeur(keuzes)\n\n# CONDITIES bepalen wie wint\nals speler == computer:\n  resultaat = "gelijk"\nanders als (speler == "steen" en computer == "schaar")\n        of (speler == "papier" en computer == "steen")\n        of (speler == "schaar" en computer == "papier"):\n  resultaat = "win"\nanders:\n  resultaat = "verlies"`,
  },
};

const EMO: Record<Move, string> = { rock: "✊", paper: "✋", scissors: "✌️" };
const NAMES: Record<Move, { en: string; fr: string; nl: string }> = {
  rock: { en: "Rock", fr: "Pierre", nl: "Steen" },
  paper: { en: "Paper", fr: "Feuille", nl: "Papier" },
  scissors: { en: "Scissors", fr: "Ciseaux", nl: "Schaar" },
};

function RPSPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as any) as string;
  const [you, setYou] = useState(0),
    [cpu, setCpu] = useState(0),
    [draws, setDraws] = useState(0);
  const [last, setLast] = useState<{ p: Move; c: Move; r: "win" | "lose" | "draw" } | null>(null);

  function play(p: Move) {
    const c = MOVES[Math.floor(Math.random() * 3)];
    const r = decide(p, c);
    setLast({ p, c, r });
    if (r === "win") setYou((v) => v + 1);
    else if (r === "lose") setCpu((v) => v + 1);
    else setDraws((v) => v + 1);
  }

  function reset() {
    setYou(0);
    setCpu(0);
    setDraws(0);
    setLast(null);
  }

  return (
    <GameLayout
      title={t("title")}
      emoji="✊"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="grid grid-cols-3 text-center gap-2 mb-6">
        <div className="rounded-xl bg-secondary p-3">
          <div className="text-xs text-muted-foreground">{t("you")}</div>
          <div className="text-3xl font-bold">{you}</div>
        </div>
        <div className="rounded-xl bg-secondary p-3">
          <div className="text-xs text-muted-foreground">=</div>
          <div className="text-3xl font-bold">{draws}</div>
        </div>
        <div className="rounded-xl bg-secondary p-3">
          <div className="text-xs text-muted-foreground">{t("cpu")}</div>
          <div className="text-3xl font-bold">{cpu}</div>
        </div>
      </div>

      {last && (
        <div
          className={`rounded-xl text-center p-5 mb-5 border-2 ${
            last.r === "win"
              ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]"
              : last.r === "lose"
                ? "border-[var(--fun-red)] bg-[color-mix(in_oklab,var(--fun-red)_15%,transparent)]"
                : "border-border bg-secondary"
          }`}
        >
          <div className="flex justify-center items-center gap-6 text-5xl mb-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">{t("you")}</div>
              {EMO[last.p]}
            </div>
            <div className="text-2xl">vs</div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">{t("cpu")}</div>
              {EMO[last.c]}
            </div>
          </div>
          <div className="text-xl font-bold">
            {last.r === "win" ? t("win") : last.r === "lose" ? t("lose") : t("draw")}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {MOVES.map((m) => (
          <button
            key={m}
            onClick={() => play(m)}
            className="rounded-2xl border-2 border-border bg-card p-5 hover:border-primary hover:-translate-y-1 transition shadow-[4px_4px_0_0_var(--color-border)]"
          >
            <div className="text-5xl mb-1">{EMO[m]}</div>
            <div className="font-bold">{pick(lang, NAMES[m])}</div>
          </button>
        ))}
      </div>
      <div className="text-center mt-5">
        <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">
          {t("reset")}
        </button>
      </div>
    </GameLayout>
  );
}
