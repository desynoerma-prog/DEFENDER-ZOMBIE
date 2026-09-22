import React from 'react';
import { ArrowLeft, Lock, Play, Star, ShieldAlert } from 'lucide-react';
import { LEVELS } from '../data/levels';
import { soundManager } from '../utils/audio';

interface LevelSelectProps {
  levelsUnlocked: number;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  levelsUnlocked,
  onSelectLevel,
  onBack
}) => {
  return (
    <div id="level-select-screen" className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-emerald-50 to-teal-100 p-4 sm:p-6 flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="clay-btn clay-btn-white px-3 py-2 text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 text-slate-700" />
          <span>Kembali ke Menu</span>
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
          🗺️ Pilih Wilayah Math Garden
        </h2>

        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Worlds Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-auto">
        {LEVELS.map((level) => {
          const isUnlocked = level.id <= levelsUnlocked;

          return (
            <div
              key={level.id}
              className={`clay-card p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white/95 hover:-translate-y-1 hover:shadow-xl'
                  : 'bg-slate-100/80 opacity-75 border-slate-300'
              }`}
            >
              {/* Top Level Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-heading">
                  {level.worldName}
                </span>

                {level.hasBoss ? (
                  <span className="flex items-center gap-1 text-[11px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>BOSS BATTLE</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{level.totalWaves} Gelombang</span>
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading leading-tight">
                  {level.title}
                </h3>
                <p className="text-xs font-bold text-teal-700 font-heading mt-0.5">
                  {level.subtitle}
                </p>
                <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                  {level.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                {isUnlocked ? (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectLevel(level.id);
                    }}
                    className="clay-btn clay-btn-green w-full py-2.5 text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Masuk Arena</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 bg-slate-200 text-slate-500 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span>Terkunci (Selesaikan Level {level.id - 1})</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-slate-500 font-semibold mt-4 text-center">
        💡 Kiat: Setiap kali menyelesaikan satu dunia, dunia berikutnya akan terbuka secara otomatis!
      </div>
    </div>
  );
};
