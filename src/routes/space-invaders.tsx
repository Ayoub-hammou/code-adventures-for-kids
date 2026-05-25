import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { GameLayout } from "@/components/GameLayout";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/space-invaders")({
  component: SpaceInvadersPage,
});

type SkinId = "crown" | "shield" | "wizard" | "samurai" | "phoenix" | "diamond";
type PowerType = "rapid" | "shield" | "spread";
type TouchControls = { left: boolean; right: boolean; fire: boolean };
type Difficulty = "arcade" | "insane";

type Enemy = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  vx: number;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  fromEnemy: boolean;
  damage: number;
};

type Boss = {
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  maxHp: number;
  vx: number;
};

type PowerUp = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: PowerType;
};

type GameState = {
  phase: "menu" | "playing" | "gameover";
  playerX: number;
  lives: number;
  score: number;
  combo: number;
  level: number;
  enemies: Enemy[];
  bullets: Bullet[];
  powerUps: PowerUp[];
  boss: Boss | null;
  rapidUntil: number;
  shieldUntil: number;
  spreadUntil: number;
  nextShootAt: number;
  screenShake: number;
};

const BOARD = { w: 720, h: 500 };
const PLAYER = { w: 50, h: 26, y: BOARD.h - 40 };

const DIFFICULTY = {
  arcade: {
    playerSpeed: 8,
    rowsCap: 4,
    rowScale: 2,
    hpScale: 5,
    enemyBaseSpeed: 1.2,
    enemySpeedScale: 0.17,
    bossBaseSpeed: 2,
    bossSpeedScale: 0.18,
    playerShootCooldown: 220,
    playerShootCooldownRapid: 115,
    enemyDescend: 16,
    enemyFireBase: 0.00085,
    enemyFireCap: 28,
    enemyBulletBase: 5,
    enemyBulletScale: 0.08,
    bossFireChance: 0.06,
    bossBulletBase: 4,
    bossBulletScale: 0.1,
    powerUpDropChance: 0.22,
    startingLives: 4,
  },
  insane: {
    playerSpeed: 7.5,
    rowsCap: 7,
    rowScale: 1.4,
    hpScale: 3,
    enemyBaseSpeed: 2.8,
    enemySpeedScale: 0.35,
    bossBaseSpeed: 3.2,
    bossSpeedScale: 0.38,
    playerShootCooldown: 250,
    playerShootCooldownRapid: 140,
    enemyDescend: 28,
    enemyFireBase: 0.0025,
    enemyFireCap: 52,
    enemyBulletBase: 7.2,
    enemyBulletScale: 0.18,
    bossFireChance: 0.14,
    bossBulletBase: 5.8,
    bossBulletScale: 0.20,
    powerUpDropChance: 0.08,
    startingLives: 2,
  },
} as const;

const T = {
  title: {
    en: "Space Invaders Ultimate",
    fr: "Space Invaders Ultimate",
    nl: "Space Invaders Ultimate",
  },
  concept: {
    en: "Game Loops, Boss Phases & Power-Ups",
    fr: "Boucles de jeu, phases de boss et bonus",
    nl: "Game loops, baasfases en power-ups",
  },
  intro: {
    en: "Pick your hero skin, blast neon invaders, chain combos and survive escalating boss waves.",
    fr: "Choisis ton skin de héros, détruis les envahisseurs néon, enchaîne les combos et survis aux vagues de boss.",
    nl: "Kies je heldenskin, schiet neon invaders neer, maak combo's en overleef zwaardere baasgolven.",
  },
  start: { en: "Start Mission", fr: "Démarrer la mission", nl: "Start missie" },
  restart: { en: "Play Again", fr: "Rejouer", nl: "Opnieuw spelen" },
  skin: { en: "Character", fr: "Personnage", nl: "Personage" },
  level: { en: "Level", fr: "Niveau", nl: "Level" },
  lives: { en: "Lives", fr: "Vies", nl: "Levens" },
  score: { en: "Score", fr: "Score", nl: "Score" },
  combo: { en: "Combo", fr: "Combo", nl: "Combo" },
  controls: {
    en: "Move: Left/Right or A/D - Shoot: Space",
    fr: "Bouger : Gauche/Droite ou A/D - Tirer : Espace",
    nl: "Bewegen: Links/Rechts of A/D - Schieten: Spatie",
  },
  touchControls: {
    en: "Touch controls: hold Left/Right and tap Fire",
    fr: "Contrôles tactiles : maintiens Gauche/Droite et appuie Tir",
    nl: "Touch controls: houd Links/Rechts vast en tik op Vuur",
  },
  danger: { en: "Danger", fr: "Danger", nl: "Gevaar" },
  menuChoose: {
    en: "Choose your character",
    fr: "Choisis ton personnage",
    nl: "Kies je personage",
  },
  menuPreview: { en: "Preview", fr: "Aperçu", nl: "Voorbeeld" },
  startGame: { en: "Start Game", fr: "Commencer", nl: "Start spel" },
  pause: { en: "Pause", fr: "Pause", nl: "Pauze" },
  resume: { en: "Resume", fr: "Reprendre", nl: "Hervatten" },
  restartRun: { en: "Restart", fr: "Rejouer", nl: "Herstart" },
  keyboardHint: {
    en: "Keyboard: Arrow keys/A-D move, Space shoot, P pause, R reset",
    fr: "Clavier : Flèches/A-D bouger, Espace tirer, P pause, R reset",
    nl: "Toetsenbord: Pijlen/A-D bewegen, Spatie schieten, P pauze, R reset",
  },
  difficulty: { en: "Difficulty", fr: "Difficulte", nl: "Moeilijkheid" },
  arcade: { en: "Arcade", fr: "Arcade", nl: "Arcade" },
  insane: { en: "Insane", fr: "Insane", nl: "Insane" },
  arcadeHint: {
    en: "Smoother pace, more lives, kid-friendly chaos.",
    fr: "Rythme plus doux, plus de vies, chaos adapte aux enfants.",
    nl: "Rustiger tempo, meer levens, kindvriendelijke chaos.",
  },
  insaneHint: {
    en: "Fast and intense with heavy pressure.",
    fr: "Rapide et intense avec beaucoup de pression.",
    nl: "Snel en intens met hoge druk.",
  },
   left: { en: "Left", fr: "Gauche", nl: "Links" },
   right: { en: "Right", fr: "Droite", nl: "Rechts" },
   fire: { en: "Fire", fr: "Tir", nl: "Vuur" },
   over: { en: "Game Over", fr: "Partie terminée", nl: "Game over" },
   boss: { en: "BOSS WAVE!", fr: "VAGUE BOSS !", nl: "BOSS GOLF!" },
   rapidFire: { en: "Rapid Fire", fr: "Tir rapide", nl: "Snelschot" },
   shield: { en: "Shield", fr: "Bouclier", nl: "Schild" },
   spreadShot: { en: "Spread Shot", fr: "Tir dispersé", nl: "Spreidschot" },
   bestScore: { en: "Best Score", fr: "Meilleur score", nl: "Beste score" },
   code: {
    en: `while playing:
  read_keyboard()
  move_player()

  if shoot_pressed and cooldown_ready:
    bullets.add(create_player_bullet())

  move_enemies_and_boss()
  move_bullets()
  spawn_enemy_fire()

  for each collision:
    apply_damage()
    maybe_drop_power_up()

  if all_enemies_defeated:
    level += 1
    increase_difficulty()
    if level % 4 == 0:
      spawn_boss()`,
    fr: `tant que en_jeu:
  lire_clavier()
  deplacer_joueur()

  si tir_presse et cooldown_ok:
    projectiles.ajouter(creer_tir_joueur())

  deplacer_ennemis_et_boss()
  deplacer_projectiles()
  declencher_tirs_ennemis()

  pour chaque collision:
    appliquer_degats()
    parfois_lacher_bonus()

  si ennemis_vaincus:
    niveau += 1
    augmenter_difficulte()
    si niveau % 4 == 0:
      invoquer_boss()`,
    nl: `zolang spelen:
  lees_toetsenbord()
  beweeg_speler()

  als schiet_toets en cooldown_klaar:
    kogels.voeg_toe(maak_speler_kogel())

  beweeg_vijanden_en_baas()
  beweeg_kogels()
  laat_vijanden_schieten()

  voor elke botsing:
    doe_schade()
    laat_soms_powerup_vallen()

  als alle_vijanden_weg:
    level += 1
    maak_moeilijker()
    als level % 4 == 0:
      spawn_baas()`,
  },
};

