import React from 'react';
import {
  Play,
  Map,
  Award,
  HelpCircle,
  Settings,
  Users,
  Sparkles,
  UserCheck,
  Compass,
  Layers,
  Waves,
  Home,
  Check
} from 'lucide-react';
import { PlantGraphic, ZombieGraphic } from './Characters';
import { soundManager } from '../utils/audio';
import { AdventureLevel, ArenaTheme, StudentProfile } from '../types';

interface MainMenuProps {
  currentProfile: StudentProfile;
  onOpenProfileModal: () => void;
  selectedAdventureLevel: AdventureLevel;
  onSelectAdventureLevel: (lvl: AdventureLevel) => void;
  selectedArenaTheme: ArenaTheme;
  onSelectArenaTheme: (theme: ArenaTheme) => void;
  onStartAdventure: () => void;
  onOpenLevelSelect: () => void;
  onOpenBadges: () => void;
  onOpenHowToPlay: () => void;
  onOpenClassroom: () => void;
  onOpenSettings: () => void;
  onBackToTitle?: () => void;
  highScore: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  currentProfile,
  onOpenProfileModal,
  selectedAdventureLevel,
  onSelectAdventureLevel,
  selectedArenaTheme,
  onSelectArenaTheme,
  onStartAdventure,
  onOpenLevelSelect,
  onOpenBadges,
  onOpenHowToPlay,
  onOpenClassroom,
  onOpenSettings,
  onBackToTitle,
  highScore
}) => {
  return (
    <div id="main-menu" className="min-h-screen w-full bg-gradient-to-b from-emerald-100 via-sky-50 to-teal-100 flex flex-col items-center justify-between p-3 sm:p-5 overflow-x-hidden">
      
      {/* 1. TOP BAR: Player Login & High Score */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 flex-wrap">
        
        {/* Back to Title Screen button */}
        {onBackToTitle && (
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToTitle();
            }}
            className="px-2.5 py-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-xl text-xs font-black shadow-xs border border-slate-300 flex items-center gap-1"
            title="Kembali ke Layar Judul Depan"
          >
            <span>⬅️ Layar Depan</span>
          </button>
        )}

        {/* Active Player Card with Login/Switch button */}
        <div className="flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-2xl shadow-sm border border-emerald-200">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
            <PlantGraphic type={(currentProfile.avatar as any) || 'sunflower'} className="w-8 h-8" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded-md">
                Pemain Aktif
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                {currentProfile.grade || 'Kelas 4 SD'}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-slate-900 font-heading leading-tight truncate max-w-[140px] sm:max-w-[200px]">
              {currentProfile.name}
            </p>
          </div>

          <button
            id="login-player-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenProfileModal();
            }}
            className="clay-btn clay-btn-white px-2.5 py-1 text-[11px] font-black rounded-xl text-emerald-800 flex items-center gap-1 border border-emerald-300 ml-1 hover:bg-emerald-50"
            title="Klik untuk ganti atau login nama siswa"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Login / Ganti</span>
          </button>
        </div>

        {/* Right tools: High score & Settings */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-2xl shadow-xs border border-amber-200">
            <span className="text-amber-500 text-base">⭐</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 font-heading">
              Rekor: <span className="text-emerald-700 font-black">{highScore.toLocaleString('id-ID')}</span>
            </span>
          </div>

          <button
            id="menu-settings-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            className="clay-btn clay-btn-white p-2 rounded-xl"
            title="Pengaturan Permainan"
          >
            <Settings className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* 2. HERO TITLE & CHARACTERS */}
      <div className="my-auto flex flex-col items-center text-center max-w-3xl w-full px-2 py-3">
        
        {/* Animated Friendly Characters Row */}
        <div className="flex items-end justify-center gap-2 sm:gap-5 mb-2">
          <div className="transform -rotate-6 hover:scale-110 transition-transform">
            <ZombieGraphic type="conehead" className="w-12 h-14 sm:w-18 sm:h-20" />
          </div>
          <div className="transform scale-110 hover:scale-125 transition-transform z-10">
            <PlantGraphic type="threepeater" className="w-16 h-16 sm:w-24 sm:h-24" />
          </div>
          <div className="transform hover:scale-110 transition-transform">
            <PlantGraphic type="sunflower" className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>
          <div className="transform rotate-6 hover:scale-110 transition-transform">
            <ZombieGraphic type="normal" className="w-12 h-14 sm:w-16 sm:h-18" />
          </div>
        </div>

        {/* Title Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-emerald-200/90 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-extrabold font-heading mb-1.5 shadow-xs">
          <span>🌱</span>
          <span>MATEMATIKA KELAS 4 SD</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-emerald-950 font-heading tracking-tight drop-shadow-xs leading-none">
          PERCENT DEFENDER
        </h1>
        <p className="text-base sm:text-xl font-extrabold text-teal-800 font-heading mt-1">
          Save the Math Garden!
        </p>

        {/* 3. ADVENTURE CONTROLS BOARD (User Requirement: Level Start Adventure & Arena Selection) */}
        <div className="w-full max-w-2xl bg-white/95 rounded-3xl p-3.5 sm:p-5 shadow-xl border-3 border-emerald-300 mt-4 text-left">
          
          {/* Level Start Adventure Selector */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span className="text-xs sm:text-sm font-black text-slate-900 font-heading">
                  1. Pilih Level Soal (Start Adventure Level):
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                Sesuai Kemampuan Siswa
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              
              {/* Lower */}
              <button
                id="adventure-level-lower"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectAdventureLevel('lower');
                }}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                  selectedAdventureLevel === 'lower'
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300 shadow-sm scale-[1.02]'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                    🟢 Lower
                  </span>
                  {selectedAdventureLevel === 'lower' && (
                    <Check className="w-4 h-4 text-emerald-600 font-bold" />
                  )}
                </div>
                <p className="text-xs font-extrabold text-slate-900 font-heading">
                  Tingkat Dasar (Mudah)
                </p>
                <p className="text-[11px] font-semibold text-slate-600 mt-0.5 leading-snug">
                  Persen mudah langsung dirubah ke desimal (contoh: 10% → 0,1, 50% → 0,5, 25% → 0,25).
                </p>
              </button>

              {/* Middle */}
              <button
                id="adventure-level-middle"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectAdventureLevel('middle');
                }}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                  selectedAdventureLevel === 'middle'
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 shadow-sm scale-[1.02]'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                    🟡 Middle
                  </span>
                  {selectedAdventureLevel === 'middle' && (
                    <Check className="w-4 h-4 text-amber-600 font-bold" />
                  )}
                </div>
                <p className="text-xs font-extrabold text-slate-900 font-heading">
                  Tingkat Sedang
                </p>
                <p className="text-[11px] font-semibold text-slate-600 mt-0.5 leading-snug">
                  Menghubungkan pecahan persen, pecahan biasa, dan pecahan desimal (50% = 1/2 = 0,5).
                </p>
              </button>

              {/* Strong */}
              <button
                id="adventure-level-strong"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectAdventureLevel('strong');
                }}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                  selectedAdventureLevel === 'strong'
                    ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-300 shadow-sm scale-[1.02]'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded-md">
                    🔴 Strong
                  </span>
                  {selectedAdventureLevel === 'strong' && (
                    <Check className="w-4 h-4 text-rose-600 font-bold" />
                  )}
                </div>
                <p className="text-xs font-extrabold text-slate-900 font-heading">
                  Tantangan / Sulit
                </p>
                <p className="text-[11px] font-semibold text-slate-600 mt-0.5 leading-snug">
                  Soal penalaran HOTS, persen lebih dari 100%, dan operasi penjumlahan persen + desimal.
                </p>
              </button>

            </div>
          </div>

          {/* Arena Background Theme Selector (User Requirement 3: Taman, Di Dalam Air, Genteng) */}
          <div className="mb-4 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-700" />
                <span className="text-xs sm:text-sm font-black text-slate-900 font-heading">
                  2. Pilih Latar Tempat Arena Pertahanan:
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              
              {/* Garden */}
              <button
                id="theme-select-garden"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectArenaTheme('garden');
                }}
                className={`p-2 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                  selectedArenaTheme === 'garden'
                    ? 'border-emerald-600 bg-emerald-100/90 ring-2 ring-emerald-400 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">🌱</span>
                <div className="text-left leading-tight">
                  <span className="text-xs font-black text-slate-900 block font-heading">
                    Di Taman
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    Rumput Asri
                  </span>
                </div>
              </button>

              {/* Water */}
              <button
                id="theme-select-water"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectArenaTheme('water');
                }}
                className={`p-2 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                  selectedArenaTheme === 'water'
                    ? 'border-sky-600 bg-sky-100/90 ring-2 ring-sky-400 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">🌊</span>
                <div className="text-left leading-tight">
                  <span className="text-xs font-black text-slate-900 block font-heading">
                    Di Dalam Air
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    Kolam Biru
                  </span>
                </div>
              </button>

              {/* Roof */}
              <button
                id="theme-select-roof"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectArenaTheme('roof');
                }}
                className={`p-2 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                  selectedArenaTheme === 'roof'
                    ? 'border-amber-700 bg-amber-100/90 ring-2 ring-amber-500 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">🏠</span>
                <div className="text-left leading-tight">
                  <span className="text-xs font-black text-slate-900 block font-heading">
                    Di Genteng
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    Atap Rumah
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* Big START ADVENTURE Button */}
          <button
            id="start-adventure-btn"
            onClick={() => {
              soundManager.playClick();
              onStartAdventure();
            }}
            className="clay-btn clay-btn-green w-full py-3.5 sm:py-4 text-base sm:text-xl font-black rounded-2xl flex items-center justify-center gap-2.5 shadow-lg group hover:scale-[1.01] transition-transform"
          >
            <Play className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            <span>
              START ADVENTURE ▶️ (Tingkat {selectedAdventureLevel.toUpperCase()})
            </span>
          </button>
        </div>

        {/* Secondary Navigation Buttons Group */}
        <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <button
            id="select-level-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenLevelSelect();
            }}
            className="clay-btn clay-btn-white py-2 text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-1.5 text-slate-700 border border-slate-300"
          >
            <Map className="w-4 h-4 text-emerald-600" />
            <span>Peta Gelombang</span>
          </button>

          <button
            id="badges-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="clay-btn clay-btn-white py-2 text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-1.5 text-slate-700 border border-slate-300"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Lencana</span>
          </button>

          <button
            id="classroom-mode-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenClassroom();
            }}
            className="clay-btn clay-btn-white py-2 text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-1.5 text-slate-700 border border-slate-300"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Layar Kelas IFP</span>
          </button>

          <button
            id="how-to-play-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenHowToPlay();
            }}
            className="clay-btn clay-btn-white py-2 text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-1.5 text-slate-700 border border-slate-300"
          >
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>Cara Bermain</span>
          </button>
        </div>

      </div>

      {/* Footer credits */}
      <div className="w-full text-center py-2">
        <p className="text-[11px] font-semibold text-slate-500">
          🌱 Percent Defender • Media Pembelajaran Matematika SD Berbasis Tower Defense
        </p>
      </div>

    </div>
  );
};
