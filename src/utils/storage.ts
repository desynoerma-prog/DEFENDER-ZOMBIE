import { UserStats, Badge, StudentProfile, AdventureLevel, ArenaTheme } from '../types';
import { INITIAL_BADGES } from '../data/levels';

const STORAGE_KEY = 'percent_defender_user_stats';
const PROFILE_KEY = 'percent_defender_current_student';
const PROFILES_LIST_KEY = 'percent_defender_student_list';
const PREFS_KEY = 'percent_defender_preferences';

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'default_student_1',
  name: 'Siswa Kelas 4 SD',
  grade: 'Kelas 4-A',
  avatar: 'sunflower',
  lastPlayed: new Date().toLocaleDateString('id-ID'),
  score: 0
};

export function loadCurrentStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load student profile:', e);
  }
  return DEFAULT_STUDENT_PROFILE;
}

export function saveCurrentStudentProfile(profile: StudentProfile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    // Also update in list
    const list = loadSavedStudentProfiles();
    const idx = list.findIndex((p) => p.id === profile.id);
    if (idx >= 0) {
      list[idx] = profile;
    } else {
      list.push(profile);
    }
    saveStudentProfilesList(list);
  } catch (e) {
    console.warn('Failed to save student profile:', e);
  }
}

export function loadSavedStudentProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load student profiles list:', e);
  }
  return [DEFAULT_STUDENT_PROFILE];
}

export function saveStudentProfilesList(list: StudentProfile[]) {
  try {
    localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Failed to save student profiles list:', e);
  }
}

export interface GamePreferences {
  adventureLevel: AdventureLevel;
  arenaTheme: ArenaTheme;
}

export function loadGamePreferences(): GamePreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load preferences:', e);
  }
  return {
    adventureLevel: 'lower',
    arenaTheme: 'garden'
  };
}

export function saveGamePreferences(prefs: GamePreferences) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Failed to save preferences:', e);
  }
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        highScore: parsed.highScore || 0,
        totalQuestionsAnswered: parsed.totalQuestionsAnswered || 0,
        totalCorrectAnswers: parsed.totalCorrectAnswers || 0,
        highestCombo: parsed.highestCombo || 0,
        levelsUnlocked: Math.max(1, parsed.levelsUnlocked || 1),
        badges: Array.isArray(parsed.badges) ? parsed.badges : []
      };
    }
  } catch (e) {
    console.warn('Failed to load stats from localStorage:', e);
  }

  return {
    highScore: 0,
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    highestCombo: 0,
    levelsUnlocked: 1,
    badges: []
  };
}

export function saveUserStats(stats: UserStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Failed to save stats to localStorage:', e);
  }
}

export function unlockBadge(badgeId: string): boolean {
  const stats = loadUserStats();
  if (!stats.badges.includes(badgeId)) {
    stats.badges.push(badgeId);
    saveUserStats(stats);
    return true; // Newly unlocked
  }
  return false;
}

export function getBadgesWithStatus(): Badge[] {
  const stats = loadUserStats();
  return INITIAL_BADGES.map((b) => ({
    ...b,
    unlocked: stats.badges.includes(b.id)
  }));
}