const SKINS: Record<SkinId, { label: string; ship: string; bulletClass: string; glow: string }> = {
  crown: { label: "Crown", ship: "👑", bulletClass: "bg-cyan-300", glow: "shadow-cyan-400/70" },
  shield: {
    label: "Shield",
    ship: "⚔️",
    bulletClass: "bg-orange-300",
    glow: "shadow-orange-400/70",
  },
  wizard: {
    label: "Wizard",
    ship: "🧙",
    bulletClass: "bg-violet-300",
    glow: "shadow-violet-400/70",
  },
  samurai: { label: "Samurai", ship: "🗡️", bulletClass: "bg-rose-300", glow: "shadow-rose-400/70" },
  phoenix: {
    label: "Phoenix",
    ship: "🔥",
    bulletClass: "bg-amber-300",
    glow: "shadow-amber-400/70",
  },
  diamond: { label: "Diamond", ship: "💎", bulletClass: "bg-sky-300", glow: "shadow-sky-400/70" },
};

const AIRCRAFT_THEME: Record<
  SkinId,
  {
    hull: string;
    wing: string;
    cockpit: string;
    accent: string;
    thruster: string;
  }
> = {
  crown: {
    hull: "from-cyan-300 to-sky-500",
    wing: "from-cyan-200 to-blue-500",
    cockpit: "bg-white/90",
    accent: "bg-yellow-300",
    thruster: "bg-cyan-300",
  },
  shield: {
    hull: "from-orange-300 to-amber-600",
    wing: "from-amber-200 to-orange-600",
    cockpit: "bg-white/85",
    accent: "bg-orange-200",
    thruster: "bg-amber-300",
  },
  wizard: {
    hull: "from-violet-300 to-purple-700",
    wing: "from-fuchsia-300 to-violet-700",
    cockpit: "bg-violet-100/90",
    accent: "bg-fuchsia-300",
    thruster: "bg-violet-300",
  },
  samurai: {
    hull: "from-rose-300 to-red-700",
    wing: "from-red-300 to-rose-700",
    cockpit: "bg-white/85",
    accent: "bg-rose-300",
    thruster: "bg-red-300",
  },
  phoenix: {
    hull: "from-yellow-300 to-orange-700",
    wing: "from-amber-200 to-red-600",
    cockpit: "bg-yellow-100/90",
    accent: "bg-orange-300",
    thruster: "bg-yellow-300",
  },
  diamond: {
    hull: "from-sky-200 to-cyan-500",
    wing: "from-cyan-200 to-indigo-500",
    cockpit: "bg-white/95",
    accent: "bg-cyan-100",
    thruster: "bg-sky-200",
  },
};

const AIRCRAFT_GEOMETRY: Record<
  SkinId,
  {
    hullClass: string;
    leftWingClass: string;
    rightWingClass: string;
  }
