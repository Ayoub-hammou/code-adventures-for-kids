import { useState } from "react";
import { Lang, useLang, UI } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];

export function Onboarding() {
  const { setName, setLang, lang } = useLang();
  const [draftName, setDraftName] = useState("");
  const [draftLang, setDraftLang] = useState<Lang>(lang);
  const t = UI[draftLang];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draftName.trim();
    if (!trimmed) return;
    setLang(draftLang);
    setName(trimmed);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-card border-2 border-border p-8 shadow-[8px_8px_0_0_var(--color-border)]"
      >
        <div className="text-6xl text-center mb-2">👋</div>
        <h1 className="text-3xl font-bold text-center mb-1">{t.welcome}</h1>
        <p className="text-center text-muted-foreground mb-6 font-display">CodeKids Lab</p>

        <label className="block text-sm font-bold mb-2">{t.askLang}</label>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {LANGS.map((l) => (
            <button
              type="button"
              key={l.code}
              onClick={() => setDraftLang(l.code)}
              className={`rounded-xl border-2 px-2 py-3 text-sm font-bold transition ${
                draftLang === l.code
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="text-2xl mb-1">{l.flag}</div>
              {l.label}
            </button>
          ))}
        </div>

        <label className="block text-sm font-bold mb-2">{t.askName}</label>
        <input
          autoFocus
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder="Alex"
          maxLength={20}
          className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-lg font-mono mb-6 focus:outline-none focus:border-primary"
        />

        <button
          type="submit"
          disabled={!draftName.trim()}
          className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold text-lg hover:scale-[1.02] transition disabled:opacity-40"
        >
          {t.start} 🚀
        </button>
      </form>
    </div>
  );
}
