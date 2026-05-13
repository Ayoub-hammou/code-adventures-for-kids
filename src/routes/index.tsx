import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

const games = [
  { to: "/guess", emoji: "🎯", title: "Guess the Number", desc: "Find the secret number between 1 and 100.", concepts: ["Variable", "Condition", "Error (broken!)"], color: "fun-yellow" },
  { to: "/palindrome", emoji: "🔁", title: "Palindrome Checker", desc: "Is a phrase the same forwards and backwards?", concepts: ["Loop", "Condition"], color: "fun-pink" },
  { to: "/adventure", emoji: "🗺️", title: "Choose Your Adventure", desc: "A story that branches with every choice.", concepts: ["Variable", "Condition"], color: "fun-blue" },
  { to: "/connect4", emoji: "🔴", title: "4 in a Row", desc: "Drop discs and connect four.", concepts: ["Loop", "Condition"], color: "fun-green" },
  { to: "/mastermind", emoji: "🎨", title: "Mastermind", desc: "Crack the secret color code.", concepts: ["Variable", "Loop", "Condition"], color: "fun-red" },
];

const concepts = [
  { name: "Variables", emoji: "📦", desc: "Boxes that store information." },
  { name: "Loops", emoji: "🔄", desc: "Doing something again and again." },
  { name: "Conditions", emoji: "🔀", desc: "If this... then that." },
  { name: "Error Handling", emoji: "🛡️", desc: "Catching mistakes before they BOOM." },
];

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="text-center mb-14">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-bold">
          For curious kids 10–14 ✨
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Learn to <span className="text-primary">code</span> by{" "}
          <span className="text-[var(--fun-pink)]">playing</span>.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Five mini-games. Four big programming ideas. Pick a game and start tinkering!
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4 mb-14">
        {concepts.map((c) => (
          <div key={c.name} className="rounded-2xl bg-card border-2 border-border p-4 shadow-[4px_4px_0_0_var(--color-border)]">
            <div className="text-3xl mb-2">{c.emoji}</div>
            <div className="font-display font-bold">{c.name}</div>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </section>

      <h2 className="text-3xl font-bold mb-6">🎮 Choose a game</h2>
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => (
          <Link
            key={g.to}
            to={g.to}
            className="group rounded-2xl bg-card border-2 border-border p-6 shadow-[6px_6px_0_0_var(--color-border)] hover:shadow-[10px_10px_0_0_var(--color-primary)] hover:-translate-y-1 transition-all"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4"
              style={{ backgroundColor: `var(--${g.color})` }}
            >
              {g.emoji}
            </div>
            <h3 className="text-2xl font-bold mb-1">{g.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{g.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.concepts.map((c) => (
                <span key={c} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {c}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        Built for teachers • Open the code, break it, fix it, learn 💡
      </footer>
    </div>
  );
}
