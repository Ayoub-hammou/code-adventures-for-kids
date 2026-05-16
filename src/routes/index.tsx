import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, useUI, pick } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Home });

const games = [
  {
    to: "/guess",
    emoji: "🎯",
    color: "fun-yellow",
    title: { en: "Guess the Number", fr: "Devine le Nombre", nl: "Raad het Getal" },
    desc: {
      en: "Find the secret number between 1 and 100.",
      fr: "Trouve le nombre secret entre 1 et 100.",
      nl: "Vind het geheime getal tussen 1 en 100.",
    },
    tags: {
      en: ["Variable", "Condition", "Error (broken!)"],
      fr: ["Variable", "Condition", "Erreur (cassée !)"],
      nl: ["Variabele", "Conditie", "Fout (kapot!)"],
    },
  },
  {
    to: "/palindrome",
    emoji: "🔁",
    color: "fun-pink",
    title: { en: "Palindrome Checker", fr: "Détecteur de Palindrome", nl: "Palindroom Checker" },
    desc: {
      en: "Is a phrase the same forwards and backwards?",
      fr: "Une phrase se lit-elle pareil à l'envers ?",
      nl: "Leest een zin hetzelfde achterstevoren?",
    },
    tags: { en: ["Loop", "Condition"], fr: ["Boucle", "Condition"], nl: ["Lus", "Conditie"] },
  },
  {
    to: "/adventure",
    emoji: "🗺️",
    color: "fun-blue",
    title: { en: "Choose Your Adventure", fr: "Choisis ton Aventure", nl: "Kies je Avontuur" },
    desc: {
      en: "A story that branches with every choice.",
      fr: "Une histoire qui change à chaque choix.",
      nl: "Een verhaal dat verandert bij elke keuze.",
    },
    tags: {
      en: ["Variable", "Condition"],
      fr: ["Variable", "Condition"],
      nl: ["Variabele", "Conditie"],
    },
  },
  {
    to: "/connect4",
    emoji: "🔴",
    color: "fun-green",
    title: { en: "4 in a Row", fr: "Puissance 4", nl: "Vier op een Rij" },
    desc: {
      en: "Drop discs and connect four.",
      fr: "Lâche des jetons et aligne-en quatre.",
      nl: "Laat schijven vallen en verbind er vier.",
    },
    tags: { en: ["Loop", "Condition"], fr: ["Boucle", "Condition"], nl: ["Lus", "Conditie"] },
  },
  {
    to: "/mastermind",
    emoji: "🎨",
    color: "fun-red",
    title: { en: "Mastermind", fr: "Mastermind", nl: "Mastermind" },
    desc: {
      en: "Crack the secret color code.",
      fr: "Trouve le code couleur secret.",
      nl: "Kraak de geheime kleurcode.",
    },
    tags: {
      en: ["Variable", "Loop", "Condition"],
      fr: ["Variable", "Boucle", "Condition"],
      nl: ["Variabele", "Lus", "Conditie"],
    },
  },
  {
    to: "/rps",
    emoji: "✊",
    color: "fun-yellow",
    title: { en: "Rock Paper Scissors", fr: "Pierre Feuille Ciseaux", nl: "Steen Papier Schaar" },
    desc: {
      en: "Beat the computer with smart conditions.",
      fr: "Bats l'ordi avec des conditions malines.",
      nl: "Versla de computer met slimme condities.",
    },
    tags: {
      en: ["Variable", "Condition"],
      fr: ["Variable", "Condition"],
      nl: ["Variabele", "Conditie"],
    },
  },
  {
    to: "/fizzbuzz",
    emoji: "🔢",
    color: "fun-pink",
    title: { en: "Fizz Buzz", fr: "Fizz Buzz", nl: "Fizz Buzz" },
    desc: {
      en: "Loop 1→100. Multiples of 3=Fizz, 5=Buzz!",
      fr: "Boucle 1→100. Multiples de 3=Fizz, 5=Buzz !",
      nl: "Lus 1→100. Veelvouden van 3=Fizz, 5=Buzz!",
    },
    tags: { en: ["Loop", "Condition"], fr: ["Boucle", "Condition"], nl: ["Lus", "Conditie"] },
  },
  {
    to: "/simon",
    emoji: "🧠",
    color: "fun-blue",
    title: { en: "Simon Says", fr: "Jacques a dit", nl: "Simon Zegt" },
    desc: {
      en: "Repeat the color sequence. It grows!",
      fr: "Répète la séquence de couleurs. Elle grandit !",
      nl: "Herhaal de kleurenreeks. Ze groeit!",
    },
    tags: { en: ["Variable", "Loop"], fr: ["Variable", "Boucle"], nl: ["Variabele", "Lus"] },
  },
   {
     to: "/calculator",
     emoji: "🧮",
     color: "fun-green",
     title: { en: "Safe Calculator", fr: "Calculatrice Sûre", nl: "Veilige Calculator" },
     desc: {
       en: "Catches mistakes before they crash!",
       fr: "Attrape les erreurs avant qu'elles plantent !",
       nl: "Vangt fouten voor ze crashen!",
     },
     tags: {
       en: ["Variable", "Error Handling"],
       fr: ["Variable", "Gestion d'erreurs"],
       nl: ["Variabele", "Foutafhandeling"],
     },
   },
   {
     to: "/caesar-cipher",
     emoji: "🔐",
     color: "fun-red",
     title: { en: "Caesar Cipher", fr: "Chiffre de César", nl: "Caesar Cipher" },
     desc: {
       en: "Encrypt messages by shifting letters.",
       fr: "Chiffre les messages en décalant les lettres.",
       nl: "Versleutel berichten door letters te verschuiven.",
     },
     tags: {
       en: ["String", "Loop", "Character"],
       fr: ["Chaîne", "Boucle", "Caractère"],
       nl: ["String", "Lus", "Karakter"],
     },
   },
   {
     to: "/bubble-sort",
     emoji: "🔢",
     color: "fun-green",
     title: { en: "Bubble Sort", fr: "Tri à Bulles", nl: "Bellensort" },
     desc: {
       en: "Watch numbers bubble to their correct positions. Learn sorting algorithms!",
       fr: "Regarde les nombres monter à leur bonne place. Apprends les algoritmes de tri !",
       nl: "Bekijk getallen naar hun juiste positie bubbelen. Leer sorteeralgoritmen!",
     },
     tags: {
       en: ["Algorithm", "Loops", "Sorting"],
       fr: ["Algoritme", "Boucles", "Tri"],
       nl: ["Algoritme", "Lussen", "Sorteren"],
     },
    },
    {
      to: "/insertion-sort",
      emoji: "🎴",
      color: "fun-blue",
      title: { en: "Insertion Sort", fr: "Tri par Insertion", nl: "Invoegsortering" },
      desc: {
        en: "Sort like playing cards! Insert each card into its correct position.",
        fr: "Trie comme des cartes à jouer ! Insère chaque carte à sa bonne place.",
        nl: "Sorteer als speelkaarten! Voeg elke kaart op de juiste plaats in.",
      },
      tags: {
        en: ["Algorithm", "Loops", "Sorting"],
        fr: ["Algoritme", "Boucles", "Tri"],
        nl: ["Algoritme", "Lussen", "Sorteren"],
      },
    },
    {
      to: "/inventory-master",
     emoji: "📚",
     color: "fun-blue",
     title: { en: "Inventory Master", fr: "Maître de l'Inventaire", nl: "Inventarisgoeroe" },
     desc: {
       en: "Manage items using lists. Add and remove wisely!",
       fr: "Gère les objets avec des listes. Ajoute et supprime avec sagesse !",
       nl: "Beheer items met lijsten. Voeg toe en verwijder voorzichtig!",
     },
     tags: {
       en: ["Arrays", "Lists"],
      fr: ["Tableaux", "Listes"],
      nl: ["Arrays", "Lijsten"],
    },
  },
  {
    to: "/luck-master",
    emoji: "🎲",
    color: "fun-red",
    title: { en: "Luck Master", fr: "Maître de la Chance", nl: "Geluksmeester" },
    desc: {
      en: "Test your luck with random challenges and games!",
      fr: "Teste ta chance avec des défis et jeux aléatoires !",
      nl: "Test je geluk met willekeurige uitdagingen en spellen!",
    },
    tags: {
      en: ["Randomness", "Probability"],
      fr: ["Aléatoire", "Probabilités"],
      nl: ["Willekeur", "Kansen"],
    },
  },
  {
    to: "/pattern-painter",
    emoji: "🧩",
    color: "fun-pink",
    title: { en: "Pattern Painter", fr: "Peintre de Motifs", nl: "Patroon Schilder" },
    desc: {
      en: "Create beautiful patterns with loops and nesting!",
      fr: "Crée de beaux motifs avec des boucles et l'imbrication !",
      nl: "Maak mooie patronen met lussen en nesting!",
    },
    tags: {
      en: ["Loops", "Patterns", "Nested Loops"],
      fr: ["Boucles", "Motifs", "Boucles Imbriquées"],
      nl: ["Lussen", "Patronen", "Geneste Lussen"],
    },
  },
   {
    to: "/race-against-time",
    emoji: "⏱️",
    color: "fun-blue",
    title: { en: "Race Against Time", fr: "Course Contre la Montre", nl: "Race Tegen de Klok" },
    desc: {
      en: "Answer questions fast! Beat the clock in this speed challenge!",
      fr: "Réponds vite ! Bats la montre dans ce défi de vitesse !",
      nl: "Antwoord snel! Versla de klok in deze snelheidsuitdaging!",
    },
    tags: {
      en: ["Timer", "Speed Challenge"],
      fr: ["Minuteur", "Défi de Vitesse"],
      nl: ["Timer", "Snelheidsuitdaging"],
    },
  },
   {
     to: "/ice-skater",
     emoji: "⛸️",
     color: "fun-blue",
     title: { en: "Ice Skater", fr: "Patineur sur Glace", nl: "IJsschaatser" },
     desc: {
       en: "Help the skater escape by navigating the ice rink with loops!",
       fr: "Aide le patineur à s'échapper en naviguant la patinoire avec des boucles !",
       nl: "Help de schaatser ontsnappen door de ijsbaan te navigeren met lussen!",
     },
     tags: {
       en: ["Loops", "Logic", "Navigation"],
       fr: ["Boucles", "Logique", "Navigation"],
       nl: ["Lussen", "Logica", "Navigatie"],
     },
   },
   {
     to: "/ai-trainer",
     emoji: "🤖",
     color: "fun-indigo",
     title: { en: "AI Trainer", fr: "Entraîneur IA", nl: "AI Trainer" },
     desc: {
       en: "Teach an AI to learn patterns by giving it examples!",
       fr: "Enseigne à une IA à apprendre des motifs en lui donnant des exemples !",
       nl: "Leer een AI patronen door voorbeelden te geven!",
     },
     tags: {
       en: ["AI", "Machine Learning", "Pattern Recognition"],
       fr: ["IA", "Apprentissage Automatique", "Reconnaissance de Motifs"],
       nl: ["AI", "Machine Learning", "Patroonherkenning"],
     },
   },
];

