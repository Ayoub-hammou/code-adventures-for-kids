import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/calculator")({ component: CalcPage });

const T = {
  title: { en: "Safe Calculator", fr: "Calculatrice Sûre", nl: "Veilige Calculator" },
  concept: { en: "Error Handling", fr: "Gestion des erreurs", nl: "Foutafhandeling" },
  intro: {
    en: "This calculator does NOT crash. It checks every input and explains nicely when something is wrong. Try dividing by 0 or typing letters!",
    fr: "Cette calculatrice NE PLANTE PAS. Elle vérifie tout et explique gentiment ce qui ne va pas. Essaie de diviser par 0 ou de taper des lettres !",
    nl: "Deze calculator CRASHT NIET. Hij controleert alles en legt netjes uit wat fout is. Probeer delen door 0 of letters in te voeren!",
  },
  a: { en: "First number", fr: "Premier nombre", nl: "Eerste getal" },
  b: { en: "Second number", fr: "Deuxième nombre", nl: "Tweede getal" },
  op: { en: "Operation", fr: "Opération", nl: "Bewerking" },
  calc: { en: "Calculate", fr: "Calculer", nl: "Bereken" },
  errNan: { en: "❗ Please type a NUMBER (not letters).", fr: "❗ Tape un NOMBRE (pas des lettres).", nl: "❗ Typ een GETAL (geen letters)." },
  errDiv: { en: "❗ Cannot divide by zero — that breaks math!", fr: "❗ Impossible de diviser par zéro — ça casse les maths !", nl: "❗ Kan niet delen door nul — dat breekt de wiskunde!" },
  result: { en: "Result", fr: "Résultat", nl: "Resultaat" },
  vsBroken: { en: "🆚 Compare with the 'Guess the Number' game (no checks → BOOM!)", fr: "🆚 Compare au jeu « Devine le Nombre » (sans vérif → BOUM !)", nl: "🆚 Vergelijk met 'Raad het Getal' (zonder check → BOEM!)" },
  code: {
    en: `function safeDivide(a, b):\n  # ✅ check inputs first\n  if not is_number(a) or not is_number(b):\n    return error("Please type numbers!")\n\n  # ✅ catch the danger\n  if b == 0:\n    return error("Cannot divide by zero!")\n\n  return a / b\n\n# Or with try/catch:\ntry:\n  result = a / b\nexcept Exception as e:\n  show_friendly_message(e)`,
    fr: `fonction divisionSure(a, b):\n  # ✅ vérifie d'abord\n  si pas est_nombre(a) ou pas est_nombre(b):\n    retourner erreur("Tape des nombres !")\n\n  # ✅ attrape le danger\n  si b == 0:\n    retourner erreur("Pas de division par 0 !")\n\n  retourner a / b\n\n# Ou avec try/catch :\nessayer:\n  resultat = a / b\nattraper Exception e:\n  afficher_message_sympa(e)`,
    nl: `functie veiligDelen(a, b):\n  # ✅ controleer eerst\n  als niet is_getal(a) of niet is_getal(b):\n    geef fout terug("Typ getallen!")\n\n  # ✅ vang het gevaar\n  als b == 0:\n    geef fout terug("Niet delen door nul!")\n\n  geef a / b terug\n\n# Of met try/catch:\nprobeer:\n  resultaat = a / b\nvang Exception e op:\n  toon_vriendelijke_melding(e)`,
  },
};

type Op = "+" | "−" | "×" | "÷";
const OPS: Op[] = ["+", "−", "×", "÷"];

function CalcPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as any) as string;
  const [a, setA] = useState("12");
  const [b, setB] = useState("4");
  const [op, setOp] = useState<Op>("+");
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  function compute() {
    const numA = Number(a), numB = Number(b);
    // ✅ ERROR HANDLING #1: bad input
    if (a.trim() === "" || b.trim() === "" || isNaN(numA) || isNaN(numB)) {
      setResult({ ok: false, msg: t("errNan") }); return;
    }
    // ✅ ERROR HANDLING #2: divide by zero
    if (op === "÷" && numB === 0) {
      setResult({ ok: false, msg: t("errDiv") }); return;
    }
    let r = 0;
    if (op === "+") r = numA + numB;
    else if (op === "−") r = numA - numB;
    else if (op === "×") r = numA * numB;
    else r = numA / numB;
    setResult({ ok: true, msg: `${numA} ${op} ${numB} = ${r}` });
  }

  return (
    <GameLayout title={t("title")} emoji="🧮" concept={t("concept")} intro={t("intro")} code={t("code")}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-3 items-end mb-5">
        <Field label={t("a")} value={a} onChange={setA} />
        <div>
          <label className="block text-xs font-bold mb-1 text-muted-foreground">{t("op")}</label>
          <div className="flex gap-1">
            {OPS.map((o) => (
              <button key={o} onClick={() => setOp(o)}
                className={`w-10 h-12 rounded-xl border-2 font-bold text-lg ${op === o ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/50"}`}>
                {o}
              </button>
            ))}
          </div>
        </div>
        <Field label={t("b")} value={b} onChange={setB} />
        <button onClick={compute} className="rounded-xl bg-primary text-primary-foreground px-6 h-12 font-bold hover:scale-105 transition">
          = {t("calc")}
        </button>
      </div>

      {result && (
        <div className={`rounded-xl p-5 border-2 text-center ${
          result.ok
            ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]"
            : "border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_15%,transparent)]"
        }`}>
          {result.ok && <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-1">{t("result")}</div>}
          <div className="text-2xl font-bold font-mono">{result.msg}</div>
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-border bg-secondary text-sm">
        {t("vsBroken")}
      </div>
    </GameLayout>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold mb-1 text-muted-foreground">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-border bg-input px-4 h-12 text-lg font-mono focus:outline-none focus:border-primary" />
    </div>
  );
}
