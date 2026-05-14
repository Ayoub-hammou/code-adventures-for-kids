import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useUI } from "@/lib/i18n";

export function GameLayout({
  children,
  title,
  emoji,
  concept,
  code,
  intro,
}: {
  children: ReactNode;
  title: string;
  emoji: string;
  concept: string;
  code: string;
  intro?: string;
}) {
  const t = useUI();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
        {t.back}
      </Link>
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
        <aside className="rounded-2xl bg-foreground text-background p-5 text-xs font-mono overflow-x-auto h-fit sticky top-20">
          <div className="text-[10px] uppercase tracking-widest opacity-60 mb-3">{t.howItWorks}</div>
          <pre className="whitespace-pre-wrap leading-relaxed">{code}</pre>
        </aside>
      </div>
    </div>
  );
}
