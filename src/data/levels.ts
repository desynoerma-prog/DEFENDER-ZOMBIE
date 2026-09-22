import { LevelConfig, Badge } from '../types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Percent Garden',
    subtitle: 'Taman Dasar Persen',
    worldName: 'Dunia 1',
    theme: 'garden',
    totalWaves: 5,
    description: 'Pelajari konsep dasar persen sebagai per seratus dan pecahan sederhana (25%, 50%, 75%, 10%).',
    allowedDifficulties: ['easy'],
    hasBoss: false,
    bgGradient: 'from-emerald-100 via-teal-50 to-green-100',
    laneColor: 'bg-emerald-200/50'
  },
  {
    id: 2,
    title: 'Fraction Forest',
    subtitle: 'Hutan Pecahan Sederhana',
    worldName: 'Dunia 2',
    theme: 'forest',
    totalWaves: 5,
    description: 'Tantangan mengubah persen menjadi pecahan biasa dan menyederhanakannya (20%, 40%, 60%, 80%).',
    allowedDifficulties: ['easy', 'medium'],
    hasBoss: false,
    bgGradient: 'from-green-100 via-lime-50 to-emerald-100',
    laneColor: 'bg-lime-200/50'
  },
  {
    id: 3,
    title: 'Decimal Valley',
    subtitle: 'Lembah Bilangan Desimal',
    worldName: 'Dunia 3',
    theme: 'valley',
    totalWaves: 5,
    description: 'Ubah persen menjadi bilangan desimal dengan tanda koma Indonesia (0,25; 0,5; 0,75; 0,4).',
    allowedDifficulties: ['easy', 'medium'],
    hasBoss: false,
    bgGradient: 'from-amber-50 via-yellow-50 to-orange-100',
    laneColor: 'bg-amber-200/50'
  },
  {
    id: 4,
    title: 'Math Jungle',
    subtitle: 'Rimba Konversi Campuran',
    worldName: 'Dunia 4',
    theme: 'jungle',
    totalWaves: 6,
    description: 'Uji kemampuan menghubungkan persen, pecahan, dan bilangan desimal sekaligus!',
    allowedDifficulties: ['medium', 'hard'],
    hasBoss: false,
    bgGradient: 'from-cyan-50 via-sky-50 to-teal-100',
    laneColor: 'bg-sky-200/50'
  },
  {
    id: 5,
    title: 'Percent Kingdom',
    subtitle: 'Kerajaan Raja Persen',
    worldName: 'Dunia 5',
    theme: 'kingdom',
    totalWaves: 6, // Wave 6 is the final Boss Percent King!
    description: 'Kalahkan monster terkuat dan hadapi Boss PERCENT KING untuk menyelamatkan Math Garden!',
    allowedDifficulties: ['medium', 'hard'],
    hasBoss: true,
    bgGradient: 'from-purple-100 via-pink-50 to-rose-100',
    laneColor: 'bg-purple-200/50'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge_beginner',
    name: 'Percent Beginner',
    icon: '🥉',
    description: 'Menyelesaikan World 1: Percent Garden dengan baik.',
    unlocked: false
  },
  {
    id: 'badge_defender',
    name: 'Fraction Defender',
    icon: '🥈',
    description: 'Menyelesaikan World 2: Fraction Forest dengan sukses.',
    unlocked: false
  },
  {
    id: 'badge_master',
    name: 'Decimal Master',
    icon: '🥇',
    description: 'Menyelesaikan World 3: Decimal Valley dan menguasai desimal.',
    unlocked: false
  },
  {
    id: 'badge_guardian',
    name: 'Math Guardian',
    icon: '💎',
    description: 'Mencapai skor lebih dari 1.500 poin atau menyelesaikan World 4.',
    unlocked: false
  },
  {
    id: 'badge_legend',
    name: 'Percent Legend',
    icon: '🌟',
    description: 'Mengalahkan Percent King di World 5 dan menyelamatkan Math Garden!',
    unlocked: false
  },
  {
    id: 'badge_combo_master',
    name: 'Combo Master',
    icon: '🔥',
    description: 'Mencapai Combo ×5 beruntun tanpa salah.',
    unlocked: false
  }
];
