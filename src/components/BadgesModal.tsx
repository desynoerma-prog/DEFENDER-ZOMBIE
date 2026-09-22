import React from 'react';
import { getBadgesWithStatus } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { Award, Lock } from 'lucide-react';

interface BadgesModalProps {
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ onClose }) => {
  const badges = getBadgesWithStatus();

  return (
    <div id="badges-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="clay-card max-w-xl w-full p-5 sm:p-7 bg-white animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
                Lencana Prestasi (Badges)
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Kumpulkan semua lencana dengan menguasai materi persen!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Badges List */}
        <div className="space-y-3 overflow-y-auto pr-1">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                badge.unlocked
                  ? 'bg-amber-50/90 border-amber-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-400" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm sm:text-base text-slate-800 font-heading">
                    {badge.name}
                  </h4>
                  <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${
                    badge.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {badge.unlocked ? 'Terbuka 🎉' : 'Terkunci'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-4 pt-3 border-t text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="clay-btn clay-btn-blue px-6 py-2 text-sm font-bold rounded-xl"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
