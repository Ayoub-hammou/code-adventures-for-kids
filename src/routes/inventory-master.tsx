import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang, pick } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/GameLayout";

export const Route = createFileRoute("/inventory-master")({
  component: InventoryMaster,
});

type Item = "sword" | "shield" | "potion" | "ring" | "book" | "staff";

const ITEMS: Record<Item, { emoji: string; name: { en: string; fr: string; nl: string } }> = {
  sword: {
    emoji: "⚔️",
    name: { en: "Sword", fr: "Épée", nl: "Zwaard" },
  },
  shield: {
    emoji: "🛡️",
    name: { en: "Shield", fr: "Bouclier", nl: "Schild" },
  },
  potion: {
    emoji: "🧪",
    name: { en: "Potion", fr: "Potion", nl: "Trank" },
  },
  ring: {
    emoji: "💍",
    name: { en: "Ring", fr: "Anneau", nl: "Ring" },
  },
  book: {
    emoji: "📖",
    name: { en: "Book", fr: "Livre", nl: "Boek" },
  },
  staff: {
    emoji: "🧙",
    name: { en: "Staff", fr: "Bâton", nl: "Staf" },
  },
};

function InventoryMaster() {
  const { lang } = useLang();
  const [inventory, setInventory] = useState<Item[]>(["sword", "shield"]);
  const [gameState, setGameState] = useState<"start" | "playing" | "complete">("start");
  const [challenge, setChallenge] = useState(0);
  const [feedback, setFeedback] = useState("");

  const texts = {
    en: {
      title: "Inventory Master",
      concept: "Arrays & Lists",
      intro: "Manage your inventory using lists! Add and remove items to complete challenges.",
      code: `# 📚 LIST MANAGEMENT\n\n# Start with initial items\ninventory = ["sword", "shield"]\nprint("Start:", inventory)\n\n# Challenge 1: Add the potion\ninventory.append("potion")\nprint("After adding potion:", inventory)\n\n# Challenge 2: Remove the shield\ninventory.remove("shield")\nprint("After removing shield:", inventory)\n\n# Challenge 3: Add ring and staff\ninventory.append("ring")\ninventory.append("staff")\nprint("After adding ring & staff:", inventory)\n\n# Challenge 4: Remove the sword\ninventory.remove("sword")\nprint("Final inventory:", inventory)`,
      start: "Start Adventure",
      currentInventory: "Current Inventory",
      challenge: "Challenge",
      addItem: "Add Item",
      removeItem: "Remove Item",
      complete: "✨ Challenge Complete!",
      incorrect: "That's not quite right!",
      done: "All Challenges Complete!",
      youWon: "You're an Inventory Master! 🎉",
      restart: "Start Over",
      challenges: [
        {
          instruction: "Add the POTION to your inventory",
          test: (inv: Item[]) => inv.includes("potion") && inv.length === 3,
        },
        {
          instruction: "Remove the SHIELD from your inventory",
          test: (inv: Item[]) => !inv.includes("shield") && inv.length === 2,
        },
        {
          instruction: "Add the RING and the STAFF",
          test: (inv: Item[]) => inv.includes("ring") && inv.includes("staff") && inv.length === 4,
        },
        {
          instruction: "Remove the SWORD",
          test: (inv: Item[]) => !inv.includes("sword") && inv.length === 3,
        },
      ],
    },
    fr: {
      title: "Maître de l'Inventaire",
      concept: "Tableaux & Listes",
      intro:
        "Gère ton inventaire en utilisant des listes ! Ajoute et supprime des objets pour compléter les défis.",
      code: `# 📚 GESTION DE LISTES\n\n# Débuta avec des éléments initiaux\ninventaire = ["épée", "bouclier"]\nafficher("Début:", inventaire)\n\n# Défi 1: Ajouter la potion\ninventaire.append("potion")\nafficher("Après ajout potion:", inventaire)\n\n# Défi 2: Supprimer le bouclier\ninventaire.remove("bouclier")\nafficher("Après suppression bouclier:", inventaire)\n\n# Défi 3: Ajouter anneau et bâton\ninventaire.append("anneau")\ninventaire.append("bâton")\nafficher("Après ajout anneau & bâton:", inventaire)\n\n# Défi 4: Supprimer l'épée\ninventaire.remove("épée")\nafficher("Inventaire final:", inventaire)`,
      start: "Commencer",
      currentInventory: "Inventaire Actuel",
      challenge: "Défi",
      addItem: "Ajouter un Objet",
      removeItem: "Supprimer un Objet",
      complete: "✨ Défi Complété !",
      incorrect: "Ce n'est pas tout à fait correct !",
      done: "Tous les Défis Complétés !",
      youWon: "Tu es un Maître de l'Inventaire ! 🎉",
      restart: "Recommencer",
      challenges: [
        {
          instruction: "Ajoute la POTION à ton inventaire",
          test: (inv: Item[]) => inv.includes("potion") && inv.length === 3,
        },
        {
          instruction: "Supprime le BOUCLIER de ton inventaire",
          test: (inv: Item[]) => !inv.includes("shield") && inv.length === 2,
        },
        {
          instruction: "Ajoute l'ANNEAU et le BÂTON",
          test: (inv: Item[]) => inv.includes("ring") && inv.includes("staff") && inv.length === 4,
        },
        {
          instruction: "Supprime l'ÉPÉE",
          test: (inv: Item[]) => !inv.includes("sword") && inv.length === 3,
        },
      ],
    },
    nl: {
      title: "Inventarisgoeroe",
      concept: "Arrays & Lijsten",
      intro:
        "Beheer je inventaris met behulp van lijsten! Voeg items toe en verwijder deze om uitdagingen te voltooien.",
      code: `# 📚 LIJSTBEHEER\n\n# Begin met eerste items\ninventaris = ["zwaard", "schild"]\nafdrukken("Start:", inventaris)\n\n# Uitdaging 1: Voeg trank toe\ninventaris.append("trank")\nafdrukken("Na toevoegen trank:", inventaris)\n\n# Uitdaging 2: Verwijder schild\ninventaris.remove("schild")\nafdrukken("Na verwijderen schild:", inventaris)\n\n# Uitdaging 3: Voeg ring en staf toe\ninventaris.append("ring")\ninventaris.append("staf")\nafdrukken("Na toevoegen ring & staf:", inventaris)\n\n# Uitdaging 4: Verwijder zwaard\ninventaris.remove("zwaard")\nafdrukken("Eindige inventaris:", inventaris)`,
      start: "Start",
      currentInventory: "Huidig Inventaris",
      challenge: "Uitdaging",
      addItem: "Item Toevoegen",
      removeItem: "Item Verwijderen",
      complete: "✨ Uitdaging Voltooid!",
      incorrect: "Dat klopt nog niet helemaal!",
      done: "Alle Uitdagingen Voltooid!",
      youWon: "Je bent een Inventarisgoeroe! 🎉",
      restart: "Opnieuw Starten",
      challenges: [
        {
          instruction: "Voeg de TRANK toe aan je inventaris",
          test: (inv: Item[]) => inv.includes("potion") && inv.length === 3,
        },
        {
          instruction: "Verwijder het SCHILD uit je inventaris",
          test: (inv: Item[]) => !inv.includes("shield") && inv.length === 2,
        },
        {
          instruction: "Voeg de RING en de STAF toe",
          test: (inv: Item[]) => inv.includes("ring") && inv.includes("staff") && inv.length === 4,
        },
        {
          instruction: "Verwijder het ZWAARD",
          test: (inv: Item[]) => !inv.includes("sword") && inv.length === 3,
        },
      ],
    },
  };

  const t = texts[lang as keyof typeof texts];
  const currentChallenge = t.challenges[challenge];

  const handleStart = () => {
    setGameState("playing");
    setFeedback("");
  };

  const handleAddItem = (item: Item) => {
    if (!inventory.includes(item)) {
      const newInventory = [...inventory, item];
      setInventory(newInventory);
      checkChallenge(newInventory);
    }
  };

  const handleRemoveItem = (item: Item) => {
    const newInventory = inventory.filter((i) => i !== item);
    setInventory(newInventory);
    checkChallenge(newInventory);
  };

  const checkChallenge = (inv: Item[]) => {
    if (currentChallenge.test(inv)) {
      setFeedback(t.complete);
      if (challenge + 1 >= t.challenges.length) {
        setTimeout(() => setGameState("complete"), 1500);
      } else {
        setTimeout(() => {
          setChallenge(challenge + 1);
          setFeedback("");
        }, 1500);
      }
    }
  };

  const handleRestart = () => {
    setInventory(["sword", "shield"]);
    setChallenge(0);
    setFeedback("");
    setGameState("start");
  };

  const allItems = Object.keys(ITEMS) as Item[];

  return (
    <GameLayout title={t.title} emoji="📚" concept={t.concept} intro={t.intro} code={t.code}>
      <div className="space-y-6">
        {gameState === "start" && (
          <div className="text-center space-y-4">
            <div className="text-6xl">📚</div>
            <Button onClick={handleStart} size="lg">
              {t.start}
            </Button>
          </div>
        )}

        {gameState === "playing" && (
          <>
            <div>
              <p className="text-sm text-muted-foreground">{t.challenge}</p>
              <p className="text-xl font-bold">
                {challenge + 1} / {t.challenges.length}
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-6">
              <p className="text-lg font-semibold text-center">{currentChallenge.instruction}</p>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-6">
              <p className="text-sm font-semibold mb-3">{t.currentInventory}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {inventory.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg"
                  >
                    <span className="text-2xl">{ITEMS[item].emoji}</span>
                    <span className="font-semibold">{pick(lang, ITEMS[item].name) as string}</span>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="ml-2 text-red-500 font-bold hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-6">
              <p className="text-sm font-semibold mb-3">{t.addItem}</p>
              <div className="grid grid-cols-3 gap-2">
                {allItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleAddItem(item)}
                    disabled={inventory.includes(item)}
                    className="p-3 rounded-lg border-2 border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-3xl mb-1">{ITEMS[item].emoji}</div>
                    <div className="text-xs font-semibold">{pick(lang, ITEMS[item].name)}</div>
                  </button>
                ))}
              </div>
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-lg text-center font-bold ${
                  feedback.includes("Complete")
                    ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {feedback}
              </div>
            )}
          </>
        )}

        {gameState === "complete" && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
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
