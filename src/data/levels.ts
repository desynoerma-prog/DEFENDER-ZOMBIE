import { LevelConfig, Badge } from '../types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Number Forest',
    subtitle: 'Hutan Bilangan & Pecahan',
    worldName: 'Dunia 1: Bilangan',
    theme: 'garden',
    totalWaves: 5,
    description: 'Pelajari bilangan cacah sampai 10.000, nilai tempat, operasi hitung sampai 1.000, faktor, kelipatan, dan pecahan.',
    allowedDifficulties: ['easy'],
    hasBoss: false,
    bgGradient: 'from-emerald-100 via-teal-50 to-green-100',
    laneColor: 'bg-emerald-200/50'
  },
  {
    id: 2,
    title: 'Algebra Valley',
    subtitle: 'Lembah Aljabar & Pola',
    worldName: 'Dunia 2: Aljabar',
    theme: 'forest',
    totalWaves: 5,
    description: 'Temukan nilai yang belum diketahui (□), hubungan operasi hitung, serta pola bilangan membesar dan mengecil.',
    allowedDifficulties: ['easy', 'medium'],
    hasBoss: false,
    bgGradient: 'from-green-100 via-lime-50 to-emerald-100',
    laneColor: 'bg-lime-200/50'
  },
  {
    id: 3,
    title: 'Measurement Meadow',
    subtitle: 'Padang Rumput Pengukuran',
    worldName: 'Dunia 3: Pengukuran',
    theme: 'valley',
    totalWaves: 5,
    description: 'Kuasai pengukuran panjang (cm, m), berat (g, kg), estimasi, serta luas dan volume satuan tak baku dan baku.',
    allowedDifficulties: ['easy', 'medium'],
    hasBoss: false,
    bgGradient: 'from-amber-50 via-yellow-50 to-orange-100',
    laneColor: 'bg-amber-200/50'
  },
  {
    id: 4,
    title: 'Geometry Garden',
    subtitle: 'Taman Geometri & Poligon',
    worldName: 'Dunia 4: Geometri',
    theme: 'jungle',
    totalWaves: 6,
    description: 'Identifikasi segiempat, segitiga, poligon, sifat sisi dan sudut, serta penyusunan dan penguraian bangun datar.',
    allowedDifficulties: ['medium', 'hard'],
    hasBoss: false,
    bgGradient: 'from-cyan-50 via-sky-50 to-teal-100',
    laneColor: 'bg-sky-200/50'
  },
  {
    id: 5,
    title: 'Data City & Boss Arena',
    subtitle: 'Kota Data & Tantangan Raja',
    worldName: 'Dunia 5: Data',
    theme: 'kingdom',
    totalWaves: 6, // Wave 6 triggers Boss Challenge!
    description: 'Analisis tabel, piktogram, diagram batang, dan hadapi FINAL BOSS Tantangan Matematika Terbesar!',
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