const concepts = [
  {
    slug: "programming",
    emoji: "💻",
    color: "concept-programming",
    name: {
      en: "What is Programming?",
      fr: "C'est quoi, la Programmation ?",
      nl: "Wat is Programmeren?",
    },
    desc: {
      en: "Telling computers what to do.",
      fr: "Dire à un ordinateur ce qu'il faut faire.",
      nl: "De computer vertellen wat deze moet doen.",
    },
  },
  {
    slug: "variables",
    emoji: "📦",
    color: "concept-variable",
    name: { en: "Variables", fr: "Variables", nl: "Variabelen" },
    desc: {
      en: "Boxes that store information.",
      fr: "Des boîtes qui rangent des infos.",
      nl: "Doosjes die informatie bewaren.",
    },
  },
  {
    slug: "loops",
    emoji: "🔄",
    color: "concept-loop",
    name: { en: "Loops", fr: "Boucles", nl: "Lussen" },
    desc: {
      en: "Doing something again and again.",
      fr: "Faire quelque chose encore et encore.",
      nl: "Iets steeds opnieuw doen.",
    },
  },
  {
    slug: "conditions",
    emoji: "🔀",
    color: "concept-condition",
    name: { en: "Conditions", fr: "Conditions", nl: "Condities" },
    desc: { en: "If this... then that.", fr: "Si ceci... alors cela.", nl: "Als dit... dan dat." },
  },
  {
    slug: "errors",
    emoji: "🛡️",
    color: "concept-error",
    name: { en: "Error Handling", fr: "Gestion des erreurs", nl: "Foutafhandeling" },
    desc: {
      en: "Catching mistakes before they BOOM.",
      fr: "Attraper les erreurs avant le BOUM.",
      nl: "Fouten vangen vóór de BOEM.",
    },
  },
  {
    slug: "functions",
    emoji: "📞",
    color: "concept-functions",
    name: { en: "Functions", fr: "Les Fonctions", nl: "Functies" },
    desc: {
      en: "Reusable recipes for your code.",
      fr: "Recettes réutilisables pour ton code.",
      nl: "Herbruikbare recepten voor je code.",
    },
  },
  {
    slug: "arrays",
    emoji: "📚",
    color: "concept-arrays",
    name: { en: "Arrays & Lists", fr: "Tableaux & Listes", nl: "Arrays & Lijsten" },
    desc: {
      en: "Store many things in one place.",
      fr: "Range plein de choses au même endroit.",
      nl: "Bewaar veel dingen op één plek.",
    },
  },
  {
    slug: "randomness",
    emoji: "🎲",
    color: "concept-randomness",
    name: { en: "Randomness", fr: "L'aléatoire", nl: "Willekeur" },
    desc: {
      en: "Make games unpredictable and fun!",
      fr: "Rends les jeux imprévisibles et amusants !",
      nl: "Maak spellen onvoorspelbaar en leuk!",
    },
  },
   {
    slug: "timer",
    emoji: "⏱️",
    color: "concept-timer",
    name: { en: "Timer & Countdown", fr: "Minuteur & Décompte", nl: "Timer & Aftelling" },
    desc: {
      en: "Add urgency and excitement to games!",
      fr: "Ajoute de l'urgence et de l'excitation aux jeux !",
      nl: "Voeg urgentie en spanning toe aan spellen!",
    },
  },
   {
     slug: "encryption",
     emoji: "🔐",
     color: "concept-encryption",
     name: {
       en: "Encryption & Secret Codes",
       fr: "Chiffrement & Codes Secrets",
       nl: "Versleuteling & Geheime Codes",
     },
     desc: {
       en: "Hide messages with secret formulas so only the right person can read them!",
       fr: "Cache des messages avec des formules secrètes pour que seul le bon personne puisse les lire !",
       nl: "Verberg berichten met geheime formules zodat alleen de juiste persoon ze kan lezen!",
     },
   },
    {
      slug: "sorting",
      emoji: "🔢",
      color: "concept-algorithms",
      name: { en: "Sorting & Algorithms", fr: "Tri & Algorithmes", nl: "Sorteren & Algoritmen" },
      desc: {
        en: "Organize data efficiently using smart sorting techniques!",
        fr: "Organise les données efficacement avec des techniques de tri malines !",
        nl: "Organiseer gegevens efficiënt met slimme sorteerttechnieken!",
      },
    },
    {
      slug: "ai",
      emoji: "🤖",
      color: "concept-ai",
      name: { en: "AI & Machine Learning", fr: "IA & Apprentissage Automatique", nl: "AI & Machine Learning" },
      desc: {
        en: "Create smart programs that learn from examples instead of following strict rules!",
        fr: "Crée des programmes intelligents qui apprennent d'exemples plutôt que de suivre des règles strictes !",
        nl: "Maak slimme programma's die leren van voorbeelden in plaats van strikte regels te volgen!",
      },
    },
  ];

