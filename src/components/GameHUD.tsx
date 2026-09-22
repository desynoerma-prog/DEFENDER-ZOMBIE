import React from 'react';
import { Volume2, VolumeX, Pause, Play, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GameHUDProps {
  lives: number;
  maxLives: number;
  score: number;
  combo: number;
  mathEnergy: number;
  maxEnergy?: number;
  currentWave: number;
  totalWaves: number;
  levelTitle: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onExit: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  lives,
  maxLives,
  score,
  combo,
  mathEnergy,
  maxEnergy = 100,
  currentWave,
  totalWaves,
  levelTitle,
  isPaused,
  onTogglePause,
  onExit,
  isMuted,
  onToggleMute
}) => {
  return (
    <div id="game-hud" className="w-full bg-white/90 backdrop-blur-md border-b-2 border-slate-200/80 px-3 py-2 sm:px-6 sm:py-2.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 flex-wrap">
        
        {/* Left: Level & Lives */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Taman</span>
            <span className="text-sm font-extrabold text-slate-800 font-heading">{levelTitle}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-2xl gap-1 shadow-inner">
            {Array.from({ length: maxLives }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-all duration-300 ${
                  i < lives
                    ? 'text-rose-500 fill-rose-500 scale-100 animate-pulse'
                    : 'text-slate-300 fill-slate-200 scale-90'
                }`}
              />
            ))}
          </div>

          {/* Wave Badge */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-2xl flex items-center gap-1 font-heading">
            <span>🌊</span>
            <span>Wave {currentWave}/{totalWaves}</span>
          </div>
        </div>

        {/* Center: Score & Combo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Score */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-2xl shadow-inner">
            <span className="text-base sm:text-lg">⭐</span>
            <div className="flex flex-col">
              <span className="text-[10px] text-amber-700 font-bold uppercase leading-none">Skor</span>
              <span className="text-sm sm:text-base font-extrabold text-amber-900 font-heading leading-tight">
                {score.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Combo badge */}
          {combo >= 2 && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-2xl font-bold font-heading text-xs sm:text-sm animate-bounce shadow-sm ${
              combo >= 5
                ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white'
                : 'bg-orange-100 text-orange-700 border border-orange-300'
            }`}>
              <span>🔥</span>
              <span>COMBO ×{combo}</span>
              {combo >= 5 && <Sparkles className="w-3.5 h-3.5" />}
            </div>
          )}
        </div>

        {/* Right: Math Energy & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Math Energy Gauge */}
          <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-2xl shadow-inner min-w-[110px] sm:min-w-[140px]">
            <span className="text-sky-500 font-black text-sm">⚡</span>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center text-[10px] font-bold text-sky-700 mb-0.5">
                <span>ENERGY</span>
                <span>{mathEnergy}</span>
              </div>
              <div className="w-full bg-sky-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (mathEnergy / maxEnergy) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={() => {
              soundManager.playClick();
              onToggleMute();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300 shadow-sm"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Pause Toggle */}
          <button
            id="pause-toggle-btn"
            onClick={() => {
              soundManager.playClick();
              onTogglePause();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300 shadow-sm"
            title={isPaused ? 'Lanjutkan' : 'Jeda Permainan'}
            aria-label="Pause or Resume"
          >
            {isPaused ? <Play className="w-4 h-4 text-amber-600" /> : <Pause className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Keluar ke Menu */}
          <button
            id="exit-game-btn"
            onClick={() => {
              soundManager.playClick();
              onExit();
            }}
            className="hidden sm:inline-flex text-xs font-bold px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300"
          >
            Menu
          </button>
        </div>

      </div>

      {/* Combo Master Celebration Banner */}
      {combo >= 5 && (
        <div className="w-full text-center mt-1">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-700 bg-amber-100/90 border border-amber-300 px-3 py-0.5 rounded-full animate-pulse shadow-sm">
            🌟 MATHEMATICS MASTER! Serangan Super Siap Digunakan! 🌟
          </span>
        </div>
      )}
    </div>
  );
};
