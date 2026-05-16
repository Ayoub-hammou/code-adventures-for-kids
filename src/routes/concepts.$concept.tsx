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
  functions: {
    emoji: "📞",
    color: "concept-functions",
    title: {
      en: "Functions",
      fr: "Les Fonctions",
      nl: "Functies",
    },
    intro: {
      en: "A function is like a reusable recipe. Instead of writing the same code over and over, you create a function once and use it many times. Functions take input (ingredients), do something with it, and give you output (the dish)!",
      fr: "Une fonction, c'est comme une recette réutilisable. Au lieu d'écrire le même code plusieurs fois, tu crées une fonction une fois et tu l'utilises plein de fois. Les fonctions prennent une entrée (ingrédients), font quelque chose, et te donnent une sortie (le plat) !",
      nl: "Een functie is als een herbruikbaar recept. In plaats van dezelfde code steeds opnieuw te schrijven, maak je een functie eenmaal en gebruik je deze vele keren. Functies nemen invoer (ingrediënten), doen iets ermee, en geven je uitvoer (het gerecht)!",
    },
    keyIdea: {
      en: "Write once, use many times. Functions prevent repetition and make code cleaner.",
      fr: "Écris une fois, utilise plein de fois. Les fonctions empêchent la répétition et rendent le code plus propre.",
      nl: "Schrijf eenmaal, gebruik vele keren. Functies voorkomen herhaling en maken code schoner.",
    },
    examples: [
      {
        code: {
          en: `function greet(name) {\n  return "Hello, " + name + "!"\n}\n\ngreet("Alice")  # Hello, Alice!\ngreet("Bob")    # Hello, Bob!`,
          fr: `fonction saluer(nom) {\n  return "Bonjour, " + nom + " !"\n}\n\nsaluer("Alice")  # Bonjour, Alice !\nsaluer("Bob")    # Bonjour, Bob !`,
          nl: `functie begroeten(naam) {\n  return "Hallo, " + naam + "!"\n}\n\nbegroeten("Alice")  # Hallo, Alice!\nbegroeten("Bob")    # Hallo, Bob!`,
        },
        explain: {
          en: "Create a function once, use it multiple times with different inputs.",
          fr: "Crée une fonction une fois, utilise-la plusieurs fois avec des entrées différentes.",
          nl: "Maak een functie eenmaal, gebruik deze meerdere keren met verschillende invoer.",
        },
      },
      {
        code: {
          en: `function average(num1, num2) {\n  return (num1 + num2) / 2\n}\n\naverage(10, 20)  # 15\naverage(50, 100) # 75`,
          fr: `fonction moyenne(num1, num2) {\n  return (num1 + num2) / 2\n}\n\nmoyenne(10, 20)  # 15\nmoyenne(50, 100) # 75`,
          nl: `functie gemiddelde(num1, num2) {\n  return (num1 + num2) / 2\n}\n\ngemiddelde(10, 20)  # 15\ngemiddelde(50, 100) # 75`,
        },
        explain: {
          en: "Calculate the average of two numbers. Functions are perfect for mathematical operations!",
          fr: "Calcule la moyenne de deux nombres. Les fonctions sont parfaites pour les opérations mathématiques !",
          nl: "Bereken het gemiddelde van twee getallen. Functies zijn perfect voor wiskundige bewerkingen!",
        },
      },
      {
        code: {
          en: `# BAD: Writing the same code twice\nprint("Score: " + str(100))\nprint("Score: " + str(250))\n\n# GOOD: Use a function\nfunction printScore(points) {\n  print("Score: " + str(points))\n}\nprintScore(100)\nprintScore(250)`,
          fr: `# MAUVAIS : Écrire le même code deux fois\nafficher("Score : " + chaîne(100))\nafficher("Score : " + chaîne(250))\n\n# BON : Utiliser une fonction\nfonction afficherScore(points) {\n  afficher("Score : " + chaîne(points))\n}\nafficherScore(100)\nafficherScore(250)`,
          nl: `# SLECHT: Dezelfde code twee keer schrijven\nafdrukken("Score: " + tekenreeks(100))\nafdrukken("Score: " + tekenreeks(250))\n\n# GOED: Gebruik een functie\nfunctie afdrukkenScore(punten) {\n  afdrukken("Score: " + tekenreeks(punten))\n}\nafdrukkenScore(100)\nafdrukkenScore(250)`,
        },
        explain: {
          en: "Functions help you avoid writing the same code multiple times (DRY principle).",
          fr: "Les fonctions t'aident à éviter d'écrire le même code plusieurs fois.",
          nl: "Functies helpen je om dezelfde code niet twee keer te schrijven.",
        },
      },
    ],
    games: [],
  },
  arrays: {
    emoji: "📚",
    color: "concept-arrays",
    title: {
      en: "Arrays & Lists",
      fr: "Les Tableaux & Listes",
      nl: "Arrays & Lijsten",
    },
    intro: {
      en: "An array (or list) is like a box with many compartments. Instead of creating separate boxes for each item, you store multiple items in one container and access them by position. Lists are perfect for storing collections like scores, names, or inventory items!",
      fr: "Un tableau (ou liste), c'est comme une boîte avec plein de casiers. Au lieu de créer des boîtes séparées pour chaque objet, tu ranges plusieurs objets dans un seul conteneur et tu les accèdes par position. Les listes sont parfaites pour stocker des collections comme les scores, les noms ou l'inventaire !",
      nl: "Een array (of lijst) is als een doos met veel vakjes. In plaats van aparte dozen voor elk item te maken, berg je meerdere items in één container op en access je ze via positie. Lijsten zijn perfect voor het opslaan van collecties zoals scores, namen of inventarisitems!",
    },
    keyIdea: {
      en: "Store multiple items in one place. Access them by position (index starts at 0).",
      fr: "Range plusieurs objets au même endroit. Accède-les par position (l'index commence à 0).",
      nl: "Bewaar meerdere items op één plek. Access deze via positie (index begint bij 0).",
    },
    examples: [
      {
        code: {
          en: `fruits = ["apple", "banana", "cherry"]\n\nprint(fruits[0])  # apple\nprint(fruits[1])  # banana\nprint(fruits[2])  # cherry`,
          fr: `fruits = ["pomme", "banane", "cerise"]\n\nafficher(fruits[0])  # pomme\nafficher(fruits[1])  # banane\nafficher(fruits[2])  # cerise`,
          nl: `vruchten = ["appel", "banaan", "kers"]\n\nafdrukken(vruchten[0])  # appel\nafdrukken(vruchten[1])  # banaan\nafdrukken(vruchten[2])  # kers`,
        },
        explain: {
          en: "Create a list and access each item by its index (position). Index starts at 0!",
          fr: "Crée une liste et accède à chaque élément par son index (position). L'index commence à 0 !",
          nl: "Maak een lijst en access elk item via zijn index (positie). Index begint bij 0!",
        },
      },
      {
        code: {
          en: `scores = [100, 250, 180, 320]\n\nfor score in scores:\n  print("Current score: " + str(score))`,
          fr: `scores = [100, 250, 180, 320]\n\npour score dans scores:\n  afficher("Score actuel : " + chaîne(score))`,
          nl: `scores = [100, 250, 180, 320]\n\nvoor score in scores:\n  afdrukken("Huidige score: " + tekenreeks(score))`,
        },
        explain: {
          en: "Loop through all items in a list without knowing the exact number of items.",
          fr: "Parcours tous les éléments d'une liste sans connaître le nombre exact d'éléments.",
          nl: "Loop door alle items in een lijst zonder het exacte aantal items te kennen.",
        },
      },
      {
        code: {
          en: `inventory = ["sword", "shield", "potion"]\n\n# Add new item\ninventory.append("ring")\n\n# Remove item\ninventory.remove("potion")\n\nprint(inventory)  # [sword, shield, ring]`,
          fr: `inventaire = ["épée", "bouclier", "potion"]\n\n# Ajouter un nouvel objet\ninventaire.ajouter("anneau")\n\n# Supprimer un objet\ninventaire.supprimer("potion")\n\nafficher(inventaire)  # [épée, bouclier, anneau]`,
          nl: `inventaris = ["zwaard", "schild", "trank"]\n\n# Voeg nieuw item toe\ninventaris.voegToe("ring")\n\n# Verwijder item\ninventaris.verwijder("trank")\n\nafdrukken(inventaris)  # [zwaard, schild, ring]`,
        },
        explain: {
          en: "Add and remove items from a list dynamically as your program runs.",
          fr: "Ajoute et supprime des éléments d'une liste dynamiquement pendant l'exécution.",
          nl: "Voeg items toe aan een lijst toe en verwijder deze dynamisch terwijl je programma draait.",
        },
      },
    ],
    games: ["/inventory-master"],
  },
  randomness: {
    emoji: "🎲",
    color: "concept-randomness",
    title: {
      en: "Randomness & Probability",
      fr: "L'Aléatoire & Probabilités",
      nl: "Willekeur & Kansen",
    },
    intro: {
      en: "Randomness is when the computer picks something unpredictably. Games use randomness to create surprise and excitement! You can pick random numbers, shuffle lists, or make random decisions. This makes every game different every time you play!",
      fr: "L'aléatoire, c'est quand l'ordinateur choisit quelque chose de façon imprévisible. Les jeux utilisent l'aléatoire pour créer de la surprise et de l'excitation ! Tu peux choisir des nombres aléatoires, mélanger des listes ou faire des choix aléatoires. Ça rend chaque jeu différent à chaque fois que tu joues !",
      nl: "Willekeur is wanneer de computer iets onvoorspelbaar kiest. Games gebruiken willekeur om verrassing en spanning te creëren! Je kunt willekeurige nummers kiezen, lijsten shuffelen of willekeurige keuzes maken. Dit maakt elk spel anders elke keer dat je speelt!",
    },
    keyIdea: {
      en: "Use randomness to create variety and unpredictability in games. Every play is unique!",
      fr: "Utilise l'aléatoire pour créer de la variété et de l'imprévisibilité dans les jeux. Chaque partie est unique !",
      nl: "Gebruik willekeur om variatie en onvoorspelbaarheid in spellen te creëren. Elke partij is uniek!",
    },
    examples: [
      {
        code: {
          en: `import random\n\n# Pick a random number between 1 and 10\nsecret = random.randint(1, 10)\nprint("Guess the number!")`,
          fr: `importer aléatoire\n\n# Choisir un nombre aléatoire entre 1 et 10\nsecrèt = aléatoire.entierAleatoire(1, 10)\nafficher("Devine le nombre !")`,
          nl: `importeer willekeur\n\n# Kies een willekeurig getal tussen 1 en 10\ngeheim = willekeur.willekeurigGetal(1, 10)\nafdrukken("Raad het getal!")`,
        },
        explain: {
          en: "Generate a random number for games like guessing or rolling dice.",
          fr: "Génère un nombre aléatoire pour des jeux comme deviner ou lancer les dés.",
          nl: "Genereer een willekeurig getal voor spellen zoals raden of dobbelsteen gooien.",
        },
      },
      {
        code: {
          en: `import random\n\nweapons = ["sword", "bow", "staff", "hammer"]\n\n# Pick a random weapon\nrandom_weapon = random.choice(weapons)\nprint("You got: " + random_weapon)`,
          fr: `importer aléatoire\n\narmes = ["épée", "arc", "bâton", "marteau"]\n\n# Choisir une arme aléatoire\narme_aleatoire = aléatoire.choisir(armes)\nafficher("Tu as reçu : " + arme_aleatoire)`,
          nl: `importeer willekeur\n\nwapens = ["zwaard", "boog", "staf", "hamer"]\n\n# Kies een willekeurig wapen\nwillekeurig_wapen = willekeur.kies(wapens)\nafdrukken("Je hebt gekregen: " + willekeurig_wapen)`,
        },
        explain: {
          en: "Pick a random item from a list for loot drops, random events, or random choices.",
          fr: "Choisis un élément aléatoire d'une liste pour les butin, les événements aléatoires ou les choix aléatoires.",
          nl: "Kies een willekeurig item uit een lijst voor lootdrops, willekeurige events of willekeurige keuzes.",
        },
      },
      {
        code: {
          en: `import random\n\nopponents = ["Goblin", "Wizard", "Knight", "Dragon"]\n\n# Shuffle and pick\nrandom.shuffle(opponents)\nenemy = opponents[0]\n\nprint("You face: " + enemy)`,
          fr: `importer aléatoire\n\nadvversaires = ["Gobelin", "Magicien", "Chevalier", "Dragon"]\n\n# Mélanger et choisir\naléatoire.melanger(adversaires)\nenemi = adversaires[0]\n\nafficher("Tu affrontes : " + enemi)`,
          nl: `importeer willekeur\n\ntegenstanders = ["Goblin", "Tovenaar", "Ridder", "Draak"]\n\n# Shuffel en kies\nwillekeur.shuffel(tegenstanders)\ntegenstander = tegenstanders[0]\n\nafdrukken("Je staat tegenover: " + tegenstander)`,
        },
        explain: {
          en: "Shuffle a list to randomize order, perfect for random encounters or level selection.",
          fr: "Mélange une liste pour randomiser l'ordre, parfait pour les rencontres aléatoires ou la sélection de niveau.",
          nl: "Shuffel een lijst om volgorde te randomiseren, perfect voor willekeurige encountersof levelkeuze.",
        },
      },
    ],
    games: ["/guess", "/luck-master"],
  },
  patterns: {
    emoji: "🧩",
    color: "concept-patterns",
    title: {
      en: "Pattern Generation",
      fr: "Génération de Motifs",
      nl: "Patroon Generatie",
    },
    intro: {
      en: "Pattern generation uses loops to create beautiful and repetitive designs. From simple stars to complex fractals, you can build amazing ASCII art with just a few lines of code. Loops make creating patterns easy and fun!",
      fr: "La génération de motifs utilise les boucles pour créer des designs beaux et répétitifs. Des étoiles simples aux fractales complexes, tu peux créer de l'art ASCII incroyable avec juste quelques lignes de code. Les boucles rendent la création de motifs facile et amusante !",
      nl: "Patroonafvoer gebruikt lussen om prachtige en repetitieve ontwerpen te maken. Van eenvoudige sterren tot complexe fractals, je kunt geweldig ASCII-art maken met slechts enkele regels code. Lussen maken het maken van patronen gemakkelijk en leuk!",
    },
    keyIdea: {
      en: "Loops create repetition. With a little math, repetition becomes beautiful patterns!",
      fr: "Les boucles créent la répétition. Avec un peu de mathématiques, la répétition devient de beaux motifs !",
      nl: "Lussen creëren herhaling. Met een beetje wiskunde wordt herhaling prachtige patronen!",
    },
    examples: [
      {
        code: {
          en: `# Simple star pyramid\nfor i in 1..5:\n  print("*" * i)`,
          fr: `# Pyramide d'étoiles simple\npour i de 1 à 5:\n  afficher("*" * i)`,
          nl: `# Eenvoudige sterpyramide\nvoor i van 1 tot 5:\n  afdrukken("*" * i)`,
        },
        explain: {
          en: "Each loop iteration prints one more star. The result is a pyramid!",
          fr: "Chaque itération de la boucle affiche une étoile de plus. Le résultat est une pyramide !",
          nl: "Elke lusherhaling drukt één ster meer af. Het resultaat is een piramide!",
        },
      },
      {
        code: {
          en: `# Diamond pattern\nfor i in 1..3:\n  print(" " * (3-i) + "*" * (2*i-1))\nfor i in 2..1:\n  print(" " * (3-i) + "*" * (2*i-1))`,
          fr: `# Motif en diamant\npour i de 1 à 3:\n  afficher(" " * (3-i) + "*" * (2*i-1))\npour i de 2 à 1:\n  afficher(" " * (3-i) + "*" * (2*i-1))`,
          nl: `# Diamantpatroon\nvoor i van 1 tot 3:\n  afdrukken(" " * (3-i) + "*" * (2*i-1))\nvoor i van 2 tot 1:\n  afdrukken(" " * (3-i) + "*" * (2*i-1))`,
        },
        explain: {
          en: "Combine loops and math to create complex shapes. Spaces for alignment, stars for the pattern!",
          fr: "Combine les boucles et les mathématiques pour créer des formes complexes. Des espaces pour l'alignement, des étoiles pour le motif !",
          nl: "Combineer lussen en wiskunde om complexe vormen te maken. Spaties voor uitlijning, sterren voor het patroon!",
        },
      },
      {
        code: {
          en: `# Multiplication table pattern\nfor i in 1..5:\n  for j in 1..5:\n    print(i * j, end=" ")\n  print()`,
          fr: `# Motif de table de multiplication\npour i de 1 à 5:\n  pour j de 1 à 5:\n    afficher(i * j, fin=" ")\n  afficher()`,
          nl: `# Vermenigvuldigingstabelpatroon\nvoor i van 1 tot 5:\n  voor j van 1 tot 5:\n    afdrukken(i * j, einde=" ")\n  afdrukken()`,
        },
        explain: {
          en: "Nested loops create 2D patterns! Each inner loop creates a row, outer loop creates rows.",
          fr: "Les boucles imbriquées créent des motifs 2D ! Chaque boucle interne crée une ligne, la boucle externe crée les lignes.",
          nl: "Geneste lussen creëren 2D-patronen! Elke binnenste lus creëert een rij, buitenlus creëert rijen.",
        },
      },
    ],
    games: ["/pattern-painter"],
  },
  timer: {
    emoji: "⏱️",
    color: "concept-timer",
    title: {
      en: "Timer & Countdown",
      fr: "Minuteur & Décompte",
      nl: "Timer & Aftelling",
    },
    intro: {
      en: "Timers and countdowns bring urgency and challenge to games! By tracking time, you can create race-against-the-clock games, time limits, and speed challenges. Time management makes games more exciting!",
      fr: "Les minuteurs et les décomptes apportent de l'urgence et du défi aux jeux ! En suivant le temps, tu peux créer des jeux contre la montre, des limites de temps et des défis de vitesse. La gestion du temps rend les jeux plus excitants !",
      nl: "Timers en aftellingen brengen urgentie en uitdaging in spellen! Door tijd bij te houden, kunt u race-against-the-clock-spellen, tijdlimieten en snelheidsuitdagingen maken. Tijdsbeheer maakt spellen spannender!",
    },
    keyIdea: {
      en: "Time creates urgency. Urgency makes games exciting. Challenge the player to beat the clock!",
      fr: "Le temps crée l'urgence. L'urgence rend les jeux excitants. Défiez le joueur de battre la montre !",
      nl: "Tijd creëert urgentie. Urgentie maakt spellen spannend. Daag de speler uit om de klok te verslaan!",
    },
    examples: [
      {
        code: {
          en: `import time\n\n# Countdown timer\nfor seconds in range(10, 0, -1):\n  print(f"Time: {seconds}s")\n  time.sleep(1)\nprint("Time's up!")`,
          fr: `importer temps\n\n# Minuteur de décompte\npour secondes dans intervalle(10, 0, -1):\n  afficher(f"Temps : {secondes}s")\n  temps.dormir(1)\nafficher("Temps écoulé !")`,
          nl: `importeer tijd\n\n# Aftellingstimer\nvoor seconden in bereik(10, 0, -1):\n  afdrukken(f"Tijd: {seconden}s")\n  tijd.slaap(1)\nafdrukken("Tijd is om!")`,
        },
        explain: {
          en: "Count down from 10 seconds. The loop runs from 10 down to 1, creating a countdown!",
          fr: "Décompte à partir de 10 secondes. La boucle commence à 10 et descend à 1, créant un décompte !",
          nl: "Aftellen vanaf 10 seconden. De lus loopt van 10 tot 1, wat een aftelling creëert!",
        },
      },
      {
        code: {
          en: `import time\n\nstart_time = time.time()\nwhile time.time() - start_time < 60:\n  print("Still going...")\n  time.sleep(10)\nprint("1 minute passed!")`,
          fr: `importer temps\n\ntemps_debut = temps.maintenant()\ntandis_que temps.maintenant() - temps_debut < 60:\n  afficher("Toujours en cours...")\n  temps.dormir(10)\nafficher("1 minute écoulée !")`,
          nl: `importeer tijd\n\nstarttijd = tijd.nu()\nzolang tijd.nu() - starttijd < 60:\n  afdrukken("Nog steeds bezig...")\n  tijd.slaap(10)\nafdrukken("1 minuut voorbij!")`,
        },
        explain: {
          en: "Run code for exactly 60 seconds. Measure time with `time.time()` to track elapsed time!",
          fr: "Exécute le code pendant exactement 60 secondes. Mesure le temps avec `temps.temps()` pour suivre le temps écoulé !",
          nl: "Voer code uit voor precies 60 seconden. Meet tijd met `tijd.nu()` om verstreken tijd bij te houden!",
        },
      },
      {
        code: {
          en: `import time\n\nprint("Speed challenge: Answer in 5 seconds!")\nstart = time.time()\nuser_input = input("What is 5 + 3? ")\nelapsed = time.time() - start\n\nif elapsed < 5 and user_input == "8":\n  print(f"✓ Correct in {elapsed:.1f}s!")\nelse:\n  print("✗ Too slow or wrong answer!")`,
          fr: `importer temps\n\nafficher("Défi de vitesse : Réponds en 5 secondes !")\ndebut = temps.maintenant()\nentree_utilisateur = lire("Combien font 5 + 3 ? ")\ntemps_ecoule = temps.maintenant() - debut\n\nsi temps_ecoule < 5 et entree_utilisateur == "8":\n  afficher(f"✓ Correct en {temps_ecoule:.1f}s !")\nsinon:\n  afficher("✗ Trop lent ou mauvaise réponse !")`,
          nl: `importeer tijd\n\nafdrukken("Snelheidsuitdaging: Antwoord in 5 seconden!")\nbegin = tijd.nu()\ngebruiker_invoer = lees("Hoeveel is 5 + 3? ")\nverstreken = tijd.nu() - begin\n\nals verstreken < 5 en gebruiker_invoer == "8":\n  afdrukken(f"✓ Correct in {verstreken:.1f}s!")\nanders:\n  afdrukken("✗ Te langzaam of fout antwoord!")`,
        },
        explain: {
          en: "Combine time tracking with game logic! Track how fast the player responds and reward speed!",
          fr: "Combine le suivi du temps avec la logique du jeu ! Suivez la rapidité de réponse du joueur et récompensez la vitesse !",
          nl: "Combineer tijdbijhouding met spellogica! Volg hoe snel de speler reageert en beloon snelheid!",
        },
      },
    ],
    games: ["/race-against-time"],
  },
  encryption: {
    emoji: "🔐",
    color: "concept-encryption",
    title: {
      en: "Encryption & Secret Codes",
      fr: "Chiffrement & Codes Secrets",
      nl: "Versleuteling & Geheime Codes",
    },
    intro: {
      en: "Encryption is a way to hide messages so only the right person can read them. It's like a secret code! We turn readable text (called 'plaintext') into scrambled text (called 'ciphertext') that looks like nonsense to anyone who doesn't know the secret. Kings used secret codes for battles, spies use them for secrets, and now YOU can create your own!",
      fr: "Le chiffrement est un moyen de cacher des messages pour que seule la bonne personne puisse les lire. C'est comme un code secret ! On transforme le texte lisible (appelé 'texte en clair') en texte brouillé (appelé 'texte chiffré') qui ressemble à du charabia pour celui qui ne connaît pas le secret. Les rois utilisaient des codes secrets pour les batailles, les espions les utilisent pour les secrets, et maintenant c'est TOI qui peux créer le tien !",
      nl: "Versleuteling is een manier om berichten te verbergen zodat alleen de juiste persoon ze kan lezen. Het is als een geheime code! We veranderen leesbare tekst (genaamd 'plaintext') in verwarde tekst (genaamd 'ciphertext') die voor iedereen die het geheim niet kent onzin lijkt. Koningen gebruikten geheime codes voor veldsllagen, spionnen gebruiken ze voor geheimen, en nu KUN JIJ je eigen maken!",
    },
    keyIdea: {
      en: "Encryption scrambles data using a formula. The formula is the KEY. Only someone with the key can unscramble it!",
      fr: "Le chiffrement brouille les données en utilisant une formule. La formule est la CLÉ. Seul quelqu'un qui connaît la clé peut les débrouiller !",
      nl: "Versleuteling verwarrt gegevens met een formule. De formule is de SLEUTEL. Alleen iemand met de sleutel kan het ontwarren!",
    },
    examples: [
      {
        code: {
          en: `# Caesar Cipher: Shift each letter by 3\nplaintext = "HELLO"\nshift = 3\n\nciphertext = ""\nfor char in plaintext:\n  new_char = shift_letter(char, shift)\n  ciphertext = ciphertext + new_char\n\nprint(f"Secret: {ciphertext}")  # Output: KHOOR`,
          fr: `# Chiffre de César : Décaler chaque lettre de 3\ntexte_clair = "BONJOUR"\ndecalage = 3\n\ntexte_chiffre = ""\npour char dans texte_clair:\n  nouveau_char = decaler_lettre(char, decalage)\n  texte_chiffre = texte_chiffre + nouveau_char\n\nafficher(f"Secret : {texte_chiffre}")  # Sortie: ERQMRXU`,
          nl: `# Caesar Cipher: Verschuif elke letter met 3\nplaintext = "HALLO"\nverschuiving = 3\n\nciphertext = ""\nvoor char in plaintext:\n  nieuw_char = verschuif_letter(char, verschuiving)\n  ciphertext = ciphertext + nieuw_char\n\nafdrukken(f"Geheim: {ciphertext}")  # Uitvoer: KDOOR`,
        },
        explain: {
          en: "The Caesar Cipher is one of the oldest encryption methods! It shifts each letter by a fixed number (the KEY). A→D, B→E, etc. Simple but clever!",
          fr: "Le Chiffre de César est l'une des plus anciennes méthodes de chiffrement ! Il décale chaque lettre d'un nombre fixe (la CLÉ). A→D, B→E, etc. Simple mais malin !",
          nl: "De Caesar Cipher is een van de oudste versleutelingsmethoden! Het verschuift elke letter met een vast aantal (de SLEUTEL). A→D, B→E, enz. Eenvoudig maar slim!",
        },
      },
      {
        code: {
          en: `# To decode a message, reverse the shift\nciphertext = "KHOOR"\nshift = 3  # Same KEY!\n\nplaintext = ""\nfor char in ciphertext:\n  original_char = shift_letter(char, -shift)  # Negative shift!\n  plaintext = plaintext + original_char\n\nprint(f"Decoded: {plaintext}")  # Output: HELLO`,
          fr: `# Pour décoder un message, inverser le décalage\ntexte_chiffre = "ERQMRXU"\ndecalage = 3  # Même CLÉ !\n\ntexte_clair = ""\npour char dans texte_chiffre:\n  char_original = decaler_lettre(char, -decalage)  # Décalage négatif !\n  texte_clair = texte_clair + char_original\n\nafficher(f"Décodé : {texte_clair}")  # Sortie: BONJOUR`,
          nl: `# Om een bericht te decoderen, draai de verschuiving om\nciphertext = "KDOOR"\nverschuiving = 3  # Dezelfde SLEUTEL!\n\nplaintext = ""\nvoor char in ciphertext:\n  origineel_char = verschuif_letter(char, -verschuiving)  # Negatieve verschuiving!\n  plaintext = plaintext + origineel_char\n\nafdrukken(f"Gedecodeerd: {plaintext}")  # Uitvoer: HALLO`,
        },
        explain: {
          en: "To decode, you reverse the process! If you shifted by 3, shift back by -3. The same KEY that locked the message can unlock it!",
          fr: "Pour décoder, tu inverses le processus ! Si tu as décalé de 3, décale en arrière de -3. La même CLÉ qui a verrouillé le message peut le déverrouiller !",
          nl: "Om te decoderen, keer je het proces om! Als je met 3 bent verschoven, verschuif dan terug met -3. Dezelfde SLEUTEL die het bericht vergrendelde kan het ontgrendelen!",
        },
      },
      {
        code: {
          en: `# Example: A secret spy message\nsecret_message = "MEET AT MIDNIGHT"\nspy_key = 7\n\n# Encode\nencoded = encode(secret_message, spy_key)\nprint(f"Coded message: {encoded}")\n\n# Send the message publicly (it looks like nonsense)\n# Enemy spy intercepts: TLLY HY TLKKRHNO\n\n# Only the spy with the KEY can decode\ndecoded = decode(encoded, spy_key)\nprint(f"Agent decoded: {decoded}")  # MEET AT MIDNIGHT`,
          fr: `# Exemple : Un message d'espion secret\nmessage_secret = "RENDEZ-VOUS A MINUIT"\ncle_espion = 7\n\n# Encoder\ncode = encoder(message_secret, cle_espion)\nafficher(f"Message codé : {code}")\n\n# Envoyer le message publiquement (il ressemble à du charabia)\n# Espion ennemi intercepte : YLUKLY-CLVZ H TVUVAO\n\n# Seul l'espion avec la CLÉ peut décoder\ndecode = decoder(code, cle_espion)\nafficher(f"Agent décodé : {decode}")  # RENDEZ-VOUS A MINUIT`,
          nl: `# Voorbeeld: Een geheim spionnenbericht\ngeheim_bericht = "ONTMOETING OM MIDDERNACHT"\nspy_sleutel = 7\n\n# Coderen\ngecodeerd = coderen(geheim_bericht, spy_sleutel)\nafdrukken(f"Gecodeerd bericht: {gecodeerd}")\n\n# Stuur het bericht openbaar (het ziet er als onzin uit)\n# Vijandige spion onderschept: VUDVNNAJUN VT TVKKNADHROB\n\n# Alleen de spion met de SLEUTEL kan decoderen\ngedecodeerd = decoderen(gecodeerd, spy_sleutel)\nafdrukken(f"Agent gedecodeerd: {gedecodeerd}")  # ONTMOETING OM MIDDERNACHT`,
        },
        explain: {
          en: "Real spies use encryption to send secret messages! The message is useless to the enemy unless they crack the code. Encryption protects privacy and secrets!",
          fr: "Les vrais espions utilisent le chiffrement pour envoyer des messages secrets ! Le message est inutile pour l'ennemi à moins qu'il ne craque le code. Le chiffrement protège la vie privée et les secrets !",
          nl: "Echte spionnen gebruiken versleuteling om geheime berichten te sturen! Het bericht is nutteloos voor de vijand tenzij ze de code kraken. Versleuteling beschermt privacy en geheimen!",
        },
      },
    ],
    games: ["/caesar-cipher"],
  },
  sorting: {
    emoji: "🔢",
    color: "concept-algorithms",
    title: {
      en: "Sorting & Algorithms",
      fr: "Tri & Algorithmes",
      nl: "Sorteren & Algoritmen",
    },
    intro: {
      en: "Sorting is organizing data in a specific order - like arranging cards from smallest to largest, or alphabetizing names! An algorithm is a step-by-step recipe for solving a problem. Different sorting algorithms work in different ways. Some are super fast, some are simple, and some are just for fun to learn!",
      fr: "Le tri, c'est organiser les données dans un ordre spécifique - comme arranger les cartes du plus petit au plus grand, ou mettre les noms par ordre alphabétique ! Un algorithme est une recette étape par étape pour résoudre un problème. Les différents algorithmes de tri fonctionnent de manières différentes. Certains sont super rapides, certains sont simples, et d'autres sont juste pour apprendre !",
      nl: "Sorteren is gegevens in een specifieke volgorde organiseren - zoals kaarten van klein naar groot ordenen, of namen alfabetisch rangschikken! Een algoritme is een stap-voor-stap recept om een probleem op te lossen. Verschillende sorteeralgoritmen werken op verschillende manieren. Sommige zijn supersnellennen, sommige zijn eenvoudig, en sommige zijn gewoon om te leren!",
    },
    keyIdea: {
      en: "Algorithms are recipes for computers. The same problem can have many solutions - some clever, some simple, some fast!",
      fr: "Les algorithmes sont des recettes pour les ordinateurs. Le même problème peut avoir plusieurs solutions - certaines intelligentes, certaines simples, certaines rapides !",
      nl: "Algoritmen zijn recepten voor computers. Hetzelfde probleem kan veel oplossingen hebben - sommige slim, sommige eenvoudig, sommige snel!",
    },
    examples: [
      {
        code: {
          en: `# Bubble Sort: Compare neighbors and swap\narray = [5, 2, 8, 1, 9]\n\nfor i in 0..length(array)-1:\n  for j in 0..length(array)-i-2:\n    if array[j] > array[j+1]:\n      # Swap neighbors\n      temp = array[j]\n      array[j] = array[j+1]\n      array[j+1] = temp\n\nprint(array)  # [1, 2, 5, 8, 9]`,
          fr: `# Tri à Bulles : Compare les voisins et échange\ntableau = [5, 2, 8, 1, 9]\n\npour i de 0 à longueur(tableau)-1:\n  pour j de 0 à longueur(tableau)-i-2:\n    si tableau[j] > tableau[j+1]:\n      # Échange les voisins\n      temp = tableau[j]\n      tableau[j] = tableau[j+1]\n      tableau[j+1] = temp\n\nafficher(tableau)  # [1, 2, 5, 8, 9]`,
          nl: `# Bellensort: Vergelijk buren en ruil ze\narray = [5, 2, 8, 1, 9]\n\nvoor i in 0..lengte(array)-1:\n  voor j in 0..lengte(array)-i-2:\n    als array[j] > array[j+1]:\n      # Ruil buren\n      temp = array[j]\n      array[j] = array[j+1]\n      array[j+1] = temp\n\nafdrukken(array)  # [1, 2, 5, 8, 9]`,
        },
        explain: {
          en: "Bubble Sort compares neighbors and swaps them if they're in the wrong order. Like bubbles, bigger numbers 'float' to the end!",
          fr: "Le Tri à Bulles compare les voisins et les échange s'ils sont mal ordonnés. Comme des bulles, les plus grands nombres 'flottent' vers la fin !",
          nl: "Bellensort vergelijkt buren en verwisselt ze als ze in de verkeerde volgorde staan. Zoals bellen 'drijven' grotere getallen naar het einde!",
        },
      },
      {
        code: {
          en: `# Insertion Sort: Build sorted hand like playing cards\narray = [5, 2, 8, 1, 9]\n\nfor i in 1..length(array)-1:\n  key = array[i]     # Pick a card\n  j = i - 1\n  \n  # Find where it fits\n  while j >= 0 and array[j] > key:\n    array[j+1] = array[j]  # Shift right\n    j = j - 1\n  \n  array[j+1] = key   # Insert the card\n\nprint(array)  # [1, 2, 5, 8, 9]`,
          fr: `# Tri par Insertion : Construis une main triée comme des cartes\ntableau = [5, 2, 8, 1, 9]\n\npour i de 1 à longueur(tableau)-1:\n  cle = tableau[i]      # Prends une carte\n  j = i - 1\n  \n  # Trouve où elle va\n  tant que j >= 0 et tableau[j] > cle:\n    tableau[j+1] = tableau[j]  # Décale à droite\n    j = j - 1\n  \n  tableau[j+1] = cle   # Insère la carte\n\nafficher(tableau)  # [1, 2, 5, 8, 9]`,
          nl: `# Invoegsortering: Bouw gesorteerde hand als kaarten\narray = [5, 2, 8, 1, 9]\n\nvoor i van 1 tot lengte(array)-1:\n  sleutel = array[i]   # Pak een kaart\n  j = i - 1\n  \n  # Vind waar het past\n  terwijl j >= 0 en array[j] > sleutel:\n    array[j+1] = array[j]  # Verschuif rechts\n    j = j - 1\n  \n  array[j+1] = sleutel   # Voeg de kaart in\n\nafdrukken(array)  # [1, 2, 5, 8, 9]`,
        },
        explain: {
          en: "Insertion Sort picks one item at a time and places it in the right spot, like organizing a hand of cards. It's intuitive and often faster on small data!",
          fr: "Le Tri par Insertion prend un élément à la fois et le place à la bonne place, comme organiser une main de cartes. C'est intuitif et souvent plus rapide sur de petites données !",
          nl: "Invoegsortering pakt één item tegelijk en plaatst het op de juiste plek, zoals kaarten in je hand organiseren. Het is intuïtief en vaak sneller op kleine gegevens!",
        },
      },
      {
        code: {
          en: `# Real World: Sorting a list of students by name\nstudents = ["Zoe", "Alex", "Maya", "Ben"]\n\n# Using Insertion Sort logic\nfor i in 1..length(students)-1:\n  key = students[i]\n  j = i - 1\n  \n  while j >= 0 and students[j] > key:\n    students[j+1] = students[j]\n    j = j - 1\n  \n  students[j+1] = key\n\nprint(students)  # ["Alex", "Ben", "Maya", "Zoe"]`,
          fr: `# Monde réel : Trier une liste d'étudiants par nom\netudiants = ["Zoé", "Alex", "Maya", "Benjamin"]\n\n# Utiliser la logique du Tri par Insertion\npour i de 1 à longueur(etudiants)-1:\n  cle = etudiants[i]\n  j = i - 1\n  \n  tant que j >= 0 et etudiants[j] > cle:\n    etudiants[j+1] = etudiants[j]\n    j = j - 1\n  \n  etudiants[j+1] = cle\n\nafficher(etudiants)  # ["Alex", "Benjamin", "Maya", "Zoé"]`,
          nl: `# Real World: Studenten op naam sorteren\nstudenten = ["Zoe", "Alex", "Maya", "Ben"]\n\n# Invoegsortering logica gebruiken\nvoor i van 1 tot lengte(studenten)-1:\n  sleutel = studenten[i]\n  j = i - 1\n  \n  terwijl j >= 0 en studenten[j] > sleutel:\n    studenten[j+1] = studenten[j]\n    j = j - 1\n  \n  studenten[j+1] = sleutel\n\nafdrukken(studenten)  # ["Alex", "Ben", "Maya", "Zoe"]`,
        },
        explain: {
          en: "Sorting is everywhere! Schools sort students, stores sort products, games sort high scores. Learning sorting algorithms teaches you how computers organize information!",
          fr: "Le tri est partout ! Les écoles trient les étudiants, les magasins trient les produits, les jeux trient les meilleurs scores. Apprendre les algorithmes de tri t'apprend comment les ordinateurs organisent les informations !",
          nl: "Sorteren is overal! Scholen sorteren studenten, winkels sorteren producten, spellen sorteren hoge scores. Het leren van sorteeralgoritmen leert je hoe computers informatie organiseren!",
        },
      },
    ],
    games: ["/bubble-sort", "/insertion-sort"],
  },
  ai: {
    emoji: "🤖",
    color: "concept-ai",
    title: {
      en: "AI & Machine Learning",
      fr: "IA & Apprentissage Automatique",
      nl: "AI & Machine Learning",
    },
    intro: {
      en: "AI (Artificial Intelligence) is when computers learn from examples instead of following programmers' rules. Like how YOU learn to recognize dogs by seeing many dogs, AI learns patterns from data. Machine Learning is the technique that makes this possible! But AI isn't magic—it has strengths AND weaknesses.",
      fr: "L'IA (Intelligence Artificielle) c'est quand les ordinateurs apprennent d'exemples au lieu de suivre les règles des programmeurs. Comme quand TU apprends à reconnaître les chiens en en voyant beaucoup, l'IA apprend les motifs des données. L'Apprentissage Automatique est la technique qui rend cela possible ! Mais l'IA n'est pas de la magie — elle a des forces ET des faiblesses.",
      nl: "AI (Kunstmatige Intelligentie) is wanneer computers leren van voorbeelden in plaats van programmeurregels te volgen. Net zoals JIJ leert honden te herkennen door veel honden te zien, leert AI patronen uit gegevens. Machine Learning is de techniek die dit mogelijk maakt! Maar AI is geen magie — het heeft sterke kanten EN zwakke kanten.",
    },
     keyIdea: {
       en: "AI learns from examples (data) rather than from rules. Strong at finding patterns, but can make mistakes, needs lots of examples, and can be biased. Developer knowledge is CRUCIAL to make AI work correctly!",
       fr: "L'IA apprend d'exemples (données) plutôt que de règles. Forte pour trouver des motifs, mais peut faire des erreurs, nécessite beaucoup d'exemples, et peut être biaisée. La connaissance des développeurs est CRUCIALE pour faire fonctionner l'IA correctement !",
       nl: "AI leert van voorbeelden (gegevens) in plaats van regels. Sterk in het vinden van patronen, maar kan fouten maken, heeft veel voorbeelden nodig en kan voorgekomen zijn. Programmeurkennis is CRUCIAAL om AI goed te laten werken!",
     },
     examples: [
       {
         code: {
           en: `# PROGRAMMER'S RESPONSIBILITY: Edge Cases\n# The programmer MUST think about edge cases!\n\ndef find_max(a, b):\n  # Simple case: different numbers\n  if a > b:\n    return a\n  return b\n\n# BUT WAIT! What about edge cases?\nprint(find_max(5, 10))    # ✓ Returns 10 (correct)\nprint(find_max(5, 5))     # Edge case: equal numbers!\nprint(find_max(-5, -10))  # Edge case: negative numbers!\n\n# Good programming needs to handle these!`,
           fr: `# RESPONSABILITÉ DU PROGRAMMEUR : Cas Limites\n# Le programmeur DOIT penser aux cas limites !\n\ndef trouver_max(a, b):\n  # Cas simple : nombres différents\n  si a > b:\n    retourner a\n  retourner b\n\n# MAIS ATTENDS ! Et les cas limites ?\nafficher(trouver_max(5, 10))    # ✓ Retourne 10 (correct)\nafficher(trouver_max(5, 5))     # Cas limite : nombres égaux !\nafficher(trouver_max(-5, -10))  # Cas limite : nombres négatifs !\n\n# Une bonne programmation doit gérer ceux-ci !`,
           nl: `# PROGRAMMEUR VERANTWOORDELIJKHEID: Edge Cases\n# De programmeur MOET aan edge cases denken!\n\ndef vind_max(a, b):\n  # Eenvoudig geval: verschillende getallen\n  als a > b:\n    retourneer a\n  retourneer b\n\n# MAAR WACHT! Wat dacht je van edge cases?\nafdrukken(vind_max(5, 10))    # ✓ Retourneert 10 (correct)\nafdrukken(vind_max(5, 5))     # Edge case: gelijke getallen!\nafdrukken(vind_max(-5, -10))  # Edge case: negatieve getallen!\n\n# Goed programmeren moet dit aanpakken!`,
         },
         explain: {
           en: "Developers MUST anticipate edge cases! AI won't think about equal numbers or negative values—YOU must!",
           fr: "Les développeurs DOIVENT anticiper les cas limites ! L'IA ne pensera pas aux nombres égaux ou aux valeurs négatives — C'EST TOI !",
           nl: "Programmeurs MOETEN edge cases voorzien! AI zal niet aan gelijke getallen of negatieve waarden denken — JIJ MOET!",
         },
       },
       {
         code: {
           en: `# AI: Find max (trained on examples)\nai_model = train_with_examples([\n  ([5, 10], 10),\n  ([3, 8], 8),\n  ([1, 2], 2),\n  # But what if we forget edge cases?\n])\n\n# AI learned the pattern... sort of\nprint(ai_model.predict([5, 10]))    # Works: 10\nprint(ai_model.predict([5, 5]))     # Edge case: could say 5... or 0!\nprint(ai_model.predict([-5, -10]))  # Edge case: could fail!\nprint(ai_model.predict([1000, 2]))  # Large numbers: might fail!\n\n# PROBLEM: AI learned INCOMPLETELY! Developer responsibility!`,
           fr: `# IA : Trouver max (entraîné sur des exemples)\nmodele_ia = entrainer_avec_exemples([\n  ([5, 10], 10),\n  ([3, 8], 8),\n  ([1, 2], 2),\n  # Mais et si on oublie les cas limites ?\n])\n\n# L'IA a appris le motif... plus ou moins\nafficher(modele_ia.predire([5, 10]))    # Marche : 10\nafficher(modele_ia.predire([5, 5]))     # Cas limite : pourrait dire 5... ou 0 !\nafficher(modele_ia.predire([-5, -10]))  # Cas limite : pourrait échouer !\nafficher(modele_ia.predire([1000, 2]))  # Grands nombres : pourrait échouer !\n\n# PROBLÈME : L'IA a appris INCOMPLÈTEMENT ! Responsabilité du développeur !`,
           nl: `# AI: Vind max (getraind op voorbeelden)\nai_model = train_met_voorbeelden([\n  ([5, 10], 10),\n  ([3, 8], 8),\n  ([1, 2], 2),\n  # Maar wat als we edge cases vergeten?\n])\n\n# AI leerde het patroon... min of meer\nafdrukken(ai_model.voorspel([5, 10]))    # Werkt: 10\nafdrukken(ai_model.voorspel([5, 5]))     # Edge case: zou kunnen zeggen 5... of 0!\nafdrukken(ai_model.voorspel([-5, -10]))  # Edge case: kan falen!\nafdrukken(ai_model.voorspel([1000, 2]))  # Grote getallen: kan falen!\n\n# PROBLEEM: AI leerde ONVOLLEDIG! Programmeurverantwoordelijkheid!`,
         },
         explain: {
           en: "AI trained on incomplete data will have incomplete results! The programmer must ensure training data covers ALL edge cases!",
           fr: "L'IA entraînée sur des données incomplètes donnera des résultats incomplets ! Le programmeur doit s'assurer que les données d'entraînement couvrent TOUS les cas limites !",
           nl: "AI getraind op onvolledige gegevens geeft onvolledige resultaten! De programmeur moet ervoor zorgen dat trainingsgegevens ALLE edge cases dekken!",
         },
       },
       {
         code: {
           en: `# DEVELOPER KNOWLEDGE: Proper Implementation\n# A GOOD developer catches what AI misses!\n\ndef find_max_properly(a, b):\n  # ✓ Handle equal numbers\n  if a == b:\n    return (\"equal\", a)\n  \n  # ✓ Handle negative numbers\n  if a > b:\n    return (\"a_is_bigger\", a)\n  else:\n    return (\"b_is_bigger\", b)\n\n# NOW with proper testing:\nprint(find_max_properly(5, 10))    # ✓ (\"b_is_bigger\", 10)\nprint(find_max_properly(5, 5))     # ✓ (\"equal\", 5) - HANDLED!\nprint(find_max_properly(-5, -10))  # ✓ (\"a_is_bigger\", -5)\n\n# Good programming = thinking ahead!`,
           fr: `# CONNAISSANCE EN DÉVELOPPEMENT : Implémentation Appropriée\n# Un BON développeur attrape ce que l'IA manque !\n\ndef trouver_max_correctement(a, b):\n  # ✓ Gérer les nombres égaux\n  si a == b:\n    retourner (\"égal\", a)\n  \n  # ✓ Gérer les nombres négatifs\n  si a > b:\n    retourner (\"a_plus_grand\", a)\n  sinon:\n    retourner (\"b_plus_grand\", b)\n\n# MAINTENANT avec test approprié :\nafficher(trouver_max_correctement(5, 10))    # ✓ (\"b_plus_grand\", 10)\nafficher(trouver_max_correctement(5, 5))     # ✓ (\"égal\", 5) - GÉRÉ !\nafficher(trouver_max_correctement(-5, -10))  # ✓ (\"a_plus_grand\", -5)\n\n# Bonne programmation = penser à l'avance !`,
           nl: `# PROGRAMMEURKENNIS: Juiste Implementatie\n# Een GOEDE programmeur vangt wat AI mist!\n\ndef vind_max_goed(a, b):\n  # ✓ Gelijke getallen afhandelen\n  als a == b:\n    retourneer (\"gelijk\", a)\n  \n  # ✓ Negatieve getallen afhandelen\n  als a > b:\n    retourneer (\"a_groter\", a)\n  anders:\n    retourneer (\"b_groter\", b)\n\n# NU met juiste testing:\nafdrukken(vind_max_goed(5, 10))    # ✓ (\"b_groter\", 10)\nafdrukken(vind_max_goed(5, 5))     # ✓ (\"gelijk\", 5) - AFGEHANDELD!\nafdrukken(vind_max_goed(-5, -10))  # ✓ (\"a_groter\", -5)\n\n# Goed programmeren = vooruit denken!`,
         },
         explain: {
           en: "Good developers think about edge cases BEFORE they become problems. AI can help, but developers must validate and handle edge cases!",
           fr: "Les bons développeurs pensent aux cas limites AVANT qu'ils ne deviennent des problèmes. L'IA peut aider, mais les développeurs doivent valider et gérer les cas limites !",
           nl: "Goede programmeurs denken aan edge cases VOORDAT ze problemen worden. AI kan helpen, maar programmeurs moeten edge cases valideren en afhandelen!",
         },
       },
       {
         code: {
           en: `# REAL WORLD: AI + Developer Knowledge = Success\n\n# Step 1: Developer creates proper specifications\nrequirements = {\n  "handle_equal\": True,\n  \"handle_negative\": True,\n  \"handle_large_numbers\": True,\n  \"return_reason\": True,\n}\n\n# Step 2: Developer prepares COMPLETE training data\ntraining_data = [\n  ([5, 10], \"10\"),\n  ([5, 5], \"equal\"),           # Edge case!\n  ([-5, -10], \"-5\"),            # Edge case!\n  ([1000, 2], \"1000\"),          # Edge case!\n  ([0, 0], \"equal\"),            # Edge case!\n]\n\n# Step 3: Developer trains AI with COMPLETE data\nmodel = train_ai(training_data)\n\n# Step 4: Developer TESTS thoroughly\nassert model.predict([5, 10]) == \"10\"\nassert model.predict([5, 5]) == \"equal\"\nassert model.predict([-5, -10]) == \"-5\"\n\n# NOW AI works! Thanks to developer knowledge!`,
           fr: `# MONDE RÉEL : IA + Connaissance du Développeur = Succès\n\n# Étape 1 : Le développeur crée des spécifications appropriées\nexigences = {\n  \"gerer_egal\": Vrai,\n  \"gerer_negatif\": Vrai,\n  \"gerer_grands_nombres\": Vrai,\n  \"retourner_raison\": Vrai,\n}\n\n# Étape 2 : Le développeur prépare des données d'entraînement COMPLÈTES\ndonnees_entrainement = [\n  ([5, 10], \"10\"),\n  ([5, 5], \"égal\"),              # Cas limite !\n  ([-5, -10], \"-5\"),             # Cas limite !\n  ([1000, 2], \"1000\"),           # Cas limite !\n  ([0, 0], \"égal\"),              # Cas limite !\n]\n\n# Étape 3 : Le développeur entraîne l'IA avec des données COMPLÈTES\nmodele = entrainer_ia(donnees_entrainement)\n\n# Étape 4 : Le développeur TESTE complètement\naffirmer modele.predire([5, 10]) == \"10\"\naffirmer modele.predire([5, 5]) == \"égal\"\naffirmer modele.predire([-5, -10]) == \"-5\"\n\n# MAINTENANT l'IA fonctionne ! Grâce à la connaissance du développeur !`,
           nl: `# REAL WORLD: AI + Programmeurkennis = Succes\n\n# Stap 1: Programmeur maakt juiste specificaties\nvereisten = {\n  \"afhandel_gelijk\": Waar,\n  \"afhandel_negatief\": Waar,\n  \"afhandel_grote_getallen\": Waar,\n  \"retourneer_reden\": Waar,\n}\n\n# Stap 2: Programmeur bereidt VOLLEDIGE trainingsgegevens voor\ntrainingsgegevens = [\n  ([5, 10], \"10\"),\n  ([5, 5], \"gelijk\"),            # Edge case!\n  ([-5, -10], \"-5\"),             # Edge case!\n  ([1000, 2], \"1000\"),           # Edge case!\n  ([0, 0], \"gelijk\"),            # Edge case!\n]\n\n# Stap 3: Programmeur traint AI met VOLLEDIGE gegevens\nmodel = train_ai(trainingsgegevens)\n\n# Stap 4: Programmeur TEST uitgebreid\nasserteer model.voorspel([5, 10]) == \"10\"\nasserteer model.voorspel([5, 5]) == \"gelijk\"\nasserteer model.voorspel([-5, -10]) == \"-5\"\n\n# NU werkt AI! Dankzij programmeurkennis!`,
         },
         explain: {
           en: "The REAL power: Developer Knowledge + AI. Developers provide specifications, complete training data, and thorough testing. AI does the pattern matching. Together = Success!",
           fr: "Le VRAI pouvoir : Connaissance du Développeur + IA. Les développeurs fournissent les spécifications, les données d'entraînement complètes et les tests approdondis. L'IA fait la correspondance de motifs. Ensemble = Succès !",
           nl: "De ECHT kracht: Programmeurkennis + AI. Programmeurs leveren specificaties, volledige trainingsgegevens en grondige tests. AI doet patroonherkenning. Samen = Succes!",
         },
        },
      ],
     games: ["/ai-trainer"],
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
   "/caesar-cipher": { en: "Caesar Cipher", fr: "Chiffre de César", nl: "Caesar Cipher" },
   "/bubble-sort": { en: "Bubble Sort", fr: "Tri à Bulles", nl: "Bellensort" },
   "/insertion-sort": { en: "Insertion Sort", fr: "Tri par Insertion", nl: "Invoegsortering" },
   "/inventory-master": {
    en: "Inventory Master",
    fr: "Maître de l'Inventaire",
    nl: "Inventarisgoeroe",
  },
  "/luck-master": { en: "Luck Master", fr: "Maître de la Chance", nl: "Geluksmeester" },
  "/pattern-painter": {
    en: "Pattern Painter",
    fr: "Peintre de Motifs",
    nl: "Patroon Schilder",
  },
   "/race-against-time": {
     en: "Race Against Time",
     fr: "Course Contre la Montre",
     nl: "Race Tegen de Klok",
   },
   "/ai-trainer": { en: "AI Trainer", fr: "Entraîneur IA", nl: "AI Trainer" },
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

      {c.games.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}
