import React, { useState } from 'react';
import { Question } from '../types';
import { Lightbulb, CheckCircle2, AlertCircle, Sun, Pause, FastForward, Play, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ZombieDefeatedModalProps {
  question: Question;
  zombieName: string;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onClose: () => void;
}

const ELEMENT_STYLES: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  Bilangan: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', icon: '🔢' },
  Aljabar: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300', icon: '🧩' },
  Pengukuran: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', icon: '📏' },
  Geometri: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300', icon: '🔷' },
  Data: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300', icon: '📊' }
};

export const ZombieDefeatedModal: React.FC<ZombieDefeatedModalProps> = ({
  question,
  zombieName,
  onAnswerQuestion,
  onClose
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintStep, setHintStep] = useState<number>(1);

  const handleSelectChoice = (index: number) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setSelectedIdx(index);
    setIsSubmitted(true);

    const isCorrect = index === question.correctAnswerIndex;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    onAnswerQuestion(isCorrect);
  };

  const isCorrectAnswer = selectedIdx !== null && selectedIdx === question.correctAnswerIndex;
  const currentElement = question.element || 'Bilangan';
  const elemStyle = ELEMENT_STYLES[currentElement] || ELEMENT_STYLES['Bilangan'];

  const difficultyLabel =
    question.difficulty === 'LOW' || question.difficulty === 'easy'
      ? 'Level Dasar (LOW)'
      : question.difficulty === 'MIDDLE' || question.difficulty === 'medium'
      ? 'Level Sedang (MIDDLE)'
      : 'Level HOTS (HARD)';

  return (
    <div id="zombie-defeated-modal" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="clay-card max-w-xl w-full p-4 sm:p-6 bg-white shadow-2xl animate-in zoom-in-95 duration-150 border-4 border-emerald-400 my-auto">
        
        {/* Top Game Paused Notification Banner - Explicit thinking time */}
        <div className="mb-3 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/80 flex items-center justify-between text-amber-950 text-xs font-black font-heading animate-pulse">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
              <Pause className="w-3 h-3 fill-white" />
            </span>
            <span>PERMAINAN DIJEDA • WAKTU BERPIKIR SISWA (KONTROL PENUH)</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-[11px] font-extrabold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Lewati</span>
          </button>
        </div>

        {/* Header alert with Curriculum Badges */}
        <div className="border-b pb-3 mb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <span className="text-3xl animate-bounce shrink-0">🧟‍♂️</span>
              <div>
                {/* Curriculum & Difficulty Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${elemStyle.bg} ${elemStyle.text} ${elemStyle.border} flex items-center gap-1`}>
                    <span>{elemStyle.icon}</span>
                    <span>{currentElement}</span>
                  </span>

                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
                    {difficultyLabel}
                  </span>

                  {question.isBossQuestion && (
                    <span className="text-[11px] font-black text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                      Tantangan Boss
                    </span>
                  )}

                  <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
                    <Sun className="w-3 h-3 text-amber-600 fill-amber-500" />
                    +100 Matahari
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading">
                  {question.subtopic ? `Subtopik: ${question.subtopic}` : question.topic || 'Tantangan Matematika SD Kelas 4'}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1 cursor-pointer"
              title="Lewati Soal dan Lanjut Bermain"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Question Text & Visual Card */}
        <div className="my-3 bg-emerald-50/70 p-3.5 sm:p-4 rounded-2xl border border-emerald-200 text-center">
          <p className="text-sm sm:text-base font-black text-slate-800 font-heading leading-snug">
            {question.questionText}
          </p>

          {/* Visual Diagram or Table Data Box */}
          {question.visual && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-white border-2 border-emerald-300 shadow-inner inline-block max-w-full text-left">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <Compass className="w-3 h-3" />
                <span>Visual Informasi / Diagram:</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-slate-800 whitespace-pre-wrap bg-slate-50 p-2 rounded-lg border border-slate-200">
                {question.visual}
              </div>
            </div>
          )}

          {/* Highlight Key Expression */}
          {question.highlightText && (
            <div className="block mt-2">
              <span className="inline-block px-4 py-1 rounded-xl bg-white border-2 border-emerald-400 text-emerald-950 font-black text-lg sm:text-xl font-heading shadow-xs">
                {question.highlightText}
              </span>
            </div>
          )}
        </div>

        {/* 4 Multiple Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          {question.choices.map((choice, index) => {
            let btnClass = 'clay-btn-white';
            let icon = null;

            if (isSubmitted) {
              if (index === question.correctAnswerIndex) {
                btnClass = 'clay-btn-green ring-2 ring-emerald-500 scale-[1.02]';
                icon = <CheckCircle2 className="w-5 h-5 text-white ml-auto shrink-0" />;
              } else if (index === selectedIdx) {
                btnClass = 'clay-btn-coral ring-2 ring-rose-400';
                icon = <AlertCircle className="w-5 h-5 text-white ml-auto shrink-0" />;
              } else {
                btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={index}
                id={`modal-answer-choice-${index}`}
                onClick={() => handleSelectChoice(index)}
                disabled={isSubmitted}
                className={`clay-btn ${btnClass} p-3 text-left flex items-center justify-between text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 shrink-0 rounded-lg bg-black/10 flex items-center justify-center font-black text-xs">
                    {['A', 'B', 'C', 'D'][index]}
                  </span>
                  <span className="font-heading text-slate-900 break-words">{choice}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Child-Friendly Pedagogical Feedback Banner */}
        {isSubmitted && (
          <div className={`p-3 sm:p-3.5 rounded-2xl border-2 my-2 transition-all animate-fade-in ${
            isCorrectAnswer
              ? 'bg-emerald-100/95 border-emerald-400 text-emerald-950 shadow-sm'
              : 'bg-amber-100/95 border-amber-400 text-amber-950 shadow-sm'
          }`}>
            <div className="flex items-start gap-2.5">
              <span className="text-2xl shrink-0">{isCorrectAnswer ? '🎉' : '💡'}</span>
              <div className="flex-1">
                <h4 className="font-black text-sm font-heading flex items-center gap-1.5">
                  {isCorrectAnswer ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>HEBAT! ⭐ Tepat sekali! 🌱 Tanamanmu berhasil menyerang! (+100 ☀️)</span>
                    </>
                  ) : (
                    <>
                      <span>HAMPIR BENAR! 💡 Coba periksa lagi:</span>
                    </>
                  )}
                </h4>
                <p className="text-xs font-semibold mt-1 leading-relaxed text-slate-800 bg-white/70 p-2 rounded-xl border border-black/5">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 1-3 Progressive Step Hint System */}
        {!isSubmitted && question.hints && question.hints.length > 0 && (
          <div className="mt-2.5">
            {!showHint ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowHint(true);
                }}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 py-1 px-2.5 rounded-xl bg-amber-100/80 border border-amber-300 hover:bg-amber-200/80 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>💡 Butuh Bantuan? Buka Petunjuk Bertahap</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs text-amber-950 animate-fade-in">
                <div className="flex items-center justify-between mb-1 border-b border-amber-200 pb-1">
                  <span className="font-black flex items-center gap-1 text-amber-900">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    Petunjuk Langkah {hintStep} dari {question.hints.length}:
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    {hintStep === 1 ? 'Pengingat Konsep' : hintStep === 2 ? 'Langkah Antara' : 'Panduan Kuat'}
                  </span>
                </div>
                <p className="font-medium leading-relaxed">{question.hints[hintStep - 1]}</p>
                {hintStep < question.hints.length && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setHintStep((prev) => prev + 1);
                    }}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline mt-2 block cursor-pointer"
                  >
                    Lihat petunjuk langkah berikutnya ({hintStep + 1}) ➡️
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2">
          {!isSubmitted ? (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="clay-btn clay-btn-white px-3 sm:px-4 py-2 text-xs font-bold rounded-xl text-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <FastForward className="w-3.5 h-3.5 text-amber-600" />
              <span>Lewati (Lanjut Main)</span>
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Jawaban tercatat di Rapor Belajar</span>
            </div>
          )}

          {isSubmitted ? (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="clay-btn clay-btn-green px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Lanjutkan Pertahanan Kebun! 🌻</span>
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400">
              Pilih A, B, C, atau D
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
