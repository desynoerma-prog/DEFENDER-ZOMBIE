import React from 'react';
import { SessionLearningReport, MathElement } from '../types';
import { CheckCircle2, AlertCircle, Award, Sparkles, BookOpen, Star, Flame, X, BarChart3 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface StudentReportModalProps {
  report: SessionLearningReport;
  playerName?: string;
  onClose: () => void;
}

const ELEMENT_META: Record<MathElement, { title: string; icon: string; color: string; barColor: string }> = {
  Bilangan: { title: 'Bilangan & Pecahan', icon: '🔢', color: 'text-emerald-700 bg-emerald-50 border-emerald-300', barColor: 'bg-emerald-500' },
  Aljabar: { title: 'Aljabar & Pola', icon: '🧩', color: 'text-indigo-700 bg-indigo-50 border-indigo-300', barColor: 'bg-indigo-500' },
  Pengukuran: { title: 'Pengukuran & Estimasi', icon: '📏', color: 'text-amber-700 bg-amber-50 border-amber-300', barColor: 'bg-amber-500' },
  Geometri: { title: 'Geometri & Bangun Datar', icon: '🔷', color: 'text-teal-700 bg-teal-50 border-teal-300', barColor: 'bg-teal-500' },
  Data: { title: 'Analisis Data & Diagram', icon: '📊', color: 'text-rose-700 bg-rose-50 border-rose-300', barColor: 'bg-rose-500' }
};

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  report,
  playerName = 'Siswa Petualang Matematika',
  onClose
}) => {
  const elements: MathElement[] = ['Bilangan', 'Aljabar', 'Pengukuran', 'Geometri', 'Data'];

  return (
    <div id="student-report-modal" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="clay-card max-w-2xl w-full p-5 sm:p-7 bg-white text-slate-900 shadow-2xl animate-in zoom-in-95 duration-200 border-4 border-emerald-400 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🌱</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Rapor Pembelajaran STEAM
                </span>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  Kelas 4 SD
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-emerald-950 font-heading mt-0.5">
                Evaluasi Belajar: {playerName}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-base cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto pr-1 space-y-4 flex-1">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl">
              <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Skor Game</span>
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-950 font-heading block mt-0.5">
                {report.score.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl">
              <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Akurasi Soal</span>
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-950 font-heading block mt-0.5">
                {report.accuracy}%
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-2xl">
              <span className="text-[10px] font-bold text-blue-800 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Jawaban Benar</span>
              </span>
              <span className="text-lg sm:text-xl font-black text-blue-950 font-heading block mt-0.5">
                {report.correctAnswers} <span className="text-xs text-slate-500 font-bold">/ {report.totalQuestions}</span>
              </span>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-2xl">
              <span className="text-[10px] font-bold text-rose-800 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
                <span>Kombo Tertinggi</span>
              </span>
              <span className="text-lg sm:text-xl font-black text-rose-950 font-heading block mt-0.5">
                ×{report.highestCombo}
              </span>
            </div>
          </div>

          {/* 5 Elements Performance Bar Charts */}
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 font-heading flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Capaian 5 Elemen Matematika (Kurikulum SD Kelas 4)</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-500">Target Belajar: 70%+</span>
            </div>

            <div className="space-y-2">
              {elements.map((elem) => {
                const meta = ELEMENT_META[elem];
                const stat = report.elementPerformance[elem] || { total: 0, correct: 0, percentage: 0 };
                const pct = stat.percentage;

                return (
                  <div key={elem} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold flex items-center gap-1 text-slate-800">
                        <span>{meta.icon}</span>
                        <span>{meta.title}</span>
                      </span>
                      <span className="font-mono font-black text-slate-700 text-xs">
                        {pct}% ({stat.correct}/{stat.total} soal)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${meta.barColor}`}
                        style={{ width: `${Math.min(100, Math.max(8, pct))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Skills Breakdown: Mastered vs Needs Practice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Materi yang sudah dikuasai */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300">
              <h4 className="text-xs font-black text-emerald-900 font-heading flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Materi yang Sudah Dikuasai:</span>
              </h4>
              {report.masteredSkills.length > 0 ? (
                <ul className="space-y-1.5">
                  {report.masteredSkills.map((sk, idx) => (
                    <li key={idx} className="text-[11px] font-bold text-emerald-800 flex items-start gap-1.5 bg-white/80 p-1.5 rounded-lg border border-emerald-200">
                      <span className="text-emerald-600 font-black">✓</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] font-medium text-emerald-700 italic">
                  Selesaikan beberapa soal lagi untuk mencatat materi yang dikuasai.
                </p>
              )}
            </div>

            {/* Materi yang perlu dilatih lagi */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border-2 border-amber-300">
              <h4 className="text-xs font-black text-amber-900 font-heading flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Materi yang Perlu Dilatih Lagi:</span>
              </h4>
              {report.needsPracticeSkills.length > 0 ? (
                <ul className="space-y-1.5">
                  {report.needsPracticeSkills.map((sk, idx) => (
                    <li key={idx} className="text-[11px] font-bold text-amber-900 flex items-start gap-1.5 bg-white/80 p-1.5 rounded-lg border border-amber-200">
                      <span className="text-amber-600 font-black">💡</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-[11px] font-bold text-emerald-800 bg-white/80 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hebat sekali! Belum ada kendala berarti pada materi yang dijawab.</span>
                </div>
              )}
            </div>

          </div>

          {/* Child-Friendly Pedagogical Guidance (No peer ranking) */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-xs text-teal-900">
            <span className="font-black block mb-0.5 text-teal-950 flex items-center gap-1">
              <span>🌟</span>
              <span>Prinsip Pembelajaran Matematika STEAM:</span>
            </span>
            <p className="leading-relaxed text-[11px]">
              Setiap siswa belajar dengan langkahnya masing-masing. Penilaian difokuskan pada pemahaman konsep, daya nalar, dan proses berpikir, bukan semata-mata kecepatan menghafal. Terus pertahankan semangatmu! 🌱
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="clay-btn clay-btn-green px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl cursor-pointer"
          >
            Tutup Rapor & Lanjutkan
          </button>
        </div>

      </div>
    </div>
  );
};
