import React, { useState } from 'react';
import {
  Play,
  ArrowLeft,
  Sparkles,
  Layers,
  Compass,
  BookOpen,
  HelpCircle,
  Check,
  Plus,
  RotateCcw,
  Zap,
  Shield,
  Sun,
  Flame,
  Snowflake,
  Volume2,
  VolumeX,
  UserCheck
} from 'lucide-react';
import { AdventureLevel, ArenaTheme, PlantCard, StudentProfile } from '../types';
import { PLANT_CARDS } from '../data/plants';
import { soundManager } from '../utils/audio';
import { PlantGraphic } from './Characters';

export interface MainMenuProps {
  currentProfile: StudentProfile;
  onOpenProfileModal: () => void;
  selectedAdventureLevel: AdventureLevel;
  onSelectAdventureLevel: (lvl: AdventureLevel) => void;
  selectedArenaTheme: ArenaTheme;
  onSelectArenaTheme: (theme: ArenaTheme) => void;
  selectedTopicId: number;
  onSelectTopicId: (topicId: number) => void;
  activeDeck: PlantCard[];
  onUpdateDeck: (deck: PlantCard[]) => void;
  onStartGame: () => void;
  onOpenLevelSelect: () => void;
  onOpenClassroom: () => void;
  onOpenAlmanac: () => void;
  onOpenHowToPlay: () => void;
  onBackToTitle: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  highScore?: number;
}

interface MathTopicOption {
  id: number;
  name: string;
  element: string;
  icon: string;
  tag: string;
  description: string;
  badgeBg: string;
}

const MATH_TOPICS: MathTopicOption[] = [
  {
    id: 1,
    name: 'Bilangan & Pecahan',
    element: 'BILANGAN',
    icon: '🔢',
    tag: 'Dunia 1',
    description: 'Nilai tempat s.d. 10.000, operasi bilangan, pecahan senilai, persen & desimal.',
    badgeBg: 'bg-emerald-500'
  },
  {
    id: 2,
    name: 'Aljabar & Pola',
    element: 'ALJABAR',
    icon: '🧩',
    tag: 'Dunia 2',
    description: 'Menemukan nilai yang belum diketahui (□ + 25 = 70), pola bilangan membesar & mengecil.',
    badgeBg: 'bg-amber-500'
  },
  {
    id: 3,
    name: 'Pengukuran Satuan',
    element: 'PENGUKURAN',
    icon: '📏',
    tag: 'Dunia 3',
    description: 'Konversi satuan panjang (m, cm), berat (kg, g), keliling & luas petak satuan.',
    badgeBg: 'bg-sky-500'
  },
  {
    id: 4,
    name: 'Geometri & Poligon',
    element: 'GEOMETRI',
    icon: '📐',
    tag: 'Dunia 4',
    description: 'Sifat segitiga, segiempat, sudut siku-siku, poligon, komposisi & dekomposisi bangun datar.',
    badgeBg: 'bg-purple-500'
  },
  {
    id: 5,
    name: 'Analisis Data & Boss',
    element: 'ANALISIS DATA',
    icon: '📊',
    tag: 'Dunia 5',
    description: 'Tabel frekuensi, diagram batang, piktogram berskala, dan pertempuran Raja Persen.',
    badgeBg: 'bg-rose-500'
  }
];

// Recommended 10 Starter Weapons (balanced offensive & defensive)
const RECOMMENDED_DECK_TYPES: string[] = [
  'sunflower',
  'peashooter',
  'wallnut',
  'cherrybomb',
  'potatomine',
  'iceshooter',
  'repeater',
  'threepeater',
  'squash',
  'jalapeno'
];

