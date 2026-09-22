import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  UserCheck,
  Map,
  Compass,
  Layers,
  HelpCircle,
  Play,
  BookOpen
} from 'lucide-react';
import { AdventureLevel, ArenaTheme, StudentProfile } from '../types';
import { soundManager } from '../utils/audio';
import { PlantGraphic } from './Characters';

interface TitleScreenProps {
  currentProfile: StudentProfile;
  selectedAdventureLevel: AdventureLevel;
  onSelectAdventureLevel: (lvl: AdventureLevel) => void;
  selectedArenaTheme: ArenaTheme;
  onSelectArenaTheme: (theme: ArenaTheme) => void;
  onStartAdventure: () => void;
  onOpenProfileModal: () => void;
  onOpenLevelSelect: () => void;
  onOpenHowToPlay: () => void;
  onOpenClassroom: () => void;
  onOpenAlmanac?: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  currentProfile,
  selectedAdventureLevel,
  onSelectAdventureLevel,
  selectedArenaTheme,
  onSelectArenaTheme,
  onStartAdventure,
  onOpenProfileModal,
  onOpenLevelSelect,
  onOpenHowToPlay,
  onOpenClassroom,
  onOpenAlmanac,
  isMuted,
  onToggleMute
}) => {
  const [isHoveredStart, setIsHoveredStart] = useState<boolean>(false);

  const handleStartClick = () => {
    soundManager.playGameStart();
    onStartAdventure();
  };

  return (
    <div
      id="pvz-title-screen"
      className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden select-none bg-slate-950 font-sans"
    >
      {/* 1. AUTHENTIC HIGH-RES BACKGROUND ARTWORK */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/pvz_title_screen.jpg"
          alt="Plants vs. Zombies Title Screen"
          className="w-full h-full object-cover object-center filter saturate-110 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. TOP FLOATING CONTROLS: LOGIN PROFILE & UTILITIES */}
      <div className="relative z-20 w-full max-w-6xl px-4 pt-3 flex items-center justify-between gap-2">
        {/* Left: Student Profile Card */}
        <div className="flex items-center gap-2 bg-[#5a3311]/90 backdrop-blur-md border-3 border-[#f59e0b] rounded-2xl p-1.5 sm:px-3 sm:py-2 shadow-2xl">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center shrink-0 shadow-inner">
            <PlantGraphic type={currentProfile.avatar as any || 'peashooter'} className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">Pemain:</span>
              <span className="text-xs sm:text-sm font-black text-white font-heading truncate max-w-[120px] sm:max-w-[180px]">
                {currentProfile.name}
              </span>
            </div>
            <span className="text-[10px] text-amber-200/90 font-bold">
              {currentProfile.grade || 'Kelas 4 SD'}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenProfileModal();
            }}
            className="ml-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 active:scale-95 text-amber-950 font-black text-[10px] sm:text-xs rounded-xl shadow-md border border-amber-300 transition-transform"
            title="Klik untuk ganti atau login pemain"
          >
            ✏️ Ganti
          </button>
        </div>

        {/* Right: Quick Utilities */}
        <div className="flex items-center gap-2">
          {onOpenAlmanac && (
            <button
              id="title-almanac-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenAlmanac();
              }}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#783e10] hover:bg-[#92400e] border-2 border-amber-400 text-amber-200 rounded-xl text-xs font-black shadow-lg flex items-center gap-1 transition-all cursor-pointer"
              title="Buka Almanak Tanaman (Lihat Semua Karakter)"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Almanak</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenHowToPlay();
            }}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#3e220a]/90 hover:bg-[#5a3311] border-2 border-amber-500 text-amber-200 rounded-xl text-xs font-black shadow-lg flex items-center gap-1 transition-all"
            title="Cara Bermain"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bantuan</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenClassroom();
            }}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-emerald-800/90 hover:bg-emerald-700 border-2 border-emerald-400 text-emerald-100 rounded-xl text-xs font-black shadow-lg flex items-center gap-1 transition-all"
            title="Mode Kelas / Guru"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mode Guru</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 bg-[#3e220a]/90 hover:bg-[#5a3311] border-2 border-amber-500 text-amber-200 rounded-xl shadow-lg transition-transform"
            title="Suara"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* 3. CENTER / UPPER: 3D LOGO TITLE & SUBTITLE */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-2 sm:mt-4 text-center px-4 pointer-events-none">
        {/* The Iconic Plants vs Zombies 3D Style Title Overlay */}
        <div className="relative flex items-center justify-center scale-90 sm:scale-100 md:scale-110 transform transition-transform">
          {/* Main Logo Graphic / Styled typography */}
          <div className="flex items-center font-heading tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
            {/* "PLANTS" */}
            <span
              className="text-4xl sm:text-6xl md:text-7xl font-black text-[#84cc16] uppercase italic"
              style={{
                WebkitTextStroke: '2.5px #14532d',
                textShadow: '0 4px 0 #166534, 0 8px 0 #14532d, 0 12px 16px rgba(0,0,0,0.8)'
              }}
            >
              PLANTS
            </span>

            {/* "vs." Tombstone */}
            <div className="mx-2 sm:mx-3 relative w-10 h-11 sm:w-14 sm:h-14 bg-gradient-to-b from-stone-400 to-stone-700 rounded-t-full border-2 border-stone-900 shadow-2xl flex flex-col items-center justify-center -rotate-6">
              <span className="text-[9px] sm:text-xs font-black text-amber-300 uppercase tracking-tighter">VS.</span>
              <span className="text-xs sm:text-sm">🌼</span>
            </div>

            {/* "ZOMBIES" */}
            <span
              className="text-4xl sm:text-6xl md:text-7xl font-black text-[#f1f5f9] uppercase italic"
              style={{
                WebkitTextStroke: '2.5px #991b1b',
                textShadow: '0 4px 0 #b91c1c, 0 8px 0 #7f1d1d, 0 12px 16px rgba(0,0,0,0.9)'
              }}
            >
              ZOMBIES
            </span>
          </div>
        </div>

        {/* Subtitle Badge */}
        <div className="mt-2 bg-[#fef3c7]/95 border-2 border-[#b45309] rounded-full px-4 py-1 shadow-xl flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-[#78350f] uppercase tracking-widest font-heading">
            🌱 PERCENT DEFENDER: MATEMATIKA KELAS 4 SD 🌱
          </span>
        </div>
      </div>

      {/* 4. BOTTOM DOCK: LEVEL SELECTOR + CLASSIC WOODEN "CLICK TO START!" */}
      <div className="relative z-20 w-full max-w-4xl px-4 pb-4 sm:pb-6 flex flex-col items-center gap-3">
        
        {/* Adventure Level & Arena Theme Quick Configuration Bar */}
        <div className="w-full max-w-2xl bg-[#5a3311]/95 border-3 border-[#f59e0b] rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          
          {/* Level Soal (Lower, Middle, Strong) */}
          <div className="flex flex-col items-center sm:items-start gap-1 w-full sm:w-auto">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1 font-heading">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tingkat Soal Matematika:
            </span>
            <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectAdventureLevel('lower');
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedAdventureLevel === 'lower'
                    ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-yellow-300 scale-105'
                    : 'bg-[#3e220a] hover:bg-[#4a2b10] text-emerald-300 border border-emerald-600/40'
                }`}
              >
                🟢 LOWER
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectAdventureLevel('middle');
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedAdventureLevel === 'middle'
                    ? 'bg-amber-500 text-amber-950 shadow-lg ring-2 ring-yellow-300 scale-105'
                    : 'bg-[#3e220a] hover:bg-[#4a2b10] text-amber-300 border border-amber-600/40'
                }`}
              >
                🟡 MIDDLE
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectAdventureLevel('strong');
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedAdventureLevel === 'strong'
                    ? 'bg-rose-500 text-white shadow-lg ring-2 ring-yellow-300 scale-105'
                    : 'bg-[#3e220a] hover:bg-[#4a2b10] text-rose-300 border border-rose-600/40'
                }`}
              >
                🔴 STRONG
              </button>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-amber-600/50" />

          {/* Arena Theme Selector */}
          <div className="flex flex-col items-center sm:items-end gap-1 w-full sm:w-auto">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1 font-heading">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Latar Tempat:
            </span>
            <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectArenaTheme('garden');
                }}
                className={`px-2 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedArenaTheme === 'garden'
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-yellow-300 scale-105'
                    : 'bg-[#3e220a] hover:bg-[#4a2b10] text-emerald-300 border border-emerald-600/40'
                }`}
              >
                🌱 Taman
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectArenaTheme('water');
                }}
                className={`px-2 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedArenaTheme === 'water'
                    ? 'bg-sky-600 text-white shadow-md ring-2 ring-yellow-300 scale-105'
                    : 'bg-[#3e220a] hover:bg-[#4a2b10] text-sky-300 border border-sky-600/40'
                }`}
              >
                🌊 Air (Pool)
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectArenaTheme('roof');
                }}
                className={`px-2 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedArenaTheme === 'roof'
                    ? 'bg-amber-700 text-white shadow-md ring-2 ring-yellow-300 scale-105'
                    : 'bg-[#3e220a] hover:bg-[#4a2b10] text-amber-300 border border-amber-600/40'
                }`}
              >
                🏠 Genteng (Roof)
              </button>
            </div>
          </div>

        </div>

        {/* 5. THE ICONIC "CLICK TO START!" WOODEN SIGN */}
        <div className="relative flex flex-col items-center">
          
          {/* Grass & Daisies Topping the Wooden Sign */}
          <div className="relative z-10 flex items-center justify-center -mb-2 pointer-events-none">
            <div className="bg-[#4ade80] border-2 border-[#15803d] rounded-t-xl px-4 py-0.5 shadow-md flex items-center gap-2">
              <span className="text-xs">🌼</span>
              <span className="text-[10px] font-black text-emerald-950 uppercase tracking-widest font-heading">
                Math Garden
              </span>
              <span className="text-xs">🌼</span>
            </div>
          </div>

          {/* Wooden Sign Button */}
          <button
            id="click-to-start-btn"
            onClick={handleStartClick}
            onMouseEnter={() => setIsHoveredStart(true)}
            onMouseLeave={() => setIsHoveredStart(false)}
            className={`group relative z-20 w-72 sm:w-96 py-3.5 sm:py-4 px-6 rounded-2xl border-4 border-[#3e220a] bg-gradient-to-b from-[#854d0e] via-[#713f12] to-[#542d0a] shadow-[0_12px_24px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 ${
              isHoveredStart ? 'scale-105 ring-4 ring-yellow-400 border-yellow-300' : 'animate-pulse'
            }`}
          >
            {/* Wooden Texture Effect */}
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]" />

            <span
              className="text-xl sm:text-3xl font-black font-heading tracking-wider uppercase text-yellow-300 group-hover:text-yellow-200 transition-colors"
              style={{
                textShadow: '0 2px 0 #78350f, 0 4px 0 #451a03, 0 6px 12px rgba(0,0,0,0.9)'
              }}
            >
              CLICK TO START!
            </span>
          </button>
        </div>

        {/* Extra Navigation: Full Level Select / Classroom */}
        <div className="flex items-center gap-3 text-xs font-bold text-amber-200/90 mt-1">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenLevelSelect();
            }}
            className="hover:text-amber-100 underline decoration-amber-400 underline-offset-4 flex items-center gap-1"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Peta Level Lengkap (1-5)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
