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
  const [gameState, setGameState] = useState<"start" | "playing" | "result">("playing");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState("");
  const [lastReward, setLastReward] = useState(0);
  const [mysteryNumber, setMysteryNumber] = useState<number | null>(null);
  const [mysteryChoice, setMysteryChoice] = useState<"ODD" | "EVEN" | null>(null);
  const texts = {
    en: {
      title: "Luck Master",
      concept: "Randomness & Probability",
      intro: "Test your luck with randomness! Spin, guess, and win points!",
      code: `# 🎲 RANDOMNESS IN GAMES\n\nimport random\n\n# Random integer\ndice1 = random.randint(1, 6)\ndice2 = random.randint(1, 6)\nif dice1 == dice2:\n  print("Jackpot! +20 points")\n\n# Random float for probability\nif random.random() < 0.5:\n  print("50% chance - You won! +30")\nelse:\n  print("Better luck next time!")\n\n# Mystery Number Game - 3 Steps\n# Step 1: Player chooses ODD or EVEN\nguess = input("ODD or EVEN? ")\n\n# Step 2: Reveal the random number\nmystery_num = random.randint(1, 100)\nprint(f"Mystery Number: {mystery_num}")\n\n# Step 3: Check if guess was correct\nif (guess == "EVEN" and mystery_num % 2 == 0) or (guess == "ODD" and mystery_num % 2 == 1):\n  print(f"✓ CORRECT! +25 bonus points")\nelse:\n  print(f"✗ Wrong! No points")`,
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
      nextGame: "Next Game →",
      restartAll: "Restart All →",
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
      code: `# 🎲 ALÉATOIRE DANS LES JEUX\n\nimporter aléatoire\n\n# Entier aléatoire\ndé1 = aléatoire.randint(1, 6)\ndé2 = aléatoire.randint(1, 6)\nsi dé1 == dé2:\n  afficher("Jackpot ! +20 points")\n\n# Float aléatoire pour probabilité\nsi aléatoire.random() < 0.5:\n  afficher("50% chance - Tu as gagné ! +30")\nsinon:\n  afficher("Meilleure chance la prochaine fois !")\n\n# Jeu du Nombre Mystère - 3 Étapes\n# Étape 1: Joueur choisit PAIR ou IMPAIR\ndeviner = input("PAIR ou IMPAIR? ")\n\n# Étape 2: Révéler le nombre aléatoire\nnombre_mystere = aléatoire.randint(1, 100)\nafficher(f"Nombre Mystère: {nombre_mystere}")\n\n# Étape 3: Vérifier si la réponse était correcte\nsi (deviner == "PAIR" et nombre_mystere % 2 == 0) ou (deviner == "IMPAIR" et nombre_mystere % 2 == 1):\n  afficher(f"✓ CORRECT! +25 points bonus")\nsinon:\n  afficher(f"✗ Faux! Aucun point")`,
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
      nextGame: "Jeu Suivant →",
      restartAll: "Recommencer Tout →",
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
       code: `# 🎲 WILLEKEUR IN SPELLEN\n\nimporteer willekeur\n\n# Willekeurig geheel getal\ndob1 = willekeur.randint(1, 6)\ndob2 = willekeur.randint(1, 6)\nals dob1 == dob2:\n  afdrukken("Jackpot! +20 punten")\n\n# Willekeurig float voor waarschijnlijkheid\nals willekeur.random() < 0.5:\n  afdrukken("50% kans - Je wint! +30")\nanders:\n  afdrukken("Beter geluk volgende keer!")\n\n# Mystiek Getalspel - 3 Stappen\n# Stap 1: Speler kiest ONEVEN of EVEN\nraden = input("ONEVEN of EVEN? ")\n\n# Stap 2: Toon het willekeurige getal\nmystiek_getal = willekeur.randint(1, 100)\nafdrukken(f"Mystiek Getal: {mystiek_getal}")\n\n# Stap 3: Controleer of gok juist was\nals (raden == "EVEN" en mystiek_getal % 2 == 0) of (raden == "ONEVEN" en mystiek_getal % 2 == 1):\n  afdrukken(f"✓ CORRECT! +25 bonuspunten")\nanders:\n  afdrukken(f"✗ Fout! Geen punten")`,
       start: "Gooi de Dobbelstenen",
       spinWheel: "Laten we gaan",
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
      nextGame: "Volgende Spel →",
      restartAll: "Alles Opnieuw →",
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
      setResult(outcome.message);
      setLastReward(outcome.points);
      const newScore = score + outcome.points;
      setScore(newScore);
      setGameState("result");
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
    setRound(round + 1);
    setGameState("playing");
  };

  return (
    <GameLayout title={t.title} emoji="🎲" concept={t.concept} intro={t.intro} code={t.code}>
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
              {round < 3 ? (
                <Button onClick={handleNextRound} size="lg" className="w-full">
                  {t.nextGame}
                </Button>
              ) : (
                <Button onClick={handleStart} size="lg" className="w-full">
                  {t.restartAll}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
