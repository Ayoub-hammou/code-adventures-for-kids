import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "fr" | "nl";

type Ctx = {
  lang: Lang;
  name: string;
  setLang: (l: Lang) => void;
  setName: (n: string) => void;
  reset: () => void;
  ready: boolean;
};

const LangCtx = createContext<Ctx | null>(null);

const KEY = "codekids_profile_v1";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [name, setNameState] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.lang) setLangState(p.lang);
        if (p.name) setNameState(p.name);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ lang, name }));
    } catch {}
  }, [lang, name, ready]);

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
          } catch {}
        },
        ready,
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
    howItWorks: "📜 How it works",
    chooseGame: "🎮 Choose a game",
    bigIdeas: "💡 The big ideas (click to learn)",
    builtFor: "Built for curious kids • Open the code, break it, fix it, learn 💡",
    learnMore: "Learn more",
    tryIt: "Try it",
    examples: "Examples",
    keyIdea: "Key idea",
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
    howItWorks: "📜 Comment ça marche",
    chooseGame: "🎮 Choisis un jeu",
    bigIdeas: "💡 Les grandes idées (clique pour apprendre)",
    builtFor: "Pour les enfants curieux • Ouvre le code, casse-le, répare-le, apprends 💡",
    learnMore: "En savoir plus",
    tryIt: "Essaie",
    examples: "Exemples",
    keyIdea: "Idée clé",
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
    howItWorks: "📜 Hoe het werkt",
    chooseGame: "🎮 Kies een spel",
    bigIdeas: "💡 De grote ideeën (klik om te leren)",
    builtFor: "Voor nieuwsgierige kinderen • Open de code, breek hem, repareer hem, leer 💡",
    learnMore: "Meer weten",
    tryIt: "Probeer",
    examples: "Voorbeelden",
    keyIdea: "Hoofdidee",
  },
} as const;

export function useUI() {
  const { lang } = useLang();
  return UI[lang];
}
