import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useLang, useUI, pick, Lang } from "@/lib/i18n";

export const Route = createFileRoute("/concepts/$concept")({ component: ConceptPage });

type Example = { code: string; explain: { en: string; fr: string; nl: string } };
type Concept = {
  emoji: string;
  color: string;
  title: { en: string; fr: string; nl: string };
  intro: { en: string; fr: string; nl: string };
  keyIdea: { en: string; fr: string; nl: string };
  examples: Example[];
  games: string[];
};

const data: Record<string, Concept> = {
  variables: {
    emoji: "📦", color: "concept-variable",
    title: { en: "Variables", fr: "Les Variables", nl: "Variabelen" },
    intro: {
      en: "A variable is like a labeled box. You put something inside (a number, a word, true/false) and the computer remembers it for you.",
      fr: "Une variable, c'est comme une boîte étiquetée. Tu y ranges quelque chose (un nombre, un mot, vrai/faux) et l'ordi s'en souvient pour toi.",
      nl: "Een variabele is als een doosje met een naam. Je stopt er iets in (een getal, een woord, waar/onwaar) en de computer onthoudt het voor jou.",
    },
    keyIdea: {
      en: "name = value. The name lets you find your stuff later.",
      fr: "nom = valeur. Le nom te permet de retrouver ta chose plus tard.",
      nl: "naam = waarde. Met de naam vind je het later terug.",
    },
    examples: [
      { code: `age = 12\nname = "Lou"\nis_happy = true`,
        explain: { en: "Three boxes: a number, a word, and a yes/no.", fr: "Trois boîtes : un nombre, un mot, et un oui/non.", nl: "Drie doosjes: een getal, een woord, en een ja/nee." }},
      { code: `score = 0\nscore = score + 1\nscore = score + 1\n# score is now 2`,
        explain: { en: "You can change what's inside the box, like keeping score in a game.", fr: "Tu peux changer le contenu de la boîte, comme un score qui monte.", nl: "Je kan veranderen wat er in het doosje zit, zoals een score." }},
      { code: `pizza_slices = 8\nfriends = 4\nper_friend = pizza_slices / friends\n# per_friend = 2`,
        explain: { en: "Variables make math easy: change one number and everything updates.", fr: "Les variables rendent les maths faciles : change un nombre et tout se met à jour.", nl: "Variabelen maken rekenen makkelijk: verander één getal en alles past zich aan." }},
    ],
    games: ["/guess", "/adventure", "/simon"],
  },
  loops: {
    emoji: "🔄", color: "concept-loop",
    title: { en: "Loops", fr: "Les Boucles", nl: "Lussen" },
    intro: {
      en: "A loop tells the computer: 'do this again and again until I say stop'. It saves you from copy-pasting the same line 100 times.",
      fr: "Une boucle dit à l'ordi : « refais ça encore et encore jusqu'à ce que je dise stop ». Plus besoin de copier 100 fois la même ligne !",
      nl: "Een lus zegt tegen de computer: 'doe dit steeds opnieuw tot ik stop zeg'. Geen 100 keer kopiëren!",
    },
    keyIdea: {
      en: "Repeat work without writing it twice. The computer is super fast at this.",
      fr: "Répéter sans tout réécrire. L'ordi est super rapide pour ça.",
      nl: "Werk herhalen zonder het twee keer te schrijven. De computer is daar supersnel in.",
    },
    examples: [
      { code: `for i in 1..5:\n  print("Hello!")\n# prints Hello! 5 times`,
        explain: { en: "Repeat exactly 5 times.", fr: "Répète exactement 5 fois.", nl: "Herhaal precies 5 keer." }},
      { code: `lives = 3\nwhile lives > 0:\n  play_round()\n  lives = lives - 1`,
        explain: { en: "Keep going AS LONG AS a condition is true.", fr: "Continue TANT QUE une condition est vraie.", nl: "Ga door ZOLANG een conditie waar is." }},
      { code: `friends = ["Léa","Sam","Zoé"]\nfor friend in friends:\n  print("Hi " + friend)`,
        explain: { en: "Walk through every item in a list.", fr: "Parcours chaque élément d'une liste.", nl: "Loop door elk item in een lijst." }},
    ],
    games: ["/palindrome", "/connect4", "/fizzbuzz", "/simon"],
  },
  conditions: {
    emoji: "🔀", color: "concept-condition",
    title: { en: "Conditions", fr: "Les Conditions", nl: "Condities" },
    intro: {
      en: "Conditions let the computer make decisions: IF something is true, THEN do this, ELSE do that.",
      fr: "Les conditions permettent à l'ordi de décider : SI quelque chose est vrai, ALORS fais ceci, SINON fais cela.",
      nl: "Met condities kan de computer beslissen: ALS iets waar is, DAN doe dit, ANDERS doe dat.",
    },
    keyIdea: {
      en: "if / else if / else — like a fork in the road.",
      fr: "si / sinon si / sinon — comme un carrefour.",
      nl: "als / anders als / anders — zoals een splitsing.",
    },
    examples: [
      { code: `age = 12\nif age >= 13:\n  print("Teen!")\nelse:\n  print("Kid!")`,
        explain: { en: "Pick a path based on a value.", fr: "Choisis un chemin selon une valeur.", nl: "Kies een pad op basis van een waarde." }},
      { code: `weather = "rain"\nif weather == "sun":\n  go_outside()\nelse if weather == "rain":\n  take_umbrella()\nelse:\n  stay_home()`,
        explain: { en: "Multiple paths with else if.", fr: "Plusieurs chemins avec sinon si.", nl: "Meerdere paden met anders als." }},
      { code: `has_ticket = true\nis_open = false\nif has_ticket and is_open:\n  enter()\nelse:\n  wait()`,
        explain: { en: "Combine conditions with AND / OR.", fr: "Combine les conditions avec ET / OU.", nl: "Combineer condities met EN / OF." }},
    ],
    games: ["/adventure", "/connect4", "/rps", "/fizzbuzz"],
  },
  errors: {
    emoji: "🛡️", color: "concept-error",
    title: { en: "Error Handling", fr: "Gestion des erreurs", nl: "Foutafhandeling" },
    intro: {
      en: "Programs can crash when something unexpected happens (a word instead of a number, dividing by zero…). Error handling is the safety net.",
      fr: "Les programmes plantent quand un truc inattendu arrive (un mot au lieu d'un nombre, diviser par zéro…). La gestion d'erreurs, c'est le filet de sécurité.",
      nl: "Programma's crashen als er iets onverwachts gebeurt (een woord in plaats van een getal, delen door nul…). Foutafhandeling is het vangnet.",
    },
    keyIdea: {
      en: "Check inputs, and use try/catch to recover instead of crashing.",
      fr: "Vérifie les entrées, et utilise try/catch pour récupérer au lieu de planter.",
      nl: "Controleer invoer, en gebruik try/catch om te herstellen in plaats van te crashen.",
    },
    examples: [
      { code: `value = read_input()\nif not is_number(value):\n  show("Please type a number!")\nelse:\n  use(value)`,
        explain: { en: "Check FIRST, then use. No surprises!", fr: "Vérifie D'ABORD, ensuite utilise. Pas de surprise !", nl: "Eerst CHECKEN, dan gebruiken. Geen verrassingen!" }},
      { code: `try:\n  result = 10 / x\nexcept DivideByZero:\n  result = "infinity-ish 😅"`,
        explain: { en: "try the risky thing, catch the problem if it explodes.", fr: "essaie le truc risqué, attrape le problème s'il explose.", nl: "probeer het riskante, vang het probleem als het ontploft." }},
      { code: `# 💥 BAD (no checks):\nguess = parseInt("banana")\n# guess is NaN, everything breaks silently!`,
        explain: { en: "Without error handling, your program lies or crashes. The 'Guess the Number' game shows this!", fr: "Sans gestion d'erreurs, ton programme ment ou plante. Le jeu « Devine le Nombre » le montre !", nl: "Zonder foutafhandeling liegt of crasht je programma. Zie 'Raad het Getal'!" }},
    ],
    games: ["/guess", "/calculator"],
  },
};

