import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick, Lang } from "@/lib/i18n";

export const Route = createFileRoute("/adventure")({ component: AdventurePage });

type Choice = { textKey: string; to: string; effect?: Partial<Stats> };
type Scene = { id: string; textKey: string; choices: Choice[] };
type Stats = { courage: number; gold: number; hasKey: boolean; hasSword: boolean };

const scenes: Record<string, Scene> = {
  start: { id: "start", textKey: "s_start", choices: [
    { textKey: "c_cave", to: "cave", effect: { courage: 1 } },
    { textKey: "c_village", to: "village" },
  ]},
  cave: { id: "cave", textKey: "s_cave", choices: [
    { textKey: "c_grabKey", to: "gotKey", effect: { hasKey: true, courage: 2 } },
    { textKey: "c_runAway", to: "village" },
  ]},
  gotKey: { id: "gotKey", textKey: "s_gotKey", choices: [{ textKey: "c_toVillage", to: "village" }]},
  village: { id: "village", textKey: "s_village", choices: [
    { textKey: "c_buySword", to: "sword", effect: { hasSword: true, gold: -10 } },
    { textKey: "c_chest", to: "chest" },
    { textKey: "c_castle", to: "castle" },
  ]},
  sword: { id: "sword", textKey: "s_sword", choices: [
    { textKey: "c_chest", to: "chest" },
    { textKey: "c_marchCastle", to: "castle" },
  ]},
  chest: { id: "chest", textKey: "s_chest", choices: [{ textKey: "c_continue", to: "castle" }]},
  castle: { id: "castle", textKey: "s_castle", choices: [{ textKey: "c_face", to: "ending" }]},
  ending: { id: "ending", textKey: "", choices: [] },
};

const TXT: Record<Lang, Record<string, string>> = {
  en: {
    s_start: "You wake up in a misty forest. A path forks left toward a dark cave 🕳️ and right toward a sleepy village 🏘️.",
    s_cave: "Inside the cave a glowing key floats above a sleeping dragon 🐉. Your heart pounds.",
    s_gotKey: "You snatch the key! The dragon stirs… but you slip out into the sunlight, key in hand. ✨",
    s_village: "In the village a blacksmith offers you a sword for 10 gold. A locked treasure chest sits in the square.",
    s_sword: "You strap on a shining sword. You feel braver. ⚔️",
    s_chest: "The chest is locked tight. You'll need a key…",
    s_castle: "A monster guards the castle gate! Your fate depends on what you carry…",
    c_cave: "Enter the cave", c_village: "Visit the village", c_grabKey: "Sneak and grab the key",
    c_runAway: "Run away!", c_toVillage: "Head to the village", c_buySword: "Buy the sword (-10 gold)",
    c_chest: "Try to open the chest", c_castle: "Walk to the castle", c_marchCastle: "March to the castle",
    c_continue: "Continue", c_face: "Face it!",
    end_hero: "⚔️ With sword raised and courage burning, you defeat the monster and become a legend!",
    end_sneak: "🗝️ You sneak past with the magic key, unlock a secret door, and escape with treasure!",
    end_lose: "💀 Without sword or key, the monster sends you running. You live… to play again.",
    courage: "💪 Courage", gold: "🪙 Gold", key: "🗝️ Key", sword: "⚔️ Sword",
    yes: "yes", no: "no", restart: "↺ Restart",
  },
  fr: {
    s_start: "Tu te réveilles dans une forêt brumeuse. Un chemin part à gauche vers une grotte sombre 🕳️ et à droite vers un village endormi 🏘️.",
    s_cave: "Dans la grotte, une clé brillante flotte au-dessus d'un dragon endormi 🐉. Ton cœur bat fort.",
    s_gotKey: "Tu attrapes la clé ! Le dragon bouge… mais tu te glisses dehors, clé en main. ✨",
    s_village: "Au village, un forgeron te propose une épée pour 10 pièces. Un coffre fermé trône sur la place.",
    s_sword: "Tu enfiles une épée brillante. Tu te sens plus courageux. ⚔️",
    s_chest: "Le coffre est bien verrouillé. Il faudrait une clé…",
    s_castle: "Un monstre garde la porte du château ! Ton destin dépend de ce que tu portes…",
    c_cave: "Entrer dans la grotte", c_village: "Aller au village", c_grabKey: "Te faufiler et prendre la clé",
    c_runAway: "Fuir !", c_toVillage: "Aller au village", c_buySword: "Acheter l'épée (-10 pièces)",
    c_chest: "Ouvrir le coffre", c_castle: "Aller au château", c_marchCastle: "Marcher vers le château",
    c_continue: "Continuer", c_face: "L'affronter !",
    end_hero: "⚔️ Épée brandie et courage en feu, tu vaincs le monstre et deviens une légende !",
    end_sneak: "🗝️ Tu te faufiles avec la clé magique, ouvres une porte secrète et t'enfuis avec le trésor !",
    end_lose: "💀 Sans épée ni clé, le monstre te fait fuir. Tu survis… pour rejouer.",
    courage: "💪 Courage", gold: "🪙 Or", key: "🗝️ Clé", sword: "⚔️ Épée",
    yes: "oui", no: "non", restart: "↺ Recommencer",
  },
  nl: {
    s_start: "Je wordt wakker in een mistig bos. Een pad gaat links naar een donkere grot 🕳️ en rechts naar een slaperig dorp 🏘️.",
    s_cave: "In de grot zweeft een glanzende sleutel boven een slapende draak 🐉. Je hart bonkt.",
    s_gotKey: "Je grijpt de sleutel! De draak beweegt… maar je glipt naar buiten, sleutel in de hand. ✨",
    s_village: "In het dorp biedt een smid je een zwaard voor 10 goud. Een gesloten kist staat op het plein.",
    s_sword: "Je gespt een glanzend zwaard om. Je voelt je dapperder. ⚔️",
    s_chest: "De kist zit stevig op slot. Je hebt een sleutel nodig…",
    s_castle: "Een monster bewaakt de kasteelpoort! Je lot hangt af van wat je draagt…",
    c_cave: "De grot in", c_village: "Naar het dorp", c_grabKey: "Sluip en pak de sleutel",
    c_runAway: "Wegrennen!", c_toVillage: "Naar het dorp", c_buySword: "Koop het zwaard (-10 goud)",
    c_chest: "Probeer de kist te openen", c_castle: "Loop naar het kasteel", c_marchCastle: "Marcheer naar het kasteel",
    c_continue: "Doorgaan", c_face: "Confronteer het!",
    end_hero: "⚔️ Met zwaard geheven en moed in vuur en vlam versla je het monster en word je een legende!",
    end_sneak: "🗝️ Je sluipt langs met de magische sleutel, opent een geheime deur en ontsnapt met de schat!",
    end_lose: "💀 Zonder zwaard of sleutel jaagt het monster je weg. Je leeft… om opnieuw te spelen.",
    courage: "💪 Moed", gold: "🪙 Goud", key: "🗝️ Sleutel", sword: "⚔️ Zwaard",
    yes: "ja", no: "nee", restart: "↺ Opnieuw",
  },
};