function Home() {
  const { lang, name } = useLang();
  const t = useUI();
  const heroTitle = pick(lang, {
    en: (
      <>
        Hi <span className="text-primary">{name}</span>! Learn to{" "}
        <span className="text-[var(--fun-pink)]">code</span> by playing.
      </>
    ),
    fr: (
      <>
        Salut <span className="text-primary">{name}</span> ! Apprends à{" "}
        <span className="text-[var(--fun-pink)]">coder</span> en jouant.
      </>
    ),
    nl: (
      <>
        Hoi <span className="text-primary">{name}</span>! Leer{" "}
        <span className="text-[var(--fun-pink)]">coderen</span> door te spelen.
      </>
    ),
  });
    const heroSub = pick(lang, {
       en: "Sixteen mini-games. Ten big programming ideas. Click an idea to learn the theory, or pick a game!",
       fr: "Seize mini-jeux. Dix grandes idées de programmation. Clique sur une idée pour la théorie, ou choisis un jeu !",
       nl: "Zestien minigames. Tien grote programmeerideeën. Klik op een idee voor de theorie of kies een spel!",
     });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="text-center mb-14">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">{heroTitle}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{heroSub}</p>
      </section>

      <h2 className="text-2xl font-bold mb-4">{t.bigIdeas}</h2>
      <section className="grid gap-4 md:grid-cols-4 mb-14">
        {concepts.map((c) => (
          <Link
            key={c.slug}
            to="/concepts/$concept"
            params={{ concept: c.slug }}
            className="group rounded-2xl bg-card border-2 border-border p-4 shadow-[4px_4px_0_0_var(--color-border)] hover:shadow-[6px_6px_0_0_var(--color-primary)] hover:-translate-y-1 transition-all"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2"
              style={{ backgroundColor: `var(--${c.color})` }}
            >
              {c.emoji}
            </div>
            <div className="font-display font-bold text-lg">{pick(lang, c.name)}</div>
            <p className="text-sm text-muted-foreground">{pick(lang, c.desc)}</p>
            <div className="text-xs text-primary font-bold mt-2 group-hover:underline">
              {t.learnMore} →
            </div>
          </Link>
        ))}
      </section>

      <h2 className="text-3xl font-bold mb-6">{t.chooseGame}</h2>
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
            <h3 className="text-2xl font-bold mb-1">{pick(lang, g.title)}</h3>
            <p className="text-sm text-muted-foreground mb-3">{pick(lang, g.desc)}</p>
            <div className="flex flex-wrap gap-1.5">
              {pick(lang, g.tags).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>{t.builtFor}</p>
        <p className="mt-2 text-xs">{t.copyright}</p>
      </footer>
    </div>
  );
}
