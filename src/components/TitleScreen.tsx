import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Monitor,
  Laptop,
  Smartphone,
  RotateCw,
  Maximize2,
  Minimize2,
  Info,
  Check,
  X
} from 'lucide-react';
import { StudentProfile } from '../types';
import { soundManager } from '../utils/audio';
import { PlantGraphic } from './Characters';

interface TitleScreenProps {
  currentProfile: StudentProfile;
  onStartAdventure: () => void;
  onOpenProfileModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export type DisplayPanelMode = 'ifp_4k' | 'laptop_16_10' | 'hp_16_9' | 'auto';

export const TitleScreen: React.FC<TitleScreenProps> = ({
  currentProfile,
  onStartAdventure,
  onOpenProfileModal,
  isMuted,
  onToggleMute
}) => {
  // Screen Display Mode:
  // 1. 'ifp_4k': Panel IFP 4K (3840 x 2160, 16:9)
  // 2. 'laptop_16_10': Laptop Panel Rasio 16:10 Layar 14" (1920x1200 / 2560x1600)
  // 3. 'hp_16_9': HP Panel Rasio 16:9 Landscape
  // 4. 'auto': Auto-detect based on screen viewport
  const [panelMode, setPanelMode] = useState<DisplayPanelMode>('auto');
  
  // Real screen detection
  const [deviceIsLandscape, setDeviceIsLandscape] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= window.innerHeight;
    }
    return true;
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showPanelInfoModal, setShowPanelInfoModal] = useState<boolean>(false);
  const [isHoveredStart, setIsHoveredStart] = useState<boolean>(false);

  // Monitor device orientation & resize
  useEffect(() => {
    const handleResize = () => {
      setDeviceIsLandscape(window.innerWidth >= window.innerHeight);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Determine effective visual layout mode
  const effectiveMode: 'ifp_4k' | 'laptop_16_10' | 'hp_16_9' = (() => {
    if (panelMode !== 'auto') return panelMode;
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ratio = w / (h || 1);

      // Large width or 4K/QHD screen -> IFP 4K
      if (w >= 1440 && ratio >= 1.65) {
        return 'ifp_4k';
      }
      // 16:10 ratio typical on 14" laptop (ratio ~ 1.45 - 1.68)
      if (ratio >= 1.45 && ratio < 1.68) {
        return 'laptop_16_10';
      }
      // Smaller landscape or mobile
      return 'hp_16_9';
    }
    return 'ifp_4k';
  })();

  const isPortraitMobile = panelMode === 'auto' && !deviceIsLandscape;

  const handleStartClick = () => {
    soundManager.playGameStart();
    onStartAdventure();
  };

  const handleToggleFullscreen = () => {
    soundManager.playClick();
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    } catch {
      // Fallback if blocked
    }
  };

  return (
    <div
      id="math-defender-title-screen"
      className="relative min-h-screen w-full flex flex-col justify-between items-center select-none bg-slate-950 font-sans overflow-hidden"
    >
      {/* 1. CLEAN FULL-BLEED BACKGROUND ARTWORK */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {isPortraitMobile ? (
          // Portrait 9:16 for vertical mobile orientation
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/assets/math_defender_portrait.jpg"
              alt="MATH DEFENDER: STEAM Mathematics Adventure - Portrait"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.04]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>
        ) : effectiveMode === 'laptop_16_10' ? (
          // Laptop 14" Panel 16:10 Ratio Container
          <div className="relative w-full h-full flex items-center justify-center bg-emerald-950">
            <img
              src="/assets/math_defender_landscape.jpg"
              alt="MATH DEFENDER: STEAM Mathematics Adventure - Laptop 14 Inch 16:10 Panel"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.04]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          </div>
        ) : (
          // IFP 4K (3840x2160) or HP (16:9 Landscape)
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/assets/math_defender_landscape.jpg"
              alt="MATH DEFENDER: STEAM Mathematics Adventure - 16:9 Landscape"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.04]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          </div>
        )}
      </div>

      {/* 2. MINIMAL TOP BAR: Profile Badge, Panel Switcher & Audio */}
      <header className="relative z-30 w-full max-w-7xl px-3 sm:px-6 pt-3 flex items-center justify-between gap-2">
        {/* Left: Discreet Student Profile Chip */}
        <div className="flex items-center gap-2 bg-black/45 hover:bg-black/60 backdrop-blur-md border border-amber-400/60 rounded-full px-3 py-1.5 shadow-lg transition-all">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/80 border border-amber-300 flex items-center justify-center shrink-0">
            <PlantGraphic
              type={(currentProfile.avatar as any) || 'peashooter'}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-black text-white font-heading truncate max-w-[120px] sm:max-w-[180px]">
              {currentProfile.name}
            </span>
            <span className="text-[10px] text-amber-200/80 font-bold truncate max-w-[120px] sm:max-w-[180px]">
              {currentProfile.grade || 'Kelas 4 SD'}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenProfileModal();
            }}
            className="ml-1 px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-[10px] rounded-full shadow-xs transition-transform cursor-pointer"
            title="Ganti Profil Siswa"
          >
            ✏️
          </button>
        </div>

        {/* Right: Discreet Screen Presets, Fullscreen & Audio */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Preset Switcher */}
          <div className="bg-black/45 backdrop-blur-md border border-indigo-400/50 rounded-full p-0.5 flex items-center gap-1 shadow-lg text-[10px] sm:text-xs">
            <button
              onClick={() => {
                soundManager.playClick();
                setPanelMode('ifp_4k');
              }}
              className={`px-2 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                effectiveMode === 'ifp_4k' && panelMode !== 'auto'
                  ? 'bg-amber-500 text-amber-950 font-black shadow-xs'
                  : 'text-indigo-200 hover:bg-white/10'
              }`}
              title="Panel IFP 4K (3840×2160)"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">IFP 4K</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setPanelMode('laptop_16_10');
              }}
              className={`px-2 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                effectiveMode === 'laptop_16_10' && panelMode !== 'auto'
                  ? 'bg-emerald-500 text-white font-black shadow-xs'
                  : 'text-indigo-200 hover:bg-white/10'
              }`}
              title="Laptop 14″ Panel 16:10"
            >
              <Laptop className="w-3 h-3" />
              <span className="hidden sm:inline">Laptop 16:10</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setPanelMode('hp_16_9');
              }}
              className={`px-2 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                effectiveMode === 'hp_16_9' && panelMode !== 'auto'
                  ? 'bg-sky-500 text-white font-black shadow-xs'
                  : 'text-indigo-200 hover:bg-white/10'
              }`}
              title="HP Panel 16:9"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">HP 16:9</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setPanelMode('auto');
              }}
              className={`px-1.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                panelMode === 'auto'
                  ? 'bg-indigo-600 text-white font-black'
                  : 'text-indigo-300 hover:bg-white/10'
              }`}
              title="Auto"
            >
              <RotateCw className="w-2.5 h-2.5" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowPanelInfoModal(true);
              }}
              className="p-1 text-amber-300 hover:text-white cursor-pointer"
              title="Info Ukuran Layar"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 bg-black/45 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg transition-all cursor-pointer"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-300" /> : <Maximize2 className="w-3.5 h-3.5 text-amber-300" />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={onToggleMute}
            className="p-2 bg-black/45 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg transition-all cursor-pointer"
            title={isMuted ? 'Nyalakan Musik' : 'Matikan Musik'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
          </button>
        </div>
      </header>

      {/* 3. CLEAN EMPTY CENTER: The 3D Artwork is 100% visible and unblocked */}
      <div className="flex-1 w-full" />

      {/* 4. CLEAN BOTTOM PANEL ONLY: "KLIK UNTUK MULAI" */}
      <footer className="relative z-30 w-full max-w-2xl px-4 pb-6 sm:pb-10 flex flex-col items-center gap-2">
        {/* Tactile Wooden 3D Button: KLIK UNTUK MULAI */}
        <button
          id="click-to-start-btn"
          onClick={handleStartClick}
          onMouseEnter={() => setIsHoveredStart(true)}
          onMouseLeave={() => setIsHoveredStart(false)}
          className={`group relative z-20 w-full max-w-md py-4 sm:py-5 px-8 rounded-3xl border-4 border-[#2b1607] bg-gradient-to-b from-[#b45309] via-[#92400e] to-[#713f12] shadow-[0_16px_36px_rgba(0,0,0,0.95)] cursor-pointer transition-all duration-150 active:scale-95 flex items-center justify-center gap-3 ${
            isHoveredStart ? 'scale-105 ring-4 ring-yellow-400 border-yellow-300 shadow-yellow-500/40' : 'animate-pulse'
          }`}
        >
          {/* Subtle wooden plank highlight */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-25 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]" />

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-yellow-400 border-2 border-yellow-200 flex items-center justify-center text-amber-950 shrink-0 shadow-md">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>

          <span
            className="text-2xl sm:text-3xl font-black font-heading tracking-wider uppercase text-yellow-300 group-hover:text-yellow-100 transition-colors"
            style={{
              textShadow: '0 2px 0 #78350f, 0 4px 0 #451a03, 0 8px 16px rgba(0,0,0,0.9)'
            }}
          >
            KLIK UNTUK MULAI
          </span>
        </button>

        {/* Tagline Ribbon */}
        <p className="text-xs sm:text-sm font-black text-amber-300/90 font-heading tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          THINK • CALCULATE • DESIGN • DEFEND
        </p>
      </footer>

      {/* Info Modal for Display Modes */}
      {showPanelInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="clay-card max-w-md w-full bg-white text-slate-800 p-5 rounded-3xl shadow-2xl border-4 border-indigo-300 relative text-left">
            <button
              onClick={() => setShowPanelInfoModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-3">
              <span className="text-3xl">🖥️</span>
              <h3 className="text-lg font-black text-indigo-950 font-heading mt-1">
                Ukuran Layar Panel MATH DEFENDER
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-700 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <strong className="text-amber-900 block">🏛️ 1. Panel IFP 4K (3840 × 2160):</strong>
                <span>Dikhususkan untuk Papan Tulis Interaktif di depan kelas. Elemen tombol ekstra besar dan ramah sentuhan.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <strong className="text-emerald-900 block">💻 2. Laptop 14″ Panel 16:10:</strong>
                <span>Dikhususkan untuk layar laptop 14 inci rasio 16:10, pas di viewport tanpa scrolling.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
                <strong className="text-sky-900 block">📱 3. HP Panel 16:9:</strong>
                <span>Dikhususkan untuk smartphone lanskap (1920×1080) dengan jangkauan tombol yang ramah ibu jari.</span>
              </div>
            </div>

            <button
              onClick={() => setShowPanelInfoModal(false)}
              className="clay-btn clay-btn-blue w-full py-2 text-xs font-black rounded-xl cursor-pointer"
            >
              Mengerti & Lanjutkan
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