export const MainMenu: React.FC<MainMenuProps> = ({
  currentProfile,
  onOpenProfileModal,
  selectedAdventureLevel,
  onSelectAdventureLevel,
  selectedArenaTheme,
  onSelectArenaTheme,
  selectedTopicId,
  onSelectTopicId,
  activeDeck,
  onUpdateDeck,
  onStartGame,
  onOpenClassroom,
  onOpenAlmanac,
  onOpenHowToPlay,
  onBackToTitle,
  isMuted,
  onToggleMute
}) => {
  // Ensure deck has up to 10 plants
  const selectedCards = activeDeck.slice(0, 10);

  const isCardSelected = (type: string) => {
    return selectedCards.some((c) => c.type === type);
  };

  const handleToggleCard = (card: PlantCard) => {
    soundManager.playClick();
    if (isCardSelected(card.type)) {
      // Remove card
      onUpdateDeck(selectedCards.filter((c) => c.type !== card.type));
    } else {
      // Add card (max 10)
      if (selectedCards.length < 10) {
        onUpdateDeck([...selectedCards, card]);
      } else {
        // Deck full, replace last card or alert
        soundManager.playClick();
        const newDeck = [...selectedCards.slice(0, 9), card];
        onUpdateDeck(newDeck);
      }
    }
  };

  const handleRemoveSlot = (index: number) => {
    soundManager.playClick();
    const newDeck = selectedCards.filter((_, i) => i !== index);
    onUpdateDeck(newDeck);
  };

  const handleSelectRecommendedDeck = () => {
    soundManager.playClick();
    const recommended = PLANT_CARDS.filter((c) => RECOMMENDED_DECK_TYPES.includes(c.type));
    onUpdateDeck(recommended);
  };

  const handleResetDeck = () => {
    soundManager.playClick();
    onUpdateDeck([]);
  };

  const handleStartBattle = () => {
    // If fewer than 10, fill up with recommended plants
    if (selectedCards.length < 10) {
      const neededCount = 10 - selectedCards.length;
      const currentTypes = new Set(selectedCards.map((c) => c.type));
      const candidates = PLANT_CARDS.filter((c) => !currentTypes.has(c.type));
      const autoFilled = [...selectedCards, ...candidates.slice(0, neededCount)];
      onUpdateDeck(autoFilled);
    }
    soundManager.playGameStart();
    onStartGame();
  };

  return (
    <div
      id="game-setup-lobby"
      className="min-h-screen w-full bg-gradient-to-b from-[#142917] via-[#1e3a24] to-[#0f1f13] text-slate-100 flex flex-col items-center justify-between p-3 sm:p-5 select-none font-sans overflow-x-hidden"
    >
      {/* 1. TOP HEADER: Back to Title Screen, Active Player Profile, Quick Tools */}
      <header className="w-full max-w-6xl flex items-center justify-between gap-2 flex-wrap mb-3">
        {/* Back Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToTitle();
          }}
          className="px-3 py-2 bg-[#3e220a]/90 hover:bg-[#5a3311] border-2 border-amber-400 text-amber-200 rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
          title="Kembali ke Halaman Judul Depan"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Halaman Awal</span>
        </button>

        {/* Center: Title Badge */}
        <div className="flex items-center gap-2 bg-[#2d1b0b]/90 border-2 border-amber-400 rounded-2xl px-4 py-1.5 shadow-xl">
          <span className="text-xl">🛡️</span>
          <div className="text-center">
            <h2 className="text-sm sm:text-base font-black text-yellow-300 font-heading tracking-wide uppercase">
              Menu Persiapan Petualangan
            </h2>
            <p className="text-[10px] text-amber-200/90 font-bold">
              Konfigurasi Materi, Soal, Tempat & 10 Senjata Pilihan
            </p>
          </div>
        </div>

        {/* Right: Profile & Audio */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#2d1b0b]/90 border border-amber-400/80 rounded-2xl px-3 py-1.5 shadow-md">
            <div className="w-7 h-7 rounded-xl bg-emerald-100 border border-emerald-400 flex items-center justify-center shrink-0">
              <PlantGraphic type={(currentProfile.avatar as any) || 'sunflower'} className="w-6 h-6" />
            </div>
            <div className="text-left text-xs">
              <span className="font-black text-white block leading-tight truncate max-w-[100px] sm:max-w-[140px]">
                {currentProfile.name}
              </span>
              <span className="text-[10px] text-amber-300 font-medium">
                {currentProfile.grade || 'Kelas 4 SD'}
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProfileModal();
              }}
              className="ml-1 text-[10px] bg-amber-500 text-amber-950 px-2 py-0.5 rounded-lg font-black cursor-pointer hover:bg-amber-400"
              title="Ganti Profil Siswa"
            >
              Ganti
            </button>
          </div>

          <button
            onClick={onToggleMute}
            className="p-2 bg-[#2d1b0b]/90 hover:bg-[#3e220a] border border-amber-400/80 text-amber-300 rounded-2xl shadow-md transition-transform cursor-pointer"
            title={isMuted ? 'Nyalakan Musik' : 'Matikan Musik'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. MAIN CONFIGURATION BODY (4 SECTIONS REQUIRED) */}
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-4">
        
        {/* ROW 1: (1. MATERI) & (2. TINGKAT SOAL) & (3. LATAR TEMPAT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          
          {/* MENU 1: MATERI PEMBELAJARAN (5 ELEMEN MATEMATIKA) */}
          <section className="lg:col-span-6 bg-[#2d1b0b]/95 border-3 border-amber-500 rounded-3xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-700/50">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-heading">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-xs font-black">1</span>
                  Pilih Materi Matematika (SD Kelas 4):
                </span>
                <span className="text-[10px] text-amber-200/80 font-bold bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-600/40">
                  {selectedTopicId === 0 ? 'Semua Materi' : `Dunia ${selectedTopicId}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MATH_TOPICS.map((topic) => {
                  const isSelected = selectedTopicId === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        soundManager.playClick();
                        onSelectTopicId(topic.id);
                      }}
                      className={`group relative p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-amber-500 text-amber-950 border-yellow-200 shadow-lg ring-2 ring-yellow-300 scale-[1.02]'
                          : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-white border-amber-700/60'
                      }`}
                    >
                      <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-black/20 group-hover:scale-110 transition-transform">
                        {topic.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black font-heading truncate ${isSelected ? 'text-amber-950' : 'text-amber-200'}`}>
                            {topic.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-950 shrink-0 font-black" />}
                        </div>
                        <p className={`text-[10px] line-clamp-2 mt-0.5 leading-snug ${isSelected ? 'text-amber-900 font-medium' : 'text-slate-300'}`}>
                          {topic.description}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {/* Option 6: Semua Materi Campuran */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onSelectTopicId(1); // Defaults to Level 1 with full mixed engine
                  }}
                  className={`group relative p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-2.5 sm:col-span-2 ${
                    selectedTopicId === 0
                      ? 'bg-amber-500 text-amber-950 border-yellow-200 shadow-lg ring-2 ring-yellow-300 scale-[1.01]'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-white border-amber-700/60'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-black/20 group-hover:scale-110 transition-transform">
                    🌟
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-black font-heading block ${selectedTopicId === 0 ? 'text-amber-950' : 'text-amber-200'}`}>
                      Semua Materi (Petualangan Terpadu Campuran)
                    </span>
                    <p className={`text-[10px] mt-0.5 leading-snug ${selectedTopicId === 0 ? 'text-amber-900 font-medium' : 'text-slate-300'}`}>
                      Kombinasi lengkap 5 elemen: Bilangan, Aljabar, Pengukuran, Geometri, dan Analisis Data secara acak adaptif.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: (2. TINGKAT SOAL) & (3. LATAR TEMPAT) */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            
            {/* MENU 2: TINGKAT SOAL (LOWER, MIDDLE, STRONG) */}
            <section className="bg-[#2d1b0b]/95 border-3 border-amber-500 rounded-3xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-700/50">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-heading">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-xs font-black">2</span>
                  Tingkat Soal Matematika:
                </span>
                <span className="text-[10px] text-amber-200/80 font-bold">
                  {selectedAdventureLevel === 'lower' && '🟢 Tingkat Dasar'}
                  {selectedAdventureLevel === 'middle' && '🟡 Tingkat Menengah'}
                  {selectedAdventureLevel === 'strong' && '🔴 Tingkat HOTS'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectAdventureLevel('lower');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                    selectedAdventureLevel === 'lower'
                      ? 'bg-emerald-500 text-white border-yellow-300 shadow-lg ring-2 ring-yellow-300 scale-105'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-emerald-300 border-emerald-700/50'
                  }`}
                >
                  <span className="text-lg">🟢</span>
                  <span className="text-xs font-black font-heading mt-1">LOWER</span>
                  <span className="text-[9px] opacity-90 leading-tight mt-0.5">
                    Fondasi & Pemula
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectAdventureLevel('middle');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                    selectedAdventureLevel === 'middle'
                      ? 'bg-amber-500 text-amber-950 border-yellow-200 shadow-lg ring-2 ring-yellow-300 scale-105'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-amber-300 border-amber-700/50'
                  }`}
                >
                  <span className="text-lg">🟡</span>
                  <span className="text-xs font-black font-heading mt-1">MIDDLE</span>
                  <span className="text-[9px] opacity-90 leading-tight mt-0.5">
                    Standar Kelas 4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectAdventureLevel('strong');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                    selectedAdventureLevel === 'strong'
                      ? 'bg-rose-500 text-white border-yellow-300 shadow-lg ring-2 ring-yellow-300 scale-105'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-rose-300 border-rose-700/50'
                  }`}
                >
                  <span className="text-lg">🔴</span>
                  <span className="text-xs font-black font-heading mt-1">STRONG</span>
                  <span className="text-[9px] opacity-90 leading-tight mt-0.5">
                    Penalaran HOTS
                  </span>
                </button>
              </div>
            </section>

            {/* MENU 3: LATAR TEMPAT (GARDEN, POOL, ROOF) */}
            <section className="bg-[#2d1b0b]/95 border-3 border-amber-500 rounded-3xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-700/50">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-heading">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-xs font-black">3</span>
                  Pilih Latar Tempat Arena:
                </span>
                <span className="text-[10px] text-amber-200/80 font-bold">
                  {selectedArenaTheme === 'garden' && '🌱 5 Jalur Rumput'}
                  {selectedArenaTheme === 'water' && '🌊 6 Jalur (Air & Rumput)'}
                  {selectedArenaTheme === 'roof' && '🏠 5 Jalur Miring Genteng'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectArenaTheme('garden');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                    selectedArenaTheme === 'garden'
                      ? 'bg-emerald-600 text-white border-yellow-300 shadow-lg ring-2 ring-yellow-300 scale-105'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-emerald-300 border-emerald-700/50'
                  }`}
                >
                  <span className="text-lg">🌱</span>
                  <span className="text-xs font-black font-heading mt-1">Taman (Garden)</span>
                  <span className="text-[9px] opacity-90 leading-tight mt-0.5">5 Jalur Rumput</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectArenaTheme('water');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                    selectedArenaTheme === 'water'
                      ? 'bg-sky-600 text-white border-yellow-300 shadow-lg ring-2 ring-yellow-300 scale-105'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-sky-300 border-sky-700/50'
                  }`}
                >
                  <span className="text-lg">🌊</span>
                  <span className="text-xs font-black font-heading mt-1">Kolam Air (Pool)</span>
                  <span className="text-[9px] opacity-90 leading-tight mt-0.5">6 Jalur + Air</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectArenaTheme('roof');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                    selectedArenaTheme === 'roof'
                      ? 'bg-amber-700 text-white border-yellow-300 shadow-lg ring-2 ring-yellow-300 scale-105'
                      : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-amber-300 border-amber-700/50'
                  }`}
                >
                  <span className="text-lg">🏠</span>
                  <span className="text-xs font-black font-heading mt-1">Genteng (Roof)</span>
                  <span className="text-[9px] opacity-90 leading-tight mt-0.5">5 Jalur Miring</span>
                </button>
              </div>
            </section>

          </div>
        </div>

        {/* ROW 2: (4. MEMILIH 10 SENJATA PADA MENU KARAKTER) */}
        <section className="bg-[#2d1b0b]/95 border-3 border-amber-500 rounded-3xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md flex flex-col gap-3">
          
          {/* Header of Weapon Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-700/50">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-xs font-black">4</span>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 font-heading">
                Pilih 10 Senjata Pertahanan (Karakter Tanaman):
              </h3>
            </div>

            {/* Counter and Helper Buttons */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm ${
                selectedCards.length === 10
                  ? 'bg-emerald-600 text-white border-emerald-300'
                  : 'bg-amber-900/90 text-yellow-300 border-amber-500'
              }`}>
                {selectedCards.length} / 10 Senjata Terpilih
              </span>

              <button
                onClick={handleSelectRecommendedDeck}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-xl text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-md transition-transform cursor-pointer"
                title="Otomatis pilih 10 senjata kombinasi terbaik"
              >
                <Zap className="w-3 h-3" />
                <span>Rekomendasi (10)</span>
              </button>

              <button
                onClick={handleResetDeck}
                className="px-2 py-1 bg-[#1e1207] hover:bg-[#381f0b] text-amber-300 border border-amber-700/70 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Kosongkan pilihan"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* ACTIVE DECK TRAY: 10 SLOTS */}
          <div className="bg-[#140b04]/90 p-2.5 rounded-2xl border-2 border-amber-600/60">
            <span className="text-[10px] font-black uppercase text-amber-400 block mb-1.5">
              🎒 Slot Deck Pertahanan yang Dibawa ke Arena (Klik ✖ untuk melepas):
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {Array.from({ length: 10 }).map((_, idx) => {
                const card = selectedCards[idx];
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl p-1.5 flex flex-col items-center justify-between min-h-[70px] sm:min-h-[82px] transition-all ${
                      card
                        ? 'bg-gradient-to-b from-amber-100 to-amber-200 text-slate-900 border-2 border-amber-400 shadow-md'
                        : 'border-2 border-dashed border-amber-700/50 bg-[#241306]/40 text-amber-600/60 flex items-center justify-center'
                    }`}
                  >
                    {card ? (
                      <>
                        <button
                          onClick={() => handleRemoveSlot(idx)}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-md hover:bg-rose-500 cursor-pointer"
                          title="Hapus senjata ini dari slot"
                        >
                          ×
                        </button>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                          <PlantGraphic type={card.type as any} className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                        <span className="text-[9px] font-black leading-tight text-center truncate w-full">
                          {card.name.split(' ')[0]}
                        </span>
                        <span className="text-[9px] font-black text-amber-800 bg-amber-300/80 px-1 rounded-sm">
                          ☀️ {card.cost}
                        </span>
                      </>
                    ) : (
                      <span className="text-[9px] font-bold text-center">
                        + Slot {idx + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* WEAPONS CATALOG: 15 AUTHENTIC PLANTS */}
          <div>
            <span className="text-[10px] font-black uppercase text-amber-300 block mb-1.5">
              🌻 Gudang Karakter Senjata Tanaman (Klik kartu untuk memilih/membatalkan):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {PLANT_CARDS.map((card) => {
                const selected = isCardSelected(card.type);
                return (
                  <button
                    key={card.type}
                    onClick={() => handleToggleCard(card)}
                    className={`relative p-2 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                      selected
                        ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400/50 shadow-md'
                        : 'bg-[#1e1207]/80 hover:bg-[#381f0b] text-slate-200 border-amber-800/60 hover:border-amber-500'
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/30 flex items-center justify-center shrink-0">
                      <PlantGraphic type={card.type as any} className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black font-heading truncate text-white block">
                          {card.name.split(' ')[0]}
                        </span>
                        <span className="text-[9px] font-black text-amber-400 shrink-0">
                          ☀️{card.cost}
                        </span>
                      </div>
                      <span className={`text-[9px] block truncate font-bold ${selected ? 'text-emerald-300' : 'text-amber-300/70'}`}>
                        {selected ? '✅ Terpilih' : '+ Pilih'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </section>

      </main>

      {/* 3. BOTTOM ACTIONS: Launch Game or Quick Tools */}
      <footer className="w-full max-w-6xl mt-4 pt-2 border-t border-amber-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Secondary Links: Classroom, Almanac, How to Play */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenClassroom();
            }}
            className="px-3 py-2 bg-emerald-800/90 hover:bg-emerald-700 border border-emerald-400 text-emerald-100 rounded-2xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            title="Mode Diskusi Guru & Siswa di Layar Proyektor"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mode Guru</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAlmanac();
            }}
            className="px-3 py-2 bg-[#783e10]/90 hover:bg-[#92400e] border border-amber-400 text-amber-200 rounded-2xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            title="Buku Panduan Karakter Tanaman & Monster"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Almanak</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenHowToPlay();
            }}
            className="px-2.5 py-2 bg-[#2d1b0b]/90 hover:bg-[#3e220a] border border-amber-600/70 text-amber-200 rounded-2xl text-xs font-bold shadow-md flex items-center gap-1 transition-all cursor-pointer"
            title="Petunjuk Cara Bermain"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MAIN LAUNCH BUTTON: BERANGKAT! MULAI PERMAINAN */}
        <button
          id="launch-adventure-btn"
          onClick={handleStartBattle}
          className="group relative w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-3xl border-4 border-[#2b1607] bg-gradient-to-b from-[#15803d] via-[#166534] to-[#14532d] shadow-[0_12px_28px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-3 ring-2 ring-yellow-400"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-200 flex items-center justify-center text-emerald-950 shrink-0 shadow-md group-hover:rotate-12 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>

          <span
            className="text-lg sm:text-xl font-black font-heading tracking-wider uppercase text-yellow-300 group-hover:text-yellow-100 transition-colors"
            style={{
              textShadow: '0 2px 0 #14532d, 0 4px 0 #052e16, 0 6px 12px rgba(0,0,0,0.9)'
            }}
          >
            BERANGKAT! MULAI PERMAINAN 🚀
          </span>
        </button>

      </footer>

    </div>
  );
};
