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
};

const LangCtx = createContext<Ctx | null>(null);

const KEY = "codekids_profile_v1";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [name, setNameState] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [showCodeByDefault, setShowCodeByDefaultState] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.lang) setLangState(p.lang);
        if (p.name) setNameState(p.name);
        if (p.showCodeByDefault !== undefined) setShowCodeByDefaultState(p.showCodeByDefault);
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ lang, name, showCodeByDefault }));
    } catch {
      // ignore
    }
  }, [lang, name, ready, showCodeByDefault]);

  return (
    <LangCtx.Provider
      value={{
        lang,
        name,
        setLang: setLangState,
        setName: setNameState,
        reset: () => {
          setNameState("");
          try {
            localStorage.removeItem(KEY);
          } catch {
            // ignore
          }
        },
        ready,
        showCodeByDefault,
        setShowCodeByDefault: setShowCodeByDefaultState,
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
    back: "← Back to all games",
    next: "Next game",
    howItWorks: "📜 How it works",
    show: "Show",
    hide: "Hide",
    chooseGame: "🎮 Choose a game",
    bigIdeas: "💡 The big ideas",
    learnMore: "Learn more",
    tryIt: "Try it",
    examples: "Examples",
    keyIdea: "Key idea",
    builtFor: "Built for curious kids • Open the code, break it, fix it, learn 💡",
    copyright: "© 2025-2026 CodeKids Lab. All rights reserved.",
    codeVisible: "Code visible",
    codeHidden: "Code hidden",
    advancedConcepts: "🚀 Let's go and learn further",
  },
  fr: {
    welcome: "Bienvenue !",
    askName: "Quel est ton prénom ?",
    askLang: "Choisis ta langue",
    start: "C'est parti !",
    hi: "Salut",
    changeLang: "Langue",
    changeName: "Changer",
    back: "← Retour aux jeux",
    next: "Jeu suivant",
    howItWorks: "📜 Comment ça marche",
    show: "Afficher",
    hide: "Masquer",
    chooseGame: "🎮 Choisis un jeu",
    bigIdeas: "💡 Les grandes idées",
    learnMore: "En savoir plus",
    tryIt: "Essaie",
    examples: "Exemples",
    keyIdea: "Idée clé",
    builtFor: "Pour les enfants curieux • Ouvre le code, casse-le, répare-le, apprends 💡",
    copyright: "© 2025-2026 CodeKids Lab. Tous droits réservés.",
    codeVisible: "Code visible",
    codeHidden: "Code masqué",
    advancedConcepts: "🚀 Allons-y et apprenons davantage",
  },
  nl: {
    welcome: "Welkom!",
    askName: "Wat is je naam?",
    askLang: "Kies je taal",
    start: "Aan de slag!",
    hi: "Hoi",
    changeLang: "Taal",
    changeName: "Wijzig",
    back: "← Terug naar alle spellen",
    next: "Volgende spel",
    howItWorks: "📜 Hoe het werkt",
    show: "Weergeven",
    hide: "Verbergen",
    chooseGame: "🎮 Kies een spel",
    bigIdeas: "💡 De grote ideeën",
    learnMore: "Meer weten",
    tryIt: "Probeer",
    examples: "Voorbeelden",
    keyIdea: "Hoofdidee",
    builtFor: "Voor nieuwsgierige kinderen • Open de code, breek hem, repareer hem, leer 💡",
    copyright: "© 2025-2026 CodeKids Lab. Alle rechten voorbehouden.",
    codeVisible: "Code zichtbaar",
    codeHidden: "Code verborgen",
    advancedConcepts: "🚀 Laten we verder leren",
  },
} as const;

export function useUI() {
  const { lang } = useLang();
  return UI[lang];
}
