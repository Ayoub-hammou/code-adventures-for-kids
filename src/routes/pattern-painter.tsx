import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/pattern-painter")({
  component: PatternPainter,
});

function PatternPainter() {
  const { lang } = useLang();
  const [gameState, setGameState] = useState<"start" | "playing" | "complete">("start");
  const [level, setLevel] = useState(0);
  const [pattern, setPattern] = useState("");

  const levelCodes = {
    en: [
      `# 🎨 LEVEL 1: PYRAMID\n\nfor i in 1..5:\n  # 🔄 LOOP: repeat i times\n  for j in 1..i:\n    print("*")\n  print(newline)\n\n# Result:\n# *\n# * *\n# * * *\n# * * * *\n# * * * * *`,
      `# 🎨 LEVEL 2: INVERTED PYRAMID\n\nfor i in 5..1 (count down):\n  # 🔄 LOOP: repeat i times\n  for j in 1..i:\n    print("*")\n  print(newline)\n\n# Result:\n# * * * * *\n# * * * *\n# * * *\n# * *\n# *`,
      `# 🎨 LEVEL 3: NUMBER GRID\n\nfor i in 1..4:  # rows\n  for j in 1..4:  # columns\n    print(j)\n    print(space)\n  print(newline)`,
      `# 🎨 LEVEL 4: MULTIPLICATION\n\nfor i in 1..5:  # rows\n  for j in 1..5:  # columns\n    result = i * j\n    print(result)\n    print(space)\n  print(newline)`,
    ],
    fr: [
      `# 🎨 NIVEAU 1 : PYRAMIDE\n\npour i de 1 à 5:\n  # 🔄 BOUCLE : répète i fois\n  pour j de 1 à i:\n    afficher("*")\n  afficher(nouvelle ligne)\n\n# Résultat :\n# *\n# * *\n# * * *\n# * * * *\n# * * * * *`,
      `# 🎨 NIVEAU 2 : PYRAMIDE INVERSÉE\n\npour i de 5 à 1 (compte à rebours):\n  # 🔄 BOUCLE : répète i fois\n  pour j de 1 à i:\n    afficher("*")\n  afficher(nouvelle ligne)\n\n# Résultat :\n# * * * * *\n# * * * *\n# * * *\n# * *\n# *`,
      `# 🎨 NIVEAU 3 : GRILLE DE NOMBRES\n\npour i de 1 à 4:  # lignes\n  pour j de 1 à 4:  # colonnes\n    afficher(j)\n    afficher(espace)\n  afficher(nouvelle ligne)`,
      `# 🎨 NIVEAU 4 : TABLE DE MULTIPLICATION\n\npour i de 1 à 5:  # lignes\n  pour j de 1 à 5:  # colonnes\n    résultat = i * j\n    afficher(résultat)\n    afficher(espace)\n  afficher(nouvelle ligne)`,
    ],
    nl: [
      `# 🎨 NIVEAU 1: PIRAMIDE\n\nvoor i van 1 tot 5:\n  # 🔄 LUS: herhaal i keer\n  voor j van 1 tot i:\n    afdrukken("*")\n  afdrukken(nieuwe regel)\n\n# Resultaat:\n# *\n# * *\n# * * *\n# * * * *\n# * * * * *`,
      `# 🎨 NIVEAU 2: OMGEKEERDE PIRAMIDE\n\nvoor i van 5 tot 1 (tel af):\n  # 🔄 LUS: herhaal i keer\n  voor j van 1 tot i:\n    afdrukken("*")\n  afdrukken(nieuwe regel)\n\n# Resultaat:\n# * * * * *\n# * * * *\n# * * *\n# * *\n# *`,
      `# 🎨 NIVEAU 3: GETALLENROOSTER\n\nvoor i van 1 tot 4:  # rijen\n  voor j van 1 tot 4:  # kolommen\n    afdrukken(j)\n    afdrukken(spatie)\n  afdrukken(nieuwe regel)`,
      `# 🎨 NIVEAU 4: VERMENIGVULDIGING\n\nvoor i van 1 tot 5:  # rijen\n  voor j van 1 tot 5:  # kolommen\n    resultaat = i * j\n    afdrukken(resultaat)\n    afdrukken(spatie)\n  afdrukken(nieuwe regel)`,
    ],
  };

  const texts = {
    en: {
       title: "Pattern Painter",
       concept: "Loops & Patterns",
       intro:
         "Create beautiful patterns with loops! Each challenge will show you a pattern, create the code to generate it!",
       start: "Begin Painting",
       level: "Level",
       generate: "Generate Pattern",
       complete: "Pattern Created!",
       nextLevel: "Next Pattern",
       completed: "All Patterns Mastered!",
       youWon: "You are a Pattern Master! 🎨",
       restart: "Start Over",
      challenges: [
         {
           name: "Simple Pyramid",
           description: "Create a pyramid of stars:",
           render: () => {
             let result = "";
             for (let i = 1; i <= 5; i++) {
               result += "*".repeat(i) + "\n";
             }
             return result;
           },
           explanation: {
             en: "for i in 1..5:\n  for j in 1..i:\n    print(\"*\")\n  print(newline)",
             fr: "Pour chaque ligne i de 1 à 5, affiche i étoiles !",
             nl: "Voor elke rij i van 1 tot 5, druk i sterren af!",
           },
         },
          {
            name: "Inverted Pyramid",
            description: "Create an inverted pyramid:",
            render: () => {
              let result = "";
              for (let i = 5; i >= 1; i--) {
                result += "*".repeat(i) + "\n";
              }
              return result;
            },
            explanation: {
              en: "for i in 5..1 (count down):\n  for j in 1..i:\n    print(\"*\")\n  print(newline)",
              fr: "Commence avec 5 et compte à rebours ! Chaque ligne a moins d'étoiles !",
              nl: "Begin met 5 en tel af! Elke rij heeft minder sterren!",
            },
          },
          {
            name: "Number Grid",
            description: "Create a 4x4 number grid:",
            render: () => {
              let result = "";
              for (let i = 1; i <= 4; i++) {
                let row = "";
                for (let j = 1; j <= 4; j++) {
                  row += j + " ";
                }
                result += row + "\n";
              }
              return result;
            },
            explanation: {
              en: "# Nested loops\nfor i in 1..4:  # outer loop (rows)\n  for j in 1..4:  # inner loop (columns)\n    print(j)\n  print(newline)",
              fr: "Boucles imbriquées ! Boucle externe pour les lignes, interne pour les colonnes !",
              nl: "Geneste lussen! Buitenlus voor rijen, binnenlus voor kolommen!",
            },
          },
         {
           name: "Multiplication Table",
           description: "Create a 5x5 multiplication table:",
           render: () => {
             let result = "";
             for (let i = 1; i <= 5; i++) {
               let row = "";
               for (let j = 1; j <= 5; j++) {
                 row += (i * j).toString().padStart(3) + " ";
               }
               result += row + "\n";
             }
             return result;
           },
           explanation: {
             en: "# Nested loops with math\nfor i in 1..5:  # outer loop\n  for j in 1..5:  # inner loop\n    result = i * j\n    print(result)\n  print(newline)",
             fr: "Math dans les boucles imbriquées ! Multiplie i et j pour chaque cellule !",
             nl: "Wiskunde in geneste lussen! Vermenigvuldig i en j voor elke cel!",
           },
         },
      ],
    },
     fr: {
       title: "Peintre de Motifs",
       concept: "Boucles & Motifs",
       intro:
         "Crée de beaux motifs avec des boucles ! Chaque défi te montrera un motif, crée le code pour le générer !",
       start: "Commencer à Peindre",
       level: "Niveau",
       generate: "Générer Motif",
       complete: "Motif Créé !",
       nextLevel: "Motif Suivant",
       completed: "Tous les Motifs Maîtrisés !",
       youWon: "Tu es un Maître des Motifs ! 🎨",
       restart: "Recommencer",
      challenges: [
         {
           name: "Pyramide Simple",
           description: "Crée une pyramide d'étoiles :",
           render: () => {
             let result = "";
             for (let i = 1; i <= 5; i++) {
               result += "*".repeat(i) + "\n";
             }
             return result;
           },
           explanation: {
             en: "For each row i from 1 to 5, print i stars!",
             fr: "pour i de 1 à 5:\n  pour j de 1 à i:\n    afficher(\"*\")\n  afficher(nouvelle ligne)",
             nl: "Voor elke rij i van 1 tot 5, druk i sterren af!",
           },
         },
          {
            name: "Pyramide Inversée",
            description: "Crée une pyramide inversée :",
            render: () => {
              let result = "";
              for (let i = 5; i >= 1; i--) {
                result += "*".repeat(i) + "\n";
              }
              return result;
            },
            explanation: {
              en: "Start with 5 and count down! Each row has fewer stars!",
              fr: "pour i de 5 à 1 (compte à rebours):\n  pour j de 1 à i:\n    afficher(\"*\")\n  afficher(nouvelle ligne)",
              nl: "Begin met 5 en tel af! Elke rij heeft minder sterren!",
            },
          },
          {
            name: "Grille de Nombres",
            description: "Crée une grille 4x4 de nombres :",
            render: () => {
              let result = "";
              for (let i = 1; i <= 4; i++) {
                let row = "";
                for (let j = 1; j <= 4; j++) {
                  row += j + " ";
                }
                result += row + "\n";
              }
              return result;
            },
            explanation: {
              en: "Nested loops! Outer loop for rows, inner for columns!",
              fr: "# Boucles imbriquées\npour i de 1 à 4:  # boucle externe (lignes)\n  pour j de 1 à 4:  # boucle interne (colonnes)\n    afficher(j)\n  afficher(nouvelle ligne)",
              nl: "Geneste lussen! Buitenlus voor rijen, binnenlus voor kolommen!",
            },
          },
         {
           name: "Table de Multiplication",
           description: "Crée une table de multiplication 5x5 :",
           render: () => {
             let result = "";
             for (let i = 1; i <= 5; i++) {
               let row = "";
               for (let j = 1; j <= 5; j++) {
                 row += (i * j).toString().padStart(3) + " ";
               }
               result += row + "\n";
             }
             return result;
           },
           explanation: {
             en: "Math in nested loops! Multiply i and j for each cell!",
             fr: "# Boucles imbriquées avec maths\npour i de 1 à 5:  # boucle externe\n  pour j de 1 à 5:  # boucle interne\n    résultat = i * j\n    afficher(résultat)\n  afficher(nouvelle ligne)",
             nl: "Wiskunde in geneste lussen! Vermenigvuldig i en j voor elke cel!",
           },
         },
      ],
    },
     nl: {
       title: "Patroon Schilder",
       concept: "Lussen & Patronen",
       intro:
         "Maak mooie patronen met lussen! Elk challenge toont je een patroon, maak de code om het te genereren!",
       start: "Begin Te Schilderen",
       level: "Niveau",
       generate: "Patroon Genereren",
       complete: "Patroon Gemaakt!",
       nextLevel: "Volgende Patroon",
       completed: "Alle Patronen Beheerst!",
       youWon: "Je bent een Patroon Meester! 🎨",
       restart: "Opnieuw Starten",
      challenges: [
         {
           name: "Eenvoudige Piramide",
           description: "Maak een sterrenpyramide:",
           render: () => {
             let result = "";
             for (let i = 1; i <= 5; i++) {
               result += "*".repeat(i) + "\n";
             }
             return result;
           },
           explanation: {
             en: "For each row i from 1 to 5, print i stars!",
             fr: "Pour chaque ligne i de 1 à 5, affiche i étoiles !",
             nl: "voor i van 1 tot 5:\n  voor j van 1 tot i:\n    afdrukken(\"*\")\n  afdrukken(nieuwe regel)",
           },
         },
         {
           name: "Omgekeerde Piramide",
           description: "Maak een omgekeerde piramide:",
           render: () => {
             let result = "";
             for (let i = 5; i >= 1; i--) {
               result += "*".repeat(i) + "\n";
             }
             return result;
           },
           explanation: {
             en: "Start with 5 and count down! Each row has fewer stars!",
             fr: "Commence avec 5 et compte à rebours ! Chaque ligne a moins d'étoiles !",
             nl: "voor i van 5 tot 1 (tel af):\n  voor j van 1 tot i:\n    afdrukken(\"*\")\n  afdrukken(nieuwe regel)",
           },
          },
          {
            name: "Getallenrooster",
           description: "Maak een 4x4 getallenrooster:",
           render: () => {
             let result = "";
             for (let i = 1; i <= 4; i++) {
               let row = "";
               for (let j = 1; j <= 4; j++) {
                 row += j + " ";
               }
               result += row + "\n";
             }
             return result;
           },
           explanation: {
             en: "Nested loops! Outer loop for rows, inner for columns!",
             fr: "Boucles imbriquées ! Boucle externe pour les lignes, interne pour les colonnes !",
             nl: "# Geneste lussen\nvoor i van 1 tot 4:  # buitenlus (rijen)\n  voor j van 1 tot 4:  # binnenlus (kolommen)\n    afdrukken(j)\n  afdrukken(nieuwe regel)",
           },
         },
         {
           name: "Vermenigvuldigingstafel",
           description: "Maak een 5x5 vermenigvuldigingstafel:",
           render: () => {
             let result = "";
             for (let i = 1; i <= 5; i++) {
               let row = "";
               for (let j = 1; j <= 5; j++) {
                 row += (i * j).toString().padStart(3) + " ";
               }
               result += row + "\n";
             }
             return result;
           },
           explanation: {
             en: "Math in nested loops! Multiply i and j for each cell!",
             fr: "Math dans les boucles imbriquées ! Multiplie i et j pour chaque cellule !",
             nl: "# Geneste lussen met wiskunde\nvoor i van 1 tot 5:  # buitenlus\n  voor j van 1 tot 5:  # binnenlus\n    resultaat = i * j\n    afdrukken(resultaat)\n  afdrukken(nieuwe regel)",
           },
         },
      ],
    },
  };

   const t = texts[lang as keyof typeof texts];
   const currentChallenge = t.challenges[level];
   const currentCode = levelCodes[lang as keyof typeof levelCodes][gameState === "start" ? 0 : level];

  const handleStart = () => {
    setGameState("playing");
    setPattern(currentChallenge.render());
  };

  const handleNext = () => {
    if (level + 1 >= t.challenges.length) {
      setGameState("complete");
    } else {
      setLevel(level + 1);
      setPattern(t.challenges[level + 1].render());
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setLevel(0);
    setPattern("");
  };

    return (
      <GameLayout title={t.title} emoji="🧩" concept={t.concept} intro={gameState === "start" ? "" : t.intro} code={gameState === "start" ? "" : currentCode} codeKey={level}>
       <div className="max-w-2xl mx-auto">
         <h1 className="text-4xl font-bold mb-2 text-center">{t.title}</h1>
         {gameState !== "start" && <p className="text-center text-muted-foreground mb-6">{t.intro}</p>}

        {gameState === "start" && (
          <div className="text-center space-y-4">
            <div className="text-6xl">🧩</div>
            <Button onClick={handleStart} size="lg">
              {t.start}
            </Button>
          </div>
        )}

         {gameState === "playing" && (
           <div className="space-y-6">
             <div className="flex justify-between items-center">
               <div>
                 <p className="text-sm text-muted-foreground">{t.level}</p>
                 <p className="text-xl font-bold">
                   {level + 1} / {t.challenges.length}
                 </p>
               </div>
             </div>

            <div className="bg-card border-2 border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">{currentChallenge.name}</h2>
              <p className="text-muted-foreground mb-4">{currentChallenge.description}</p>
            </div>

             <div className="bg-black rounded-lg p-6 font-mono text-green-400 text-sm overflow-x-auto">
               <pre className="whitespace-pre-wrap">{pattern}</pre>
             </div>

             <Button onClick={handleNext} size="lg" className="w-full">
              {level + 1 >= t.challenges.length ? t.completed : t.nextLevel}
            </Button>
          </div>
        )}

         {gameState === "complete" && (
           <div className="text-center space-y-6">
             <div className="text-6xl">🎨</div>
             <div className="text-3xl font-bold">{t.youWon}</div>
             <Button onClick={handleRestart} size="lg">
               {t.restart}
             </Button>
           </div>
         )}
      </div>
    </GameLayout>
  );
}
