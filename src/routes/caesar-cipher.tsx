import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/caesar-cipher")({ component: CaesarCipherPage });

const T = {
  title: { en: "Caesar Cipher", fr: "Chiffre de César", nl: "Caesar Cipher" },
  concept: {
    en: "Strings & Character Manipulation",
    fr: "Chaînes & Manipulation de Caractères",
    nl: "Strings & Karaktermanipulatie",
  },
  intro: {
    en: "An ancient encryption method! Shift each letter by N positions. A→D (shift 3), B→E, etc. Decode secret messages or create your own!",
    fr: "Une ancienne méthode de chiffrement ! Décale chaque lettre de N positions. A→D (décalage 3), B→E, etc. Décode des messages secrets !",
    nl: "Een oude versleutelingsmethode! Schuif elke letter N posities. A→D (shift 3), B→E, etc. Decodeer geheime boodschappen!",
  },
  messageLabel: { en: "Message:", fr: "Message :", nl: "Bericht:" },
  shiftLabel: { en: "Shift:", fr: "Décalage :", nl: "Shift:" },
  modeLabel: { en: "Mode:", fr: "Mode :", nl: "Modus:" },
  modeEncode: { en: "Encode", fr: "Encoder", nl: "Coderen" },
  modeDecode: { en: "Decode", fr: "Décoder", nl: "Decoderen" },
  result: { en: "Result:", fr: "Résultat :", nl: "Resultaat:" },
  placeholder: { en: "Type a message...", fr: "Tape un message...", nl: "Typ een bericht..." },
  visualizer: {
    en: "Character Rotation Wheel",
    fr: "Roue de Rotation des Caractères",
    nl: "Karakterrotatiewiel",
  },
  examples: { en: "Try these examples", fr: "Essaie ces exemples", nl: "Probeer deze voorbeelden" },
  challenge: {
    en: "🧪 Teacher's challenge",
    fr: "🧪 Défi du prof",
    nl: "🧪 Uitdaging van de leerkracht",
  },
  challengeText: {
    en: "Try shift=1, message='HAL'. Then shift=0. What's the pattern? Why is shift=26 the same as shift=0?",
    fr: "Essaie décalage=1, message='HAL'. Puis décalage=0. Quel est le motif ? Pourquoi décalage=26 = décalage=0 ?",
    nl: "Probeer shift=1, bericht='HAL'. Dan shift=0. Wat is het patroon? Waarom is shift=26 hetzelfde als shift=0?",
  },
  code: {
    en: `function caesar_cipher(message, shift, mode):
  result = ""
  
  # 🔄 LOOP through each character
  for char in message:
    # Skip non-letters
    if not is_letter(char):
      result = result + char
      continue
    
    # Determine uppercase or lowercase
    if is_uppercase(char):
      # Convert A-Z to 0-25
      pos = char_code(char) - char_code('A')
      # Apply shift with wraparound
      if mode == "encode":
        new_pos = (pos + shift) % 26
      else:
        new_pos = (pos - shift) % 26
      # Convert back to letter
      result = result + char_from_code(new_pos + char_code('A'))
    else:
      # Same for lowercase
      pos = char_code(char) - char_code('a')
      if mode == "encode":
        new_pos = (pos + shift) % 26
      else:
        new_pos = (pos - shift) % 26
      result = result + char_from_code(new_pos + char_code('a'))
  
  return result`,
    fr: `fonction chiffre_cesar(message, decalage, mode):
  resultat = ""
  
  # 🔄 BOUCLE sur chaque caractère
  pour char dans message:
    # Ignore les non-lettres
    si non est_lettre(char):
      resultat = resultat + char
      continuer
    
    # Détermine majuscule ou minuscule
    si est_majuscule(char):
      # Convertir A-Z en 0-25
      pos = code(char) - code('A')
      # Appliquer le décalage avec wraparound
      si mode == "encoder":
        new_pos = (pos + decalage) % 26
      sinon:
        new_pos = (pos - decalage) % 26
      # Convertir en lettre
      resultat = resultat + lettre(new_pos + code('A'))
    sinon:
      # Idem pour minuscules
      pos = code(char) - code('a')
      si mode == "encoder":
        new_pos = (pos + decalage) % 26
      sinon:
        new_pos = (pos - decalage) % 26
      resultat = resultat + lettre(new_pos + code('a'))
  
  retourner resultat`,
    nl: `functie caesar_cipher(bericht, shift, modus):
  resultaat = ""
  
  # 🔄 LUS door elk karakter
  voor char in bericht:
    # Negeer niet-letters
    als niet is_letter(char):
      resultaat = resultaat + char
      verder
    
    # Bepaal hoofdletter of kleine letter
    als is_hoofdletter(char):
      # Zet A-Z om naar 0-25
      pos = code(char) - code('A')
      # Pas shift toe met wraparound
      als modus == "coderen":
        new_pos = (pos + shift) % 26
      anders:
        new_pos = (pos - shift) % 26
      # Zet terug naar letter
      resultaat = resultaat + letter(new_pos + code('A'))
    anders:
      # Hetzelfde voor kleine letters
      pos = code(char) - code('a')
      als modus == "coderen":
        new_pos = (pos + shift) % 26
      anders:
        new_pos = (pos - shift) % 26
      resultaat = resultaat + letter(new_pos + code('a'))
  
  geef resultaat terug`,
  },
};

