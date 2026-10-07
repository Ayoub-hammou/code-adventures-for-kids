import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "fr" | "nl";

type Ctx = {
  lang: Lang;
  name: string;
  setLang: (l: Lang) => void;
  setName: (n: string) => void;
  reset: () => void;
  ready: boolean;
  showCodeByDefault: boolean;
  setShowCodeByDefault: (show: boolean) => void;
  gamesUnlocked: boolean;
  setGamesUnlocked: (unlocked: boolean) => void;
  visitedConcepts: string[];
  addVisitedConcept: (slug: string) => void;
  unlockedViaPassword: boolean;
  setUnlockedViaPassword: (unlocked: boolean) => void;
  conceptsUnlockPopupShown: boolean;
  setConceptsUnlockPopupShown: (shown: boolean) => void;
  easterEggUnlocked: boolean;
  setEasterEggUnlocked: (unlocked: boolean) => void;
  easterEggJustUnlocked: boolean;
  setEasterEggJustUnlocked: (unlocked: boolean) => void;
};

const LangCtx = createContext<Ctx | null>(null);

const KEY = "codekids_profile_v1";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [name, setNameState] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [showCodeByDefault, setShowCodeByDefaultState] = useState(true);
  const [gamesUnlocked, setGamesUnlockedState] = useState(false);
  const [visitedConcepts, setVisitedConceptsState] = useState<string[]>([]);
  const [unlockedViaPassword, setUnlockedViaPasswordState] = useState(false);
  const [conceptsUnlockPopupShown, setConceptsUnlockPopupShownState] = useState(false);
  const [easterEggUnlocked, setEasterEggUnlockedState] = useState(false);
  const [easterEggJustUnlocked, setEasterEggJustUnlockedState] = useState(false);

  useEffect(() => {
    try {
      // Use sessionStorage so data is cleared when the browser closes
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.lang) setLangState(p.lang);
        if (p.name) setNameState(p.name);
        if (p.showCodeByDefault !== undefined) setShowCodeByDefaultState(p.showCodeByDefault);
        if (p.gamesUnlocked !== undefined) setGamesUnlockedState(p.gamesUnlocked);
        if (p.visitedConcepts !== undefined) setVisitedConceptsState(p.visitedConcepts);
        if (p.unlockedViaPassword !== undefined) setUnlockedViaPasswordState(p.unlockedViaPassword);
        if (p.conceptsUnlockPopupShown !== undefined)
          setConceptsUnlockPopupShownState(p.conceptsUnlockPopupShown);
        if (p.easterEggUnlocked !== undefined) setEasterEggUnlockedState(p.easterEggUnlocked);
        if (p.easterEggJustUnlocked !== undefined)
          setEasterEggJustUnlockedState(p.easterEggJustUnlocked);
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      // Use sessionStorage so data is cleared when the browser closes
      sessionStorage.setItem(
        KEY,
        JSON.stringify({
          lang,
          name,
          showCodeByDefault,
          gamesUnlocked,
          visitedConcepts,
          unlockedViaPassword,
          conceptsUnlockPopupShown,
          easterEggUnlocked,
          easterEggJustUnlocked,
        }),
      );
    } catch {
      // ignore
    }
  }, [
    lang,
    name,
    ready,
    showCodeByDefault,
    gamesUnlocked,
    visitedConcepts,
    unlockedViaPassword,
    conceptsUnlockPopupShown,
    easterEggUnlocked,
    easterEggJustUnlocked,
  ]);

  return (
    <LangCtx.Provider
      value={{
        lang,
        name,
        setLang: setLangState,
        setName: setNameState,
        reset: () => {
          setNameState("");
          setGamesUnlockedState(false);
          setVisitedConceptsState([]);
          setUnlockedViaPasswordState(false);
          setConceptsUnlockPopupShownState(false);
          setEasterEggUnlockedState(false);
          setEasterEggJustUnlockedState(false);
          try {
            sessionStorage.removeItem(KEY);
          } catch {
            // ignore
          }
        },
        ready,
        showCodeByDefault,
        setShowCodeByDefault: setShowCodeByDefaultState,
        gamesUnlocked,
        setGamesUnlocked: setGamesUnlockedState,
        visitedConcepts,
        addVisitedConcept: (slug: string) => {
          setVisitedConceptsState((prev) => {
            if (prev.includes(slug)) return prev;
            return [...prev, slug];
          });
        },
        unlockedViaPassword,
        setUnlockedViaPassword: setUnlockedViaPasswordState,
        conceptsUnlockPopupShown,
        setConceptsUnlockPopupShown: setConceptsUnlockPopupShownState,
        easterEggUnlocked,
        setEasterEggUnlocked: setEasterEggUnlockedState,
        easterEggJustUnlocked,
        setEasterEggJustUnlocked: setEasterEggJustUnlockedState,
      }}
    >
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
}

/** Pick the right localized value. Falls back to English. */
export function pick<T>(lang: Lang, dict: { en: T; fr?: T; nl?: T }): T {
  return (dict[lang] ?? dict.en) as T;
}

