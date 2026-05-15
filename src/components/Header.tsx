import { Link } from "@tanstack/react-router";
import { useLang, useUI, Lang } from "@/lib/i18n";
import { Toggle } from "@/components/ui/toggle";

const FLAGS: Record<Lang, string> = { en: "🇬🇧", fr: "🇫🇷", nl: "🇳🇱" };

export function Header() {
  const { name, lang, setLang, reset, showCodeByDefault, setShowCodeByDefault } = useLang();
  const t = useUI();

  return (
    <header className="border-b-2 border-border bg-card/60 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src="/favicon.ico" alt="CodeKids Lab" className="w-8 h-8" />
          <span className="hidden sm:inline">CodeKids Lab</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {name && (
            <span className="hidden sm:inline px-3 py-1 rounded-full bg-secondary font-semibold">
              {t.hi}, <span className="text-primary">{name}</span> 👋
            </span>
          )}
          <Toggle
            pressed={showCodeByDefault}
            onPressedChange={setShowCodeByDefault}
            aria-label={showCodeByDefault ? t.codeVisible : t.codeHidden}
            title={showCodeByDefault ? t.codeVisible : t.codeHidden}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <span className="text-xs font-semibold">{showCodeByDefault ? t.codeVisible : t.codeHidden}</span>
          </Toggle>
          <select
            aria-label={t.changeLang}
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-full border-2 border-border bg-card px-2 py-1 font-semibold cursor-pointer"
          >
            <option value="en">{FLAGS.en} EN</option>
            <option value="fr">{FLAGS.fr} FR</option>
            <option value="nl">{FLAGS.nl} NL</option>
          </select>
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-primary"
            title={t.changeName}
          >
            {t.changeName}
          </button>
        </div>
      </div>
    </header>
  );
}