const META = {
  title: { en: "Choose Your Adventure", fr: "Choisis ton Aventure", nl: "Kies je Avontuur" },
  concept: { en: "Variables & Conditions", fr: "Variables & Conditions", nl: "Variabelen & Condities" },
  intro: {
    en: "Every choice changes a VARIABLE (your stats). At the end, CONDITIONS decide your fate!",
    fr: "Chaque choix change une VARIABLE (tes stats). À la fin, des CONDITIONS décident de ton sort !",
    nl: "Elke keuze verandert een VARIABELE (je stats). Aan het eind beslissen CONDITIES je lot!",
  },
  code: {
    en: `courage = 0\ngold = 20\nhasKey = false\nhasSword = false\n\n# Each choice updates variables\n\n# At the end, CONDITIONS decide:\nif hasSword and courage >= 2:\n  ending = "Hero!"\nelse if hasKey:\n  ending = "Sneaky escape"\nelse:\n  ending = "Game over"`,
    fr: `courage = 0\nor = 20\naCle = faux\naEpee = faux\n\n# Chaque choix change les variables\n\n# À la fin, les CONDITIONS décident :\nsi aEpee et courage >= 2:\n  fin = "Héros !"\nsinon si aCle:\n  fin = "Évasion discrète"\nsinon:\n  fin = "Game over"`,
    nl: `moed = 0\ngoud = 20\nheeftSleutel = onwaar\nheeftZwaard = onwaar\n\n# Elke keuze verandert variabelen\n\n# Op het eind beslissen CONDITIES:\nals heeftZwaard en moed >= 2:\n  einde = "Held!"\nanders als heeftSleutel:\n  einde = "Sluwe ontsnapping"\nanders:\n  einde = "Game over"`,
  },
};

const initial: Stats = { courage: 0, gold: 20, hasKey: false, hasSword: false };

function AdventurePage() {
  const { lang } = useLang();
  const txt = TXT[lang];
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
    setLog((l) => [...l, `→ ${txt[c.textKey]}`]);
    setSceneId(c.to);
  }

  function reset() { setSceneId("start"); setStats(initial); setLog([]); }

  let endingText = "", endingTone = "";
  if (sceneId === "ending") {
    if (stats.hasSword && stats.courage >= 2) { endingText = txt.end_hero; endingTone = "var(--fun-green)"; }
    else if (stats.hasKey) { endingText = txt.end_sneak; endingTone = "var(--fun-yellow)"; }
    else { endingText = txt.end_lose; endingTone = "var(--fun-red)"; }
  }

  return (
    <GameLayout
      title={pick(lang, META.title)} emoji="🗺️"
      concept={pick(lang, META.concept)}
      intro={pick(lang, META.intro)}
      code={pick(lang, META.code)}
    >
      <div className="grid grid-cols-4 gap-2 mb-5 text-center text-sm">
        <Stat label={txt.courage} value={stats.courage} />
        <Stat label={txt.gold} value={stats.gold} />
        <Stat label={txt.key} value={stats.hasKey ? txt.yes : txt.no} />
        <Stat label={txt.sword} value={stats.hasSword ? txt.yes : txt.no} />
      </div>

      {sceneId !== "ending" ? (
        <>
          <div className="rounded-xl bg-secondary p-5 mb-4 text-lg leading-relaxed">{txt[scene.textKey]}</div>
          <div className="grid gap-2">
            {scene.choices.map((c) => (
              <button key={c.to + c.textKey} onClick={() => choose(c)}
                className="text-left rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-secondary px-4 py-3 font-semibold transition">
                {txt[c.textKey]}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl p-6 text-center text-lg font-semibold border-2"
          style={{ borderColor: endingTone, backgroundColor: `color-mix(in oklab, ${endingTone} 15%, transparent)` }}>
          {endingText}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-muted-foreground font-mono">{log.slice(-3).join("  ")}</div>
        <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">{txt.restart}</button>
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