> = {
  crown: {
    hullClass: "h-full w-5",
    leftWingClass: "left-0 top-2 h-3 w-4 rounded-l-full",
    rightWingClass: "right-0 top-2 h-3 w-4 rounded-r-full",
  },
  shield: {
    hullClass: "h-full w-6",
    leftWingClass: "left-0 top-2 h-3.5 w-5 rounded-l-md",
    rightWingClass: "right-0 top-2 h-3.5 w-5 rounded-r-md",
  },
  wizard: {
    hullClass: "h-full w-4.5",
    leftWingClass: "left-0 top-3 h-2.5 w-4 rounded-l-full",
    rightWingClass: "right-0 top-3 h-2.5 w-4 rounded-r-full",
  },
  samurai: {
    hullClass: "h-full w-5",
    leftWingClass: "left-0 top-2 h-3 w-4 -skew-y-6 rounded-l",
    rightWingClass: "right-0 top-2 h-3 w-4 skew-y-6 rounded-r",
  },
  phoenix: {
    hullClass: "h-full w-5",
    leftWingClass: "left-0 top-1.5 h-4 w-4.5 rounded-l-full",
    rightWingClass: "right-0 top-1.5 h-4 w-4.5 rounded-r-full",
  },
  diamond: {
    hullClass: "h-full w-5 rotate-45 rounded-sm",
    leftWingClass: "left-0 top-2 h-3 w-4 rounded-l",
    rightWingClass: "right-0 top-2 h-3 w-4 rounded-r",
  },
};