const gameNames: Record<string, { en: string; fr: string; nl: string }> = {
  "/guess": { en: "Guess the Number", fr: "Devine le Nombre", nl: "Raad het Getal" },
  "/palindrome": { en: "Palindrome", fr: "Palindrome", nl: "Palindroom" },
  "/adventure": { en: "Adventure", fr: "Aventure", nl: "Avontuur" },
  "/connect4": { en: "4 in a Row", fr: "Puissance 4", nl: "Vier op een Rij" },
  "/mastermind": { en: "Mastermind", fr: "Mastermind", nl: "Mastermind" },
  "/rps": { en: "Rock Paper Scissors", fr: "Pierre Feuille Ciseaux", nl: "Steen Papier Schaar" },
  "/fizzbuzz": { en: "Fizz Buzz", fr: "Fizz Buzz", nl: "Fizz Buzz" },
  "/simon": { en: "Simon Says", fr: "Jacques a dit", nl: "Simon Zegt" },
  "/calculator": { en: "Safe Calculator", fr: "Calculatrice Sûre", nl: "Veilige Calculator" },
};

const labels = {
  en: { play: "Play games using this", explore: "Explore in these games" },
  fr: { play: "Jouer aux jeux qui l'utilisent", explore: "Explore-le dans ces jeux" },
  nl: { play: "Speel spellen die dit gebruiken", explore: "Ontdek dit in deze spellen" },
};

function ConceptPage() {
  const { concept } = Route.useParams();
  const { lang } = useLang();
  const t = useUI();
  const c = data[concept];
  if (!c) throw notFound();
  const L = labels[lang as Lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
        {t.back}
      </Link>
      <header className="mt-4 mb-6 flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl"
          style={{ backgroundColor: `var(--${c.color})` }}
        >
          {c.emoji}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">{pick(lang, c.title)}</h1>
      </header>

      <p className="text-lg leading-relaxed mb-4">{pick(lang, c.intro)}</p>

      <div className="rounded-2xl border-2 border-dashed p-4 mb-8" style={{ borderColor: `var(--${c.color})` }}>
        <div className="text-xs uppercase tracking-widest font-bold mb-1">{t.keyIdea}</div>
        <div className="text-base">{pick(lang, c.keyIdea)}</div>
      </div>

      <h2 className="text-2xl font-bold mb-4">{t.examples}</h2>
      <div className="space-y-4 mb-10">
        {c.examples.map((ex, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-3 rounded-2xl bg-card border-2 border-border p-4 shadow-[4px_4px_0_0_var(--color-border)]">
            <pre className="rounded-xl bg-foreground text-background p-4 text-xs md:text-sm font-mono whitespace-pre-wrap leading-relaxed">{ex.code}</pre>
            <p className="self-center text-sm md:text-base">{pick(lang, ex.explain)}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">🎮 {L.explore}</h2>
      <div className="flex flex-wrap gap-2">
        {c.games.map((g) => (
          <Link
            key={g}
            to={g}
            className="rounded-full bg-primary text-primary-foreground px-4 py-2 font-bold hover:scale-105 transition"
          >
            {pick(lang, gameNames[g])} →
          </Link>
        ))}
      </div>
    </div>
  );
}
