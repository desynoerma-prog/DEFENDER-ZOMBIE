export type Difficulty = 'easy' | 'medium' | 'hard';
export type AdventureLevel = 'lower' | 'middle' | 'strong';
export type ArenaTheme = 'garden' | 'water' | 'roof';
export type QuestionType = 'A_PERCENT_TO_FRACTION' | 'B_PERCENT_TO_DECIMAL' | 'C_PERCENT_TO_BOTH' | 'D_IDENTIFY_CORRECT';

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  adventureTier?: AdventureLevel;
  topic: string;
  questionText: string;
  highlightText?: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation: string;
  hints: string[]; // 3-step progressive hints
}

export type PlantType =
  | 'peashooter'
  | 'sunflower'
  | 'cherrybomb'
  | 'wallnut'
  | 'potatomine'
  | 'iceshooter'
  | 'chomper'
  | 'repeater'
  | 'threepeater'
  | 'squash'
  | 'jalapeno'
  | 'torchwood'
  | 'tallnut'
  | 'gatlingpea'
  | 'twinsunflower';

export interface PlantCard {
  type: PlantType;
  name: string;
  cost: number;
  cooldown: number; // in seconds
  icon: string;
  description: string;
}

export interface PlacedPlant {
  id: string;
  type: PlantType;
  row: number; // 0 to 4
  col: number; // 0 to 8
  hp: number;
  maxHp: number;
  lastShootTime?: number;
  lastSunTime?: number;
  armedTime?: number; // for potato mine
  isEating?: boolean;
}

export type ZombieType = 'normal' | 'conehead' | 'buckethead' | 'flag' | 'percent_king';

export interface ZombieInstance {
  id: string;
  type: ZombieType;
  name: string;
  row: number; // 0 to 4
  x: number; // 0 (left / house) to 100 (right / spawn)
  hp: number;
  maxHp: number;
  speed: number;
  isEating: boolean;
  eatingPlantId?: string;
  isHit: boolean;
  isFrozen: boolean;
  frozenTimer: number;
  isBoss?: boolean;
}

export interface SunOrb {
  id: string;
  x: number; // percentage 0 to 100
  y: number; // percentage 0 to 100
  targetY: number;
  value: number;
  createdAt: number;
  isCollected?: boolean;
}

export interface ProjectileInstance {
  id: string;
  row: number;
  x: number; // percentage 0 to 100
  speed: number;
  damage: number;
  isIce?: boolean;
  text: string;
}

export interface LawnMower {
  row: number;
  active: boolean; // still at garden gate
  isTriggered: boolean; // rolling forward
  x: number; // percentage 0 to 100
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  worldName: string;
  theme: string;
  totalWaves: number;
  description: string;
  allowedDifficulties: Difficulty[];
  hasBoss: boolean;
  bgGradient: string;
  laneColor: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  highScore: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  highestCombo: number;
  levelsUnlocked: number;
  badges: string[]; // badge ids
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: string; // e.g. "Kelas 4-A"
  avatar: string; // plant icon type
  lastPlayed?: string;
  score?: number;
}

export type GameScreen = 'TITLE' | 'MENU' | 'LEVEL_SELECT' | 'PLAYING' | 'CLASSROOM' | 'VICTORY' | 'GAMEOVER';
