import { Link, useLocation } from "@tanstack/react-router";
import { ReactNode, useState, useEffect } from "react";
import { useUI, useLang } from "@/lib/i18n";
import { getNextGameUrl } from "@/lib/games";
import { Button } from "@/components/ui/button";

export function GameLayout({
  children,
  title,
  emoji,
  concept,
  code,
  intro,
  codeKey,
}: {
  children: ReactNode;
  title: string;
  emoji: string;
  concept: string;
  code: string;
  intro?: string;
  codeKey?: string | number;
}) {
  const { showCodeByDefault } = useLang();
  const [showCode, setShowCode] = useState(showCodeByDefault);
  const t = useUI();
  const location = useLocation();
  const nextGameUrl = getNextGameUrl(location.pathname);

  // Reset showCode when codeKey changes (e.g., when level changes)
  // Also update based on the global setting
  useEffect(() => {
    setShowCode(showCodeByDefault);
  }, [codeKey, showCodeByDefault]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
          {t.back}
        </Link>
        {nextGameUrl && (
          <Link
            to={nextGameUrl}
            className="text-sm font-semibold text-primary hover:text-primary/80"
          >
            {t.next} →
          </Link>
        )}
      </div>
      <header className="mt-4 mb-6 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="mr-2">{emoji}</span>
          {title}
        </h1>
        <span className="rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-bold">
          📚 {concept}
        </span>
      </header>
      {intro && <p className="text-muted-foreground mb-6 max-w-2xl">{intro}</p>}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl bg-card border-2 border-border p-6 shadow-[6px_6px_0_0_var(--color-border)]">
          {children}
        </div>
        {code && (
          <aside className="rounded-2xl bg-foreground text-background p-5 text-xs font-mono overflow-x-auto h-fit sticky top-20">
             <div className="flex items-center justify-between mb-3">
               <div className="text-[10px] uppercase tracking-widest opacity-60">{t.howItWorks}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className="h-6 px-2 text-xs text-background hover:bg-background/20"
              >
                {showCode ? t.hide : t.show}
              </Button>
            </div>
            {showCode && <pre className="whitespace-pre-wrap leading-relaxed">{code}</pre>}
          </aside>
        )}
      </div>
    </div>
  );
}
