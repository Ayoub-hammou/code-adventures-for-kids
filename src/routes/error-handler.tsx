import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/error-handler")({
  component: ErrorHandlerPage,
});

const T = {
  title: {
    en: "Error Handler Workshop",
    fr: "Atelier Gestion des Erreurs",
    nl: "Foutafhandelings Workshop",
  },
  concept: {
    en: "Error Handling & Validation",
    fr: "Gestion des erreurs et validation",
    nl: "Foutafhandeling en validatie",
  },
  intro: {
    en: "Build a robot OR fill a form! Learn how to catch bad input before it breaks everything. Switch between workshops to see different error handling scenarios.",
    fr: "Construis un robot OU remplis un formulaire ! Apprends à attraper les mauvaises entrées avant qu'elles cassent tout. Bascule entre les ateliers pour voir différents scénarios.",
    nl: "Bouw een robot OF vul een formulier in! Leer hoe je slechte invoer kunt onderscheppen voordat het alles breekt. Schakel tussen workshops om verschillende foutenafhandelings-scenario's te zien.",
  },
  robotTab: { en: "🤖 Robot Factory", fr: "🤖 Usine Robots", nl: "🤖 Robot Fabriek" },
  formTab: {
    en: "📋 Data Validator",
    fr: "📋 Validateur de Données",
    nl: "📋 Data Validator",
  },

  // Robot Factory
  robotTitle: {
    en: "🤖 Robot Factory",
    fr: "🤖 Usine Robots",
    nl: "🤖 Robot Fabriek",
  },
  robotIntro: {
    en: "Give commands to your robot! Commands must be in the format: DIRECTION DISTANCE (e.g., 'forward 5', 'left 3', 'backward 10'). Bad input will make the robot malfunction!",
    fr: "Donne des commandes à ton robot ! Les commandes doivent être au format : DIRECTION DISTANCE (ex : « avant 5 », « gauche 3 », « arrière 10 »). Les mauvaises entrées vont faire dysfonctionner le robot !",
    nl: "Geef opdrachten aan je robot! Opdrachten moeten in het formaat zijn: RICHTING AFSTAND (bijv. 'forward 5', 'left 3', 'backward 10'). Slechte invoer zal de robot defect maken!",
  },
  robotCommand: {
    en: "Robot command",
    fr: "Commande du robot",
    nl: "Robotcommando",
  },
  robotExecute: {
    en: "Execute command",
    fr: "Exécuter la commande",
    nl: "Voer commando uit",
  },
  robotClear: {
    en: "↺ Reset robot",
    fr: "↺ Réinitialiser le robot",
    nl: "↺ Reset robot",
  },
  robotStatus: {
    en: "Robot Status",
    fr: "État du robot",
    nl: "Robotstatus",
  },
  robotHealthy: { en: "✅ OK", fr: "✅ OK", nl: "✅ OK" },
  robotBroken: {
    en: "💥 Error!",
    fr: "💥 Erreur!",
    nl: "💥 Fout!",
  },
  robotPosition: { en: "Position", fr: "Position", nl: "Positie" },
  robotEnergy: { en: "Energy", fr: "Énergie", nl: "Energie" },
  robotErrorInvalidFormat: {
    en: "❗ Invalid format! Use: DIRECTION DISTANCE (e.g., 'forward 5')",
    fr: "❗ Format invalide ! Utilise : DIRECTION DISTANCE (ex : « avant 5 »)",
    nl: "❗ Ongeldig formaat! Gebruik: RICHTING AFSTAND (bijv. 'forward 5')",
  },
  robotErrorBadDirection: {
    en: "❗ Unknown direction! Try: up, down, left, right",
    fr: "❗ Direction inconnue ! Essaie : haut, bas, gauche, droite",
    nl: "❗ Onbekende richting! Probeer: up, down, left, right",
  },
  robotErrorBadDistance: {
    en: "❗ Distance must be a NUMBER!",
    fr: "❗ La distance doit être un NOMBRE !",
    nl: "❗ Afstand moet een GETAL zijn!",
  },
  robotErrorTooFar: {
    en: "❗ Distance too far! Maximum 20 steps.",
    fr: "❗ Distance trop lointaine ! Maximum 20 pas.",
    nl: "❗ Afstand te ver! Maximaal 20 stappen.",
  },
  robotErrorCollision: {
    en: "💥 COLLISION! Robot hit the wall! Distance too large for this direction.",
    fr: "💥 COLLISION ! Le robot s'est cogné contre le mur ! Distance trop grande.",
    nl: "💥 BOTSING! Robot is tegen de muur gebotst! Afstand te groot.",
  },
  robotErrorNoEnergy: {
    en: "❗ Robot out of energy! Cannot move.",
    fr: "❗ Le robot n'a plus d'énergie ! Impossible de bouger.",
    nl: "❗ Robot zonder energie! Kan niet bewegen.",
  },
  robotSuccess: {
    en: "✅ Command executed! Moving {{direction}} {{distance}} steps.",
    fr: "✅ Commande exécutée ! Déplacement {{direction}} {{distance}} pas.",
    nl: "✅ Commando uitgevoerd! Beweging {{direction}} {{distance}} stappen.",
  },

  // Data Validator
  formTitle: {
    en: "📋 Data Validator",
    fr: "📋 Validateur de Données",
    nl: "📋 Data Validator",
  },
  formIntro: {
    en: "Fill out a profile form! The program validates each field. Try breaking it by entering invalid data.",
    fr: "Remplis un formulaire de profil ! Le programme valide chaque champ. Essaie de le casser en entrant des données invalides.",
    nl: "Vul een profielformulier in! Het programma valideert elk veld. Probeer het te breken door ongeldige gegevens in te voeren.",
  },
  formName: { en: "Name", fr: "Nom", nl: "Naam" },
  formAge: { en: "Age", fr: "Âge", nl: "Leeftijd" },
  formEmail: { en: "Email", fr: "E-mail", nl: "E-mailadres" },
  formPassword: { en: "Password", fr: "Mot de passe", nl: "Wachtwoord" },
  formPasswordConfirm: {
    en: "Confirm Password",
    fr: "Confirmer le mot de passe",
    nl: "Wachtwoord bevestigen",
  },
  formSubmit: { en: "Submit form", fr: "Soumettre", nl: "Indienen" },
  formReset: {
    en: "↺ Clear form",
    fr: "↺ Effacer le formulaire",
    nl: "↺ Formulier wissen",
  },

  formErrorNameEmpty: {
    en: "❗ Name cannot be empty!",
    fr: "❗ Le nom ne peut pas être vide !",
    nl: "❗ Naam kan niet leeg zijn!",
  },
  formErrorNameTooShort: {
    en: "❗ Name must be at least 2 characters!",
    fr: "❗ Le nom doit contenir au moins 2 caractères !",
    nl: "❗ Naam moet minstens 2 karakters bevatten!",
  },
  formErrorNameTooLong: {
    en: "❗ Name cannot exceed 50 characters!",
    fr: "❗ Le nom ne peut pas dépasser 50 caractères !",
    nl: "❗ Naam mag niet meer dan 50 karakters bevatten!",
  },
  formErrorAgeEmpty: {
    en: "❗ Age cannot be empty!",
    fr: "❗ L'âge ne peut pas être vide !",
    nl: "❗ Leeftijd kan niet leeg zijn!",
  },
  formErrorAgeNotNumber: {
    en: "❗ Age must be a NUMBER!",
    fr: "❗ L'âge doit être un NOMBRE !",
    nl: "❗ Leeftijd moet een GETAL zijn!",
  },
  formErrorAgeRange: {
    en: "❗ Age must be between 5 and 120!",
    fr: "❗ L'âge doit être entre 5 et 120 !",
    nl: "❗ Leeftijd moet tussen 5 en 120 liggen!",
  },
  formErrorEmailEmpty: {
    en: "❗ Email cannot be empty!",
    fr: "❗ L'e-mail ne peut pas être vide !",
    nl: "❗ E-mailadres kan niet leeg zijn!",
  },
  formErrorEmailInvalid: {
    en: "❗ Email must contain @ and a domain!",
    fr: "❗ L'e-mail doit contenir @ et un domaine !",
    nl: "❗ E-mailadres moet @ en een domein bevatten!",
  },
  formErrorPasswordEmpty: {
    en: "❗ Password cannot be empty!",
    fr: "❗ Le mot de passe ne peut pas être vide !",
    nl: "❗ Wachtwoord kan niet leeg zijn!",
  },
  formErrorPasswordTooShort: {
    en: "❗ Password must be at least 6 characters!",
    fr: "❗ Le mot de passe doit contenir au moins 6 caractères !",
    nl: "❗ Wachtwoord moet minstens 6 karakters bevatten!",
  },
  formErrorPasswordMatch: {
    en: "❗ Passwords do not match!",
    fr: "❗ Les mots de passe ne correspondent pas !",
    nl: "❗ Wachtwoorden komen niet overeen!",
  },
  formSuccess: {
    en: "✅ Profile created successfully! All validations passed.",
    fr: "✅ Profil créé avec succès ! Toutes les validations ont réussi.",
    nl: "✅ Profiel succesvol aangemaakt! Alle validaties geslaagd.",
  },

  code: {
    en: `# Error Handling Pattern
def validate_robot_command(input):
  try:
    parts = input.split()
    if len(parts) != 2:
      raise ValueError("Need DIRECTION and DISTANCE")
    
    direction = parts[0].lower()
    distance = int(parts[1])
    
    if direction not in ['forward', 'backward', 'left', 'right']:
      raise ValueError(f"Unknown direction: {direction}")
    
    if distance < 1 or distance > 20:
      raise ValueError("Distance must be 1-20")
    
    return execute_movement(direction, distance)
  
  except ValueError as e:
    return f"ERROR: {e}"

# Validation Pattern
def validate_email(email):
  if '@' not in email or '.' not in email:
    raise ValueError("Invalid email format")
  return True`,
    fr: `# Motif de Gestion des Erreurs
def valider_commande_robot(entree):
  essayer:
    parties = entree.scinder()
    si len(parties) != 2:
      lever ValueError("Besoin DIRECTION et DISTANCE")
    
    direction = parties[0].minuscule()
    distance = entier(parties[1])
    
    si direction pas dans ['avant', 'arrière', 'gauche', 'droite']:
      lever ValueError(f"Direction inconnue: {direction}")
    
    si distance < 1 ou distance > 20:
      lever ValueError("Distance doit être 1-20")
    
    retourner executer_mouvement(direction, distance)
  
  attraper ValueError e:
    retourner f"ERREUR: {e}"

# Motif de Validation
def valider_email(email):
  si '@' pas dans email ou '.' pas dans email:
    lever ValueError("Format d'email invalide")
  retourner Vrai`,
    nl: `# Foutafhandelings Patroon
def valideer_robotcommando(invoer):
  probeer:
    delen = invoer.splitsen()
    als len(delen) != 2:
      werp ValueError("Nodig RICHTING en AFSTAND")
    
    richting = delen[0].kleine()
    afstand = getal(delen[1])
    
    als richting niet in ['forward', 'backward', 'left', 'right']:
      werp ValueError(f"Onbekende richting: {richting}")
    
    als afstand < 1 of afstand > 20:
      werp ValueError("Afstand moet 1-20 zijn")
    
    geef terug voer_beweging_uit(richting, afstand)
  
  vang ValueError e op:
    geef terug f"FOUT: {e}"

# Validatie Patroon
def valideer_email(email):
  als '@' niet in email of '.' niet in email:
    werp ValueError("Ongeldig e-mailadres")
  geef terug Waar`,
  },
};

function ErrorHandlerPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T) => pick(lang, T[k]);
  const [activeTab, setActiveTab] = useState<"robot" | "form">("robot");

  return (
    <GameLayout
      title={t("title")}
      emoji="🛡️"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("robot")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            activeTab === "robot"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-card border-2 border-border hover:border-primary/50"
          }`}
        >
          {t("robotTab")}
        </button>
        <button
          onClick={() => setActiveTab("form")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            activeTab === "form"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-card border-2 border-border hover:border-primary/50"
          }`}
        >
          {t("formTab")}
        </button>
      </div>

      {activeTab === "robot" && <RobotFactory lang={lang} />}
      {activeTab === "form" && <DataValidator lang={lang} />}
    </GameLayout>
  );
}

function RobotFactory({ lang }: { lang: "en" | "fr" | "nl" }) {
  const t = (k: keyof typeof T) => pick(lang, T[k]);
  const [command, setCommand] = useState("");
  const [broken, setBroken] = useState(false);
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [energy, setEnergy] = useState(100);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  // Direction mappings for different languages
  // Helper to normalize direction input based on language
  function normalizeDirection(input: string): string | null {
    const normalized = input.toLowerCase();
    const directionMap: { [key: string]: string } = {
      // English
      up: "up",
      down: "down",
      left: "left",
      right: "right",
      // French
      haut: "up",
      bas: "down",
      gauche: "left",
      droite: "right",
      // Dutch
    };
    return directionMap[normalized] || null;
  }

  // Helper to check if movement would go out of bounds
  function checkCollision(
    direction: string,
    distance: number,
    currentX: number,
    currentY: number,
  ): { safe: boolean; newX: number; newY: number } {
    let newX = currentX;
    let newY = currentY;

    if (direction === "up") {
      newY = currentY + distance;
    } else if (direction === "down") {
      newY = currentY - distance;
    } else if (direction === "left") {
      newX = currentX - distance;
    } else if (direction === "right") {
      newX = currentX + distance;
    }

    // Check boundaries (1-10)
    const safe = newX >= 1 && newX <= 10 && newY >= 1 && newY <= 10;

    return { safe, newX, newY };
  }

  function executeCommand() {
    const trimmed = command.trim();

    // Validation 1: Empty
    if (!trimmed) {
      setMessage({ type: "error", text: t("robotCommand") });
      return;
    }

    const parts = trimmed.split(" ");

    // Validation 2: Format
    if (parts.length !== 2) {
      setMessage({ type: "error", text: t("robotErrorInvalidFormat") });
      setBroken(true);
      return;
    }

    const directionInput = parts[0].toLowerCase();
    const distanceStr = parts[1];

    // Validation 3: Direction (with language support)
    const direction = normalizeDirection(directionInput);
    if (!direction) {
      setMessage({ type: "error", text: t("robotErrorBadDirection") });
      setBroken(true);
      return;
    }

    // Validation 4: Distance is a number
    const distance = Number(distanceStr);
    if (isNaN(distance)) {
      setMessage({ type: "error", text: t("robotErrorBadDistance") });
      setBroken(true);
      return;
    }

    // Validation 5: Distance range
    if (distance < 1 || distance > 20) {
      setMessage({ type: "error", text: t("robotErrorTooFar") });
      setBroken(true);
      return;
    }

    // Validation 6: Check energy
    const energyNeeded = distance * 5;
    if (energy - energyNeeded < 0) {
      setMessage({ type: "error", text: t("robotErrorNoEnergy") });
      setBroken(true);
      return;
    }

    // Validation 7: Check collision (NEW!)
    const collision = checkCollision(direction, distance, position.x, position.y);
    if (!collision.safe) {
      setMessage({ type: "error", text: t("robotErrorCollision") });
      // Do NOT set broken=true - robot didn't actually crash, just prevented from crashing
      return;
    }

    // Success!
    setPosition({ x: collision.newX, y: collision.newY });
    setEnergy(Math.max(0, energy - energyNeeded));

    const successMsg = t("robotSuccess")
      .replace("{{direction}}", direction)
      .replace("{{distance}}", String(distance));

    setMessage({ type: "success", text: successMsg });
    setHistory([...history, `${directionInput} ${distance}`]);
    setCommand("");
  }

  function reset() {
    setPosition({ x: 5, y: 5 });
    setEnergy(100);
    setBroken(false);
    setMessage(null);
    setHistory([]);
    setCommand("");
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="p-3 sm:p-4 rounded-xl border-2 border-border bg-secondary text-xs sm:text-sm">
        {lang === "fr"
          ? "Donne des commandes à ton robot ! Les commandes doivent être au format : DIRECTION DISTANCE. Directions valides : haut, bas, gauche, droite (ex : « haut 5 », « gauche 3 », « bas 10 »). Le robot doit rester dans la zone 1-10 sinon il s'écrase !"
          : lang === "nl"
            ? "Geef opdrachten aan je robot! Opdrachten moeten in het formaat zijn: RICHTING AFSTAND. Geldige richtingen: up, down, left, right. De robot moet binnen de 1-10 zone blijven of het zal crashen!"
            : "Give commands to your robot! Commands must be in the format: DIRECTION DISTANCE. Valid directions: up, down, left, right (e.g., 'up 5', 'left 3', 'down 10'). The robot must stay within the 1-10 zone or it will crash!"}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main command and grid area */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <label className="block text-xs font-bold mb-2 text-muted-foreground uppercase">
            {t("robotCommand")}
          </label>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeCommand()}
              placeholder={
                lang === "fr" ? "ex: haut 5" : lang === "nl" ? "bijv. up 5" : "e.g., up 5"
              }
              className="flex-1 rounded-xl border-2 border-border bg-input px-3 sm:px-4 h-10 sm:h-12 text-base sm:text-lg font-mono focus:outline-none focus:border-primary"
            />
            <button
              onClick={executeCommand}
              className="rounded-xl bg-primary text-primary-foreground px-4 sm:px-6 h-10 sm:h-12 font-bold hover:scale-105 transition whitespace-nowrap"
            >
              {t("robotExecute")}
            </button>
          </div>

          {message && (
            <div
              className={`rounded-xl p-3 sm:p-5 border-2 text-center ${
                message.type === "success"
                  ? "border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]"
                  : "border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_15%,transparent)]"
              }`}
            >
              <div className="text-base sm:text-lg font-bold font-mono">{message.text}</div>
            </div>
          )}

          {/* Responsive Grid */}
          <div className="bg-card border-2 border-border rounded-xl p-3 sm:p-4 overflow-x-auto">
            <div className="text-xs font-bold text-muted-foreground mb-3 uppercase">
              {lang === "fr" ? "Zone de Travail (1-10)" : "Work Area (1-10)"}
            </div>

            <div
              className="inline-block"
              style={{ transform: "scale(0.75)", transformOrigin: "top left" }}
            >
              {/* Y-axis labels and grid */}
              <div className="flex gap-0">
                {/* Y-axis labels */}
                <div className="flex flex-col items-center justify-start">
                  <div className="w-8 h-8"></div>
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={`y-${i}`}
                      className="w-8 h-8 flex items-center justify-center text-xs font-bold text-muted-foreground"
                    >
                      {10 - i}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div>
                  {/* X-axis labels */}
                  <div className="flex gap-0">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={`x-${i}`}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-muted-foreground"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Grid cells */}
                  {Array.from({ length: 10 }, (_, y) => (
                    <div key={`row-${y}`} className="flex gap-0">
                      {Array.from({ length: 10 }, (_, x) => {
                        const cellX = x + 1;
                        const cellY = 10 - y;
                        const isRobotHere = position.x === cellX && position.y === cellY;

                        return (
                          <div
                            key={`cell-${x}-${y}`}
                            className={`w-8 h-8 border border-border flex items-center justify-center font-bold text-lg transition-all ${
                              isRobotHere
                                ? broken
                                  ? "bg-[var(--concept-error)] text-white"
                                  : "bg-primary text-primary-foreground"
                                : "bg-background"
                            }`}
                          >
                            {isRobotHere && (broken ? "💥" : "🤖")}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 p-2 sm:p-3 rounded-lg bg-secondary text-xs sm:text-sm">
              <div className="font-bold mb-1">
                {lang === "fr" ? "Position du Robot: " : "Robot Position: "}
                <span className="font-mono">
                  ({position.x}, {position.y})
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {lang === "fr"
                  ? "X (gauche-droite), Y (haut-bas) - Zone: 1-10"
                  : "X (left-right), Y (up-down) - Zone: 1-10"}
              </div>
            </div>
          </div>
        </div>

        {/* Status panel - Sidebar on desktop, top on mobile */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 sm:gap-3">
          <div className="flex-1 lg:flex-none p-3 sm:p-4 rounded-xl border-2 border-border bg-card">
            <div className="text-xs uppercase font-bold text-muted-foreground mb-1 sm:mb-2">
              {t("robotStatus")}
            </div>
            <div
              className={`text-lg sm:text-xl font-bold ${
                broken ? "text-[var(--concept-error)]" : "text-[var(--fun-green)]"
              }`}
            >
              {broken ? t("robotBroken") : t("robotHealthy")}
            </div>
          </div>

          <div className="flex-1 lg:flex-none p-3 sm:p-4 rounded-xl border-2 border-border bg-card">
            <div className="text-xs uppercase font-bold text-muted-foreground mb-1 sm:mb-2">
              {t("robotEnergy")}
            </div>
            <div
              className={`text-xl sm:text-2xl font-bold ${
                energy < 30 ? "text-[var(--fun-orange)]" : "text-[var(--fun-green)]"
              }`}
            >
              {energy}%
            </div>
          </div>

          <button
            onClick={reset}
            className="flex-1 lg:flex-none rounded-xl border-2 border-border bg-card px-3 sm:px-4 h-10 sm:h-12 font-bold hover:border-primary/50 transition text-xs sm:text-base"
          >
            {t("robotClear")}
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="p-4 rounded-xl border-2 border-dashed border-border bg-secondary">
          <div className="text-xs uppercase font-bold text-muted-foreground mb-2">
            {lang === "fr" ? "Historique des Commandes" : "Command History"}
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((cmd, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-mono"
              >
                {cmd}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DataValidator({ lang }: { lang: "en" | "fr" | "nl" }) {
  const t = (k: keyof typeof T) => pick(lang, T[k]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  function handleChange(field: string, value: string) {
    setForm({ ...form, [field]: value });
    setErrors([]);
    setSuccess(false);
  }

  function validateForm() {
    const newErrors: string[] = [];

    // Name validation
    if (!form.name.trim()) {
      newErrors.push(t("formErrorNameEmpty"));
    } else if (form.name.length < 2) {
      newErrors.push(t("formErrorNameTooShort"));
    } else if (form.name.length > 50) {
      newErrors.push(t("formErrorNameTooLong"));
    }

    // Age validation
    if (!form.age.trim()) {
      newErrors.push(t("formErrorAgeEmpty"));
    } else {
      const age = Number(form.age);
      if (isNaN(age)) {
        newErrors.push(t("formErrorAgeNotNumber"));
      } else if (age < 5 || age > 120) {
        newErrors.push(t("formErrorAgeRange"));
      }
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.push(t("formErrorEmailEmpty"));
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.push(t("formErrorEmailInvalid"));
    }

    // Password validation
    if (!form.password) {
      newErrors.push(t("formErrorPasswordEmpty"));
    } else if (form.password.length < 6) {
      newErrors.push(t("formErrorPasswordTooShort"));
    }

    // Confirm password
    if (form.password !== form.passwordConfirm) {
      newErrors.push(t("formErrorPasswordMatch"));
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      setSuccess(true);
      return true;
    }
    return false;
  }

  function reset() {
    setForm({
      name: "",
      age: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
    setErrors([]);
    setSuccess(false);
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="p-3 sm:p-4 rounded-xl border-2 border-border bg-secondary text-xs sm:text-sm">
        {t("formIntro")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormField
          label={t("formName")}
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          placeholder="John Doe"
        />
        <FormField
          label={t("formAge")}
          value={form.age}
          onChange={(v) => handleChange("age", v)}
          placeholder="12"
          type="number"
        />
      </div>

      <FormField
        label={t("formEmail")}
        value={form.email}
        onChange={(v) => handleChange("email", v)}
        placeholder="john@example.com"
        type="email"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormField
          label={t("formPassword")}
          value={form.password}
          onChange={(v) => handleChange("password", v)}
          placeholder="••••••"
          type="password"
        />
        <FormField
          label={t("formPasswordConfirm")}
          value={form.passwordConfirm}
          onChange={(v) => handleChange("passwordConfirm", v)}
          placeholder="••••••"
          type="password"
        />
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <button
          onClick={validateForm}
          className="flex-1 rounded-xl bg-primary text-primary-foreground px-4 sm:px-6 h-10 sm:h-12 font-bold hover:scale-105 transition text-sm sm:text-base"
        >
          {t("formSubmit")}
        </button>
        <button
          onClick={reset}
          className="flex-1 rounded-xl border-2 border-border bg-card px-4 sm:px-6 h-10 sm:h-12 font-bold hover:border-primary/50 transition text-sm sm:text-base"
        >
          {t("formReset")}
        </button>
      </div>

      {errors.length > 0 && (
        <div className="rounded-xl p-3 sm:p-5 border-2 border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_15%,transparent)]">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Validation errors:</div>
          <ul className="space-y-1 sm:space-y-2">
            {errors.map((error, i) => (
              <li key={i} className="text-xs sm:text-sm font-mono">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {success && (
        <div className="rounded-xl p-3 sm:p-5 border-2 border-[var(--fun-green)] bg-[color-mix(in_oklab,var(--fun-green)_15%,transparent)]">
          <div className="text-lg sm:text-2xl font-bold text-center">{t("formSuccess")}</div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold mb-2 text-muted-foreground uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-border bg-input px-3 sm:px-4 h-10 sm:h-12 text-base sm:text-lg font-mono focus:outline-none focus:border-primary"
      />
    </div>
  );
}