function renderAircraft(skinId: SkinId, size: "small" | "large" = "large") {
  const sizeClasses = {
    small: "w-12 h-10",
    large: "w-full h-full",
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {renderSkinDetailsForSize(skinId, size)}
      <div
        className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-t-full rounded-b-md bg-gradient-to-b ${AIRCRAFT_THEME[skinId].hull} border border-white/30 ${AIRCRAFT_GEOMETRY[skinId].hullClass}`}
      />
      <div
        className={`absolute bg-gradient-to-r ${AIRCRAFT_THEME[skinId].wing} border border-white/25 ${AIRCRAFT_GEOMETRY[skinId].leftWingClass}`}
      />
      <div
        className={`absolute bg-gradient-to-l ${AIRCRAFT_THEME[skinId].wing} border border-white/25 ${AIRCRAFT_GEOMETRY[skinId].rightWingClass}`}
      />
      <div
        className={`absolute left-1/2 top-1 -translate-x-1/2 h-2 w-2 rounded-full ${AIRCRAFT_THEME[skinId].cockpit}`}
      />
      <div
        className={`absolute left-1/2 top-[11px] -translate-x-1/2 h-1.5 w-1.5 rounded-full ${AIRCRAFT_THEME[skinId].accent}`}
      />
      <div
        className={`absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-1.5 w-3 rounded-full ${AIRCRAFT_THEME[skinId].thruster} ${size === "small" ? "" : "animate-pulse"}`}
      />
    </div>
  );
}

function renderSkinDetailsForSize(skinId: SkinId, size: "small" | "large") {
  const detailsSmall: Record<SkinId, JSX.Element> = {
    crown: (
      <>
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 text-[6px]">👑</div>
        <div className="absolute left-1 top-2 h-0.5 w-0.5 rounded-full bg-yellow-200" />
        <div className="absolute right-1 top-2 h-0.5 w-0.5 rounded-full bg-yellow-200" />
      </>
    ),
    shield: (
      <>
        <div className="absolute left-0.5 top-1.5 h-2.5 w-1 rounded bg-orange-200/80" />
        <div className="absolute right-0.5 top-1.5 h-2.5 w-1 rounded bg-orange-200/80" />
        <div className="absolute left-1/2 top-[10px] -translate-x-1/2 h-1.5 w-2 rounded-b-full border border-orange-200/80" />
      </>
    ),
    wizard: (
      <>
        <div className="absolute left-1/2 -top-0.5 -translate-x-1/2 text-[6px]">✨</div>
        <div className="absolute left-1/2 top-3 -translate-x-1/2 h-2 w-5 rounded-full border border-violet-300/70 animate-pulse" />
      </>
    ),
    samurai: (
      <>
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 h-2 w-[1px] bg-rose-200" />
        <div className="absolute left-0.5 top-4.5 h-[1px] w-2 bg-rose-200/80 -rotate-12" />
        <div className="absolute right-0.5 top-4.5 h-[1px] w-2 bg-rose-200/80 rotate-12" />
      </>
    ),
    phoenix: (
      <>
        <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 text-[6px] animate-pulse">
          🔥
        </div>
        <div className="absolute left-0.5 top-1 text-[6px]">🪽</div>
        <div className="absolute right-0.5 top-1 text-[6px] scale-x-[-1]">🪽</div>
      </>
    ),
    diamond: (
      <>
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 h-2 w-2 rotate-45 border border-cyan-100/90 bg-cyan-200/50" />
        <div className="absolute left-1 top-4 h-1 w-1 rotate-45 bg-cyan-100/80" />
        <div className="absolute right-1 top-4 h-1 w-1 rotate-45 bg-cyan-100/80" />
      </>
    ),
  };

  const detailsLarge: Record<SkinId, JSX.Element> = {
    crown: (
      <>
        <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 text-[9px]">👑</div>
        <div className="absolute left-1.5 top-3 h-1 w-1 rounded-full bg-yellow-200" />
        <div className="absolute right-1.5 top-3 h-1 w-1 rounded-full bg-yellow-200" />
      </>
    ),
    shield: (
      <>
        <div className="absolute left-1 top-2.5 h-4 w-1.5 rounded bg-orange-200/80" />
        <div className="absolute right-1 top-2.5 h-4 w-1.5 rounded bg-orange-200/80" />
        <div className="absolute left-1/2 top-[13px] -translate-x-1/2 h-2 w-3 rounded-b-full border border-orange-200/80" />
      </>
    ),
    wizard: (
      <>
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 text-[9px]">✨</div>
        <div className="absolute left-1/2 top-4 -translate-x-1/2 h-3 w-7 rounded-full border border-violet-300/70 animate-pulse" />
      </>
    ),
    samurai: (
      <>
        <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 h-3 w-[2px] bg-rose-200" />
        <div className="absolute left-0.5 top-6 h-[2px] w-3 bg-rose-200/80 -rotate-12" />
        <div className="absolute right-0.5 top-6 h-[2px] w-3 bg-rose-200/80 rotate-12" />
      </>
    ),
    phoenix: (
      <>
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 text-[8px] animate-pulse">
          🔥
        </div>
        <div className="absolute left-1 top-1.5 text-[8px]">🪽</div>
        <div className="absolute right-1 top-1.5 text-[8px] scale-x-[-1]">🪽</div>
      </>
    ),
    diamond: (
      <>
        <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 h-2.5 w-2.5 rotate-45 border border-cyan-100/90 bg-cyan-200/50" />
        <div className="absolute left-1.5 top-5 h-1.5 w-1.5 rotate-45 bg-cyan-100/80" />
        <div className="absolute right-1.5 top-5 h-1.5 w-1.5 rotate-45 bg-cyan-100/80" />
      </>
    ),
  };

  return size === "small" ? detailsSmall[skinId] : detailsLarge[skinId];
}

function overlaps(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function makeWave(level: number, idRef: MutableRefObject<number>, difficulty: Difficulty) {
  const cfg = DIFFICULTY[difficulty];
  if (level % 4 === 0) {
    return {
      enemies: [] as Enemy[],
      boss: {
        x: BOARD.w / 2 - 56,
        y: 44,
        w: 112,
        h: 64,
        hp: 24 + level * 5,
        maxHp: 24 + level * 5,
        vx: cfg.bossBaseSpeed + level * cfg.bossSpeedScale,
      } as Boss,
    };
  }

  const rows = 2 + Math.min(cfg.rowsCap, Math.floor((level + 1) / cfg.rowScale));
  const cols = 8;
  const enemies: Enemy[] = [];
  const hp = 1 + Math.floor(level / cfg.hpScale);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      idRef.current += 1;
      enemies.push({
        id: idRef.current,
        x: 80 + c * 70,
        y: 40 + r * 44,
        w: 34,
        h: 24,
        hp,
        vx: cfg.enemyBaseSpeed + level * cfg.enemySpeedScale,
      });
    }
  }

  return { enemies, boss: null };
}

function initialState(idRef: MutableRefObject<number>, difficulty: Difficulty): GameState {
  const firstWave = makeWave(1, idRef, difficulty);
  return {
    phase: "menu",
    playerX: BOARD.w / 2 - PLAYER.w / 2,
    lives: DIFFICULTY[difficulty].startingLives,
    score: 0,
    combo: 0,
    level: 1,
    enemies: firstWave.enemies,
    bullets: [],
    powerUps: [],
    boss: firstWave.boss,
    rapidUntil: 0,
    shieldUntil: 0,
    spreadUntil: 0,
    nextShootAt: 0,
    screenShake: 0,
  };
}

function SpaceInvadersPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof T) => pick(lang, T[k]);
  const [skin, setSkin] = useState<SkinId>("crown");
  const [difficulty, setDifficulty] = useState<Difficulty>("arcade");
  const [menuOpen, setMenuOpen] = useState(true);
  const [paused, setPaused] = useState(false);
  const idRef = useRef(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const touchRef = useRef<TouchControls>({ left: false, right: false, fire: false });
  const [best, setBest] = useState(0);
  const [state, setState] = useState<GameState>(() => initialState(idRef, "arcade"));

  const stars = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        id: i,
        left: Math.floor(Math.random() * BOARD.w),
        top: Math.floor(Math.random() * BOARD.h),
        size: 1 + Math.floor(Math.random() * 3),
      })),
    [],
  );
  const rivets = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 20 + i * 50,
      })),
    [],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (["ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
      if (e.code === "KeyP") setPaused((v) => !v);
      if (e.code === "KeyR") {
        setMenuOpen(true);
        setPaused(false);
        setState(initialState(idRef, difficulty));
      }
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [difficulty]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("codekids_space_best");
      if (raw) setBest(parseInt(raw, 10) || 0);
    } catch {
      // ignore storage failures
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== "playing" || paused) return prev;

        const now = Date.now();
        const cfg = DIFFICULTY[difficulty];
        const left = keysRef.current.ArrowLeft || keysRef.current.KeyA || touchRef.current.left;
        const right = keysRef.current.ArrowRight || keysRef.current.KeyD || touchRef.current.right;
        const shoot = keysRef.current.Space || touchRef.current.fire;

        let playerX = prev.playerX;
        if (left) playerX -= cfg.playerSpeed;
        if (right) playerX += cfg.playerSpeed;
        playerX = Math.max(10, Math.min(BOARD.w - PLAYER.w - 10, playerX));

        let bullets = prev.bullets.map((b) => ({ ...b, x: b.x + b.vx, y: b.y + b.vy }));
        let enemies = prev.enemies.map((e) => ({ ...e }));
        let boss = prev.boss ? { ...prev.boss } : null;
        let powerUps = prev.powerUps.map((p) => ({ ...p, y: p.y + 2 }));
        let score = prev.score;
        let combo = prev.combo;
        let lives = prev.lives;
        let level = prev.level;
        let nextShootAt = prev.nextShootAt;
        let rapidUntil = prev.rapidUntil;
        let shieldUntil = prev.shieldUntil;
        let spreadUntil = prev.spreadUntil;
        let screenShake = Math.max(0, prev.screenShake - 0.6);

        const hasRapid = rapidUntil > now;
        const hasShield = shieldUntil > now;
        const hasSpread = spreadUntil > now;

        if (shoot && now >= nextShootAt) {
          idRef.current += 1;
          bullets.push({
            id: idRef.current,
            x: playerX + PLAYER.w / 2 - 3,
            y: PLAYER.y,
            w: 6,
            h: 14,
            vx: 0,
            vy: -10,
            fromEnemy: false,
            damage: 1,
          });
          if (hasSpread) {
            idRef.current += 1;
            bullets.push({
              id: idRef.current,
              x: playerX + PLAYER.w / 2 - 3,
              y: PLAYER.y,
              w: 6,
              h: 14,
              vx: -2,
              vy: -9,
              fromEnemy: false,
              damage: 1,
            });
            idRef.current += 1;
            bullets.push({
              id: idRef.current,
              x: playerX + PLAYER.w / 2 - 3,
              y: PLAYER.y,
              w: 6,
              h: 14,
              vx: 2,
              vy: -9,
              fromEnemy: false,
              damage: 1,
            });
          }
          nextShootAt = now + (hasRapid ? cfg.playerShootCooldownRapid : cfg.playerShootCooldown);
        }

        let enemyEdgeHit = false;
        enemies = enemies.map((e) => {
          const nx = e.x + e.vx;
          if (nx <= 10 || nx + e.w >= BOARD.w - 10) enemyEdgeHit = true;
          return { ...e, x: nx };
        });
        if (enemyEdgeHit) {
          enemies = enemies.map((e) => ({ ...e, y: e.y + cfg.enemyDescend, vx: -e.vx }));
        }

        if (boss) {
          boss.x += boss.vx;
          if (boss.x <= 20 || boss.x + boss.w >= BOARD.w - 20) boss.vx = -boss.vx;
          if (Math.random() < cfg.bossFireChance) {
            const fireCount = level >= 8 ? 3 : 2;
            for (let i = 0; i < fireCount; i++) {
              idRef.current += 1;
              bullets.push({
                id: idRef.current,
                x: boss.x + boss.w / 2 - 3 + (i - (fireCount - 1) / 2) * 12,
                y: boss.y + boss.h,
                w: 6,
                h: 12,
                vx: (i - 1) * 0.8,
                vy: cfg.bossBulletBase + level * cfg.bossBulletScale,
                fromEnemy: true,
                damage: 1,
              });
            }
          }
        }

        for (const enemy of enemies) {
          if (Math.random() < cfg.enemyFireBase * Math.min(cfg.enemyFireCap, level + 8)) {
            idRef.current += 1;
            bullets.push({
              id: idRef.current,
              x: enemy.x + enemy.w / 2,
              y: enemy.y + enemy.h,
              w: 4,
              h: 10,
              vx: 0,
              vy: cfg.enemyBulletBase + level * cfg.enemyBulletScale,
              fromEnemy: true,
              damage: 1,
            });
          }
        }

        bullets = bullets.filter(
          (b) => b.y > -20 && b.y < BOARD.h + 20 && b.x > -20 && b.x < BOARD.w + 20,
        );
        powerUps = powerUps.filter((p) => p.y < BOARD.h + 20);

        const playerBox = { x: playerX, y: PLAYER.y, w: PLAYER.w, h: PLAYER.h };

        const remainingBullets: Bullet[] = [];
        for (const bullet of bullets) {
          if (!bullet.fromEnemy) {
            let hitSomething = false;
            enemies = enemies
              .map((enemy) => {
                if (hitSomething) return enemy;
                if (overlaps(bullet, enemy)) {
                  hitSomething = true;
                  const hp = enemy.hp - bullet.damage;
                  if (hp <= 0) {
                    score += 100 + level * 12;
                    combo += 1;
                    if (Math.random() < cfg.powerUpDropChance) {
                      idRef.current += 1;
                      const kinds: PowerType[] = ["rapid", "shield", "spread"];
                      const kind = kinds[Math.floor(Math.random() * kinds.length)];
                      powerUps.push({
                        id: idRef.current,
                        x: enemy.x + 8,
                        y: enemy.y + 8,
                        w: 18,
                        h: 18,
                        kind,
                      });
                    }
                  }
                  return { ...enemy, hp };
                }
                return enemy;
              })
              .filter((enemy) => enemy.hp > 0);

            if (boss && !hitSomething && overlaps(bullet, boss)) {
              hitSomething = true;
              boss.hp -= bullet.damage;
              score += 28;
              combo += 1;
              if (boss.hp <= 0) {
                score += 1400 + level * 60;
              }
            }

            if (!hitSomething) remainingBullets.push(bullet);
          } else {
            if (overlaps(bullet, playerBox)) {
              if (!hasShield) {
                lives -= 1;
                combo = 0;
                screenShake = 8;
              }
            } else {
              remainingBullets.push(bullet);
            }
          }
        }

        bullets = remainingBullets;
        if (boss && boss.hp <= 0) boss = null;

        for (const enemy of enemies) {
          if (enemy.y + enemy.h >= PLAYER.y) {
            lives = 0;
          }
        }

        for (const p of powerUps) {
          if (overlaps(playerBox, p)) {
            if (p.kind === "rapid") rapidUntil = now + 9000;
            if (p.kind === "shield") shieldUntil = now + 8000;
            if (p.kind === "spread") spreadUntil = now + 9000;
          }
        }
        powerUps = powerUps.filter((p) => !overlaps(playerBox, p));

        if (enemies.length === 0 && !boss) {
          level += 1;
          const nextWave = makeWave(level, idRef, difficulty);
          enemies = nextWave.enemies;
          boss = nextWave.boss;
          if (boss) screenShake = 6;
          bullets = [];
          powerUps = [];
          combo = 0;
        }

        const phase = lives <= 0 ? "gameover" : "playing";

        return {
          ...prev,
          phase,
          playerX,
          lives,
          score,
          combo,
          level,
          enemies,
          bullets,
          powerUps,
          boss,
          nextShootAt,
          rapidUntil,
          shieldUntil,
          spreadUntil,
          screenShake,
        };
      });
    }, 40);

    return () => clearInterval(timer);
  }, [difficulty, paused]);

  useEffect(() => {
    if (state.phase === "gameover" && state.score > best) {
      setBest(state.score);
      try {
        localStorage.setItem("codekids_space_best", String(state.score));
      } catch {
        // ignore storage failures
      }
    }
  }, [state.phase, state.score, best]);

  function startGame() {
    const base = initialState(idRef, difficulty);
    setMenuOpen(false);
    setPaused(false);
    setState({ ...base, phase: "playing" });
  }

  function selectDifficulty(mode: Difficulty) {
    setDifficulty(mode);
    setPaused(false);
    setState(initialState(idRef, mode));
  }

  function togglePause() {
    setPaused((v) => !v);
  }

  function resetToMenu() {
    setMenuOpen(true);
    setPaused(false);
    setState(initialState(idRef, difficulty));
  }

  function setTouchControl(control: keyof TouchControls, value: boolean) {
    touchRef.current = { ...touchRef.current, [control]: value };
  }

  function touchHandlers(control: keyof TouchControls) {
    return {
      onPointerDown: () => setTouchControl(control, true),
      onPointerUp: () => setTouchControl(control, false),
      onPointerLeave: () => setTouchControl(control, false),
      onPointerCancel: () => setTouchControl(control, false),
    };
  }

  function renderSkinDetails(skinId?: SkinId) {
    const targetSkin = skinId || skin;
    switch (targetSkin) {
      case "crown":
        return (
          <>
            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 text-[9px]">👑</div>
            <div className="absolute left-1.5 top-3 h-1 w-1 rounded-full bg-yellow-200" />
            <div className="absolute right-1.5 top-3 h-1 w-1 rounded-full bg-yellow-200" />
          </>
        );
      case "shield":
        return (
          <>
            <div className="absolute left-1 top-2.5 h-4 w-1.5 rounded bg-orange-200/80" />
            <div className="absolute right-1 top-2.5 h-4 w-1.5 rounded bg-orange-200/80" />
            <div className="absolute left-1/2 top-[13px] -translate-x-1/2 h-2 w-3 rounded-b-full border border-orange-200/80" />
          </>
        );
      case "wizard":
        return (
          <>
            <div className="absolute left-1/2 -top-1 -translate-x-1/2 text-[9px]">✨</div>
            <div className="absolute left-1/2 top-4 -translate-x-1/2 h-3 w-7 rounded-full border border-violet-300/70 animate-pulse" />
          </>
        );
      case "samurai":
        return (
          <>
            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 h-3 w-[2px] bg-rose-200" />
            <div className="absolute left-0.5 top-6 h-[2px] w-3 bg-rose-200/80 -rotate-12" />
            <div className="absolute right-0.5 top-6 h-[2px] w-3 bg-rose-200/80 rotate-12" />
          </>
        );
      case "phoenix":
        return (
          <>
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 text-[8px] animate-pulse">
              🔥
            </div>
            <div className="absolute left-1 top-1.5 text-[8px]">🪽</div>
            <div className="absolute right-1 top-1.5 text-[8px] scale-x-[-1]">🪽</div>
          </>
        );
      case "diamond":
        return (
          <>
            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 h-2.5 w-2.5 rotate-45 border border-cyan-100/90 bg-cyan-200/50" />
            <div className="absolute left-1.5 top-5 h-1.5 w-1.5 rotate-45 bg-cyan-100/80" />
            <div className="absolute right-1.5 top-5 h-1.5 w-1.5 rotate-45 bg-cyan-100/80" />
          </>
        );
      default:
        return null;
    }
  }

  const hasRapid = state.rapidUntil > Date.now();
  const hasShield = state.shieldUntil > Date.now();
  const hasSpread = state.spreadUntil > Date.now();
  const highestThreat = Math.max(
    state.boss ? state.boss.y + state.boss.h : 0,
    ...state.enemies.map((e) => e.y + e.h),
  );
  const danger = Math.min(1, highestThreat / PLAYER.y);
  const tensionBoost = danger > 0.7 ? 1.7 : 1;
  const shakeX = (Math.random() - 0.5) * state.screenShake * tensionBoost;
  const shakeY = (Math.random() - 0.5) * state.screenShake * tensionBoost;

  return (
    <GameLayout
      title={t("title")}
      emoji="👾"
      concept={t("concept")}
      intro={t("intro")}
      code={t("code")}
    >
      <div
        className={`space-y-4 ${danger > 0.72 && state.phase === "playing" ? "animate-pulse" : ""}`}
      >
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-gradient-to-br from-[#0a0e1a]/95 via-[#1a0f2e]/95 to-[#090d18]/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-2xl border-2 border-cyan-400/50 bg-slate-950/80 p-6 shadow-[0_0_40px_rgba(0,217,255,0.35)] text-center">
              <h2 className="text-3xl font-black text-cyan-300 tracking-wide mb-2">{t("title")}</h2>
              <p className="text-sm text-fuchsia-300 mb-6">{t("menuChoose")}</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {Object.entries(SKINS).map(([id, skinMeta]) => (
                  <button
                    key={id}
                    onClick={() => setSkin(id as SkinId)}
                    className={`h-14 rounded-xl border-2 text-2xl transition ${
                      skin === id
                        ? "border-cyan-300 bg-cyan-400/20 shadow-[0_0_18px_rgba(0,217,255,0.7)]"
                        : "border-cyan-700/60 bg-cyan-900/20 hover:border-cyan-300"
                    }`}
                    title={skinMeta.label}
                  >
                    {skinMeta.ship}
                  </button>
                ))}
              </div>
                <div className="rounded-xl border border-cyan-500/40 bg-cyan-900/20 p-4 mb-4">
                  <div className="text-xs uppercase tracking-wide text-cyan-300 mb-2">
                    {t("menuPreview")}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {/* Use the exact same aircraft rendering as in-game */}
                    <div
                      className={`relative w-32 h-24 ${SKINS[skin].glow}`}
                    >
                      {renderAircraft(skin, "large")}
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-cyan-100 font-bold">{SKINS[skin].label}</div>
                    </div>
                  </div>
                </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  onClick={() => selectDifficulty("arcade")}
                  className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition ${
                    difficulty === "arcade"
                      ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                      : "border-border text-white/80 hover:border-cyan-300"
                  }`}
                >
                  {t("arcade")}
                </button>
                <button
                  onClick={() => selectDifficulty("insane")}
                  className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition ${
                    difficulty === "insane"
                      ? "border-red-300 bg-red-300/20 text-red-100"
                      : "border-border text-white/80 hover:border-red-300"
                  }`}
                >
                  {t("insane")}
                </button>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-xl bg-cyan-400/20 border-2 border-cyan-300 text-cyan-100 font-black text-lg hover:scale-105 transition shadow-[0_0_22px_rgba(0,217,255,0.6)]"
              >
                {t("startGame")} 🚀
              </button>
            </div>
          </div>
        )}
         <div className="flex flex-wrap items-center gap-2 justify-between text-sm font-semibold">
           <div>
             {t("score")}: <span className="text-primary">{state.score}</span>
           </div>
           <div>
             {t("level")}: <span className="text-[var(--fun-blue)]">{state.level}</span>
           </div>
           <div>
             {t("lives")}:{" "}
             <span className="text-[var(--fun-red)]">{"❤️".repeat(Math.max(0, state.lives))}</span>
           </div>
           <div>
             {t("combo")}: <span className="text-[var(--fun-pink)]">x{state.combo}</span>
           </div>
           <div className="flex items-center gap-2">
             <span>🏆 {t("bestScore")}: {best}</span>
            <button
              onClick={togglePause}
              className="text-xs px-2 py-1 rounded border border-cyan-400/60 bg-cyan-500/10 hover:bg-cyan-500/20"
            >
              {paused ? `▶ ${t("resume")}` : `⏸ ${t("pause")}`}
            </button>
            <button
              onClick={resetToMenu}
              className="text-xs px-2 py-1 rounded border border-cyan-400/60 bg-cyan-500/10 hover:bg-cyan-500/20"
            >
              ↺ {t("restartRun")}
            </button>
          </div>
        </div>

        <div className="flex gap-1.5">
          {Array.from({ length: DIFFICULTY[difficulty].startingLives }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 w-6 rounded border border-cyan-400/50 ${
                idx < state.lives
                  ? "bg-cyan-300 shadow-[0_0_8px_rgba(0,217,255,0.6)]"
                  : "bg-cyan-900/20"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-b from-[#0b1120] via-[#160e2f] to-[#090d18] p-3 shadow-[0_0_36px_rgba(0,217,255,0.25)]">
          <div
            className="relative mx-auto overflow-hidden rounded-xl border border-cyan-400/40"
            style={{
              width: BOARD.w,
              height: BOARD.h,
              maxWidth: "100%",
              transform: `translate(${shakeX}px, ${shakeY}px)`,
            }}
          >
            <div className="absolute -top-20 -left-24 h-56 w-56 rounded-full bg-cyan-500/18 blur-3xl animate-pulse" />
            <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-fuchsia-700/20 blur-3xl animate-pulse" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_2px,transparent_2px,transparent_7px)] opacity-25 pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 30%, rgba(255, 45, 114, 0.28) 100%)",
                opacity: danger,
              }}
            />
            <div className="absolute left-0 right-0 top-0 h-7 bg-gradient-to-b from-cyan-900/30 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 h-7 bg-gradient-to-t from-fuchsia-900/30 to-transparent" />
            {rivets.map((r) => (
              <div key={r.id}>
                <div
                  className="absolute top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-500/60 border border-cyan-300/70"
                  style={{ left: r.left }}
                />
                <div
                  className="absolute bottom-1.5 h-2.5 w-2.5 rounded-full bg-fuchsia-500/60 border border-fuchsia-300/70"
                  style={{ left: r.left }}
                />
              </div>
            ))}
            {stars.map((s) => (
              <div
                key={s.id}
                className="absolute rounded-full bg-white/70"
                style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
              />
            ))}

            {state.level % 4 === 0 && state.boss && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-pink-300 animate-bounce">
                {t("boss")}
              </div>
            )}
            {state.boss && (
              <div className="absolute left-4 right-4 top-2 z-10">
                <div className="text-[10px] text-center text-cyan-100 font-bold mb-1">BOSS HP</div>
                <div className="h-2 bg-black/50 border border-cyan-400/50 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400"
                    style={{ width: `${Math.max(0, (state.boss.hp / state.boss.maxHp) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {state.enemies.map((e) => (
              <div
                key={e.id}
                className="absolute text-xl drop-shadow-[0_0_9px_rgba(255,45,114,0.9)]"
                style={{
                  left: e.x,
                  top: e.y,
                  width: e.w,
                  height: e.h,
                  transform: `translateY(${(e.id % 2) * 2}px)`,
                }}
              >
                {e.hp > 1 ? "👾" : "👽"}
              </div>
            ))}

            {state.boss && (
              <div
                className="absolute text-5xl drop-shadow-[0_0_20px_rgba(168,108,255,0.95)] animate-pulse"
                style={{
                  left: state.boss.x,
                  top: state.boss.y,
                  width: state.boss.w,
                  height: state.boss.h,
                }}
              >
                👹
              </div>
            )}

            {state.bullets.map((b) => (
              <div
                key={b.id}
                className={`absolute rounded-full ${
                  b.fromEnemy
                    ? "bg-amber-400 shadow-[0_0_10px_rgba(255,183,3,0.95)]"
                    : `${SKINS[skin].bulletClass} shadow-[0_0_10px_rgba(0,217,255,0.95)]`
                }`}
                style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
              />
            ))}

            {state.powerUps.map((p) => (
              <div
                key={p.id}
                className="absolute text-sm"
                style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
                title={p.kind}
              >
                {p.kind === "rapid" ? "🔥" : p.kind === "shield" ? "🛡️" : "🧲"}
              </div>
            ))}

            <div
              className={`absolute bottom-3 ${SKINS[skin].glow} ${hasShield ? "animate-pulse" : ""}`}
              style={{ left: state.playerX, width: PLAYER.w, height: PLAYER.h }}
            >
              {/* Use the exact same aircraft rendering as in the preview - automatically scales with container */}
              {renderAircraft(skin, "large")}
            </div>

            {paused && !menuOpen && state.phase === "playing" && (
              <div className="absolute inset-0 bg-black/65 flex items-center justify-center text-3xl font-black text-cyan-300">
                ⏸ {t("pause")}
              </div>
            )}

            {state.phase === "menu" && !menuOpen && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 text-center">
                <div className="text-3xl">👾</div>
                <div className="text-white font-bold">{t("controls")}</div>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-cyan-200 uppercase tracking-wide">
                    {t("difficulty")}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectDifficulty("arcade")}
                      className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition ${
                        difficulty === "arcade"
                          ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                          : "border-border text-white/80 hover:border-cyan-300"
                      }`}
                    >
                      {t("arcade")}
                    </button>
                    <button
                      onClick={() => selectDifficulty("insane")}
                      className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition ${
                        difficulty === "insane"
                          ? "border-red-300 bg-red-300/20 text-red-100"
                          : "border-border text-white/80 hover:border-red-300"
                      }`}
                    >
                      {t("insane")}
                    </button>
                  </div>
                  <div className="text-xs text-white/70 max-w-xs">
                    {difficulty === "arcade" ? t("arcadeHint") : t("insaneHint")}
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold hover:scale-105 transition"
                >
                  {t("startGame")}
                </button>
              </div>
            )}

            {state.phase === "gameover" && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 text-center">
                <div className="text-2xl font-extrabold text-red-300">{t("over")}</div>
                <div className="text-white">
                  {t("score")}: {state.score}
                </div>
                <button
                  onClick={startGame}
                  className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold hover:scale-105 transition"
                >
                  {t("restart")}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between text-xs sm:text-sm">
          <div className="font-semibold">
            {t("controls")}
            <div className="text-[11px] opacity-70 mt-1">{t("touchControls")}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t("difficulty")}:</span>
            <button
              onClick={() => selectDifficulty("arcade")}
              className={`px-3 py-1 rounded-full border-2 transition ${
                difficulty === "arcade" ? "border-cyan-300 bg-cyan-300/20" : "border-border"
              }`}
            >
              {t("arcade")}
            </button>
            <button
              onClick={() => selectDifficulty("insane")}
              className={`px-3 py-1 rounded-full border-2 transition ${
                difficulty === "insane" ? "border-red-300 bg-red-300/20" : "border-border"
              }`}
            >
              {t("insane")}
            </button>
            <span className="font-semibold">{t("skin")}:</span>
            {Object.entries(SKINS).map(([id, skinMeta]) => (
              <button
                key={id}
                onClick={() => setSkin(id as SkinId)}
                className={`px-3 py-1 rounded-full border-2 transition ${
                  skin === id
                    ? "border-cyan-300 bg-cyan-300/20"
                    : "border-border hover:border-cyan-400"
                }`}
              >
                {skinMeta.ship} {skinMeta.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-[11px] text-cyan-200/80">{t("keyboardHint")}</div>

        <div className="rounded-xl border border-cyan-500/45 bg-cyan-900/20 px-3 py-2 text-xs sm:text-sm">
          <div className="flex items-center justify-between font-semibold mb-1">
            <span>⚠️ {t("danger")}</span>
            <span>{Math.round(danger * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-black/40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-150"
              style={{ width: `${Math.max(6, danger * 100)}%` }}
            />
          </div>
        </div>

        <div className="sm:hidden grid grid-cols-3 gap-2 text-sm font-bold">
          <button
            {...touchHandlers("left")}
            className="rounded-xl border-2 border-cyan-700/50 bg-cyan-950/50 py-3 active:scale-95"
          >
            ◀ {t("left")}
          </button>
          <button
            {...touchHandlers("fire")}
            className="rounded-xl border-2 border-cyan-300 bg-cyan-400/30 text-cyan-100 py-3 active:scale-95"
          >
            🔫 {t("fire")}
          </button>
          <button
            {...touchHandlers("right")}
            className="rounded-xl border-2 border-cyan-700/50 bg-cyan-950/50 py-3 active:scale-95"
          >
            {t("right")} ▶
          </button>
        </div>

         <div className="flex gap-2 text-xs font-semibold">
           <span
             className={`px-2 py-1 rounded-full ${hasRapid ? "bg-yellow-300 text-black" : "bg-secondary"}`}
           >
             ⚡ {t("rapidFire")}
           </span>
           <span
             className={`px-2 py-1 rounded-full ${hasShield ? "bg-sky-300 text-black" : "bg-secondary"}`}
           >
             🛡️ {t("shield")}
           </span>
           <span
             className={`px-2 py-1 rounded-full ${hasSpread ? "bg-fuchsia-300 text-black" : "bg-secondary"}`}
           >
             ✨ {t("spreadShot")}
           </span>
         </div>
      </div>
    </GameLayout>
  );
}