export const UI = {
  en: {
    welcome: "Welcome!",
    askName: "What's your name?",
    askLang: "Pick your language",
    start: "Let's code!",
    hi: "Hi",
    changeLang: "Language",
    changeName: "Change",
    back: "← Back home",
    next: "Next game",
    nextConcept: "Next concept",
    howItWorks: "📜 How it works",
    show: "Show",
    hide: "Hide",
    chooseGame: "🎮 Choose a game",
    bigIdeas: "💡 The big ideas",
    learnMore: "Learn more",
    tryIt: "Try it",
    examples: "Examples",
    keyIdea: "Key idea",
    builtFor: "Where curiosity meets code !",
    copyright: "© 2025-2026 CodeKids Lab. All rights reserved.",
    codeVisible: "Code visible",
    codeHidden: "Code hidden",
    advancedConcepts: "🚀 Let's go and learn further",
    unlockTitle: "🔓 Unlock All Games",
    unlockDescription: "Enter the secret code to unlock all games at once!",
    unlockPlaceholder: "Enter code...",
    unlockButton: "Unlock",
    unlockError: "Wrong code. Try again!",
    unlockSuccess: "🎉 All games unlocked!",
    conceptsCompleted: "Congratulations ! All concepts covered. Games unlocked !",
     gotIt: "Got it",
     gamesLocked: "🔒 Games Locked",
     gamesLockedDesc: "Learn concepts first, then unlock games to practice!",
     conceptsCovered: "concepts covered",
     powerUpRapid: "Rapid Fire",
     powerUpShield: "Shield",
     powerUpSpread: "Spread Shot",
     bestScore: "Best Score",
     unlockSecretGame: "🔓 Secret Game Unlocked!",
   },
   fr: {
    welcome: "Bienvenue !",
    askName: "Quel est ton prénom ?",
    askLang: "Choisis ta langue",
    start: "C'est parti !",
    hi: "Salut",
    changeLang: "Langue",
    changeName: "Changer",
    back: "← Retour à l'accueil",
    next: "Jeu suivant",
    nextConcept: "Concept suivant",
    howItWorks: "📜 Comment ça marche",
    show: "Afficher",
    hide: "Masquer",
    chooseGame: "🎮 Choisis un jeu",
    bigIdeas: "💡 Les grandes idées",
    learnMore: "En savoir plus",
    tryIt: "Essaie",
    examples: "Exemples",
    keyIdea: "Idée clé",
    builtFor: "Où la curiosité rencontre le code !",
    copyright: "© 2025-2026 CodeKids Lab. Tous droits réservés.",
    codeVisible: "Code visible",
    codeHidden: "Code masqué",
    advancedConcepts: "🚀 Allons-y et apprenons davantage",
    unlockTitle: "🔓 Déverrouiller Tous les Jeux",
    unlockDescription: "Entrez le code secret pour déverrouiller tous les jeux à la fois !",
    unlockPlaceholder: "Entrez le code...",
    unlockButton: "Déverrouiller",
    unlockError: "Mauvais code. Réessayez !",
    unlockSuccess: "🎉 Tous les jeux déverrouillés !",
    conceptsCompleted: "Félicitations ! Tous les concepts couverts. Jeux déverrouillés !",
    gotIt: "Compris",
    gamesLocked: "🔒 Jeux Verrouillés",
      gamesLockedDesc:
        "Apprenez les concepts en premier, puis déverrouillez les jeux pour pratiquer !",
      conceptsCovered: "concepts couverts",
      powerUpRapid: "Tir rapide",
      powerUpShield: "Bouclier",
      powerUpSpread: "Tir dispersé",
      bestScore: "Meilleur score",
      unlockSecretGame: "🔓 Jeu secret déverrouillé !",
    },
    nl: {
    welcome: "Welkom!",
    askName: "Wat is je naam?",
    askLang: "Kies je taal",
    start: "Aan de slag!",
    hi: "Hoi",
    changeLang: "Taal",
    changeName: "Wijzig",
    back: "← Terug naar startpagina",
    next: "Volgende spel",
    nextConcept: "Volgende concept",
    howItWorks: "📜 Hoe het werkt",
    show: "Weergeven",
    hide: "Verbergen",
    chooseGame: "🎮 Kies een spel",
    bigIdeas: "💡 De grote ideeën",
    learnMore: "Meer weten",
    tryIt: "Probeer",
    examples: "Voorbeelden",
    keyIdea: "Hoofdidee",
    builtFor: "Waar nieuwsgierigheid code ontmoet !",
    copyright: "© 2025-2026 Ayoub Hammou. Alle rechten voorbehouden.",
    codeVisible: "Code zichtbaar",
    codeHidden: "Code verborgen",
    advancedConcepts: "🚀 Laten we verder leren",
    unlockTitle: "🔓 Alle Spellen Ontgrendelen",
    unlockDescription: "Voer de geheime code in om alle spellen tegelijk te ontgrendelen!",
    unlockPlaceholder: "Voer code in...",
    unlockButton: "Ontgrendelen",
    unlockError: "Verkeerde code. Probeer opnieuw!",
    unlockSuccess: "🎉 Alle spellen ontgrendeld!",
    conceptsCompleted: "Gefeliciteerd ! Alle concepten afgerond. Spellen ontgrendeld !",
    gotIt: "Begrepen",
     gamesLocked: "🔒 Spellen Vergrendeld",
     gamesLockedDesc: "Leer concepten eerst, ontgrendel dan spellen om te oefenen!",
     conceptsCovered: "concepten afgerond",
     powerUpRapid: "Snelschot",
     powerUpShield: "Schild",
     powerUpSpread: "Spreidschot",
     bestScore: "Beste score",
     unlockSecretGame: "🔓 Geheim spel ontgrendeld!",
   },
} as const;

export function useUI() {
  const { lang } = useLang();
  return UI[lang];
}
