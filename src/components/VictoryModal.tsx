import React, { useEffect } from 'react';
import { Award, RotateCcw, Map, Home, Star, Target, Flame, CheckCircle2, XCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  highestCombo: number;
  finalEnergy: number;
  unlockedBadgeName?: string;
  isBossDefeated?: boolean;
  onPlayAgain: () => void;
  onLevelSelect: () => void;
  onMenu: () => void;
  onOpenReport?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  highestCombo,
  finalEnergy,
  unlockedBadgeName,
  isBossDefeated = false,
  onPlayAgain,
  onLevelSelect,
  onMenu,
  onOpenReport
}) => {
  useEffect(() => {
    soundManager.playVictory();
    // Launch celebratory confetti
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 }
    });
  }, []);

  // Calculate Math Test Score (0 - 100)
  const mathScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
  const wrongAnswers = Math.max(0, totalQuestions - correctAnswers);

  let predicate = 'Perlu Latihan Lagi (D)';
  let predicateColor = 'text-slate-600';
  let badgeIcon = '📚';

  if (mathScore === 100) {
    predicate = 'Sempurna! (A+) - Sang Juara Matematika!';
    predicateColor = 'text-amber-600';
    badgeIcon = '🌟';
  } else if (mathScore >= 80) {
    predicate = 'Sangat Baik (A) - Pemahaman Luar Biasa!';
    predicateColor = 'text-emerald-600';
    badgeIcon = '🥇';
  } else if (mathScore >= 70) {
    predicate = 'Baik (B) - Sudah Memahami Konsep!';
    predicateColor = 'text-blue-600';
    badgeIcon = '🥈';
  } else if (mathScore >= 60) {
    predicate = 'Cukup (C) - Terus Asah Kemampuan!';
    predicateColor = 'text-amber-700';
    badgeIcon = '🥉';
  }

  return (
    <div id="victory-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="clay-card max-w-lg w-full p-5 sm:p-7 bg-white text-center animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        
        {/* Victory Icon / Trophy */}
        <div className="text-5xl sm:text-6xl mb-1 animate-bounce">
          {isBossDefeated ? '👑' : '🏆'}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading leading-tight">
          {isBossDefeated ? 'KEBUN MATEMATIKA SELAMAT!' : 'LEVEL BERHASIL DISELESAIKAN!'}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-emerald-700 font-heading mt-0.5">
          {isBossDefeated
            ? 'Hebat! Raja Persen berhasil dikalahkan dengan kecerdasanmu!'
            : 'Kamu berhasil menata kebun tanaman & mengalahkan zombie!'}
        </p>

        {/* RAPOR NILAI AKHIR SOAL SISWA */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-2">
            <span className="text-xs font-black text-emerald-950 font-heading flex items-center gap-1.5">
              <span>{badgeIcon}</span>
              <span>Rapor Nilai Soal Siswa (Kelas 4 SD)</span>
            </span>
            <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Pecahan • Persen • Desimal
            </span>
          </div>

          {/* Large Grade Score */}
          <div className="flex items-center justify-between my-2">
            <div>
              <span className="text-[11px] font-bold text-slate-600 block">Total Nilai Soal:</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-900 font-heading">
                {mathScore} <span className="text-base text-slate-500 font-bold">/ 100</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-600 block">Predikat:</span>
              <span className={`text-xs sm:text-sm font-black font-heading ${predicateColor}`}>
                {predicate}
              </span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-emerald-200/70 text-center">
            <div className="bg-white/80 p-2 rounded-xl border border-emerald-100">
              <span className="text-[10px] font-bold text-slate-500 block">Total Soal</span>
              <span className="text-base font-black text-slate-800">{totalQuestions}</span>
            </div>
            <div className="bg-emerald-100/70 p-2 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Benar</span>
              </span>
              <span className="text-base font-black text-emerald-900">{correctAnswers}</span>
            </div>
            <div className="bg-rose-100/70 p-2 rounded-xl border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 block flex items-center justify-center gap-1">
                <XCircle className="w-3 h-3 text-rose-600" />
                <span>Salah</span>
              </span>
              <span className="text-base font-black text-rose-900">{wrongAnswers}</span>
            </div>
          </div>
        </div>

        {/* Secondary Game Statistics */}
        <div className="grid grid-cols-3 gap-2 my-3 text-left">
          {/* Score */}
          <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl">
            <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span>Skor Game</span>
            </span>
            <span className="text-sm sm:text-base font-black text-amber-950 font-heading block">
              {score.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Max Combo */}
          <div className="bg-rose-50 border border-rose-200 p-2 rounded-xl">
            <span className="text-[10px] font-bold text-rose-800 flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-400" />
              <span>Combo</span>
            </span>
            <span className="text-sm sm:text-base font-black text-rose-950 font-heading block">
              ×{highestCombo}
            </span>
          </div>

          {/* Sun Bonus */}
          <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-xl">
            <span className="text-[10px] font-bold text-yellow-800 flex items-center gap-1">
              <span>☀️</span>
              <span>Bonus Soal</span>
            </span>
            <span className="text-sm sm:text-base font-black text-yellow-950 font-heading block">
              +{correctAnswers * 100}
            </span>
          </div>
        </div>

        {/* Unlocked Badge Alert if any */}
        {unlockedBadgeName && (
          <div className="mb-4 p-2.5 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-amber-600 animate-spin" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-900 font-heading">
              Lencana Terbuka: <span className="underline">{unlockedBadgeName}</span>!
            </span>
          </div>
        )}

        {/* View Full Learning Report Button */}
        {onOpenReport && (
          <div className="my-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenReport();
              }}
              className="clay-btn clay-btn-blue w-full py-2.5 px-4 text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>📊</span>
              <span>Buka Rapor Lengkap 5 Elemen STEAM</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2 border-t">
          <button
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="clay-btn clay-btn-green w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onLevelSelect();
            }}
            className="clay-btn clay-btn-blue w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5"
          >
            <Map className="w-4 h-4" />
            <span>Pilih Level</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onMenu();
            }}
            className="clay-btn clay-btn-white w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 text-slate-700"
          >
            <Home className="w-4 h-4" />
            <span>Menu</span>
          </button>
        </div>

      </div>
    </div>
  );
};
