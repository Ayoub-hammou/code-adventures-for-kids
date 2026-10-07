import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLang, useUI, pick } from "@/lib/i18n";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/ai-trainer")({ component: AITrainerPage });

type TrainingExample = {
  input: number;
  output: number;
};

type PredictionState = "idle" | "correct" | "incorrect";

const T = {
  title: { en: "AI Trainer", fr: "Entraîneur IA", nl: "AI Trainer" },
  concept: {
    en: "AI & Learning",
    fr: "IA & Apprentissage",
    nl: "AI & Leren",
  },
  intro: {
    en: "Teach an AI to recognize a pattern! Think of a simple rule (like: multiply by 2, add 5, or square the number), and give the AI examples. Can it learn your pattern?",
    fr: "Enseigne à une IA à reconnaître un motif ! Pense à une règle simple (comme : multiplier par 2, ajouter 5, ou mettre au carré le nombre), et donne des exemples à l'IA. Peut-elle apprendre ton motif ?",
    nl: "Leer een AI een patroon te herkennen! Denk aan een eenvoudige regel (zoals: vermenigvuldigen met 2, 5 optellen, of het getal kwadrateren), en geef de AI voorbeelden. Kan het het patroon leren?",
  },
  code: {
    en: `# AI Learning Process
# 1. You provide examples (input, output)
# 2. AI tries to find the pattern
# 3. AI makes predictions

examples = [
  (1, 3),    # Your rule: add 2
  (2, 4),
  (3, 5),
]

# AI learns: output = input + 2
ai_prediction = 4 + 2  # = 6 ✓`,
    fr: `# Processus d'apprentissage IA
# 1. Tu fournis des exemples (entrée, sortie)
# 2. L'IA essaie de trouver le motif
# 3. L'IA fait des prédictions

exemples = [
  (1, 3),    # Ta règle : ajouter 2
  (2, 4),
  (3, 5),
]

# L'IA apprend : sortie = entrée + 2
prediction_ia = 4 + 2  # = 6 ✓`,
    nl: `# AI Leerproces
# 1. Je geeft voorbeelden (invoer, uitvoer)
# 2. AI probeert het patroon te vinden
# 3. AI doet voorspellingen

voorbeelden = [
  (1, 3),    # Jouw regel: 2 optellen
  (2, 4),
  (3, 5),
]

# AI leert: uitvoer = invoer + 2
ai_voorspelling = 4 + 2  # = 6 ✓`,
  },
  stepTitle: { en: "Step", fr: "Étape", nl: "Stap" },
  step1: { en: "Train the AI", fr: "Former l'IA", nl: "Train de AI" },
  step2: { en: "Test the AI", fr: "Tester l'IA", nl: "Test de AI" },
  inputPlaceholder: { en: "Enter input number...", fr: "Entrez le nombre d'entrée...", nl: "Voer invoergetal in..." },
  outputPlaceholder: { en: "Enter output number...", fr: "Entrez le nombre de sortie...", nl: "Voer uitvoergetal in..." },
  addExample: { en: "+ Add Example", fr: "+ Ajouter un exemple", nl: "+ Voorbeeld toevoegen" },
  examples: { en: "Training Examples", fr: "Exemples d'entraînement", nl: "Trainingsvoorbeelden" },
  trainedOnCount: { en: "AI trained on", fr: "IA entraînée sur", nl: "AI getraind op" },
  examples_count: { en: "examples", fr: "exemples", nl: "voorbeelden" },
  testNumber: { en: "Test Number", fr: "Numéro de test", nl: "Testnummer" },
  aiGuesses: { en: "AI guesses:", fr: "L'IA devine :", nl: "AI raadt:" },
  youSay: { en: "You say it should be:", fr: "Vous dites que ça devrait être :", nl: "Jij zegt dat het zou moeten zijn:" },
  correct: { en: "✓ Correct! AI learned!", fr: "✓ Correct ! L'IA a appris !", nl: "✓ Juist! AI heeft geleerd!" },
  incorrect: { en: "✗ Not quite. AI is still learning!", fr: "✗ Pas tout à fait. L'IA apprend encore !", nl: "✗ Niet helemaal. AI leert nog!" },
  needMoreExamples: { en: "Give me more examples to learn!", fr: "Donne-moi plus d'exemples pour apprendre !", nl: "Geef me meer voorbeelden om te leren!" },
  patterns: { en: "Try these patterns:", fr: "Essayez ces motifs :", nl: "Probeer deze patronen:" },
  multiply2: { en: "Multiply by 2", fr: "Multiplier par 2", nl: "Vermenigvuldigen met 2" },
  add5: { en: "Add 5", fr: "Ajouter 5", nl: "5 optellen" },
  square: { en: "Square the number", fr: "Mettre au carré", nl: "Getal kwadrateren" },
  double_plus_one: { en: "Double + 1", fr: "Double + 1", nl: "Dubbel + 1" },
  reset: { en: "↺ Reset", fr: "↺ Réinitialiser", nl: "↺ Reset" },
};

function AITrainerPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T) => pick(lang, T[k] as Parameters<typeof pick>[1]) as string;
  const ui = useUI();

  const [examples, setExamples] = useState<TrainingExample[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [testNumber, setTestNumber] = useState("");
  const [aiPrediction, setAiPrediction] = useState<number | null>(null);
  const [predictionState, setPredictionState] = useState<PredictionState>("idle");

  const guessPattern = (newExamples: TrainingExample[]): number | null => {
    if (newExamples.length < 2) return null;

    // Try to find a linear pattern: output = a * input + b
    const x1 = newExamples[0].input;
    const y1 = newExamples[0].output;
    const x2 = newExamples[1].input;
    const y2 = newExamples[1].output;

    if (x1 === x2) return null; // Can't determine pattern

    const a = (y2 - y1) / (x2 - x1);
    const b = y1 - a * x1;

    // Verify pattern holds for all examples
    const patternWorks = newExamples.every((ex) => {
      const expected = a * ex.input + b;
      return Math.abs(expected - ex.output) < 0.0001;
    });

    if (!patternWorks) return null;

    // Pattern found! Make prediction
    return a * parseFloat(testNumber) + b;
  };

  const handleAddExample = () => {
    if (inputValue === "" || outputValue === "") return;

    const newExample: TrainingExample = {
      input: parseFloat(inputValue),
      output: parseFloat(outputValue),
    };

    const newExamples = [...examples, newExample];
    setExamples(newExamples);
    setInputValue("");
    setOutputValue("");

    // Try to make a prediction if we have enough examples
    if (testNumber && newExamples.length >= 2) {
      const prediction = guessPattern(newExamples);
      if (prediction !== null) {
        setAiPrediction(Math.round(prediction * 10) / 10);
      }
    }
  };

  const handleTest = () => {
    if (!testNumber) return;
    if (examples.length < 2) {
      setPredictionState("idle");
      return;
    }

    const prediction = guessPattern(examples);
    if (prediction !== null) {
      setAiPrediction(Math.round(prediction * 10) / 10);
    }
  };

  const handleSubmitAnswer = (correct: boolean) => {
    setPredictionState(correct ? "correct" : "incorrect");
  };

  const handleReset = () => {
    setExamples([]);
    setInputValue("");
    setOutputValue("");
    setTestNumber("");
    setAiPrediction(null);
    setPredictionState("idle");
  };

  const setPattern = (pattern: string) => {
    handleReset();
    // Give the AI examples based on the pattern
    let newExamples: TrainingExample[] = [];

    switch (pattern) {
      case "multiply2":
        newExamples = [
          { input: 1, output: 2 },
          { input: 2, output: 4 },
          { input: 3, output: 6 },
        ];
        break;
      case "add5":
        newExamples = [
          { input: 1, output: 6 },
          { input: 2, output: 7 },
          { input: 3, output: 8 },
        ];
        break;
      case "square":
        newExamples = [
          { input: 1, output: 1 },
          { input: 2, output: 4 },
          { input: 3, output: 9 },
        ];
        break;
      case "double_plus_one":
        newExamples = [
          { input: 1, output: 3 },
          { input: 2, output: 5 },
          { input: 3, output: 7 },
        ];
        break;
    }

    setExamples(newExamples);
  };

  return (
    <GameLayout
      title={t("title")}
      emoji="🤖"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="space-y-6">
        {/* Training Phase */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
          <h3 className="text-lg font-bold mb-4 text-blue-900">
            🎓 {t("stepTitle")} 1: {t("step1")}
          </h3>

          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("inputPlaceholder")}
                className="px-3 py-2 border rounded-lg bg-white"
              />
              <input
                type="number"
                value={outputValue}
                onChange={(e) => setOutputValue(e.target.value)}
                placeholder={t("outputPlaceholder")}
                className="px-3 py-2 border rounded-lg bg-white"
              />
            </div>
            <button
              onClick={handleAddExample}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
            >
              {t("addExample")}
            </button>
          </div>

          {examples.length > 0 && (
            <div className="bg-white rounded-lg p-3 mb-4">
              <div className="text-sm font-bold text-gray-700 mb-2">{t("examples")}:</div>
              <div className="space-y-1">
                {examples.map((ex, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    {ex.input} → {ex.output}
                  </div>
                ))}
              </div>
              <div className="text-xs text-blue-600 mt-2 font-bold">
                {t("trainedOnCount")} {examples.length} {t("examples_count")}
              </div>
            </div>
          )}

          {examples.length === 0 && (
            <div className="bg-white rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-600 mb-3">{t("patterns")}:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPattern("multiply2")}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition"
                >
                  ×2
                </button>
                <button
                  onClick={() => setPattern("add5")}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition"
                >
                  +5
                </button>
                <button
                  onClick={() => setPattern("square")}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition"
                >
                  ²
                </button>
                <button
                  onClick={() => setPattern("double_plus_one")}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition"
                >
                  ×2+1
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Testing Phase */}
        {examples.length >= 2 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
            <h3 className="text-lg font-bold mb-4 text-green-900">
              ✅ {t("stepTitle")} 2: {t("step2")}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("testNumber")}:
                </label>
                <input
                  type="number"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  placeholder="5"
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                />
              </div>
              <button
                onClick={handleTest}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition"
              >
                {t("aiGuesses")}
              </button>

              {aiPrediction !== null && (
                <div className="bg-white rounded-lg p-4">
                  <div className="text-lg font-bold text-green-600 mb-3">
                    AI: {aiPrediction}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmitAnswer(true)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition"
                    >
                      ✓ {ui.correct || "Correct"}
                    </button>
                    <button
                      onClick={() => handleSubmitAnswer(false)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition"
                    >
                      ✗ {ui.incorrect || "Wrong"}
                    </button>
                  </div>

                  {predictionState && (
                    <div
                      className={`mt-3 p-3 rounded-lg text-center font-bold ${
                        predictionState === "correct"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {predictionState === "correct"
                        ? t("correct")
                        : predictionState === "incorrect"
                          ? t("incorrect")
                          : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {examples.length > 0 && examples.length < 2 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-center text-sm text-yellow-700 font-bold">
            {t("needMoreExamples")}
          </div>
        )}

        {/* Reset Button */}
        {examples.length > 0 && (
          <button
            onClick={handleReset}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-lg transition"
          >
            {t("reset")}
          </button>
        )}
      </div>
    </GameLayout>
  );
}

