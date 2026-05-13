import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";

const games = [
  { to: "/guess", label: "Guess Number", emoji: "🎯" },
  { to: "/palindrome", label: "Palindrome", emoji: "🔁" },
  { to: "/adventure", label: "Adventure", emoji: "🗺️" },
  { to: "/connect4", label: "4 in a Row", emoji: "🔴" },
  { to: "/mastermind", label: "Mastermind", emoji: "🎨" },
];

export function GameLayout({ children, title, concept, code }: { children: ReactNode; title: string; concept: string; code: string }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Back to lab</Link>
      <header className="mt-4 mb-6 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <span className="rounded-full bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
          Concept: {concept}
        </span>
      </header>
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="rounded-2xl bg-card border-2 border-border p-6 shadow-[6px_6px_0_0_var(--color-border)]">
          {children}
        </div>
        <aside className="rounded-2xl bg-foreground text-background p-4 text-xs font-mono overflow-x-auto">
          <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2">📜 Pseudo-code</div>
          <pre className="whitespace-pre-wrap leading-relaxed">{code}</pre>
        </aside>
      </div>
    </div>
  );
}

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b-2 border-border">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 flex-wrap">
          <Link to="/" className="font-display font-bold text-xl">
            <span className="text-primary">{"{ }"}</span> CodeKids Lab
          </Link>
          <div className="ml-auto flex flex-wrap gap-1">
            {games.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                  path === g.to
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                <span className="mr-1">{g.emoji}</span>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