const EXAMPLES = {
  en: [
    { text: "HELLO WORLD", shift: 3 },
    { text: "The quick brown fox", shift: 5 },
    { text: "Programming is fun", shift: 13 },
  ],
  fr: [
    { text: "BONJOUR LE MONDE", shift: 3 },
    { text: "Le renard brun rapide", shift: 5 },
    { text: "Programmer c'est amusant", shift: 13 },
  ],
  nl: [
    { text: "HALLO WERELD", shift: 3 },
    { text: "De snelle bruine vos", shift: 5 },
    { text: "Programmeren is leuk", shift: 13 },
  ],
};

function caesarCipher(message: string, shift: number, mode: "encode" | "decode"): string {
  const actualShift = mode === "encode" ? shift : -shift;
  return message
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const code = char.charCodeAt(0) - 97;
        return String.fromCharCode(((((code + actualShift) % 26) + 26) % 26) + 97);
      }
      if (/[A-Z]/.test(char)) {
        const code = char.charCodeAt(0) - 65;
        return String.fromCharCode(((((code + actualShift) % 26) + 26) % 26) + 65);
      }
      return char;
    })
    .join("");
}

function CaesarCipherPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T): string => pick(lang, T[k] as Parameters<typeof pick>[1]) as string;
  const [message, setMessage] = useState("HELLO");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const result = caesarCipher(message, shift, mode);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const shiftedAlphabet = caesarCipher(alphabet, shift, "encode");

  return (
    <GameLayout
      title={t("title")}
      emoji="🔐"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div className="space-y-5">
        {/* Message Input */}
        <div>
          <label className="block text-sm font-bold mb-2">{t("messageLabel")}</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* Shift Control */}
        <div>
          <label className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">{t("shiftLabel")}</span>
            <span className="font-mono text-lg font-bold text-primary">{shift}</span>
          </label>
          <input
            type="range"
            min={0}
            max={25}
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>13 (ROT13)</span>
            <span>25</span>
          </div>
        </div>

        {/* Mode Toggle */}
        <div>
          <label className="block text-sm font-bold mb-2">{t("modeLabel")}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode("encode")}
              className={`rounded-lg py-2 font-semibold transition ${
                mode === "encode"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {t("modeEncode")}
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`rounded-lg py-2 font-semibold transition ${
                mode === "decode"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {t("modeDecode")}
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl border-2 border-primary bg-[color-mix(in_oklab,var(--primary)_10%,transparent)] p-4">
          <label className="block text-sm font-bold mb-2">{t("result")}</label>
          <div className="font-mono text-lg font-bold text-primary break-words">
            {result || "(empty)"}
          </div>
        </div>

        {/* Visualization */}
        {message.trim() && (
          <div className="rounded-xl bg-secondary p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              {t("visualizer")}
            </div>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex flex-wrap gap-1">
                {alphabet.split("").map((char, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-muted-foreground">{char}</div>
                    <div className="w-7 h-7 flex items-center justify-center rounded-md border border-border bg-background font-bold">
                      {shiftedAlphabet[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Examples */}
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            {t("examples")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EXAMPLES[lang as "en" | "fr" | "nl"].map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setMessage(ex.text);
                  setShift(ex.shift);
                  setMode("encode");
                }}
                className="text-left rounded-lg bg-secondary hover:bg-secondary/80 p-2 transition text-sm"
              >
                <div className="font-mono font-bold">{ex.text}</div>
                <div className="text-xs text-muted-foreground">shift={ex.shift}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div className="rounded-xl border-2 border-dashed border-[var(--concept-error)] bg-[color-mix(in_oklab,var(--concept-error)_8%,transparent)] p-4">
          <div className="font-bold text-sm mb-1">{t("challenge")}</div>
          <div className="text-sm text-muted-foreground">{t("challengeText")}</div>
        </div>
      </div>
    </GameLayout>
  );
}

