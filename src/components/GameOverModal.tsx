import React, { useEffect } from 'react';
import { RotateCcw, Home, Sparkles, Award, CheckCircle2, XCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GameOverModalProps {
  score: number;
  correctAnswers?: number;
  totalQuestions?: number;
  onRetry: () => void;
  onMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  correctAnswers = 0,
  totalQuestions = 0,
  onRetry,
  onMenu
}) => {
  useEffect(() => {
    soundManager.playGameOver();
  }, []);

  // Calculate Math Test Score (0 - 100)
  const mathScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const wrongAnswers = Math.max(0, totalQuestions - correctAnswers);

  let predicate = 'Perlu Latihan Lagi (D)';
  let predicateColor = 'text-slate-600';
  let badgeIcon = '📚';

  if (mathScore === 100 && totalQuestions > 0) {
    predicate = 'Sempurna! (A+) - Semua Soal Terjawab Benar!';
    predicateColor = 'text-amber-600';
    badgeIcon = '🌟';
  } else if (mathScore >= 80) {
    predicate = 'Sangat Baik (A) - Pemahaman Sangat Bagus!';
    predicateColor = 'text-emerald-600';
    badgeIcon = '🥇';
  } else if (mathScore >= 70) {
    predicate = 'Baik (B) - Sudah Memahami Konsep!';
    predicateColor = 'text-blue-600';
    badgeIcon = '🥈';
  } else if (mathScore >= 60) {
    predicate = 'Cukup (C) - Tingkatkan Lagi!';
    predicateColor = 'text-amber-700';
    badgeIcon = '🥉';
  }

  return (
    <div id="game-over-modal" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="clay-card max-w-md w-full p-5 sm:p-7 bg-white text-center animate-in zoom-in-95 duration-200">
        
        {/* Header Emoji */}
        <div className="text-5xl mb-2">
          🧟‍♂️
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-rose-950 font-heading leading-tight">
          ZOMBIE MASUK KE RUMAH!
        </h2>
        
        <p className="text-xs sm:text-sm font-bold text-slate-600 font-heading mt-1">
          Jangan berkecil hati, tata kembali pertahanan tanamanmu!
        </p>

        {/* RAPOR NILAI MATEMATIKA AKHIR PERMAINAN */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-50 border-2 border-emerald-300 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2 mb-2">
            <span className="text-xs font-black text-emerald-950 font-heading flex items-center gap-1.5">
              <span>{badgeIcon}</span>
              <span>Rapor Nilai Soal Siswa (Kelas 4 SD)</span>
            </span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Matematika
            </span>
          </div>

          {/* Big Score Box */}
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

          {/* Details breakdown */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-emerald-200/60 text-center">
            <div className="bg-white/80 p-1.5 rounded-xl border border-emerald-100">
              <span className="text-[10px] font-bold text-slate-500 block">Total Soal</span>
              <span className="text-sm font-black text-slate-800">{totalQuestions}</span>
            </div>
            <div className="bg-emerald-100/70 p-1.5 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block">Benar</span>
              <span className="text-sm font-black text-emerald-900">{correctAnswers}</span>
            </div>
            <div className="bg-rose-100/70 p-1.5 rounded-xl border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 block">Salah</span>
              <span className="text-sm font-black text-rose-900">{wrongAnswers}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 text-xs font-bold text-slate-500 flex items-center justify-center gap-2">
          <span>Skor Game: <strong className="text-slate-800">{score.toLocaleString('id-ID')}</strong></span>
          <span>•</span>
          <span>Matahari dari Soal: <strong className="text-amber-600">+{correctAnswers * 100} ☀️</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 border-t">
          <button
            onClick={() => {
              soundManager.playClick();
              onRetry();
            }}
            className="clay-btn clay-btn-green w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi 🔄</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onMenu();
            }}
            className="clay-btn clay-btn-white w-full sm:w-auto px-5 py-2.5 text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-2 text-slate-700"
          >
            <Home className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>
        </div>

      </div>
    </div>
  );
};
