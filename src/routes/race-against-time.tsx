import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/race-against-time")({
  component: RaceAgainstTime,
});

function RaceAgainstTime() {
  const { lang } = useLang();
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
  const [challenge, setChallenge] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [gameDifficulty, setGameDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  const texts = {
    en: {
      title: "Race Against Time",
      concept: "Loops & Timing Mechanics",
      intro: "Answer math questions as fast as you can! The clock is ticking!",
      code: `# 🏃 RACE AGAINST TIME\n\nfunction startGame(difficulty):\n  timeLimit = getDifficultyTime(difficulty)  # 10s, 7s, or 5s\n  score = 0\n  questionIndex = 0\n  \n  while questionIndex < totalQuestions:\n    currentQuestion = getRandomQuestion()\n    timeLeft = timeLimit\n    \n    # 🔄 TIMER LOOP\n    while timeLeft > 0:\n      displayQuestion(currentQuestion)\n      displayTime(timeLeft)\n      \n      if userSubmitsAnswer():\n        if isAnswerCorrect(userAnswer, currentQuestion):\n          # ✓ Award points based on remaining time\n          score += timeLeft * 10\n          feedback = "Correct!"\n        else:\n          feedback = "Incorrect!"\n        break  # Move to next question\n      \n      timeLeft -= 1\n      sleep(1 second)\n    \n    # ⏰ Handle timeout\n    if timeLeft == 0:\n      feedback = "Time's Up!"\n    \n    questionIndex += 1\n  \n  return displayFinalScore(score)`,
      start: "Start Racing",
      chooseDifficulty: "Choose Difficulty",
      answerPlaceholder: "Your answer...",
      easy: "Easy (10s)",
      medium: "Medium (7s)",
      hard: "Hard (5s)",
      question: "Question",
      timeLeft: "Time Left",
      score: "Score",
      submit: "Submit Answer",
      correct: "✓ Correct!",
      incorrect: "✗ Incorrect!",
      timeUp: "⏰ Time's Up!",
      gameOver: "Game Over!",
      finalScore: "Final Score",
      restart: "Play Again",
      nextQuestion: "Next Question",
      finished: "Here are your results 🏃",
      challenges: {
        easy: [
          { question: "What is 5 + 3?", answer: "8", explanation: "5 + 3 = 8" },
          {
            question: "What is 10 - 4?",
            answer: "6",
            explanation: "10 - 4 = 6",
          },
          {
            question: "What is 2 × 6?",
            answer: "12",
            explanation: "2 × 6 = 12",
          },
          {
            question: "What is 20 ÷ 4?",
            answer: "5",
            explanation: "20 ÷ 4 = 5",
          },
          {
            question: "What is 7 + 8?",
            answer: "15",
            explanation: "7 + 8 = 15",
          },
        ],
        medium: [
          {
            question: "What is 15 + 27?",
            answer: "42",
            explanation: "15 + 27 = 42",
          },
          {
            question: "What is 50 - 18?",
            answer: "32",
            explanation: "50 - 18 = 32",
          },
          {
            question: "What is 7 × 8?",
            answer: "56",
            explanation: "7 × 8 = 56",
          },
          {
            question: "What is 100 ÷ 5?",
            answer: "20",
            explanation: "100 ÷ 5 = 20",
          },
          {
            question: "What is 23 + 19?",
            answer: "42",
            explanation: "23 + 19 = 42",
          },
        ],
        hard: [
          {
            question: "What is 47 + 56?",
            answer: "103",
            explanation: "47 + 56 = 103",
          },
          {
            question: "What is 92 - 35?",
            answer: "57",
            explanation: "92 - 35 = 57",
          },
          {
            question: "What is 12 × 11?",
            answer: "132",
            explanation: "12 × 11 = 132",
          },
          {
            question: "What is 144 ÷ 12?",
            answer: "12",
            explanation: "144 ÷ 12 = 12",
          },
          {
            question: "What is 89 + 56?",
            answer: "145",
            explanation: "89 + 56 = 145",
          },
        ],
      },
    },
    fr: {
      title: "Course Contre la Montre",
      concept: "Boucles & Mécaniques de Temps",
      intro: "Réponds aux questions mathématiques aussi vite que tu peux ! La montre tourne !",
      code: `# 🏃 COURSE CONTRE LA MONTRE\n\nfonction lancerJeu(difficulte):\n  tempsLimite = getTempsParDifficulte(difficulte)  # 10s, 7s, ou 5s\n  score = 0\n  indexQuestion = 0\n  \n  tant que indexQuestion < totalQuestions:\n    questionActuelle = getRandomQuestion()\n    tempsRestant = tempsLimite\n    \n    # 🔄 BOUCLE DE MINUTEUR\n    tant que tempsRestant > 0:\n      afficherQuestion(questionActuelle)\n      afficherTemps(tempsRestant)\n      \n      si utilisateurSoumetRéponse():\n        si laRéponseEstCorrecte(réponseUtilisateur, questionActuelle):\n          # ✓ Points basés sur le temps restant\n          score += tempsRestant * 10\n          retour = "Correct!"\n        sinon:\n          retour = "Incorrect!"\n        break  # Passer à la question suivante\n      \n      tempsRestant -= 1\n      attendre(1 seconde)\n    \n    # ⏰ Gérer le dépassement de temps\n    si tempsRestant == 0:\n      retour = "Temps Écoulé!"\n    \n    indexQuestion += 1\n  \n  retour afficherScoreFinal(score)`,
      start: "Commencer la Course",
      chooseDifficulty: "Choisir la Difficulté",
      answerPlaceholder: "Ton réponse...",
      easy: "Facile (10s)",
      medium: "Moyen (7s)",
      hard: "Difficile (5s)",
      question: "Question",
      timeLeft: "Temps Restant",
      score: "Score",
      submit: "Soumettre Réponse",
      correct: "✓ Correct !",
      incorrect: "✗ Incorrect !",
      timeUp: "⏰ Temps Écoulé !",
      gameOver: "Fin du Jeu !",
      finalScore: "Score Final",
      restart: "Rejouer",
      nextQuestion: "Question Suivante",
      finished: "Voici tes résultats 🏃",
      challenges: {
        easy: [
          {
            question: "Combien font 5 + 3 ?",
            answer: "8",
            explanation: "5 + 3 = 8",
          },
          {
            question: "Combien font 10 - 4 ?",
            answer: "6",
            explanation: "10 - 4 = 6",
          },
          {
            question: "Combien font 2 × 6 ?",
            answer: "12",
            explanation: "2 × 6 = 12",
          },
          {
            question: "Combien font 20 ÷ 4 ?",
            answer: "5",
            explanation: "20 ÷ 4 = 5",
          },
          {
            question: "Combien font 7 + 8 ?",
            answer: "15",
            explanation: "7 + 8 = 15",
          },
        ],
        medium: [
          {
            question: "Combien font 15 + 27 ?",
            answer: "42",
            explanation: "15 + 27 = 42",
          },
          {
            question: "Combien font 50 - 18 ?",
            answer: "32",
            explanation: "50 - 18 = 32",
          },
          {
            question: "Combien font 7 × 8 ?",
            answer: "56",
            explanation: "7 × 8 = 56",
          },
          {
            question: "Combien font 100 ÷ 5 ?",
            answer: "20",
            explanation: "100 ÷ 5 = 20",
          },
          {
            question: "Combien font 23 + 19 ?",
            answer: "42",
            explanation: "23 + 19 = 42",
          },
        ],
        hard: [
          {
            question: "Combien font 47 + 56 ?",
            answer: "103",
            explanation: "47 + 56 = 103",
          },
          {
            question: "Combien font 92 - 35 ?",
            answer: "57",
            explanation: "92 - 35 = 57",
          },
          {
            question: "Combien font 12 × 11 ?",
            answer: "132",
            explanation: "12 × 11 = 132",
          },
          {
            question: "Combien font 144 ÷ 12 ?",
            answer: "12",
            explanation: "144 ÷ 12 = 12",
          },
          {
            question: "Combien font 89 + 56 ?",
            answer: "145",
            explanation: "89 + 56 = 145",
          },
        ],
      },
    },
    nl: {
      title: "Race Tegen de Klok",
      concept: "Lussen & Timing Mechanica",
      intro: "Beantwoord wiskundige vragen zo snel als je kunt! De klok tikt!",
      code: `# 🏃 RACE TEGEN DE KLOK\n\nfunctie startGame(moeilijkheid):\n  tijdslimiet = getTijdByMoeilijkheid(moeilijkheid)  # 10s, 7s, of 5s\n  score = 0\n  vraagIndex = 0\n  \n  terwijl vraagIndex < totaalVragen:\n    huidigeVraag = getRandomVraag()\n    tijdOver = tijdslimiet\n    \n    # 🔄 TIMER LUSSEN\n    terwijl tijdOver > 0:\n      toonVraag(huidigeVraag)\n      toonTijd(tijdOver)\n      \n      als gebruikerStudieertAntwoord():\n        als antwoordIsCorrect(gebruikerAntwoord, huidigeVraag):\n          # ✓ Punten gebaseerd op resterende tijd\n          score += tijdOver * 10\n          feedback = "Correct!"\n        anders:\n          feedback = "Incorrect!"\n        break  # Ga naar volgende vraag\n      \n      tijdOver -= 1\n      sleep(1 seconde)\n    \n    # ⏰ Timeout afhandelen\n    als tijdOver == 0:\n      feedback = "Tijd om!"\n    \n    vraagIndex += 1\n  \n  return toonEindScore(score)`,
      start: "Start Race",
      chooseDifficulty: "Selecteer Moeilijkheid",
      answerPlaceholder: "Jouw antwoord...",
      easy: "Gemakkelijk (10s)",
      medium: "Gemiddeld (7s)",
      hard: "Moeilijk (5s)",
      question: "Vraag",
      timeLeft: "Resterende Tijd",
      score: "Score",
      submit: "Antwoord Indienen",
      correct: "✓ Correct!",
      incorrect: "✗ Incorrect!",
      timeUp: "⏰ Tijd Is Om!",
      gameOver: "Einde van het Spel!",
      finalScore: "Eindstand",
      restart: "Opnieuw Spelen",
      nextQuestion: "Volgende Vraag",
      finished: "Dit zijn je resultaten 🏃",
      challenges: {
        easy: [
          {
            question: "Hoeveel is 5 + 3?",
            answer: "8",
            explanation: "5 + 3 = 8",
          },
          {
            question: "Hoeveel is 10 - 4?",
            answer: "6",
            explanation: "10 - 4 = 6",
          },
          {
            question: "Hoeveel is 2 × 6?",
            answer: "12",
            explanation: "2 × 6 = 12",
          },
          {
            question: "Hoeveel is 20 ÷ 4?",
            answer: "5",
            explanation: "20 ÷ 4 = 5",
          },
          {
            question: "Hoeveel is 7 + 8?",
            answer: "15",
            explanation: "7 + 8 = 15",
          },
        ],
        medium: [
          {
            question: "Hoeveel is 15 + 27?",
            answer: "42",
            explanation: "15 + 27 = 42",
          },
          {
            question: "Hoeveel is 50 - 18?",
            answer: "32",
            explanation: "50 - 18 = 32",
          },
          {
            question: "Hoeveel is 7 × 8?",
            answer: "56",
            explanation: "7 × 8 = 56",
          },
          {
            question: "Hoeveel is 100 ÷ 5?",
            answer: "20",
            explanation: "100 ÷ 5 = 20",
          },
          {
            question: "Hoeveel is 23 + 19?",
            answer: "42",
            explanation: "23 + 19 = 42",
          },
        ],
        hard: [
          {
            question: "Hoeveel is 47 + 56?",
            answer: "103",
            explanation: "47 + 56 = 103",
          },
          {
            question: "Hoeveel is 92 - 35?",
            answer: "57",
            explanation: "92 - 35 = 57",
          },
          {
            question: "Hoeveel is 12 × 11?",
            answer: "132",
            explanation: "12 × 11 = 132",
          },
          {
            question: "Hoeveel is 144 ÷ 12?",
            answer: "12",
            explanation: "144 ÷ 12 = 12",
          },
          {
            question: "Hoeveel is 89 + 56?",
            answer: "145",
            explanation: "89 + 56 = 145",
          },
        ],
      },
    },
  };

  const t = texts[lang as keyof typeof texts];
  const challenges = t.challenges[gameDifficulty];
  const currentChallenge = challenges[challenge];
  const timeLimit = gameDifficulty === "easy" ? 10 : gameDifficulty === "medium" ? 7 : 5;

  useEffect(() => {
    if (gameState === "playing") {
      if (timeLeft === 0) {
        setFeedback(t.timeUp);
        setTimeout(() => {
          if (challenge + 1 >= challenges.length) {
            setGameState("finished");
          } else {
            setChallenge(challenge + 1);
            setTimeLeft(timeLimit);
            setAnswer("");
            setFeedback("");
          }
        }, 1500);
      } else {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState, timeLeft, challenge, challenges.length, timeLimit, t]);

  const handleSelectDifficulty = (diff: typeof gameDifficulty) => {
    setGameDifficulty(diff);
    setGameState("playing");
    setChallenge(0);
    setScore(0);
    setTimeLeft(timeLimit);
    setAnswer("");
    setFeedback("");
  };

  const handleSubmit = () => {
    if (answer === currentChallenge.answer) {
      setFeedback(t.correct);
      const newScore = score + timeLeft * 10;
      setScore(newScore);
      setTimeout(() => {
        if (challenge + 1 >= challenges.length) {
          setGameState("finished");
        } else {
          setChallenge(challenge + 1);
          setTimeLeft(timeLimit);
          setAnswer("");
          setFeedback("");
        }
      }, 1000);
    } else {
      setFeedback(t.incorrect);
      setAnswer("");
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setChallenge(0);
    setScore(0);
    setTimeLeft(timeLimit);
    setAnswer("");
    setFeedback("");
  };

  return (
    <GameLayout title={t.title} emoji="⏱️" concept={t.concept} intro={t.intro} code={t.code}>
      <div className="max-w-2xl mx-auto">
        {gameState === "start" && (
          <div className="text-center space-y-6">
            <div className="text-6xl">⏱️</div>
            <p className="text-lg font-semibold">{t.chooseDifficulty}:</p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => handleSelectDifficulty("easy")} size="lg" variant="outline">
                {t.easy}
              </Button>
              <Button onClick={() => handleSelectDifficulty("medium")} size="lg" variant="outline">
                {t.medium}
              </Button>
              <Button onClick={() => handleSelectDifficulty("hard")} size="lg" variant="outline">
                {t.hard}
              </Button>
            </div>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{t.question}</p>
                <p className="text-xl font-bold">
                  {challenge + 1} / {challenges.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{t.timeLeft}</p>
                <p
                  className={`text-3xl font-bold ${
                    timeLeft <= 3 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {timeLeft}s
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.score}</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 text-center">
              <p className="text-3xl font-bold">{currentChallenge.question}</p>
            </div>

            <div>
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                className="w-full p-4 rounded-lg border-2 border-border bg-card text-center text-lg font-bold"
                placeholder={t.answerPlaceholder}
                autoFocus
              />
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-lg text-center font-bold ${
                  feedback.includes("✓")
                    ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {feedback}
              </div>
            )}

            <Button onClick={handleSubmit} size="lg" className="w-full">
              {t.submit}
            </Button>
          </div>
        )}

        {gameState === "finished" && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🏃</div>
            <div className="text-3xl font-bold">{t.finished}</div>
            <div className="text-2xl font-bold">
              {t.finalScore}: {score}
            </div>
            <Button onClick={handleRestart} size="lg">
              {t.restart}
            </Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
