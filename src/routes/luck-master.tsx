import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/luck-master")({
  component: LuckMaster,
});

function LuckMaster() {
  const { lang } = useLang();
  const [gameState, setGameState] = useState<"start" | "playing" | "mystery-choice" | "result" | "summary">("start");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState("");
  const [lastReward, setLastReward] = useState(0);
  const [mysteryNumber, setMysteryNumber] = useState<number | null>(null);
  const [_mysteryChoice, setMysteryChoice] = useState<"ODD" | "EVEN" | null>(null);

  const roundCodes = {
    en: [
      `# 🎲 ROUND 1: LUCKY DICE\n\nimport random\n\n# Roll two random dice\ndice1 = random.randint(1, 6)\ndice2 = random.randint(1, 6)\nprint(f"Dice: {dice1}, {dice2}")\n\n# Check if they match\nif dice1 == dice2:\n  print("✓ Match! +20 points")\nelse:\n  print("✗ No match")`,
      `# 🎡 ROUND 2: SPIN THE WHEEL\n\nimport random\n\n# 50% chance game\nif random.random() < 0.5:\n  print("🌟 Gold! +30 points")\nelse:\n  print("Silver! Try again")`,
      `# 🎁 ROUND 3: PICK THE PRIZE\n\nimport random\n\n# Pick a random prize\nif random.random() < 0.5:\n  print("🎉 Big Prize! +50 points")\nelse:\n  print("Small Prize +10 points")`,
      `# 🔮 ROUND 4: MYSTERY NUMBER\n\nimport random\n\n# Player chooses ODD or EVEN\nguess = input("ODD or EVEN? ")\n\n# Random number appears\nmystery = random.randint(1, 100)\nprint(f"Number: {mystery}")\n\n# Check if correct\nif (guess == "EVEN" and mystery % 2 == 0) or (guess == "ODD" and mystery % 2 == 1):\n  print("✓ Correct! +25 bonus")\nelse:\n  print("✗ Wrong!")`,
    ],
    fr: [
      `# 🎲 MANCHE 1: DÉS DE CHANCE\n\nimporter aléatoire\n\n# Lancer deux dés aléatoires\ndé1 = aléatoire.randint(1, 6)\ndé2 = aléatoire.randint(1, 6)\nafficher(f"Dés: {dé1}, {dé2}")\n\n# Vérifier s'ils correspondent\nsi dé1 == dé2:\n  afficher("✓ Jackpot! +20 points")\nsinon:\n  afficher("✗ Pas de chance")`,
      `# 🎡 MANCHE 2: TOURNER LA ROUE\n\nimporter aléatoire\n\n# Jeu 50% chance\nsi aléatoire.random() < 0.5:\n  afficher("🌟 Or! +30 points")\nsinon:\n  afficher("Argent! Réessaie")`,
      `# 🎁 MANCHE 3: CHOISIR LE PRIX\n\nimporter aléatoire\n\n# Choisir un prix aléatoire\nsi aléatoire.random() < 0.5:\n  afficher("🎉 Grand Prix! +50 points")\nsinon:\n  afficher("Petit Prix +10 points")`,
      `# 🔮 MANCHE 4: NOMBRE MYSTÈRE\n\nimporter aléatoire\n\n# Joueur choisit PAIR ou IMPAIR\ndeviner = input("PAIR ou IMPAIR? ")\n\n# Nombre aléatoire apparaît\nmystere = aléatoire.randint(1, 100)\nafficher(f"Nombre: {mystere}")\n\n# Vérifier si correct\nsi (deviner == "PAIR" et mystere % 2 == 0) ou (deviner == "IMPAIR" et mystere % 2 == 1):\n  afficher("✓ Correct! +25 bonus")\nsinon:\n  afficher("✗ Faux!")`,
    ],
    nl: [
      `# 🎲 RONDE 1: GELUKSDOBBELSTENEN\n\nimporteer willekeur\n\n# Gooi twee willekeurige dobbelstenen\ndob1 = willekeur.randint(1, 6)\ndob2 = willekeur.randint(1, 6)\nafdrukken(f"Dobbelstenen: {dob1}, {dob2}")\n\n# Controleer of ze hetzelfde zijn\nals dob1 == dob2:\n  afdrukken("✓ Jackpot! +20 punten")\nanders:\n  afdrukken("✗ Geen geluk")`,
      `# 🎡 RONDE 2: DRAAI HET WIEL\n\nimporteer willekeur\n\n# 50% kansspel\nals willekeur.random() < 0.5:\n  afdrukken("🌟 Goud! +30 punten")\nanders:\n  afdrukken("Zilver! Probeer opnieuw")`,
      `# 🎁 RONDE 3: KIES DE PRIJS\n\nimporteer willekeur\n\n# Kies een willekeurige prijs\nals willekeur.random() < 0.5:\n  afdrukken("🎉 Grote Prijs! +50 punten")\nanders:\n  afdrukken("Kleine Prijs +10 punten")`,
      `# 🔮 RONDE 4: MYSTIEK GETAL\n\nimporteer willekeur\n\n# Speler kiest ONEVEN of EVEN\nraden = input("ONEVEN of EVEN? ")\n\n# Willekeurig getal verschijnt\nmystiek = willekeur.randint(1, 100)\nafdrukken(f"Getal: {mystiek}")\n\n# Controleer of juist\nals (raden == "EVEN" en mystiek % 2 == 0) of (raden == "ONEVEN" en mystiek % 2 == 1):\n  afdrukken("✓ Correct! +25 bonus")\nanders:\n  afdrukken("✗ Fout!")`,
    ],
  };
  const texts = {
    en: {
      title: "Luck Master",
      concept: "Randomness & Probability",
      intro: "Test your luck with randomness! Spin, guess, and win points!",
      start: "Roll the Dice",
      spinWheel: "Let's Go",
      pickOption: "Pick an Option",
      tryAgain: "Try Again",
      gameOver: "Round Complete!",
      score: "Score",
      round: "Round",
      wonPoints: "You won",
      points: "points!",
      lostMessage: "Better luck next time!",
      oddChoice: "ODD",
      evenChoice: "EVEN",
      mysteryNumber: "Mystery Number",
      correct: "CORRECT",
       wrong: "WRONG",
       showNumber: "Reveal Number",
       result: "Result",
       nextGame: "Next Game →",
       restartAll: "Restart →",
      challenges: [
        {
          name: "Lucky Dice Roll 🎲",
          description: "Roll two dice. If they match, you win 20 points!",
          play: () => {
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            if (dice1 === dice2) {
              return { won: true, points: 20, message: `🎲 ${dice1} and ${dice1}! Match!` };
            }
            return { won: false, points: 0, message: `🎲 ${dice1} and ${dice2}. No match.` };
          },
        },
        {
          name: "Spin the Wheel 🎡",
          description: "Spin the wheel! Land on gold and win 30 points (50% chance)!",
          play: () => {
            const spin = Math.random() < 0.5;
            if (spin) {
              return {
                won: true,
                points: 30,
                message: "🎡 You landed on GOLD! 🌟",
              };
            }
            return {
              won: false,
              points: 0,
              message: "🎡 You landed on SILVER. Try again!",
            };
          },
        },
        {
          name: "Pick the Prize 🎁",
          description:
            "Pick a random prize! 50% chance for a big prize (50 points), 50% for a small prize (10 points)!",
          play: () => {
            const big = Math.random() < 0.5;
            if (big) {
              return {
                won: true,
                points: 50,
                message: "🎁 BIG PRIZE! Jackpot! 🎉",
              };
            }
            return { won: true, points: 10, message: "🎁 Small prize, but still nice!" };
          },
        },
        {
          name: "Mystery Number 🔮",
          description:
            "A mystery number appears! Pick ODD or EVEN. If you're right, you win 25 bonus points!",
          play: () => {
            const number = Math.floor(Math.random() * 100);
            setMysteryNumber(number);
            return null;
          },
        },
      ],
    },
    fr: {
      title: "Maître de la Chance",
      concept: "Aléatoire & Probabilités",
      intro: "Teste ta chance avec l'aléatoire ! Tourne, devine et gagne des points !",
      start: "Lancer les Dés",
      spinWheel: "Allons-y",
      pickOption: "Choisir une Option",
      tryAgain: "Réessayer",
      gameOver: "Manche Complétée !",
      score: "Score",
      round: "Manche",
      wonPoints: "Tu as gagné",
      points: "points !",
      lostMessage: "Meilleure chance la prochaine fois !",
      oddChoice: "IMPAIR",
      evenChoice: "PAIR",
      mysteryNumber: "Nombre Mystère",
      correct: "CORRECT",
       wrong: "FAUX",
       showNumber: "Révéler le Nombre",
       result: "Résultat",
       nextGame: "Jeu Suivant →",
       restartAll: "Recommencer →",
      challenges: [
        {
          name: "Lancer les Dés 🎲",
          description: "Lance deux dés. S'ils correspondent, tu gagnes 20 points !",
          play: () => {
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            if (dice1 === dice2) {
              return {
                won: true,
                points: 20,
                message: `🎲 ${dice1} et ${dice1} ! Jackpot !`,
              };
            }
            return {
              won: false,
              points: 0,
              message: `🎲 ${dice1} et ${dice2}. Pas de chance.`,
            };
          },
        },
        {
          name: "Tourner la Roue 🎡",
          description: "Tourne la roue ! Atterris sur or et gagne 30 points (50% de chance) !",
          play: () => {
            const spin = Math.random() < 0.5;
            if (spin) {
              return {
                won: true,
                points: 30,
                message: "🎡 Tu as atterri sur OR ! 🌟",
              };
            }
            return {
              won: false,
              points: 0,
              message: "🎡 Tu as atterri sur ARGENT. Réessaie !",
            };
          },
        },
        {
          name: "Choisir le Prix 🎁",
          description:
            "Choisis un prix aléatoire ! 50% de chance pour un grand prix (50 points), 50% pour un petit prix (10 points) !",
          play: () => {
            const big = Math.random() < 0.5;
            if (big) {
              return {
                won: true,
                points: 50,
                message: "🎁 GRAND PRIX ! Jackpot ! 🎉",
              };
            }
            return {
              won: true,
              points: 10,
              message: "🎁 Petit prix, mais c'est toujours bien !",
            };
          },
        },
        {
          name: "Nombre Mystère 🔮",
          description:
            "Un nombre mystère apparaît ! Choisis PAIR ou IMPAIR. Si tu as raison, tu gagnes 25 points bonus !",
          play: () => {
            const number = Math.floor(Math.random() * 100);
            setMysteryNumber(number);
            return null;
          },
        },
      ],
    },
    nl: {
      title: "Geluksmeester",
      concept: "Willekeur & Kansen",
      intro: "Test je geluk met willekeur! Draai, gok en win punten!",
      start: "Gooi de Dobbelstenen",
      spinWheel: "Laten we gaan",
      pickOption: "Kies een Optie",
      tryAgain: "Opnieuw Proberen",
      gameOver: "Ronde Voltooid!",
      score: "Score",
      round: "Ronde",
      wonPoints: "Je hebt gewonnen",
      points: "punten!",
      lostMessage: "Beter geluk volgende keer!",
      oddChoice: "ONEVEN",
      evenChoice: "EVEN",
      mysteryNumber: "Mystiek Getal",
      correct: "CORRECT",
       wrong: "FOUT",
       showNumber: "Getal Tonen",
       result: "Resultaat",
       nextGame: "Volgende Spel →",
       restartAll: "Opnieuw →",
      challenges: [
        {
          name: "Dobbelstenen Gooien 🎲",
          description: "Gooi twee dobbelstenen. Als ze hetzelfde zijn, win je 20 punten!",
          play: () => {
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            if (dice1 === dice2) {
              return {
                won: true,
                points: 20,
                message: `🎲 ${dice1} en ${dice1}! Jackpot!`,
              };
            }
            return {
              won: false,
              points: 0,
              message: `🎲 ${dice1} en ${dice2}. Geen geluk.`,
            };
          },
        },
        {
          name: "Draai het Wiel 🎡",
          description: "Draai het wiel! Land op goud en win 30 punten (50% kans)!",
          play: () => {
            const spin = Math.random() < 0.5;
            if (spin) {
              return {
                won: true,
                points: 30,
                message: "🎡 Je bent op GOUD geland! 🌟",
              };
            }
            return {
              won: false,
              points: 0,
              message: "🎡 Je bent op ZILVER geland. Probeer opnieuw!",
            };
          },
        },
        {
          name: "Kies de Prijs 🎁",
          description:
            "Kies een willekeurige prijs! 50% kans op grote prijs (50 punten), 50% kleine prijs (10 punten)!",
          play: () => {
            const big = Math.random() < 0.5;
            if (big) {
              return {
                won: true,
                points: 50,
                message: "🎁 GROTE PRIJS! Jackpot! 🎉",
              };
            }
            return {
              won: true,
              points: 10,
              message: "🎁 Kleine prijs, maar nog steeds leuk!",
            };
          },
        },
        {
          name: "Mystiek Getal 🔮",
          description:
            "Een mystiek getal verschijnt! Kies ONEVEN of EVEN. Als je gelijk hebt, win je 25 bonuspunten!",
          play: () => {
            const number = Math.floor(Math.random() * 100);
            setMysteryNumber(number);
            return null;
          },
        },
      ],
    },
  };

  const t = texts[lang as keyof typeof texts];
  const challenge = t.challenges[round % t.challenges.length];
  const roundCodesList = roundCodes[lang as keyof typeof roundCodes];
  const currentRoundCode = gameState === "start" || gameState === "summary" ? "" : roundCodesList[round % roundCodesList.length];
  const currentCodeKey = gameState === "start" || gameState === "summary" ? "start" : round;

  const handleStart = () => {
    setGameState("playing");
    setRound(0);
    setScore(0);
    setMysteryNumber(null);
    setMysteryChoice(null);
  };

  const handleChallenge = () => {
    const isMysteryChallengeIndex = round % t.challenges.length === 3;

    if (isMysteryChallengeIndex) {
      setGameState("mystery-choice");
    } else {
      const outcome = challenge.play();
      if (outcome) {
        setResult(outcome.message);
        setLastReward(outcome.points);
        const newScore = score + outcome.points;
        setScore(newScore);
        setGameState("result");
      }
    }
  };

  const handleMysteryChoice = (choice: "ODD" | "EVEN") => {
    const number = Math.floor(Math.random() * 100);
    const isEven = number % 2 === 0;
    const correct = (choice === "EVEN" && isEven) || (choice === "ODD" && !isEven);

    if (correct) {
      setResult(`🔮 ${t.mysteryNumber}: ${number} - ${t.correct}! +25 ${t.points}`);
      const bonusPoints = 25;
      setLastReward(bonusPoints);
      const newScore = score + bonusPoints;
      setScore(newScore);
    } else {
      setResult(`🔮 ${t.mysteryNumber}: ${number} - ${t.wrong}!`);
      setLastReward(0);
    }
    setMysteryNumber(null);
    setMysteryChoice(null);
    setGameState("result");
  };

  const handleNextRound = () => {
    if (round >= 3) {
      setGameState("summary");
    } else {
      setRound(round + 1);
      setGameState("playing");
    }
  };

  return (
    <GameLayout title={t.title} emoji="🎲" concept={t.concept} intro={gameState === "start" ? t.intro : ""} code={currentRoundCode} codeKey={currentCodeKey}>
      <div className="space-y-6">
        {gameState === "start" && (
          <div className="text-center space-y-4">
            <div className="text-6xl">🎲</div>
            <Button onClick={handleStart} size="lg">
              {t.start}
            </Button>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{t.round}</p>
                <p className="text-xl font-bold">{round + 1}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.score}</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 text-center">
              <p className="text-4xl mb-4">{challenge.name}</p>
              <p className="text-muted-foreground mb-6">{challenge.description}</p>
              <Button onClick={handleChallenge} size="lg" className="w-full">
                {t.spinWheel}
              </Button>
            </div>
          </div>
        )}

        {gameState === "mystery-choice" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{t.round}</p>
                <p className="text-xl font-bold">{round + 1}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.score}</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 text-center space-y-6">
              <p className="text-4xl font-bold">🔮</p>
              <p className="text-2xl font-bold">{t.mysteryNumber}</p>
              <p className="text-lg font-semibold">
                {t.oddChoice} or {t.evenChoice}?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleMysteryChoice("ODD")}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-xl"
                >
                  {t.oddChoice}
                </button>
                <button
                  onClick={() => handleMysteryChoice("EVEN")}
                  className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg text-xl"
                >
                  {t.evenChoice}
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === "result" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{t.round}</p>
                <p className="text-xl font-bold">{round + 1}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.score}</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 text-center space-y-4">
              <p className="text-3xl font-bold">{result}</p>
              {lastReward > 0 ? (
                <div className="text-2xl font-bold text-green-600">
                  +{lastReward}
                  {t.points}
                </div>
              ) : (
                <div className="text-2xl font-bold text-red-600">{t.lostMessage}</div>
              )}
            </div>

             <div className="flex gap-4">
               <Button onClick={handleNextRound} size="lg" className="w-full">
                 {round < 3 ? t.nextGame : t.result}
               </Button>
             </div>
           </div>
         )}

         {gameState === "summary" && (
           <div className="space-y-6">
             <div className="bg-card border-2 border-border rounded-2xl p-8 text-center space-y-6">
               <p className="text-5xl font-bold">🎉</p>
               <p className="text-4xl font-bold">Game Complete!</p>
               <div className="space-y-2">
                 <p className="text-lg text-muted-foreground">Final Score</p>
                 <p className="text-6xl font-bold text-primary">{score}</p>
               </div>
               <div className="py-4 border-t border-b text-lg">
                 <p className="text-muted-foreground mb-2">You completed 4 rounds:</p>
                 <p className="font-semibold">🎲 Lucky Dice • 🎡 Spin Wheel • 🎁 Pick Prize • 🔮 Mystery Number</p>
               </div>
             </div>

              <Button onClick={handleStart} size="lg" className="w-full">
                {t.restartAll}
              </Button>
           </div>
         )}
      </div>
    </GameLayout>
  );
}
