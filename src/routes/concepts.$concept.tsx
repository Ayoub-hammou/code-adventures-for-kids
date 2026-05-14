import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useLang, useUI, pick, Lang } from "@/lib/i18n";

export const Route = createFileRoute("/concepts/$concept")({ component: ConceptPage });

type Example = {
  code: { en: string; fr: string; nl: string };
  explain: { en: string; fr: string; nl: string };
};
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
  programming: {
    emoji: "💻",
    color: "concept-programming",
    title: {
      en: "What is Programming?",
      fr: "C'est quoi, la Programmation ?",
      nl: "Wat is Programmeren?",
    },
    intro: {
      en: "Programming is giving instructions to a computer. You write commands, the computer follows them. It's like being a robot chef: you give step-by-step recipes, and the computer executes them perfectly, every time!",
      fr: "La programmation, c'est donner des instructions à un ordinateur. Tu écris des commandes, l'ordi les exécute. C'est comme être un robot cuisinier : tu lui donnes une recette étape par étape, et il la suit parfaitement !",
      nl: "Programmeren is instructies geven aan een computer. Je schrijft commando's, de computer voert ze uit. Het is als een robotchef zijn: je geeft stap-voor-stap recepten, en de computer voert ze perfect uit!",
    },
    keyIdea: {
      en: "Computers are super dumb but super fast. They do EXACTLY what you tell them—no shortcuts, no guesses.",
      fr: "Les ordinateurs sont super bêtes mais super rapides. Ils font EXACTEMENT ce que tu dis — pas de raccourcis, pas de devinettes.",
      nl: "Computers zijn super dom maar supersnellennen. Ze doen PRECIES wat je zegt — geen shortcuts, geen gokken.",
    },
    examples: [
      {
        code: {
          en: `# A simple program\nprint("Hello, World!")\nprint("My name is Lou")\nprint("Nice to meet you!")`,
          fr: `# Un programme simple\nafficher("Bonjour, le monde !")\nafficher("Mon nom est Lou")\nafficher("Enchanté !")`,
          nl: `# Een eenvoudig programma\nafdrukken("Hallo, Wereld!")\nafdrukken("Mijn naam is Lou")\nafdrukken("Aangenaam!")`,
        },
        explain: {
          en: "This program prints 3 lines. The computer follows each line in order. Simple!",
          fr: "Ce programme affiche 3 lignes. L'ordi suit chaque ligne dans l'ordre. Simple !",
          nl: "Dit programma print 3 regels. De computer volgt elke regel in volgorde. Simpel!",
        },
      },
      {
        code: {
          en: `# A recipe for robots\n1. Get bread\n2. Add butter\n3. Put jam on top\n4. Enjoy!\n# The computer follows exactly. No shortcuts!`,
          fr: `# Une recette pour robots\n1. Prendre le pain\n2. Ajouter du beurre\n3. Mettre de la confiture dessus\n4. Déguster !\n# L'ordi suit exactement. Pas de raccourci !`,
          nl: `# Een recept voor robots\n1. Pak het brood\n2. Voeg boter toe\n3. Doe jam erop\n4. Geniet!\n# De computer volgt precies. Geen shortcuts!`,
        },
        explain: {
          en: "Programming is like writing a recipe for a robot. It follows every step you describe.",
          fr: "La programmation, c'est écrire une recette pour un robot. Il suit chaque étape que tu décris.",
          nl: "Programmeren is als een recept schrijven voor een robot. Het volgt elke stap die je beschrijft.",
        },
      },
      {
        code: {
          en: `# Computers need to be VERY specific\n# BAD: "Make breakfast"\n# GOOD: Mix eggs, add salt, heat pan, cook 3min\n# Computers can't guess what "breakfast" means!`,
          fr: `# Les ordinateurs doivent être TRÈS précis\n# MAUVAIS : "Faire le petit-déj"\n# BON : Mélanger œufs, ajouter sel, chauffer poêle, cuire 3min\n# L'ordi ne peut pas deviner ce que "petit-déj" veut dire !`,
          nl: `# Computers moeten HEEL precies zijn\n# SLECHT: "Maak ontbijt"\n# GOED: Eieren mengen, zout toevoegen, pan verwarmen, 3min koken\n# De computer kan niet raden wat "ontbijt" betekent!`,
        },
        explain: {
          en: "Computers can't guess. You must be super specific about what you want.",
          fr: "Les ordinateurs ne peuvent pas deviner. Tu dois être très précis sur ce que tu veux.",
          nl: "Computers kunnen niet raden. Je moet heel specifiek zijn over wat je wilt.",
        },
      },
    ],
    games: ["/guess", "/adventure", "/connect4"],
  },
  variables: {
    emoji: "📦",
    color: "concept-variable",
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
      {
        code: {
          en: `age = 12\nname = "Lou"\nis_happy = true`,
          fr: `age = 12\nnom = "Lou"\nest_heureux = vrai`,
          nl: `leeftijd = 12\nnaam = "Lou"\nis_blij = waar`,
        },
        explain: {
          en: "Three boxes: a number, a word, and a yes/no.",
          fr: "Trois boîtes : un nombre, un mot, et un oui/non.",
          nl: "Drie doosjes: een getal, een woord, en een ja/nee.",
        },
      },
      {
        code: {
          en: `score = 0\nscore = score + 1\nscore = score + 1\n# score is now 2`,
          fr: `score = 0\nscore = score + 1\nscore = score + 1\n# score vaut maintenant 2`,
          nl: `score = 0\nscore = score + 1\nscore = score + 1\n# score is nu 2`,
        },
        explain: {
          en: "You can change what's inside the box, like keeping score in a game.",
          fr: "Tu peux changer le contenu de la boîte, comme un score qui monte.",
          nl: "Je kan veranderen wat er in het doosje zit, zoals een score.",
        },
      },
      {
        code: {
          en: `pizza_slices = 8\nfriends = 4\nper_friend = pizza_slices / friends\n# per_friend = 2`,
          fr: `parts_pizza = 8\namis = 4\npar_ami = parts_pizza / amis\n# par_ami = 2`,
          nl: `pizzastukken = 8\nvrienden = 4\nper_vriend = pizzastukken / vrienden\n# per_vriend = 2`,
        },
        explain: {
          en: "Variables make math easy: change one number and everything updates.",
          fr: "Les variables rendent les maths faciles : change un nombre et tout se met à jour.",
          nl: "Variabelen maken rekenen makkelijk: verander één getal en alles past zich aan.",
        },
      },
    ],
    games: ["/guess", "/adventure", "/simon"],
  },
  loops: {
    emoji: "🔄",
    color: "concept-loop",
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
      {
        code: {
          en: `for i in 1..5:\n  print("Hello!")\n# prints Hello! 5 times`,
          fr: `pour i de 1 à 5:\n  afficher("Coucou !")\n# affiche Coucou ! 5 fois`,
          nl: `voor i van 1 tot 5:\n  afdrukken("Hallo!")\n# drukt Hallo! 5 keer af`,
        },
        explain: {
          en: "Repeat exactly 5 times.",
          fr: "Répète exactement 5 fois.",
          nl: "Herhaal precies 5 keer.",
        },
      },
      {
        code: {
          en: `lives = 3\nwhile lives > 0:\n  play_round()\n  lives = lives - 1`,
          fr: `vies = 3\ntandis_que vies > 0:\n  jouer_manche()\n  vies = vies - 1`,
          nl: `levens = 3\nzolang levens > 0:\n  speel_ronde()\n  levens = levens - 1`,
        },
        explain: {
          en: "Keep going AS LONG AS a condition is true.",
          fr: "Continue TANT QUE une condition est vraie.",
          nl: "Ga door ZOLANG een conditie waar is.",
        },
      },
      {
        code: {
          en: `friends = ["Léa","Sam","Zoé"]\nfor friend in friends:\n  print("Hi " + friend)`,
          fr: `amis = ["Léa","Sam","Zoé"]\npour ami dans amis:\n  afficher("Salut " + ami)`,
          nl: `vrienden = ["Léa","Sam","Zoé"]\nvoor vriend in vrienden:\n  afdrukken("Hoi " + vriend)`,
        },
        explain: {
          en: "Walk through every item in a list.",
          fr: "Parcours chaque élément d'une liste.",
          nl: "Loop door elk item in een lijst.",
        },
      },
    ],
    games: ["/palindrome", "/connect4", "/fizzbuzz", "/simon"],
  },
  conditions: {
    emoji: "🔀",
    color: "concept-condition",
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
      {
        code: {
          en: `age = 12\nif age >= 13:\n  print("Teen!")\nelse:\n  print("Kid!")`,
          fr: `age = 12\nsi age >= 13:\n  afficher("Ado !")\nsinon:\n  afficher("Enfant !")`,
          nl: `leeftijd = 12\nals leeftijd >= 13:\n  afdrukken("Tiener!")\nanders:\n  afdrukken("Kind!")`,
        },
        explain: {
          en: "Pick a path based on a value.",
          fr: "Choisis un chemin selon une valeur.",
          nl: "Kies een pad op basis van een waarde.",
        },
      },
      {
        code: {
          en: `weather = "rain"\nif weather == "sun":\n  go_outside()\nelse if weather == "rain":\n  take_umbrella()\nelse:\n  stay_home()`,
          fr: `meteo = "pluie"\nsi meteo == "soleil":\n  sortir()\nsinon_si meteo == "pluie":\n  prendre_parapluie()\nsinon:\n  rester_maison()`,
          nl: `weer = "regen"\nals weer == "zon":\n  naar_buiten()\nanders_als weer == "regen":\n  neem_paraplu()\nanders:\n  blijf_binnen()`,
        },
        explain: {
          en: "Multiple paths with else if.",
          fr: "Plusieurs chemins avec sinon si.",
          nl: "Meerdere paden met anders als.",
        },
      },
      {
        code: {
          en: `has_ticket = true\nis_open = false\nif has_ticket and is_open:\n  enter()\nelse:\n  wait()`,
          fr: `a_billet = vrai\nest_ouvert = faux\nsi a_billet et est_ouvert:\n  entrer()\nsinon:\n  attendre()`,
          nl: `heeft_kaartje = waar\nis_open = onwaar\nals heeft_kaartje en is_open:\n  binnengaan()\nanders:\n  wachten()`,
        },
        explain: {
          en: "Combine conditions with AND / OR.",
          fr: "Combine les conditions avec ET / OU.",
          nl: "Combineer condities met EN / OF.",
        },
      },
    ],
    games: ["/adventure", "/connect4", "/rps", "/fizzbuzz"],
  },
  errors: {
    emoji: "🛡️",
    color: "concept-error",
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
      {
        code: {
          en: `value = read_input()\nif not is_number(value):\n  show("Please type a number!")\nelse:\n  use(value)`,
          fr: `valeur = lire_entree()\nsi pas est_nombre(valeur):\n  afficher("Tape un nombre !")\nsinon:\n  utiliser(valeur)`,
          nl: `waarde = lees_invoer()\nals niet is_getal(waarde):\n  toon("Typ een getal!")\nanders:\n  gebruik(waarde)`,
        },
        explain: {
          en: "Check FIRST, then use. No surprises!",
          fr: "Vérifie D'ABORD, ensuite utilise. Pas de surprise !",
          nl: "Eerst CHECKEN, dan gebruiken. Geen verrassingen!",
        },
      },
      {
        code: {
          en: `try:\n  result = 10 / x\nexcept DivideByZero:\n  result = "infinity-ish 😅"`,
          fr: `essayer:\n  resultat = 10 / x\nsauf DivisionParZero:\n  resultat = "infini-ish 😅"`,
          nl: `probeer:\n  resulaat = 10 / x\nbehalve DelingDoorNul:\n  resulaat = "oneindig-ish 😅"`,
        },
        explain: {
          en: "try the risky thing, catch the problem if it explodes.",
          fr: "essaie le truc risqué, attrape le problème s'il explose.",
          nl: "probeer het riskante, vang het probleem als het ontploft.",
        },
      },
      {
        code: {
          en: `# 💥 BAD (no checks):\nguess = parseInt("banana")\n# guess is NaN, everything breaks silently!`,
          fr: `# 💥 MAUVAIS (pas de vérifications):\ndeviner = entierAnalyse("banane")\n# deviner est NaN, tout casse en silence !`,
          nl: `# 💥 SLECHT (geen controles):\nraden = geheel_analyse("banaan")\n# raden is NaN, alles breekt stilletjes!`,
        },
        explain: {
          en: "Without error handling, your program lies or crashes. The 'Guess the Number' game shows this!",
          fr: "Sans gestion d'erreurs, ton programme ment ou plante. Le jeu « Devine le Nombre » le montre !",
          nl: "Zonder foutafhandeling liegt of crasht je programma. Zie 'Raad het Getal'!",
        },
      },
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

      <div
        className="rounded-2xl border-2 border-dashed p-4 mb-8"
        style={{ borderColor: `var(--${c.color})` }}
      >
        <div className="text-xs uppercase tracking-widest font-bold mb-1">{t.keyIdea}</div>
        <div className="text-base">{pick(lang, c.keyIdea)}</div>
      </div>

      <h2 className="text-2xl font-bold mb-4">{t.examples}</h2>
      <div className="space-y-4 mb-10">
        {c.examples.map((ex, i) => (
          <div
            key={i}
            className="grid md:grid-cols-2 gap-3 rounded-2xl bg-card border-2 border-border p-4 shadow-[4px_4px_0_0_var(--color-border)]"
          >
            <pre className="rounded-xl bg-foreground text-background p-4 text-xs md:text-sm font-mono whitespace-pre-wrap leading-relaxed">
              {pick(lang, ex.code)}
            </pre>
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
